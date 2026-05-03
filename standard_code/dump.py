"""Dump every .xls/.xlsx in this dir to CSV (UTF-8) so we can inspect content."""
import os, sys, csv, json
from pathlib import Path

import xlrd
from openpyxl import load_workbook

HERE = Path(__file__).parent

def dump_xls(path: Path):
    book = xlrd.open_workbook(str(path))
    out = {}
    for sh in book.sheets():
        rows = []
        for r in range(sh.nrows):
            row = []
            for c in range(sh.ncols):
                v = sh.cell_value(r, c)
                if isinstance(v, float) and v.is_integer():
                    v = int(v)
                row.append(v)
            rows.append(row)
        out[sh.name] = rows
    return out

def dump_xlsx(path: Path):
    wb = load_workbook(str(path), data_only=True)
    out = {}
    for sh in wb.worksheets:
        rows = []
        for row in sh.iter_rows(values_only=True):
            rows.append(['' if v is None else v for v in row])
        out[sh.title] = rows
    return out

def main():
    for p in sorted(HERE.glob('*.xls*')):
        if p.suffix == '.xls':
            data = dump_xls(p)
        elif p.suffix == '.xlsx':
            data = dump_xlsx(p)
        else:
            continue
        out_path = p.with_suffix('.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        print(f"{p.name}: sheets={list(data.keys())} rows={[len(v) for v in data.values()]}")

if __name__ == '__main__':
    main()
