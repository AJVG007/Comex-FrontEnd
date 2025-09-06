import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative w-48 md:w-64 ${className}`}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-800" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-indigo-800 rounded-full px-10 py-2 text-sm focus:ring-2 focus:ring-indigo-900 focus:outline-none"
      />
    </div>
  );
}
