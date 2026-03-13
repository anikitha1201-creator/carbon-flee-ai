
"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Fuel, Clock } from "lucide-react";

// Marker fix for Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

const dieselRoute = [
  [12.9698, 77.7499], // Whitefield
  [12.955, 77.69],
  [12.9352, 77.6245], // Koramangala
];

const greenRoute = [
  [12.9698, 77.7499],
  [12.96, 77.70],
  [12.9352, 77.6245],
];

export default function RouteComparison() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Diesel Route */}
      <Card className="overflow-hidden border-destructive/20 shadow-lg">
        <div className="bg-destructive/10 p-4 border-b border-destructive/20 flex items-center justify-between">
          <h3 className="font-bold text-destructive flex items-center gap-2">
            <Fuel className="h-4 w-4" /> Traditional Route (Diesel)
          </h3>
          <Badge variant="outline" className="text-destructive border-destructive/20 uppercase text-[10px]">Baseline</Badge>
        </div>
        <CardContent className="p-0">
          <div className="h-[300px] w-full">
            <MapContainer
              center={[12.9525, 77.6872] as any}
              zoom={12}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={dieselRoute as any} color="#ef4444" weight={5} opacity={0.7} />
              <Marker position={dieselRoute[0] as any}>
                <Popup>Pickup: Whitefield</Popup>
              </Marker>
              <Marker position={dieselRoute[2] as any}>
                <Popup>Dropoff: Koramangala</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="p-6 grid grid-cols-3 gap-4 border-t bg-muted/20">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">CO₂ Emissions</p>
              <p className="text-lg font-black text-foreground">4.5 kg</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Fuel Cost</p>
              <p className="text-lg font-black text-foreground">₹213</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Est. Time</p>
              <p className="text-lg font-black text-foreground">45 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Green Route */}
      <Card className="overflow-hidden border-accent/20 shadow-lg">
        <div className="bg-accent/10 p-4 border-b border-accent/20 flex items-center justify-between">
          <h3 className="font-bold text-accent flex items-center gap-2">
            <Leaf className="h-4 w-4" /> CAFS Optimized Route (EV)
          </h3>
          <Badge variant="outline" className="bg-accent text-accent-foreground uppercase text-[10px] border-none font-black px-3 animate-pulse">
            Optimized
          </Badge>
        </div>
        <CardContent className="p-0">
          <div className="h-[300px] w-full">
            <MapContainer
              center={[12.9525, 77.6872] as any}
              zoom={12}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={greenRoute as any} color="#10b981" weight={5} opacity={0.7} />
              <Marker position={greenRoute[0] as any}>
                <Popup>Pickup: Whitefield</Popup>
              </Marker>
              <Marker position={greenRoute[2] as any}>
                <Popup>Dropoff: Koramangala</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="p-6 grid grid-cols-3 gap-4 border-t bg-accent/5">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-accent">CO₂ Emissions</p>
              <p className="text-lg font-black text-foreground">2.79 kg</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-accent">Fuel Cost</p>
              <p className="text-lg font-black text-foreground">₹166</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-accent">Est. Time</p>
              <p className="text-lg font-black text-foreground">35 min</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
