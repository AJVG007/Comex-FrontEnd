import { useState } from "react";
import { FileSpreadsheet, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { tableData } from "../data/tableData2";
import RowsPerPageSelector from "./RowsPerPageSelector";

export default function FilterableTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, tableData.length);
  const selectedRows = tableData.slice(start, end);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "table-data.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Table Data", 14, 10);
    (doc as any).autoTable({
      head: [["Date", "Entered", "Left", "Present", "Result"]],
      body: tableData.map((r) => [r.date, r.entered, r.left, r.present, r.result]),
    });
    doc.save("table-data.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header con botones */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-indigo-950 font-bold">Estadísticas</h2>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FileSpreadsheet className="w-4 h-4" /> Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FileDown className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-y-auto max-h-100">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-indigo-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Statistics Time</th>
              <th className="px-4 py-2 text-left">People Entered</th>
              <th className="px-4 py-2 text-left">People Left</th>
              <th className="px-4 py-2 text-left">People Present</th>
              <th className="px-4 py-2 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {selectedRows.map((row, i) => (
              <tr key={i} className="border-b odd:bg-white even:bg-gray-50 text-gray-700">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.entered}</td>
                <td className="px-4 py-2">{row.left}</td>
                <td className="px-4 py-2">{row.present}</td>
                <td className="px-4 py-2">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer con selector + paginación */}
      <div className="flex justify-between items-center mt-4">
        <RowsPerPageSelector
          value={rowsPerPage}
          onChange={(val) => {
            setRowsPerPage(val);
            setPage(1);
          }}
        />

        <span className="text-sm text-gray-600">
          Mostrando {start + 1}–{end} de {tableData.length} registros
        </span>

        {/* Paginación */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-white rounded bg-indigo-600 hover:bg-indigo-800 disabled:opacity-90"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 text-white rounded bg-indigo-600 hover:bg-indigo-800 disabled:opacity-80"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
