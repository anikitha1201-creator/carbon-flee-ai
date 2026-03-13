
"use client"

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

const whitefield: [number, number] = [12.9698, 77.7499]
const koramangala: [number, number] = [12.9352, 77.6245]

export default function RouteMap() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    fixLeafletIcons()
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div className="h-full w-full bg-muted animate-pulse rounded-xl" />

  return (
    <div className="h-full w-full relative group">
      <MapContainer 
        center={[12.9525, 77.6872]} 
        zoom={12} 
        scrollWheelZoom={false}
        className="rounded-xl shadow-inner border border-muted"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={whitefield}>
          <Popup>
            <div className="text-xs">
              <p className="font-bold">Whitefield Hub</p>
              <p className="text-muted-foreground">Pickup Location</p>
            </div>
          </Popup>
        </Marker>
        <Marker position={koramangala}>
          <Popup>
             <div className="text-xs">
              <p className="font-bold">Koramangala Station</p>
              <p className="text-muted-foreground">Drop-off Destination</p>
            </div>
          </Popup>
        </Marker>
        <Polyline 
          positions={[whitefield, koramangala]} 
          color="hsl(var(--primary))" 
          weight={4} 
          opacity={0.7}
          dashArray="10, 10"
        />
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/95 backdrop-blur-sm p-4 rounded-xl border shadow-xl flex flex-col gap-3 min-w-[180px]">
         <div className="flex items-center justify-between border-b pb-2">
            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Whitefield → Koramangala</span>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
               <p className="text-[10px] text-muted-foreground">Distance</p>
               <p className="text-sm font-bold">14.2 km</p>
            </div>
            <div>
               <p className="text-[10px] text-muted-foreground">ETA</p>
               <p className="text-sm font-bold">42 mins</p>
            </div>
            <div>
               <p className="text-[10px] text-muted-foreground text-accent">CO₂ Saved</p>
               <p className="text-sm font-bold text-accent">8.4 kg</p>
            </div>
            <div>
               <p className="text-[10px] text-muted-foreground">Route</p>
               <p className="text-sm font-bold">Optimized</p>
            </div>
         </div>
      </div>
    </div>
  )
}
