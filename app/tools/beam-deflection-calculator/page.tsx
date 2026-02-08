"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Waypoints, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"
import { cn } from "@/lib/utils"

export default function BeamCalculator() {
    const [type, setType] = useState<string>("cantilever")
    const [force, setForce] = useState<string>("100") // N
    const [length, setLength] = useState<string>("1000") // mm
    const [modulus, setModulus] = useState<string>("210") // GPa (Steel)
    const [inertia, setInertia] = useState<string>("10000") // mm^4

    const result = useMemo(() => {
        const P = parseFloat(force) || 0
        const L = parseFloat(length) || 0
        const E = (parseFloat(modulus) || 0) * 1000 // Convert GPa to N/mm^2
        const I = parseFloat(inertia) || 0

        if (P <= 0 || L <= 0 || E <= 0 || I <= 0) return null

        let maxDeflection = 0
        if (type === "cantilever") {
            // δ = (P * L^3) / (3 * E * I)
            maxDeflection = (P * Math.pow(L, 3)) / (3 * E * I)
        } else {
            // δ = (P * L^3) / (48 * E * I)
            maxDeflection = (P * Math.pow(L, 3)) / (48 * E * I)
        }

        return {
            deflection: maxDeflection.toFixed(3)
        }
    }, [type, force, length, modulus, inertia])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Waypoints className="h-8 w-8 text-indigo-500" />
                        Beam Deflection Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate maximum deflection for simple beam load cases.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Beam Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Beam Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={() => setType("cantilever")} className={cn("px-4 py-2 text-xs rounded-md border transition-all", type === "cantilever" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground")}>Cantilever</button>
                                        <button onClick={() => setType("supported")} className={cn("px-4 py-2 text-xs rounded-md border transition-all", type === "supported" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground")}>Simply Supported</button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="force">Point Load (N)</Label>
                                    <Input id="force" type="number" value={force} onChange={(e) => setForce(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="len">Length (mm)</Label>
                                    <Input id="len" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mod">Young&apos;s Modulus (GPa)</Label>
                                    <Input id="mod" type="number" value={modulus} onChange={(e) => setModulus(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ine">Area Moment of Inertia (mm⁴)</Label>
                                    <Input id="ine" type="number" value={inertia} onChange={(e) => setInertia(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col items-center justify-center p-8">
                            <div className="text-center">
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Max Deflection (δ)</div>
                                <div className="text-6xl font-bold text-indigo-500 tabular-nums">
                                    {result?.deflection || "--"} mm
                                </div>
                            </div>

                            <div className="mt-12 w-full max-w-[300px] h-24 relative flex items-center">
                                <div className="absolute left-0 h-4 w-1 bg-muted-foreground" />
                                {type === "supported" && <div className="absolute right-0 h-4 w-1 bg-muted-foreground" />}
                                <div className="h-2 w-full bg-indigo-500/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-full transform translate-y-1 rotate-1 origin-left opacity-50" />
                                </div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className="h-8 w-px bg-red-500" />
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                </div>
                            </div>
                            <p className="mt-4 text-[10px] text-muted-foreground italic">Visual representation of point load.</p>
                        </Card>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
