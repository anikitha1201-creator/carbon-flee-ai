"use client"

import DashboardLayout from "./(dashboard)/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Leaf, 
  DollarSign, 
  ArrowUpRight, 
  Zap,
  TrendingDown,
  Activity,
  PackageCheck,
  User,
  Route
} from "lucide-react"
import dynamic from "next/dynamic"

// Import Map dynamically to avoid SSR issues
const RouteMap = dynamic(() => import("@/components/simulation/route-map"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">Loading Map...</div>
})

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Fleet Overview</h1>
          <p className="text-muted-foreground">Real-time carbon and performance metrics for your delivery network.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved Today</CardTitle>
              <Leaf className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142.8 kg</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-accent flex items-center font-bold">
                  <ArrowUpRight className="h-3 w-3" /> +18%
                </span>
                optimized assignments
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">EV Utilization</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-primary flex items-center font-bold">
                  <Activity className="h-3 w-3" /> Peak usage
                </span>
                during low carbon grid
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders Optimized</CardTitle>
              <PackageCheck className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground mt-1">
                100% automated routing active
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-muted-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Cost Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,240</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-accent flex items-center font-bold">
                  <TrendingDown className="h-3 w-3" /> -12%
                </span>
                vs traditional routing
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-4 space-y-6">
            <Card className="overflow-hidden shadow-xl border-none">
              <CardHeader className="bg-muted/50 border-b">
                 <div className="flex items-center justify-between">
                    <div>
                       <CardTitle className="text-lg">Live Delivery Map</CardTitle>
                       <CardDescription>Real-time fleet tracking across Bangalore</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                       <Activity className="h-3 w-3 mr-1" /> Live
                    </Badge>
                 </div>
              </CardHeader>
              <CardContent className="p-0 h-[400px]">
                 <RouteMap activeOrderId="ord-101" />
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Active Assignment Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                         <User className="h-3 w-3" /> DRIVER
                      </p>
                      <p className="text-sm font-semibold">Arun Kumar</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                         <Truck className="h-3 w-3" /> VEHICLE
                      </p>
                      <p className="text-sm font-semibold">EV Delivery Van</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                         <Route className="h-3 w-3" /> DISTANCE
                      </p>
                      <p className="text-sm font-semibold">18 km</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] text-accent font-bold flex items-center gap-1">
                         <Leaf className="h-3 w-3" /> CO₂ SAVED
                      </p>
                      <p className="text-sm font-bold text-accent">3.85 kg</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-6">
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
               <div className="relative p-8 flex flex-col h-full justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1">System Optimization</Badge>
                    <h2 className="text-3xl font-bold mb-4 leading-tight">AI Route Intelligence</h2>
                    <p className="text-primary-foreground/80 text-base">
                      Automatically prioritizing EV vehicles during Solar Peaks.
                    </p>
                  </div>
                  <div className="mt-8 space-y-4">
                     <div className="flex items-center justify-between text-sm">
                        <span>Grid Intensity</span>
                        <span className="font-bold">45 gCO₂/kWh</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/4" />
                     </div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
                     <Zap className="h-32 w-32" />
                  </div>
               </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fleet Composition</CardTitle>
                <CardDescription>Target: 100% EV by 2026</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-accent" /> Electric (EV)</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-accent w-[45%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-primary" /> Diesel</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[35%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-orange-400" /> Hybrid</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-orange-400 w-[20%]" />
                  </div>
                </div>
                <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                   <span>Total: 32 Vehicles</span>
                   <span className="text-accent font-semibold underline cursor-pointer">Live availability map</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
