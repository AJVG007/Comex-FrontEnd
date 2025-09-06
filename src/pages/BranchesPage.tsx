// src/pages/Sucursales.tsx
import EstadoCard from "../components/StateCard";
import { estadosData } from "../data/statesData";
import BranchesLayout from "../layouts/BranchesLayout";

export default function Branches() {
  return (
    <BranchesLayout title="Sucursales">
      <div className="space-y-6 p-2">
        <h1 className="text-2xl font-bold mb-2 text-indigo-900">Sucursales</h1>
        {estadosData.map((estado) => (
          <EstadoCard
            key={estado.estado}
            estado={estado.estado}
            sucursales={estado.sucursales}
          />
        ))}
      </div>
    </BranchesLayout>
  );
}
