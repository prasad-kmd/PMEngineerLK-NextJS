"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Zap, ChevronLeft, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AIContentIndicator } from "@/components/ai-content-indicator"

const COLORS = [
    { name: "Black", hex: "#000000", value: 0, multiplier: 1, tolerance: null },
    { name: "Brown", hex: "#8B4513", value: 1, multiplier: 10, tolerance: 1 },
    { name: "Red", hex: "#FF0000", value: 2, multiplier: 100, tolerance: 2 },
    { name: "Orange", hex: "#FFA500", value: 3, multiplier: 1000, tolerance: null },
    { name: "Yellow", hex: "#FFFF00", value: 4, multiplier: 10000, tolerance: null },
    { name: "Green", hex: "#008000", value: 5, multiplier: 100000, tolerance: 0.5 },
    { name: "Blue", hex: "#0000FF", value: 6, multiplier: 1000000, tolerance: 0.25 },
    { name: "Violet", hex: "#EE82EE", value: 7, multiplier: 10000000, tolerance: 0.1 },
    { name: "Grey", hex: "#808080", value: 8, multiplier: null, tolerance: 0.05 },
    { name: "White", hex: "#FFFFFF", value: 9, multiplier: null, tolerance: null },
    { name: "Gold", hex: "#D4AF37", value: null, multiplier: 0.1, tolerance: 5 },
    { name: "Silver", hex: "#C0C0C0", value: null, multiplier: 0.01, tolerance: 10 }
]

export default function ResistorCalculator() {
    const [bands, setBands] = useState<number>(4)
    const [selectedColors, setSelectedColors] = useState<string[]>(["Brown", "Black", "Red", "Gold"])

    const results = useMemo(() => {
        const c1 = COLORS.find(c => c.name === selectedColors[0])
        const c2 = COLORS.find(c => c.name === selectedColors[1])
        const c3 = COLORS.find(c => c.name === selectedColors[2])
        const c4 = COLORS.find(c => c.name === (bands === 4 ? selectedColors[3] : selectedColors[selectedColors.length - 1]))

        if (!c1 || !c2 || !c3 || !c4) return null

        let val = 0
        let mult = 1
        let tol = 0

        if (bands === 4) {
            val = (c1.value! * 10) + c2.value!
            mult = c3.multiplier!
            tol = c4.tolerance!
        } else {
            const cTemp = COLORS.find(c => c.name === selectedColors[2])
            val = (c1.value! * 100) + (c2.value! * 10) + cTemp!.value!
            mult = COLORS.find(c => c.name === selectedColors[3])!.multiplier!
            tol = COLORS.find(c => c.name === selectedColors[bands - 1])!.tolerance!
        }

        const ohms = val * mult
        const formattedOhms = ohms >= 1000000 ? (ohms / 1000000).toFixed(1) + " MΩ" :
                              ohms >= 1000 ? (ohms / 1000).toFixed(1) + " kΩ" :
                              ohms + " Ω"

        return { ohms: formattedOhms, tolerance: tol }
    }, [selectedColors, bands])

    const handleColorSelect = (index: number, colorName: string) => {
        const newColors = [...selectedColors]
        newColors[index] = colorName
        setSelectedColors(newColors)
    }

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Zap className="h-8 w-8 text-amber-500" />
                        Resistor Color Code Solver
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Interactive visual calculator for decoding 4, 5, and 6-band resistors.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Band Configuration</CardTitle>
                                    <div className="flex gap-2">
                                        {[4, 5].map(b => (
                                            <button
                                                key={b}
                                                onClick={() => { setBands(b); setSelectedColors(Array(b).fill("Black")) }}
                                                className={cn("px-3 py-1 text-xs rounded-full border transition-all", bands === b ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground")}
                                            >
                                                {b} Bands
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {Array.from({ length: bands }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Band {i + 1}</Label>
                                        <div className="grid grid-cols-6 gap-1">
                                            {COLORS.map(color => {
                                                const isAllowed = (i < bands - 2 && color.value !== null) || (i === bands - 2 && color.multiplier !== null) || (i === bands - 1 && color.tolerance !== null)
                                                if (!isAllowed) return null
                                                return (
                                                    <button
                                                        key={color.name}
                                                        title={color.name}
                                                        onClick={() => handleColorSelect(i, color.name)}
                                                        className={cn(
                                                            "h-8 rounded-md border-2 transition-all",
                                                            selectedColors[i] === color.name ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                                                        )}
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col items-center justify-center p-8">
                            <div className="relative w-full max-w-[300px] h-16 bg-[#D2B48C] rounded-full flex items-center justify-around px-8 shadow-inner border border-[#8B4513]/20">
                                <div className="absolute -left-8 w-8 h-1 bg-muted-foreground/30" />
                                <div className="absolute -right-8 w-8 h-1 bg-muted-foreground/30" />
                                {selectedColors.map((c, i) => (
                                    <div
                                        key={i}
                                        className="h-full w-4 shadow-sm"
                                        style={{ backgroundColor: COLORS.find(col => col.name === c)?.hex }}
                                    />
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Calculated Value</div>
                                <div className="text-5xl font-bold text-primary tabular-nums">
                                    {results?.ohms || "--"}
                                </div>
                                <div className="mt-2 text-xl text-muted-foreground">
                                    ±{results?.tolerance}% Tolerance
                                </div>
                            </div>

                            <div className="mt-8 flex items-start gap-2 text-[10px] text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                                <Info className="h-3 w-3 shrink-0 mt-0.5" />
                                <p>This calculator follows the standard EIA color code system for fixed resistors.</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
