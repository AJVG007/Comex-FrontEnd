import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Paso 1: Login
      const loginResp = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResp.ok) throw new Error("Credenciales incorrectas");

      const loginData = await loginResp.json();
      console.log("✅ Login exitoso:", loginData);

      // Paso 2: Fetch estadísticas
      const statsResp = await fetch("http://127.0.0.1:8000/statistics/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!statsResp.ok) throw new Error("Error al obtener estadísticas");

      const statsData = await statsResp.json();
      console.log("📊 Estadísticas:", statsData);

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(loginData));
      localStorage.setItem("statistics", JSON.stringify(statsData));

      // Redirigir al dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("Credenciales incorrectas o fallo en estadísticas.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Panel izquierdo */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 items-center justify-center relative overflow-hidden">
        <div className="text-center text-white px-6 z-10">
          <h1 className="text-4xl font-bold mb-4">Pagina de Bienvenida</h1>
          <p className="text-lg opacity-80">Inicia sesión en tu cuenta</p>
        </div>

        {/* Ondas animadas */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgba(255,255,255,0.15)"
            d="M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L0,320Z;
                M0,192L48,202.7C96,213,192,235,288,213.3C384,192,480,128,576,117.3C672,107,768,149,864,170.7C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,213.3L1440,213L1440,320L0,320Z;
                M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Panel derecho */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">Hola!</h2>
          <p className="text-sm mb-6">
            <span className="text-indigo-700 font-semibold">Login</span> a tu cuenta
          </p>

          {/* Usuario */}
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-indigo-700 outline-none py-2 mb-6 text-gray-700"
          />

          {/* Contraseña */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-indigo-700 outline-none py-2 text-gray-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-indigo-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            INICIAR
          </button>

          <p className="mt-6 text-center text-sm text-indigo-950">
            Power by Tecnosinergia
          </p>
        </div>
      </div>
    </div>
  );
}
