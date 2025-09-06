interface CardProps {
  title: string;
  value: string | number;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:bg-indigo-950 text-indigo-950 hover:text-white">
      <h3 className="font-bold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
