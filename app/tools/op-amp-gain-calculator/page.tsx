"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Activity, ChevronLeft, Info } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIContentIndicator } from "@/components/ai-content-indicator"

export default function OpAmpCalculator() {
    const [mode, setMode] = useState<string>("non-inverting")
    const [r1, setR1] = useState<string>("10") // kOhm
    const [rf, setRf] = useState<string>("100") // kOhm
    const [vIn, setVin] = useState<string>("1.0")

    const results = useMemo(() => {
        const R1 = parseFloat(r1) || 1
        const Rf = parseFloat(rf) || 0
        const Vi = parseFloat(vIn) || 0

        if (R1 <= 0) return null

        let gain = 0
        if (mode === "non-inverting") {
            gain = 1 + (Rf / R1)
        } else {
            gain = -(Rf / R1)
        }

        return {
            gain: gain.toFixed(2),
            vOut: (Vi * gain).toFixed(2),
            formula: mode === "non-inverting" ? "Av = 1 + (Rf / R1)" : "Av = -(Rf / R1)"
        }
    }, [mode, r1, rf, vIn])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Activity className="h-8 w-8 text-red-500" />
                        Op-Amp Gain Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate gain and output voltage for standard operational amplifier configurations.
                    </p>
                </div>

                <Tabs value={mode} onValueChange={setMode} className="w-full space-y-8">
                    <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                        <TabsTrigger value="non-inverting">Non-Inverting</TabsTrigger>
                        <TabsTrigger value="inverting">Inverting</TabsTrigger>
                    </TabsList>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">Resistor Values (kΩ)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="rf">Feedback Resistor (Rf)</Label>
                                        <Input id="rf" type="number" value={rf} onChange={(e) => setRf(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="r1">Input Resistor (R1)</Label>
                                        <Input id="r1" type="number" value={r1} onChange={(e) => setR1(e.target.value)} />
                                    </div>
                                    <div className="pt-4 border-t border-border/50 space-y-2">
                                        <Label htmlFor="vin">Input Voltage (V)</Label>
                                        <Input id="vin" type="number" value={vIn} onChange={(e) => setVin(e.target.value)} />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-xl border border-border bg-card/50 flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground mb-4">Configuration Diagram</span>
                                <svg width="200" height="120" viewBox="0 0 200 120" className="text-foreground">
                                    <path d="M40,60 L80,60 L80,20 L120,60 L80,100 L80,60" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <text x="85" y="55" className="text-[10px] fill-current">-</text>
                                    <text x="85" y="75" className="text-[10px] fill-current">+</text>
                                    <path d="M120,60 L160,60" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="160" cy="60" r="3" fill="currentColor" />
                                </svg>
                                <p className="text-[10px] text-muted-foreground italic mt-2 text-center">Ideal Op-Amp Model</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-primary/20 bg-primary/5 h-full flex flex-col items-center justify-center p-8">
                                <div className="text-center space-y-8">
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Voltage Gain (Av)</div>
                                        <div className="text-6xl font-bold text-red-500 tabular-nums">
                                            {results?.gain || "--"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Output Voltage (Vout)</div>
                                        <div className="text-4xl font-bold text-foreground tabular-nums">
                                            {results?.vOut || "--"} V
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-border/50">
                                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono bg-background/50 py-2 px-4 rounded-full border border-border/50">
                                            {results?.formula}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Tabs>
            </div>
            <AIContentIndicator />
        </div>
    )
}
