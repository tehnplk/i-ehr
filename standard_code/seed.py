"""Create c_* master tables in Postgres and seed from extracted JSON files.

Reads .env.local for DATABASE_URL.
"""
import os, json, re, sys, urllib.parse
from pathlib import Path

import subprocess

HERE = Path(__file__).parent
ROOT = HERE.parent

def load_env():
    env_path = ROOT / '.env.local'
    out = {}
    for line in env_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        k, v = line.split('=', 1)
        out[k.strip()] = v.strip()
    return out

def parse_db_url(url: str):
    u = urllib.parse.urlparse(url)
    return {
        'host': u.hostname,
        'port': str(u.port),
        'user': u.username,
        'password': urllib.parse.unquote(u.password or ''),
        'database': u.path.lstrip('/'),
    }

_pg_conn = None
def db_exec(conn_info, sql: str):
    import psycopg
    global _pg_conn
    if _pg_conn is None:
        _pg_conn = psycopg.connect(
            host=conn_info['host'], port=conn_info['port'],
            user=conn_info['user'], password=conn_info['password'],
            dbname=conn_info['database'], autocommit=True,
        )
    with _pg_conn.cursor() as cur:
        cur.execute(sql)

def sql_str(v):
    if v is None or v == '':
        return 'NULL'
    s = str(v).replace("'", "''")
    return "'" + s + "'"

def load_json(name: str):
    with open(HERE / (name + '.json'), encoding='utf-8') as f:
        d = json.load(f)
    sheet = list(d.keys())[0]
    return d[sheet]

# ----- extractors per file -----

def rows_sex():
    rs = load_json('02_sex')
    out = []
    for r in rs[2:]:
        if not r or r[0] in ('', None): continue
        out.append((str(r[0]).strip(), str(r[1]).strip()))
    return out  # (code, name)

def rows_fstatus():
    rs = load_json('07_fstatus')
    out = []
    for r in rs[2:]:
        if not r or r[0] in ('', None): continue
        out.append((str(r[0]).strip(), str(r[1]).strip()))
    return out

def rows_vstatus():
    rs = load_json('08_vstatus')
    out = []
    for r in rs[2:]:
        if not r or r[0] in ('', None): continue
        out.append((str(r[0]).strip(), str(r[1]).strip()))
    return out

def rows_religion():
    rs = load_json('05_religion')
    out = []
    for r in rs:
        if len(r) < 3: continue
        code = str(r[1]).strip() if r[1] not in (None, '') else ''
        name = str(r[2]).strip() if r[2] not in (None, '') else ''
        if not code or not re.fullmatch(r'\d{2}', code): continue
        # Skip header row "รหัสที่บันทึก"
        if 'รหัส' in name: continue
        out.append((code, name))
    return out

def rows_education():
    rs = load_json('06_education')
    out = []
    for r in rs[2:]:
        if not r or r[0] in ('', None): continue
        code = str(r[0]).strip()
        if not re.fullmatch(r'\d{2}', code): continue
        # Take only the first sentence/clause as the canonical name
        full = str(r[1]).strip()
        # Cut at "  " (multiple spaces) or first comma to keep concise
        name = re.split(r'\s{2,}|,|/', full)[0].strip()
        out.append((code, name))
    return out

def rows_nation():
    """04_race_nation provides combined race/nation list — used for both."""
    rs = load_json('04_race_nation')
    out = []
    for r in rs:
        if len(r) < 2: continue
        code = str(r[0]).strip()
        if not code: continue
        # Match 3-digit numeric or padded
        if not re.fullmatch(r'\d{1,3}', code): continue
        name = str(r[1]).strip()
        if not name: continue
        out.append((code.zfill(3), name))
    return out

