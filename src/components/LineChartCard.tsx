import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface LineChartCardProps {
  title: string;
  data: Array<{
    name: string;    // Mes (p. ej. "Septiembre 2025")
    Camara4: number; // total de entradas del mes
    Camara5: number; // total de entradas del mes
  }>;
}

export default function LineChartCard({ title, data }: LineChartCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-80">
      <h3 className="text-indigo-950 mb-0 font-bold">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Camara4" name="Cámara 4" stroke="#016630" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="Camara5" name="Cámara 5" stroke="#1f6feb" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
