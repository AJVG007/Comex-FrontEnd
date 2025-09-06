// src/components/EstadoCard.tsx
import { useState, useRef, useEffect } from "react";
import { FaCity, FaChevronDown, FaChevronRight } from "react-icons/fa";
import SucursalCard from "./BranchCard";
import PieChartCard from "./PieChartCard";
import { branchesData } from "../data/branchesData";

interface StateCardProps {
  estado: string;
  sucursales: string[];
}

export default function StateCard({ estado, sucursales }: StateCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const toggleSucursal = (nombre: string) => {
    setSelected((prev) =>
      prev.includes(nombre) ? prev.filter((s) => s !== nombre) : [...prev, nombre]
    );
  };

  const toggleAll = () => {
    if (selected.length === sucursales.length) {
      setSelected([]);
    } else {
      setSelected(sucursales);
    }
  };

  // Manejar estado indeterminate
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selected.length > 0 && selected.length < sucursales.length;
    }
  }, [selected, sucursales.length]);

  return (
    <div className="w-full">
      {/* Estado Card */}
      <div
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer p-6 rounded-xl shadow-lg flex items-center justify-between transition-all mb-2
          ${
            selected.length > 0
              ? "bg-indigo-100 border-2 border-indigo-500"
              : "bg-white hover:bg-gray-100 border border-gray-200"
          }`}
      >
        <div className="flex items-center gap-3">
          <FaCity
            className={`text-xl ${
              selected.length > 0 ? "text-indigo-600" : "text-gray-500"
            }`}
          />
          <div>
            <span className="font-semibold text-lg">{estado}</span>
            <p className="text-sm text-gray-500">{sucursales.length} sucursales</p>
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            ref={checkboxRef}
            checked={selected.length === sucursales.length}
            onChange={toggleAll}
            className="w-5 h-5 accent-indigo-600 cursor-pointer"
          />
          {expanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>

      {/* Subcards */}
      {expanded && (
        <div className="ml-6 space-y-2">
          {sucursales.map((sucursal) => (
            <SucursalCard
              key={sucursal}
              nombre={sucursal}
              checked={selected.includes(sucursal)}
              onToggle={toggleSucursal}
            />
          ))}
        </div>
      )}

      {/* Gráficas seleccionadas */}
      {selected.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-6">
          {selected.map((sucursal) => (
            <PieChartCard
              key={sucursal}
              title={sucursal}
              data={branchesData[sucursal] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
