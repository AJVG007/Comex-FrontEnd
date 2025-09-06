import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
}

const COLORS = ["#021132", "#053394", "#0855F8", "#6A99FB", "#6F42C1"];

// Label centrado dentro de la porción
const RADIAN = Math.PI / 180;
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  // si la porción es muy pequeña, no mostramos label
  if (percent < 0.06) return null;

  const r = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fill="#E5F2FF"
      stroke="#0b0f19" // contorno oscuro para mejorar contraste
      strokeWidth={2}
      style={{ paintOrder: "stroke" }}
    >
      {value}
      {/* Si prefieres porcentaje: {Math.round(percent * 100)}% */}
    </text>
  );
};

export default function PieChartCard({ title, data }: PieChartCardProps) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-lg">
      <h2 className="text-lg text-indigo-950 font-bold mb-2">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              label={renderLabel}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={50} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
