// src/components/LogoutButton.tsx
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí limpias sesión si manejas token/localStorage
    // localStorage.removeItem("token");
    // sessionStorage.clear();

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-3 w-full bg-indigo-300 hover:bg-indigo-400 px-3 py-2 rounded-lg border border-indigo-200 text-indigo-950 ${className}`}
    >
      <FaSignOutAlt /> <span>Salir</span>
    </button>
  );
}
