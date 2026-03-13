import DashboardLayout from "../(dashboard)/layout"
import { DRIVERS } from "@/lib/mock-data"
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
  MoreHorizontal
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DriversPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Driver Directory</h1>
            <p className="text-muted-foreground">Manage profiles, performance ratings, and active assignments.</p>
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
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-semibold">{driver.assignedVehicle || 'Unassigned'}</span>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" className="flex-1 h-8 gap-2">
                      <Mail className="h-3 w-3" /> Email
                   </Button>
                   <Button variant="outline" size="sm" className="flex-1 h-8 gap-2">
                      <Phone className="h-3 w-3" /> Call
                   </Button>
                </div>
                
                <div className="pt-2 flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                   <ShieldCheck className="h-3 w-3 text-accent" /> Eco-Certified Driver
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}