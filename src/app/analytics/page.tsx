"use client"

import { useState } from "react"
import DashboardLayout from "../(dashboard)/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, TrendingUp, Leaf, Star, ChevronRight } from "lucide-react"
import { genAISustainabilityReport, GenAISustainabilityReportOutput } from "@/ai/flows/gen-ai-sustainability-report-flow"

export default function AnalyticsPage() {
  const [report, setReport] = useState<GenAISustainabilityReportOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const generateReport = async () => {
    setLoading(true)
    try {
      const result = await genAISustainabilityReport({
        totalCO2Emissions: 12480,
        co2PerDelivery: 8.4,
        emissionTrend: "decreasing by 4.2%",
        evUsagePercentage: 45,
        fleetSize: 32,
        periodDescription: "Q1 2024",
        previousPeriodData: {
          totalCO2Emissions: 13200,
          co2PerDelivery: 9.1
        }
      })
      setReport(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sustainability Analytics</h1>
            <p className="text-muted-foreground">Track your environmental impact and generate ESG compliance reports.</p>
          </div>
          <Button className="gap-2" onClick={generateReport} disabled={loading}>
            {loading ? "Generating..." : <><FileText className="h-4 w-4" /> Generate ESG Report</>}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Emissions Over Time</CardTitle>
              <CardDescription>Monthly carbon performance (kg CO₂)</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground bg-muted/20 m-6 rounded-xl border border-dashed border-muted-foreground/30">
               [Monthly Performance Chart]
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Green Drivers</CardTitle>
              <CardDescription>Most efficient energy usage this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Alice Johnson', score: 98, ev: true },
                { name: 'Diana Prince', score: 95, ev: true },
                { name: 'Charlie Davis', score: 89, ev: false },
              ].map((driver, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{driver.name}</p>
                        <p className="text-[10px] text-muted-foreground">{driver.ev ? 'EV Specialist' : 'Hybrid Operator'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 text-accent font-bold">
                      <Star className="h-3 w-3 fill-current" />
                      {driver.score}
                   </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-primary h-8">View leaderboard <ChevronRight className="h-3 w-3" /></Button>
            </CardContent>
          </Card>
        </div>

        {report && (
          <Card className="border-primary/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-primary p-6 text-primary-foreground flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold">Fleet Sustainability Report</h2>
                  <p className="text-primary-foreground/70">Performance Summary: Q1 2024</p>
               </div>
               <Button variant="secondary" size="sm" className="gap-2">
                  <Download className="h-4 w-4" /> Export PDF
               </Button>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                 <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                       <TrendingUp className="h-5 w-5 text-accent" /> Key Insights
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{report.summary}</p>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                       <Leaf className="h-5 w-5 text-accent" /> Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                       {report.improvements.map((imp, i) => (
                         <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {imp}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {report.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-muted flex flex-col items-center text-center">
                     <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{metric.metricName}</span>
                     <span className="text-xl font-bold text-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}