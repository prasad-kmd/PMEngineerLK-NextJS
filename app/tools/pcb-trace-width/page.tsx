"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Cpu, ChevronLeft, Info, HelpCircle } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"

export default function PCBTraceWidth() {
    const [current, setCurrent] = useState<string>("1.0")
    const [thickness, setThickness] = useState<string>("35") // um (1 oz/ft2)
    const [tempRise, setTempRise] = useState<string>("10")
    const [ambientTemp, setAmbientTemp] = useState<string>("25")
    const [layer, setLayer] = useState<string>("external")

    const results = useMemo(() => {
        const I = parseFloat(current) || 0
        const T = parseFloat(thickness) * 0.03937 // convert um to mils (approx)
        const ΔT = parseFloat(tempRise) || 1

        if (I <= 0 || T <= 0 || ΔT <= 0) return null

        // IPC-2221 formula: I = k * ΔT^b * A^c
        // A = (I / (k * ΔT^b))^(1/c)
        // For external layers: k = 0.048, b = 0.44, c = 0.725
        // For internal layers: k = 0.024, b = 0.44, c = 0.725

        const k = layer === "external" ? 0.048 : 0.024
        const b = 0.44
        const c = 0.725

        const Area = Math.pow(I / (k * Math.pow(ΔT, b)), 1 / c) // sq mils
        const Width = Area / (parseFloat(thickness) / 25.4 * 0.7) // thickness in mils, approx copper weight factor

        return {
            area: Area.toFixed(2),
            widthMils: Width.toFixed(2),
            widthMm: (Width * 0.0254).toFixed(3)
        }
    }, [current, thickness, tempRise, layer])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Cpu className="h-8 w-8 text-emerald-500" />
                        PCB Trace Width Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate required PCB trace width for a given current capacity based on IPC-2221 standards.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Design Parameters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Current (Amps)</Label>
                                    <Input id="current" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="thickness">Copper Thickness (µm)</Label>
                                    <div className="flex gap-2">
                                        <Input id="thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} />
                                        <select
                                            className="bg-background border border-input rounded-md px-2 text-xs"
                                            onChange={(e) => setThickness(e.target.value)}
                                            value={thickness}
                                        >
                                            <option value="17.5">0.5 oz (17.5µm)</option>
                                            <option value="35">1.0 oz (35µm)</option>
                                            <option value="70">2.0 oz (70µm)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rise">Allowed Temperature Rise (°C)</Label>
                                    <Input id="rise" type="number" value={tempRise} onChange={(e) => setTempRise(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Layer Location</Label>
                                    <div className="flex gap-4 pt-1">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" checked={layer === "external"} onChange={() => setLayer("external")} className="accent-primary" />
                                            External Layer
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" checked={layer === "internal"} onChange={() => setLayer("internal")} className="accent-primary" />
                                            Internal Layer
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200">
                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                Calculations are based on the legacy IPC-2221 (formerly IPC-D-275) data for trace temperature rise.
                                For more modern designs, IPC-2152 is recommended but requires more complex modelling.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col justify-center">
                            <CardHeader>
                                <CardTitle className="text-lg">Required Trace Width</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8 text-center">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Metric</div>
                                    <div className="text-5xl font-bold text-emerald-500 tabular-nums">
                                        {results?.widthMm ? `${results.widthMm} mm` : "--"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Imperial</div>
                                    <div className="text-3xl font-bold text-muted-foreground tabular-nums">
                                        {results?.widthMils ? `${results.widthMils} mils` : "--"}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-border/50 grid grid-cols-1 gap-4 text-left">
                                    <div className="flex items-center justify-between text-xs p-3 bg-background/50 rounded-lg">
                                        <span className="text-muted-foreground font-semibold uppercase">Cross Section Area</span>
                                        <span className="font-mono">{results?.area || "--"} sq mils</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground italic px-2">
                                        <HelpCircle className="h-3 w-3" />
                                        Calculated for a single trace in isolation.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
