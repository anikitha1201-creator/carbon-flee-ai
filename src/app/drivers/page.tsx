"use client"

import { useState } from "react"
import DashboardLayout from "../(dashboard)/layout"
import { DRIVERS, ORDERS, VEHICLES } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Search, 
  Star, 
  ShieldCheck, 
  Mail, 
  Phone,
  MoreHorizontal,
  Map as MapIcon,
  Route,
  Leaf
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import dynamic from "next/dynamic"
import { calculateCarbonEmission } from "@/lib/carbon-calculator"

const RouteMap = dynamic(() => import("@/components/simulation/route-map"), { ssr: false })

export default function DriversPage() {
  const [selectedDriver, setSelectedDriver] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Driver Directory</h1>
            <p className="text-muted-foreground">Manage profiles, performance ratings, and carbon efficiency.</p>
          </div>
          <Button className="gap-2">
            <Users className="h-4 w-4" /> Register Driver
          </Button>
        </div>

        <div className="flex items-center gap-4 bg-card p-4 rounded-xl border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search drivers by name or ID..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DRIVERS.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-all group border-t-4 border-t-accent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-4">
                   <Avatar className="h-12 w-12 border-2 border-accent/20">
                      <AvatarImage src={`https://picsum.photos/seed/${driver.id}/100/100`} />
                      <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                   <div>
                      <CardTitle className="text-base">{driver.name}</CardTitle>
                      <CardDescription className="text-xs">Driver ID: {driver.id}</CardDescription>
                   </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                   <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                   <Badge 
                    variant={driver.status === 'Active' ? 'default' : 'secondary'}
                    className={driver.status === 'Active' ? 'bg-accent text-white' : ''}
                   >
                     {driver.status}
                   </Badge>
                   <div className="flex items-center gap-1 text-sm font-bold">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {driver.rating}
                   </div>
                </div>

                <div className="space-y-2 py-4 border-y">
                   <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-semibold">{driver.experience}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Assigned Vehicle</span>
                      <span className="font-semibold">{VEHICLES.find(v => v.id === driver.assignedVehicle)?.model || 'Unassigned'}</span>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   {driver.activeRouteId ? (
                     <Button 
                      className="flex-1 h-8 gap-2 bg-primary" 
                      onClick={() => setSelectedDriver(driver)}
                     >
                        <Route className="h-3 w-3" /> View Route
                     </Button>
                   ) : (
                     <Button variant="outline" size="sm" className="flex-1 h-8 gap-2" disabled>
                        No active route
                     </Button>
                   )}
                </div>
                
                <div className="pt-2 flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                   <ShieldCheck className="h-3 w-3 text-accent" /> Eco-Certified Driver
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://picsum.photos/seed/${selectedDriver?.id}/100/100`} />
              </Avatar>
              Active Assignment: {selectedDriver?.name}
            </DialogTitle>
            <DialogDescription>
              Route details for order {selectedDriver?.activeRouteId}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 flex flex-col md:flex-row h-full">
             <div className="flex-1 min-h-[400px]">
                {selectedDriver && <RouteMap activeOrderId={selectedDriver.activeRouteId} />}
             </div>
             <div className="w-full md:w-72 bg-muted/20 p-6 border-l space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground">Vehicle Details</h4>
                  {selectedDriver && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Model</span>
                        <span className="font-medium">{VEHICLES.find(v => v.id === selectedDriver.assignedVehicle)?.model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Power Type</span>
                        <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                          {VEHICLES.find(v => v.id === selectedDriver.assignedVehicle)?.type}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground">Route Metrics</h4>
                  {selectedDriver && (
                    <div className="space-y-4">
                      <div className="p-3 bg-background rounded-lg border shadow-sm flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Leaf className="h-4 w-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Est. CO₂</p>
                            <p className="text-sm font-bold">
                              {(() => {
                                const order = ORDERS.find(o => o.id === selectedDriver.activeRouteId);
                                const v = VEHICLES.find(v => v.id === selectedDriver.assignedVehicle);
                                return calculateCarbonEmission(order?.distance || 0, v?.type as any || 'Diesel')
                              })()} kg
                            </p>
                         </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg border shadow-sm flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Route className="h-4 w-4" />
                         </div>
                         <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Distance</p>
                            <p className="text-sm font-bold">
                              {ORDERS.find(o => o.id === selectedDriver.activeRouteId)?.distance} km
                            </p>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
