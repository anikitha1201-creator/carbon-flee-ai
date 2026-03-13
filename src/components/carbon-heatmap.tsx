
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// We need to import leaflet.heat only on the client
if (typeof window !== "undefined") {
  require("leaflet.heat");
}

interface CarbonHeatmapProps {
  data: [number, number, number][]; // [lat, lng, intensity]
}

export default function CarbonHeatmap({ data }: CarbonHeatmapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current).setView([12.9716, 77.5946], 11);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add heat layer if leaflet.heat is loaded
    if ((L as any).heatLayer) {
      (L as any).heatLayer(data, {
        radius: 35,
        blur: 15,
        maxZoom: 17,
        gradient: { 
          0.2: "blue", 
          0.4: "lime", 
          0.6: "yellow", 
          0.8: "orange", 
          1.0: "red" 
        },
      }).addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="h-[450px] w-full rounded-xl border shadow-inner z-0"
    />
  );
}
