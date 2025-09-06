import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface BarChartCardProps {
  title: string;
  data: any[];
}

export default function BarChartCard({ title, data }: BarChartCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-96">
      <h3 className="text-indigo-950 mb-0 font-bold">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Llegaron" fill="#191970" />
          <Bar dataKey="Dejaron" fill="#FFB93B" />
          <Bar dataKey="Presentes" fill="#992435" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
