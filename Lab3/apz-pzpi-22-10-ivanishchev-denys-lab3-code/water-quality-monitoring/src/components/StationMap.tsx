import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

const stationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.0 });
  }, [lat, lng, map]);
  return null;
}

function StationMap(props: {
  stations: Station[];
  selectedStationId?: number | null;
  onSelectStation?: (station: Station) => void;
}) {
  const { stations, selectedStationId, onSelectStation } = props;

  const firstValidStation = stations.find(
    s => typeof s.lat === 'number' && typeof s.lng === 'number'
  );

  if (!firstValidStation) {
    return (
      <section style={{ padding: 20 }}>
        <h2>Карта со станциями</h2>
        <div style={{ color: '#999' }}>Нет станций с координатами</div>
      </section>
    );
  }

  return (
    <section style={{ padding: 20 }}>
      <h2>Карта со станциями</h2>
      <MapContainer
        center={[firstValidStation.lat, firstValidStation.lng]}
        zoom={10}
        style={{ height: 400, width: '100%', borderRadius: 8 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedStationId && (
          <MapFlyTo
            lat={stations.find(s => s.id === selectedStationId)?.lat ?? firstValidStation.lat}
            lng={stations.find(s => s.id === selectedStationId)?.lng ?? firstValidStation.lng}
          />
        )}
        {stations.map(station => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={station.id === selectedStationId ? selectedIcon : stationIcon}
            eventHandlers={{
              click: () => {
                if (onSelectStation) onSelectStation(station);
              },
            }}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default StationMap;
