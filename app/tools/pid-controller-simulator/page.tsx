"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LineChart, ChevronLeft, Settings2 } from "lucide-react"
import Link from "next/link"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js"
import { AIContentIndicator } from "@/components/ai-content-indicator"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
)

export default function PIDSimulator() {
    const [kp, setKp] = useState<string>("1.0")
    const [ki, setKi] = useState<string>("0.1")
    const [kd, setKd] = useState<string>("0.05")

    const simulationData = useMemo(() => {
        const P = parseFloat(kp) || 0
        const I = parseFloat(ki) || 0
        const D = parseFloat(kd) || 0

        const setpoint = 1.0
        let currentProcessValue = 0
        let integral = 0
        let lastError = setpoint - currentProcessValue

        const dt = 0.1
        const points = 100
        const result = []

        for (let t = 0; t < points; t++) {
            const error = setpoint - currentProcessValue
            integral += error * dt
            const derivative = (error - lastError) / dt

            const output = (P * error) + (I * integral) + (D * derivative)

            // Simple process model: first-order lag
            const processGain = 0.5
            const timeConstant = 1.0
            const change = (output * processGain - currentProcessValue) * (dt / timeConstant)
            currentProcessValue += change

            result.push(currentProcessValue)
            lastError = error
        }
        return result
    }, [kp, ki, kd])

    const chartData = {
        labels: Array.from({ length: 100 }, (_, i) => (i * 0.1).toFixed(1)),
        datasets: [
            {
                label: "Process Value",
                data: simulationData,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.4,
            },
            {
                label: "Setpoint",
                data: Array(100).fill(1.0),
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderDash: [5, 5],
                pointRadius: 0,
            }
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: { color: "rgba(255, 255, 255, 0.7)" }
            },
        },
        scales: {
            y: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "rgba(255, 255, 255, 0.5)" }
            },
            x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "rgba(255, 255, 255, 0.5)" }
            }
        }
    }

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-6xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <LineChart className="h-8 w-8 text-violet-500" />
                        PID Controller Simulator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Tune Proportional, Integral, and Derivative gains to see the step response of a system.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <Card className="lg:col-span-1 border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Settings2 className="h-5 w-5" />
                                Controller Gains
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="kp">Proportional (Kp)</Label>
                                <Input id="kp" type="number" step="0.1" value={kp} onChange={(e) => setKp(e.target.value)} />
                                <p className="text-[10px] text-muted-foreground italic">Affects rise time and overshoot.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ki">Integral (Ki)</Label>
                                <Input id="ki" type="number" step="0.01" value={ki} onChange={(e) => setKi(e.target.value)} />
                                <p className="text-[10px] text-muted-foreground italic">Eliminates steady-state error.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kd">Derivative (Kd)</Label>
                                <Input id="kd" type="number" step="0.01" value={kd} onChange={(e) => setKd(e.target.value)} />
                                <p className="text-[10px] text-muted-foreground italic">Reduces overshoot and improves stability.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 border-primary/20 bg-primary/5 h-[500px]">
                        <CardHeader>
                            <CardTitle className="text-lg">Step Response Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <Line data={chartData} options={options} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
