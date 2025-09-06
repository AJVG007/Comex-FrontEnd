import ReportsLayout from "../layouts/ReportsLayout";
import FilterableTable from "../components/FilterableTable";

export default function Reports() {
  return (
    <ReportsLayout>
      <div className="space-y-6 p-2">
        <h1 className="text-2xl font-bold mb-2 text-indigo-900">Reportes</h1>
        <FilterableTable />
      </div>
    </ReportsLayout>
  );
}
