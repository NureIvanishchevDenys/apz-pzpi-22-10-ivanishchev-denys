import React, { useEffect, useState } from 'react';

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

export default function DataManagement() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stations')
      .then(res => res.json())
      .then(data => setStations(data));
  }, []);

  const deleteStation = async (id: number) => {
    await fetch(`http://localhost:5000/api/stations/${id}`, { method: 'DELETE' });
    setStations(stations.filter(s => s.id !== id));
  };

  return (
    <div>
      <h2>Станції</h2>
      <ul>
        {stations.map(s => (
          <li key={s.id}>
            {s.name} ({s.lat}, {s.lng})
            <button onClick={() => deleteStation(s.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
