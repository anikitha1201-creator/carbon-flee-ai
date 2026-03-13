import DashboardLayout from "./(dashboard)/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Leaf, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  Zap,
  TrendingDown,
  Activity,
  PackageCheck
} from "lucide-react"

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
          <Card className="md:col-span-4 overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
             <div className="relative p-8 flex flex-col h-full justify-between">
                <div>
                  <Badge variant="secondary" className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1">System Optimization</Badge>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">AI Route Intelligence</h2>
                  <p className="text-primary-foreground/80 max-w-md text-lg">
                    Automatically prioritizing EV vehicles during Solar Peaks. Current Grid Intensity: <span className="font-bold text-white">45 gCO₂/kWh</span>.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">Run Daily Batch</Button>
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">Optimization Logs</Button>
                </div>
                <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
                   <Leaf className="h-48 w-48" />
                </div>
             </div>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Fleet Composition</CardTitle>
              <CardDescription>Targeting 100% EV by 2026</CardDescription>
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
    </DashboardLayout>
  )
}
