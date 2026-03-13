"use client"

import { useState } from "react"
import DashboardLayout from "../(dashboard)/layout"
import { ORDERS, VEHICLES } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Search, 
  Filter, 
  MapPin,
  Clock,
  ChevronRight,
  Route,
  Leaf,
  Zap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { calculateCarbonEmission } from "@/lib/carbon-calculator"
import { optimizeVehicleAssignment } from "@/lib/optimizer"
import { getCurrentGridIntensity } from "@/lib/grid-carbon"
import { genAIRouteExplanation } from "@/ai/flows/gen-ai-route-explanation-flow"
import { useToast } from "@/hooks/use-toast"

export default function OrdersPage() {
  const { toast } = useToast()
  const [optimizingId, setOptimizingId] = useState<string | null>(null)
  const [explanations, setExplanations] = useState<Record<string, string>>({})

  const handleOptimize = async (order: any) => {
    setOptimizingId(order.id)
    try {
      const gridIntensity = getCurrentGridIntensity('Solar Peak')
      const vehicles = VEHICLES.map(v => ({ id: v.id, type: v.type as any, capacity: v.capacity, status: v.status }))
      const bestVehicle = optimizeVehicleAssignment(order, vehicles, gridIntensity)
      
      if (!bestVehicle) {
        toast({ variant: "destructive", title: "Optimization Failed", description: "No suitable vehicles found for this order capacity." })
        return
      }

      const fullVehicle = VEHICLES.find(v => v.id === bestVehicle.id)
      
      const explanation = await genAIRouteExplanation({
        chosenRoute: {
          id: 'optimized-path',
          emissionsCo2: calculateCarbonEmission(order.distance, bestVehicle.type),
          cost: order.distance * 12, // simplified cost
          deliveryTime: order.distance * 3, // simplified time
          pathDescription: `${order.pickup} to ${order.dropoff} via main hub`
        },
        alternativeRoutes: [],
        vehicleDetails: {
          type: bestVehicle.type as any,
          capacity: bestVehicle.capacity,
          fuelConsumption: fullVehicle?.fuelConsumption
        },
        orderDetails: {
          weight: order.weight,
          pickupLocation: order.pickup,
          dropoffLocation: order.dropoff,
          deliveryDeadline: order.deadline
        },
        carbonIntensityContext: {
          liveCarbonIntensity: gridIntensity * 1000, // gCO2/kWh
          gridType: 'Solar Peak'
        }
      })

      setExplanations(prev => ({ ...prev, [order.id]: explanation.explanation }))
      toast({ title: "Optimized Successfully", description: `Assigned to ${fullVehicle?.model} (${bestVehicle.type})` })
    } catch (error) {
      console.error(error)
    } finally {
      setOptimizingId(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Order Queue</h1>
            <p className="text-muted-foreground">Manage incoming delivery requests and track carbon-aware status.</p>
          </div>
          <Button className="gap-2">
            <Package className="h-4 w-4" /> New Order
          </Button>
        </div>

        <div className="flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders by ID or customer..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="grid gap-4">
          {ORDERS.map((order) => {
            const dieselEmissions = calculateCarbonEmission(order.distance, 'Diesel')
            const evEmissions = calculateCarbonEmission(order.distance, 'EV')
            const savings = ((dieselEmissions - evEmissions) / dieselEmissions * 100).toFixed(0)

            return (
              <div key={order.id} className="space-y-2">
                <Card className="hover:shadow-md transition-all group overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="p-6 flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">{order.id}</span>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{order.customer}</Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-[10px] text-accent font-bold">
                               <Leaf className="h-3 w-3" /> {savings}% potential CO₂ reduction
                            </div>
                            <Badge 
                              variant={order.priority === 'Critical' ? 'destructive' : order.priority === 'High' ? 'default' : 'secondary'}
                              className="rounded-sm"
                            >
                              {order.priority} Priority
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="flex items-start gap-3">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground">Route ({order.distance} km)</p>
                                <p className="text-xs font-medium">{order.pickup} <ChevronRight className="inline h-3 w-3" /> {order.dropoff}</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-3">
                              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground">Deadline</p>
                                <p className="text-xs font-medium">{order.deadline}</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="h-4 w-4 flex items-center justify-center text-muted-foreground mt-0.5 font-bold text-[10px]">KG</div>
                              <div>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground">Weight</p>
                                <p className="text-xs font-medium">{order.weight} kg</p>
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="w-full md:w-auto p-6 md:border-l bg-muted/10 flex flex-col gap-2 min-w-[200px] justify-center">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">Status</span>
                            <Badge className="bg-orange-500 hover:bg-orange-600">{order.status}</Badge>
                         </div>
                         <Button 
                          size="sm" 
                          className="w-full gap-2" 
                          disabled={optimizingId === order.id}
                          onClick={() => handleOptimize(order)}
                        >
                            {optimizingId === order.id ? <Zap className="h-4 w-4 animate-spin" /> : <Route className="h-4 w-4" />}
                            Assign & Optimize
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {explanations[order.id] && (
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      <Zap className="h-3 w-3 inline mr-2 text-accent" />
                      {explanations[order.id]}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
