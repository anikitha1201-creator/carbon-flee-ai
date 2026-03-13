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
const FleetLiveMap = dynamic(() => import("@/components/fleet-live-map"), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-muted animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">Initializing Live Fleet Map...</div>
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

        <div className="space-y-6">
          <Card className="overflow-hidden shadow-xl border-none">
            <CardHeader className="bg-muted/50 border-b">
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className="text-lg">Live Fleet Monitoring</CardTitle>
                     <CardDescription>Real-time vehicle tracking across the network</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                     <Activity className="h-3 w-3 mr-1" /> System Active
                  </Badge>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <FleetLiveMap />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Active Vehicles</p>
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 text-3xl font-bold">12</div>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Currently in route</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">EV Vehicles</p>
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <div className="mt-2 text-3xl font-bold text-accent">5</div>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">85% efficiency avg.</p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:bg-muted/10 transition-colors border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">CO₂ Saved (Today)</p>
                  <Leaf className="h-4 w-4 text-accent" />
                </div>
                <div className="mt-2 text-3xl font-bold text-accent">28 kg</div>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Since 08:00 AM IST</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}