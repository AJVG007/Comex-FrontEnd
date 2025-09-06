import { FaStore } from "react-icons/fa";

interface BranchCardProps {
  nombre: string;
  checked: boolean;
  onToggle: (nombre: string) => void;
}

export default function BranchCard({ nombre, checked, onToggle }: BranchCardProps) {
  return (
    <div
      onClick={() => onToggle(nombre)}
      className={`cursor-pointer p-4 rounded-lg shadow flex items-center justify-between transition-all
        ${
          checked
            ? "bg-green-100 border-2 border-green-500"
            : "bg-white hover:bg-gray-100 border border-gray-200"
        }`}
    >
      <div className="flex items-center gap-3">
        <FaStore className={`text-lg ${checked ? "text-green-600" : "text-gray-500"}`} />
        <span className="font-medium">{nombre}</span>
      </div>

      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="w-4 h-4 accent-green-600 cursor-pointer"
      />
    </div>
  );
}