def rows_occupation():
    rs = load_json('03_occupation')
    out = []
    for r in rs[2:]:
        if not r: continue
        code = str(r[0]).strip()
        # Codes are 4-digit; strip padding from numeric int
        if not re.fullmatch(r'\d{3,4}', code): continue
        name = str(r[1]).strip() if len(r) > 1 else ''
        if not name: continue
        # Trim long descriptions, keep first sentence
        name = re.split(r'\s*:\s*', name, 1)[0]
        name = re.split(r'(?<=[฀-๿])\s{2,}', name)[0]
        out.append((code.zfill(4), name[:255]))
    return out

def rows_prename():
    """01_prename has code/dopa/short/name/sex — keep extra columns."""
    rs = load_json('01_prename')
    out = []
    for r in rs[2:]:
        if not r or r[0] in ('', None): continue
        code = str(r[0]).strip()
        if not re.fullmatch(r'\d{1,3}', code): continue
        code_dopa = str(r[1]).strip() if len(r) > 1 else ''
        short = str(r[2]).strip() if len(r) > 2 else ''
        name = str(r[3]).strip() if len(r) > 3 else ''
        sex = str(r[4]).strip() if len(r) > 4 else ''
        if not name: continue
        out.append((code.zfill(3), name, code_dopa or None, short or None, sex or None))
    return out

# ----- DDL + load -----

SIMPLE_TABLES = [
    ('c_sex', rows_sex),
    ('c_fstatus', rows_fstatus),
    ('c_vstatus', rows_vstatus),
    ('c_religion', rows_religion),
    ('c_education', rows_education),
    ('c_nation', rows_nation),
    ('c_race', rows_nation),  # same source list
    ('c_occupation', rows_occupation),
]

def ddl_simple(name):
    return f"""
drop table if exists public.{name} cascade;
create table public.{name} (
  id bigint generated always as identity primary key,
  code text not null unique,
  name text not null
);
"""

DDL_PRENAME = """
drop table if exists public.c_prename cascade;
create table public.c_prename (
  id bigint generated always as identity primary key,
  code text not null unique,
  name text not null,
  code_dopa text,
  short text,
  sex text
);
"""

def main():
    env = load_env()
    conn = parse_db_url(env['DATABASE_URL'])

    BATCH = 80

    def chunked(lst, n):
        for i in range(0, len(lst), n):
            yield lst[i:i+n]

    # Build one big SQL and execute it
    parts = []
    for name, fn in SIMPLE_TABLES:
        parts.append(ddl_simple(name))
        rows = fn()
        seen = set(); dedup = []
        for code, label in rows:
            if code in seen: continue
            seen.add(code); dedup.append((code, label))
        for chunk in chunked(dedup, BATCH):
            values = ',\n'.join(f"({sql_str(c)}, {sql_str(n)})" for c, n in chunk)
            parts.append(f"insert into public.{name}(code, name) values\n{values};")
        print(f"{name}: {len(dedup)} rows")

    parts.append(DDL_PRENAME)
    pn = rows_prename()
    seen = set(); dedup = []
    for row in pn:
        if row[0] in seen: continue
        seen.add(row[0]); dedup.append(row)
    for chunk in chunked(dedup, BATCH):
        values = ',\n'.join(
            f"({sql_str(c)}, {sql_str(n)}, {sql_str(d)}, {sql_str(s)}, {sql_str(x)})"
            for c, n, d, s, x in chunk
        )
        parts.append(
            "insert into public.c_prename(code, name, code_dopa, short, sex) values\n"
            + values + ';'
        )
    print(f"c_prename: {len(dedup)} rows")

    sql = '\n'.join(parts)
    out_sql = HERE / '_seed.sql'
    out_sql.write_text(sql, encoding='utf-8')
    print(f"\nWrote {out_sql} ({len(sql)} bytes)")

    if '--apply' in sys.argv:
        # Execute each "part" separately (DDL, then INSERT) to stay under cmdline limits.
        for p in parts:
            p = p.strip()
            if not p: continue
            db_exec(conn, p)
        print("Applied to database.")

if __name__ == '__main__':
    main()
