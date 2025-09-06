import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import BarChartCard from "../components/BarChartCard";
import LineChartCard from "../components/LineChartCard";
import PieChartCard from "../components/PieChartCard";
import Table from "../components/Table";
import { pieData1 } from "../data/pieData1";
import { pieData2 } from "../data/pieData2";
import { pieData3 } from "../data/pieData3";
import { pieData4 } from "../data/pieData4";

interface DailyStat {
  day: string;   // "YYYY-MM-DD"
  enter: number;
  exit: number;
  present: number;
}

interface ProcessedStat {
  ID: number;
  EnterTotal: number;
  ExitTotal: number;
  Daily?: DailyStat[];
}

export default function Dashboard() {
  const [cardsData, setCardsData] = useState<ProcessedStat[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<any[]>([]);

  // ⬇️ nuevo: cámara seleccionada para la BARRA (default 4)
  const [selectedCamera, setSelectedCamera] = useState<number>(4);

  // 🔹 YYYY-MM-DD en horario LOCAL (no UTC)
  const toYMDLocal = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // 🔹 Últimos 7 días (objetos Date locales) + su YYYY-MM-DD local
  const getLast7Days = () => {
    const today = new Date();
    const days: { date: Date; ymd: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      days.push({ date: d, ymd: toYMDLocal(d) });
    }
    return days;
  };

  // 🔹 Día de la semana en español con primera letra mayúscula
  const getDayName = (dateObj: Date) => {
    const raw = dateObj.toLocaleDateString("es-MX", { weekday: "long" });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  };

  // 🔹 Nombre del mes (solo mes, sin año) capitalizado
  const monthName = (d: Date) => {
    const raw = d.toLocaleDateString("es-MX", { month: "long" });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  };

  // ⬇️ nuevo: construye los datos de la barra para la cámara elegida
  const buildBarChartData = (camera?: ProcessedStat) => {
    const last7 = getLast7Days();
    return last7.map(({ date, ymd }) => {
      const found = camera?.Daily?.find((d: DailyStat) => d.day === ymd);
      return {
        name: getDayName(date),
        Llegaron: found ? found.enter : 0,
        Dejaron: found ? found.exit : 0,
        Presentes: found ? found.present : 0,
      };
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/statistics/latest")
      .then(res => {
        console.log("📊 Última estadística:", res.data);
        const processed: ProcessedStat[] = res.data.processed_statistics || [];
        setCardsData(processed);

        // --- BarChart con cámara 4 por defecto ---
        const cam4 = processed.find((c: ProcessedStat) => c.ID === 4);
        setBarChartData(buildBarChartData(cam4));

        // --- LineChart: ENERO → DICIEMBRE del año del documento ---
        const cam5 = processed.find((c: ProcessedStat) => c.ID === 5);

        // Tomamos el año desde 'begin' del documento (segundos epoch)
        const anchor = new Date((res.data.begin ?? Math.floor(Date.now() / 1000)) * 1000);
        const year = anchor.getFullYear();

        // Creamos los 12 meses del año (1 al 12)
        const months = Array.from({ length: 12 }, (_, idx) => new Date(year, idx, 1));

        // Inicializamos todo en 0
        const series = months.map(d => ({
          name: monthName(d), // Solo "Enero", "Febrero", ...
          Camara4: 0,
          Camara5: 0,
        }));

        // Colocamos los totales del mes actual del documento (anchor.getMonth())
        const idxMesActual = anchor.getMonth(); // 0=Enero ... 11=Diciembre
        series[idxMesActual].Camara4 = cam4?.EnterTotal ?? 0;
        series[idxMesActual].Camara5 = cam5?.EnterTotal ?? 0;

        setLineChartData(series);
      })
      .catch(err => {
        console.error("Error cargando estadísticas:", err);
      });
  }, []);

  // ⬇️ nuevo: cuando cambia la cámara seleccionada, recalculamos la barra
  useEffect(() => {
    if (cardsData.length === 0) return;
    const cam = cardsData.find((c) => c.ID === selectedCamera);
    setBarChartData(buildBarChartData(cam));
  }, [selectedCamera, cardsData]);

  return (
    <DashboardLayout title="Dashboard de Usuario">
      <h1 className="text-2xl font-bold mb-2 text-indigo-900">Dashboard Principal</h1>

      {/* Cards dinámicas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {cardsData.length > 0 ? (
          cardsData.slice(1, 5).map((cam) => (
            <Card
              key={cam.ID}
              title={`Cámara ${cam.ID}`}
              value={`Entradas: ${cam.EnterTotal}`}
            />
          ))
        ) : (
          <>
            <Card title="Cámara 1" value="-" />
            <Card title="Cámara 2" value="-" />
            <Card title="Cámara 3" value="-" />
            <Card title="Cámara 4" value="-" />
          </>
        )}
      </div>

      {/* ⬇️ nuevo: selector de cámara para la gráfica de barras */}
      <div className="mb-2">
        <label className="mr-2 font-semibold text-indigo-900">Selecciona cámara:</label>
        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {cardsData.map((cam) => (
            <option key={cam.ID} value={cam.ID}>
              Cámara {cam.ID}
            </option>
          ))}
        </select>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <BarChartCard title={`Clientes (últimos 7 días - Cámara ${selectedCamera})`} data={barChartData} />
        <LineChartCard title="Entradas mensuales (Cámaras 4 y 5)" data={lineChartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <PieChartCard title="Comex Puebla" data={pieData1} />
        <PieChartCard title="Comex CDMX" data={pieData2} />
        <PieChartCard title="Comex Veracruz" data={pieData3} />
        <PieChartCard title="Comex Guadalajara" data={pieData4} />
      </div>

      {/* Tabla */}
      <div className="pt-8">
        <Table />
      </div>
    </DashboardLayout>
  );
}
