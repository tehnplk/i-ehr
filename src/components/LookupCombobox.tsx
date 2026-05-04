"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Option = { code: string; name: string };

type Props = {
  name: string;
  options: Option[];
  defaultCode?: string;
  placeholder?: string;
  className?: string;
};

const MAX_VISIBLE = 50;

function typedCode(value: string) {
  return value.trim().split(/\s+-\s+|\s+/)[0] ?? "";
}

export function LookupCombobox({
  name,
  options,
  defaultCode,
  placeholder,
  className,
}: Props) {
  const initial = options.find((option) => option.code === defaultCode);
  const [code, setCode] = useState(defaultCode ?? "");
  const [text, setText] = useState(
    initial ? `${initial.code} - ${initial.name}` : "",
  );
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = text.trim().toLowerCase();
    if (!q) return options.slice(0, MAX_VISIBLE);
    return options
      .filter(
        (option) =>
          option.code.toLowerCase().includes(q) ||
          option.name.toLowerCase().includes(q),
      )
      .slice(0, MAX_VISIBLE);
  }, [options, text]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function commit(option: Option) {
    setCode(option.code);
    setText(`${option.code} - ${option.name}`);
    setOpen(false);
  }

  function clear() {
    setCode("");
    setText("");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlight((value) => Math.min(value + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      if (open && filtered[highlight]) {
        event.preventDefault();
        commit(filtered[highlight]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <input type="hidden" name={name} value={code} />
      <input
        type="text"
        value={text}
        placeholder={placeholder ?? "ค้นหารหัสหรือชื่อ..."}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          setCode(typedCode(next));
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        className={className}
      />
      {text && (
        <button
          type="button"
          onClick={clear}
          aria-label="ล้างค่า"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-[var(--text-faint)] hover:text-[var(--text)]"
        >
          x
        </button>
      )}
      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-auto border border-[var(--border)] bg-[var(--surface)] shadow-lg"
        >
          {filtered.map((option, index) => (
            <li
              key={option.code}
              onMouseDown={(event) => {
                event.preventDefault();
                commit(option);
              }}
              onMouseEnter={() => setHighlight(index)}
              className={`flex cursor-pointer items-baseline gap-2 px-3 py-2 text-xs ${
                index === highlight
                  ? "bg-[var(--row-active)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span className="font-mono text-xs text-[var(--text-faint)]">
                {option.code}
              </span>
              <span className="truncate">{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
