import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

type ReportsLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function ReportsLayout({ children, title = "Reportes" }: ReportsLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-indigo-100">
      {/* SIDEBAR (fixed) */}
      <Sidebar
        className={`fixed left-0 top-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      />

      {/* CONTENIDO (empujado) */}
      <div
        className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Header simple con botón hamburguesa */}
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="flex items-center gap-3 p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-900"
              aria-label="Toggle sidebar"
            >
              <FaBars size={18} />
            </button>
            <h1 className="text-lg font-bold text-slate-800">{title}</h1>
          </div>
        </header>

        {/* Main */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
