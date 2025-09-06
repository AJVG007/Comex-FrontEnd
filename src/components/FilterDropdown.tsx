import { useState } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const toggleAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="w-40 justify-between inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium bg-white hover:bg-indigo-100 shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label} {selected.length > 0 ? `(${selected.length})` : ""}
        <svg
          className="ml-2 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-56 rounded-md border bg-white shadow-md">
          <div className="px-3 py-2 text-sm font-medium text-gray-700">{label}</div>
          <div className="h-px bg-gray-200" />
          <label className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selected.length === options.length}
              onChange={toggleAll}
            />
            Select All
          </label>
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-indigo-100"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
