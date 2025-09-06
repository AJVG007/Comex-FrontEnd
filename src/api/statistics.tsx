// src/api/statistics.tsx
export async function fetchLatestStatistics() {
  const resp = await fetch("http://127.0.0.1:8000/statistics/latest");
  if (!resp.ok) throw new Error("Error al obtener estadísticas");
  return resp.json();
}
