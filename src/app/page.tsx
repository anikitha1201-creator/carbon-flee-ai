"use client"

import DashboardLayout from "./(dashboard)/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  Leaf, 
  DollarSign, 
  ArrowUpRight, 
  Zap,
  TrendingDown,
  Activity,
  PackageCheck,
} from "lucide-react"
import dynamic from "next/dynamic"
import { ORDERS, VEHICLES } from "@/lib/mock-data"
import { calculateCarbonEmission, calculateFuelCost } from "@/lib/carbon-engine"

const FleetLiveMap = dynamic(() => import("@/components/fleet-live-map"), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-muted animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">Initializing Fleet Live Tracking...</div>
})

export default function HomePage() {
  // Dynamic KPI Calculations
  const activeVehicles = VEHICLES.filter(v => v.status === 'Active').length;
  const evVehicles = VEHICLES.filter(v => v.type === 'EV').length;
  const evUtilization = Math.round((evVehicles / VEHICLES.length) * 100);
  
  // Simulated Daily Savings
  const co2SavedToday = 28.4; // kg
  const fuelCostSaved = 450; // Currency units
  const ordersOptimized = ORDERS.length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Operational Overview</h1>
          <p className="text-muted-foreground">Real-time carbon performance and fleet utilization metrics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-accent bg-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] uppercase font-bold tracking-wider">CO₂ Saved Today</CardTitle>
              <Leaf className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{co2SavedToday} kg</div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-bold">
                <span className="text-accent flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> +18.4%
                </span>
                Efficiency Gain
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-primary bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] uppercase font-bold tracking-wider">EV Utilization</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{evUtilization}%</div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-bold">
                <span className="text-primary flex items-center">
                  <Activity className="h-3 w-3" /> Active
                </span>
                Grid Optimized
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] uppercase font-bold tracking-wider">Orders Optimized</CardTitle>
              <PackageCheck className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{ordersOptimized}</div>
              <p className="text-[10px] text-muted-foreground mt-1 font-bold">
                100% Automation Status
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-default border-l-4 border-l-orange-500 bg-orange-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] uppercase font-bold tracking-wider">Fuel Cost Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">₹{fuelCostSaved}</div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-bold">
                <span className="text-accent flex items-center">
                  <TrendingDown className="h-3 w-3" /> -12%
                </span>
                OpEx Reduction
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden shadow-2xl border-none">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-lg">Fleet Live Telemetry</CardTitle>
                  <CardDescription>Real-time asset positioning across distribution centers</CardDescription>
               </div>
               <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 animate-pulse font-bold">
                  <Activity className="h-3 w-3 mr-1" /> Live
               </Badge>
            </CardHeader>
            <CardContent className="p-0">
               <FleetLiveMap />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Active Fleet</p>
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-2 text-4xl font-black">{activeVehicles}</div>
                <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase italic opacity-60">Deployment phase</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Electric Units</p>
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-2 text-4xl font-black text-accent">{evVehicles}</div>
                <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase italic opacity-60">85% efficiency avg.</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Session CO₂ Saved</p>
                  <Leaf className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-2 text-4xl font-black text-accent">{co2SavedToday} kg</div>
                <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase italic opacity-60">Since system boot</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
