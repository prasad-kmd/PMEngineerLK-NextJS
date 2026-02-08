"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Settings, ChevronLeft, Info, Search } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"

interface ToleranceData {
    range: number[]
    upper: number
    lower: number
}

// Simplified ISO 286-2 Data (H7/g6 common examples)
const DATA: Record<string, ToleranceData[]> = {
    H7: [
        { range: [0, 3], upper: 10, lower: 0 },
        { range: [3, 6], upper: 12, lower: 0 },
        { range: [6, 10], upper: 15, lower: 0 },
        { range: [10, 18], upper: 18, lower: 0 },
        { range: [18, 30], upper: 21, lower: 0 },
        { range: [30, 50], upper: 25, lower: 0 }
    ],
    g6: [
        { range: [0, 3], upper: -2, lower: -8 },
        { range: [3, 6], upper: -4, lower: -12 },
        { range: [6, 10], upper: -5, lower: -14 },
        { range: [10, 18], upper: -6, lower: -17 },
        { range: [18, 30], upper: -7, lower: -20 },
        { range: [30, 50], upper: -9, lower: -25 }
    ]
}

export default function ISOFitsCalculator() {
    const [diameter, setDiameter] = useState<string>("20")
    const [holeClass, setHoleClass] = useState<string>("H7")
    const [shaftClass, setShaftClass] = useState<string>("g6")

    const result = useMemo(() => {
        const d = parseFloat(diameter)
        if (isNaN(d) || d <= 0 || d > 50) return null

        const findLimit = (cls: string, val: number) => {
            return DATA[cls]?.find((r: ToleranceData) => val > r.range[0] && val <= r.range[1])
        }

        const hLimit = findLimit(holeClass, d)
        const sLimit = findLimit(shaftClass, d)

        if (!hLimit || !sLimit) return null

        const holeMax = d + (hLimit.upper / 1000)
        const holeMin = d + (hLimit.lower / 1000)
        const shaftMax = d + (sLimit.upper / 1000)
        const shaftMin = d + (sLimit.lower / 1000)

        const maxClearance = (holeMax - shaftMin) * 1000
        const minClearance = (holeMin - shaftMax) * 1000

        return {
            hole: { max: holeMax.toFixed(3), min: holeMin.toFixed(3), dev: hLimit },
            shaft: { max: shaftMax.toFixed(3), min: shaftMin.toFixed(3), dev: sLimit },
            clearance: { max: maxClearance.toFixed(1), min: minClearance.toFixed(1) }
        }
    }, [diameter, holeClass, shaftClass])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Settings className="h-8 w-8 text-slate-500" />
                        ISO Fits & Tolerances
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate limits and fits for shaft/hole systems based on ISO 286 standards.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Dimensions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dia">Nominal Diameter (mm)</Label>
                                    <Input id="dia" type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} max="50" />
                                    <p className="text-[10px] text-muted-foreground italic">Max 50mm in this demo.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hole">Hole Class</Label>
                                    <select id="hole" className="w-full bg-background border border-input rounded-md h-10 px-3 text-sm" value={holeClass} onChange={(e) => setHoleClass(e.target.value)}>
                                        <option value="H7">H7 (Common)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shaft">Shaft Class</Label>
                                    <select id="shaft" className="w-full bg-background border border-input rounded-md h-10 px-3 text-sm" value={shaftClass} onChange={(e) => setShaftClass(e.target.value)}>
                                        <option value="g6">g6 (Clearance Fit)</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Calculated Limits (µm)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">Hole (mm)</h3>
                                        <div className="text-3xl font-bold tabular-nums">{result?.hole.min}</div>
                                        <div className="text-sm text-muted-foreground">Limit: +{result?.hole.dev.upper} / +{result?.hole.dev.lower} µm</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500">Shaft (mm)</h3>
                                        <div className="text-3xl font-bold tabular-nums">{result?.shaft.max}</div>
                                        <div className="text-sm text-muted-foreground">Limit: {result?.shaft.dev.upper} / {result?.shaft.dev.lower} µm</div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-border/50">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Fit Analysis</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                                            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Max Clearance</div>
                                            <div className="text-xl font-semibold tabular-nums text-primary">{result?.clearance.max} µm</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                                            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Min Clearance</div>
                                            <div className="text-xl font-semibold tabular-nums text-primary">{result?.clearance.min} µm</div>
                                        </div>
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
