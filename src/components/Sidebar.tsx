// src/components/Sidebar.tsx
import { FaHome, FaFolder, FaCity } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  return (
    <aside
      className={`w-64 h-screen bg-gradient-to-b from-indigo-950 to-indigo-600 text-white p-6 flex flex-col justify-between shadow-lg ${className}`}
    >
      {/* Parte superior */}
      <div>
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-3">
            <svg
              className="w-10 h-10 text-blue-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.6h19.2v-1.6c0-3.2-6.4-4.8-9.6-4.8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">JAIR VELASCO</h2>
          <p className="text-sm text-blue-200">
            jair.velasco@tecnosinergia.com
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-4 w-full">
          <Link
            to="../dashboard"
            className="flex items-center gap-3 hover:bg-indigo-500 px-3 py-2 rounded-lg"
          >
            <FaHome /> <span>Inicio</span>
          </Link>
          <Link
            to="../reports"
            className="flex items-center gap-3 hover:bg-indigo-500 px-3 py-2 rounded-lg"
          >
            <FaFolder /> <span>Reportes</span>
          </Link>
          <Link
            to="../branches"
            className="flex items-center gap-3 hover:bg-indigo-500 px-3 py-2 rounded-lg"
          >
            <FaCity /> <span>Sucursales</span>
          </Link>
        </nav>
      </div>

      {/* Botón de salir */}
      <div className="mt-6 w-full">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
