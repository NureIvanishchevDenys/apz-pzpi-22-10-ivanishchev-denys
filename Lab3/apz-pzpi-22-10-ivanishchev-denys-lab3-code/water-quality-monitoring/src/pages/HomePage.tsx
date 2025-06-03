import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StationMap from '../components/StationMap'

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Measurement = {
  id: number;
  stationId: number;
  parameter: string;
  value: number;
  date: string;
};

function Header(props: { onLoginClick: () => void; onRegisterClick: () => void }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <button onClick={props.onLoginClick} style={{ marginRight: 10 }}>Вход</button>
      <button onClick={props.onRegisterClick}>Регистрация</button>
    </header>
  );
}

function LatestMeasurements(props: { measurements: Measurement[]; stations: Station[] }) {
  const enriched = props.measurements.map(m => {
    const station = props.stations.find(s => s.id === m.stationId);
    return { ...m, stationName: station ? station.name : 'Неизвестная станция' };
  });

  return (
    <section style={{ padding: 20 }}>
      <h2>Последние замеры станций</h2>
      <table border={1} cellPadding={5} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Станция</th>
            <th>Параметр</th>
            <th>Значение</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {enriched.map(m => (
            <tr key={m.id}>
              <td>{m.stationName}</td>
              <td>{m.parameter}</td>
              <td>{m.value}</td>
              <td>{m.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}



export default function HomePage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [stationsRes, measurementsRes, parametersRes] = await Promise.all([
          fetch('http://localhost:5000/api/stations'),
          fetch('http://localhost:5000/api/measurements'),
          fetch('http://localhost:5000/api/parameters'),
        ]);
  
        if (!stationsRes.ok || !measurementsRes.ok || !parametersRes.ok) {
          throw new Error('Ошибка загрузки данных с сервера');
        }
  
        const stationsRaw = await stationsRes.json();
        const measurementsRaw = await measurementsRes.json();
        const parametersRaw = await parametersRes.json();
  
        const parameterMap = new Map<number, string>();
        parametersRaw.forEach((p: any) => {
          parameterMap.set(p.parameter_id, p.name);
        });
  
        const stationsData: Station[] = stationsRaw.map((s: any) => ({
          id: s.station_id,
          name: s.name,
          lat: s.latitude,
          lng: s.longitude,
        }));
  
        const measurementsData: Measurement[] = measurementsRaw.map((m: any) => ({
          id: m.measurement_id,
          stationId: m.station_id,
          parameter: parameterMap.get(m.parameter_id) || 'Неизвестный параметр',
          value: m.value,
          date: m.measured_at.split('T')[0],
        }));
  
        setStations(stationsData);
        setMeasurements(measurementsData);
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Неизвестная ошибка');
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <button onClick={() => navigate('/login')} style={{ marginRight: 10 }}>
          Вход
        </button>
        <button onClick={() => navigate('/register')}>
          Регистрация
        </button>
      </header>

      <LatestMeasurements measurements={measurements} stations={stations} />
      <StationMap stations={stations} />
      
    </>
  );
}
