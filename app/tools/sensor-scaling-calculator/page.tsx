"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Ruler, ChevronLeft, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"

export default function SensorScaling() {
    const [inMin, setInMin] = useState<string>("0")
    const [inMax, setInMax] = useState<string>("5")
    const [outMin, setOutMin] = useState<string>("0")
    const [outMax, setOutMax] = useState<string>("100")
    const [currentIn, setCurrentIn] = useState<string>("2.5")

    const result = useMemo(() => {
        const iMin = parseFloat(inMin)
        const iMax = parseFloat(inMax)
        const oMin = parseFloat(outMin)
        const oMax = parseFloat(outMax)
        const val = parseFloat(currentIn)

        if (iMax === iMin) return null

        // Linear scaling: y = (x - x1) * (y2 - y1) / (x2 - x1) + y1
        const scaled = (val - iMin) * (oMax - oMin) / (iMax - iMin) + oMin

        return scaled.toFixed(2)
    }, [inMin, inMax, outMin, outMax, currentIn])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Ruler className="h-8 w-8 text-lime-500" />
                        Sensor Scaling Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Convert analog voltage or current signals to engineering units.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Input Range (e.g. 0-5V)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="imin">Min Input</Label>
                                    <Input id="imin" type="number" value={inMin} onChange={(e) => setInMin(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imax">Max Input</Label>
                                    <Input id="imax" type="number" value={inMax} onChange={(e) => setInMax(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Output Range (e.g. 0-100°C)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="omin">Min Output</Label>
                                    <Input id="omin" type="number" value={outMin} onChange={(e) => setOutMin(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="omax">Max Output</Label>
                                    <Input id="omax" type="number" value={outMax} onChange={(e) => setOutMax(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-lime-500/10 border border-lime-500/20 text-[11px] text-lime-200">
                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                Uses linear interpolation to map the input value to the output range.
                                Common for mapping PLC analog inputs (4-20mA, 0-10V) to physical values.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col justify-center p-8">
                            <div className="text-center space-y-12">
                                <div className="space-y-4">
                                    <Label htmlFor="val" className="text-sm uppercase tracking-widest font-bold text-muted-foreground">Current Signal Value</Label>
                                    <Input id="val" type="number" value={currentIn} onChange={(e) => setCurrentIn(e.target.value)} className="text-center text-2xl h-16" />
                                </div>

                                <div className="flex justify-center">
                                    <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 lg:rotate-0" />
                                </div>

                                <div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Scaled Output</div>
                                    <div className="text-6xl font-bold text-lime-500 tabular-nums">
                                        {result || "--"}
                                    </div>
                                    <div className="mt-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Engineering Units</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
