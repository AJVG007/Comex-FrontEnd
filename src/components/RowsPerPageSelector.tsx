interface RowsPerPageSelectorProps {
  value: number;
  onChange: (val: number) => void;
}

const options = [5, 10, 20, 50, 100];

export default function RowsPerPageSelector({ value, onChange }: RowsPerPageSelectorProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span>Mostrar</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span>registros</span>
    </div>
  );
}