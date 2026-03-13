import DashboardLayout from "../(dashboard)/layout"
import { VEHICLES } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Battery, 
  Fuel, 
  Truck as TruckIcon,
  Activity
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function FleetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Fleet Management</h1>
            <p className="text-muted-foreground">Monitor vehicle health, assignments, and sustainability metrics.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Vehicle
          </Button>
        </div>

        <div className="flex items-center gap-4 bg-card p-4 rounded-xl border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search vehicles by ID, model, or driver..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Power Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VEHICLES.map((v) => (
                  <TableRow key={v.id} className="cursor-pointer hover:bg-muted/30">
                    <TableCell className="font-bold">{v.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {v.type === 'EV' ? <Battery className="h-4 w-4 text-accent" /> : <Fuel className="h-4 w-4 text-primary" />}
                        <span className="text-xs font-medium uppercase">{v.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{v.model}</TableCell>
                    <TableCell>{v.capacity.toLocaleString()} kg</TableCell>
                    <TableCell>
                      {v.batteryLevel ? (
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${v.batteryLevel > 30 ? 'bg-accent' : 'bg-destructive'}`} 
                                style={{ width: `${v.batteryLevel}%` }} 
                              />
                           </div>
                           <span className="text-xs font-semibold">{v.batteryLevel}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Internal Combustion</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={v.status === 'Active' ? 'default' : v.status === 'Charging' ? 'secondary' : 'outline'}
                        className={v.status === 'Active' ? 'bg-accent/10 text-accent hover:bg-accent/20 border-accent/20' : ''}
                      >
                        {v.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}