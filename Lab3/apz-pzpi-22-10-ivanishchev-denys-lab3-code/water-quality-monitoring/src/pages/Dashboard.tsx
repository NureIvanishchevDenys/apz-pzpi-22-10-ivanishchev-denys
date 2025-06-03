import React, { useEffect, useState } from 'react';
import StationMap from '../components/StationMap';

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Measurement = {
  id: number;
  parameter: string;
  value: number;
  date: string;
};

export default function StationDetailsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await fetch('http://localhost:5000/api/stations');
        if (!res.ok) throw new Error('Ошибка загрузки станций');
        const data = await res.json();
        const formatted = data.map((s: any) => ({
          id: s.station_id,
          name: s.name,
          lat: s.latitude,
          lng: s.longitude,
        }));
        setStations(formatted);
        if (formatted.length > 0) {
          setSelectedStation(formatted[0]);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  useEffect(() => {
    if (!selectedStation) return;
  
    const stationId = selectedStation.id;
  
    async function fetchMeasurements() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/measurements?station_id=${stationId}`);
        if (!res.ok) throw new Error('Ошибка загрузки замеров');
        const data = await res.json();
  
        const measurementsFormatted = data.map((m: any) => ({
          id: m.measurement_id,
          parameter: m.parameter_name || `Параметр ${m.parameter_id}`,
          value: m.value,
          date: m.measured_at.split('T')[0],
        }));
        setMeasurements(measurementsFormatted);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchMeasurements();
  }, [selectedStation]);
  

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '40%', position: 'relative' }}>
        <StationMap
          stations={stations}
          selectedStationId={selectedStation?.id ?? null}
          onSelectStation={setSelectedStation}
        />
      </div>

      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <h2>Станция: {selectedStation?.name || 'Не выбрана'}</h2>
        {selectedStation ? (
          measurements.length === 0 ? (
            <p>Нет замеров для этой станции.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Параметр</th>
                  <th>Значение</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map(m => (
                  <tr key={m.id}>
                    <td>{m.parameter}</td>
                    <td>{m.value}</td>
                    <td>{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p>Выберите станцию на карте</p>
        )}
      </div>
    </div>
  );
}
