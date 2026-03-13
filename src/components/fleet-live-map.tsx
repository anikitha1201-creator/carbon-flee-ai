"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";

const initialVehicles = [
  {
    id: "EV1",
    driver: "Arun Kumar",
    type: "EV",
    position: [12.9698, 77.7499], // Whitefield
  },
  {
    id: "EV2",
    driver: "Rahul Sharma",
    type: "EV",
    position: [12.9279, 77.6271], // Indiranagar
  },
  {
    id: "D1",
    driver: "Manoj Singh",
    type: "Diesel",
    position: [12.9141, 77.6387], // Silk Board
  },
];

const routes = [
  [
    [12.9698, 77.7499],
    [12.9352, 77.6245],
  ], // Whitefield → Koramangala
  [
    [12.8456, 77.6603],
    [12.9756, 77.6058],
  ], // Electronic City → MG Road
];

// Fix marker icons
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export default function FleetLiveMap() {
  const [vehicles, setVehicles] = useState(initialVehicles);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          position: [
            v.position[0] + (Math.random() - 0.5) * 0.001,
            v.position[1] + (Math.random() - 0.5) * 0.001,
          ] as [number, number],
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[450px] w-full rounded-xl overflow-hidden border shadow-inner">
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Vehicles */}
        {vehicles.map((vehicle) => (
          <Marker key={vehicle.id} position={vehicle.position}>
            <Popup>
              <div className="text-xs">
                <p className="font-bold text-primary">{vehicle.id}</p>
                <p>Driver: {vehicle.driver}</p>
                <p className={`font-semibold ${vehicle.type === 'EV' ? 'text-accent' : 'text-destructive'}`}>
                  Type: {vehicle.type}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 italic text-center">Live Tracking Active</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Routes */}
        {routes.map((route, index) => (
          <Polyline
            key={index}
            positions={route as [number, number][]}
            color={index === 0 ? "hsl(var(--accent))" : "hsl(var(--primary))"}
            weight={3}
            opacity={0.6}
            dashArray="5, 10"
          />
        ))}
      </MapContainer>
    </div>
  );
}