import { Option } from "@/types/Option";
import React from "react";

interface SelectProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
}

export function Select<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: SelectProps<T>) {
  return (
    <div className="w-full md:flex-1">
      <label className="font-bold block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`block w-full py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 bg-[#4ec49b] text-white`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
