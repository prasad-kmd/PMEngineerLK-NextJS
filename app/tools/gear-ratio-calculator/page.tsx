"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Settings2, ChevronLeft, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"

export default function GearCalculator() {
    const [driverTeeth, setDriverTeeth] = useState<string>("10")
    const [drivenTeeth, setDrivenTeeth] = useState<string>("40")
    const [inputSpeed, setInputSpeed] = useState<string>("1000") // RPM
    const [inputTorque, setInputTorque] = useState<string>("10") // Nm

    const results = useMemo(() => {
        const d1 = parseFloat(driverTeeth) || 1
        const d2 = parseFloat(drivenTeeth) || 1
        const speed = parseFloat(inputSpeed) || 0
        const torque = parseFloat(inputTorque) || 0

        const ratio = d2 / d1
        const outputSpeed = speed / ratio
        const outputTorque = torque * ratio

        return {
            ratio: ratio.toFixed(2),
            speed: outputSpeed.toFixed(1),
            torque: outputTorque.toFixed(1)
        }
    }, [driverTeeth, drivenTeeth, inputSpeed, inputTorque])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Settings2 className="h-8 w-8 text-orange-500" />
                        Gear Ratio & Speed Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate output parameters for simple gear trains and belt drives.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Input Parameters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="d1">Driver Teeth (N1)</Label>
                                        <Input id="d1" type="number" value={driverTeeth} onChange={(e) => setDriverTeeth(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="d2">Driven Teeth (N2)</Label>
                                        <Input id="d2" type="number" value={drivenTeeth} onChange={(e) => setDrivenTeeth(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="s1">Input Speed (RPM)</Label>
                                    <Input id="s1" type="number" value={inputSpeed} onChange={(e) => setInputSpeed(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="t1">Input Torque (Nm)</Label>
                                    <Input id="t1" type="number" value={inputTorque} onChange={(e) => setInputTorque(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-200">
                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                Formula: Ratio = N2 / N1 <br />
                                Output Speed = Input Speed / Ratio <br />
                                Output Torque = Input Torque × Ratio (ignoring efficiency)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col justify-center p-8">
                            <div className="text-center space-y-12">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Gear Ratio</div>
                                    <div className="text-6xl font-bold text-orange-500 tabular-nums">
                                        {results?.ratio}:1
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground uppercase">Output Speed</div>
                                        <div className="text-2xl font-bold text-foreground tabular-nums">{results?.speed} RPM</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground uppercase">Output Torque</div>
                                        <div className="text-2xl font-bold text-foreground tabular-nums">{results?.torque} Nm</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4 pt-4">
                                    <div className="h-12 w-12 rounded-full border-2 border-orange-500/50 flex items-center justify-center animate-[spin_3s_linear_infinite]">
                                        <Settings2 className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                                    <div className="h-20 w-20 rounded-full border-2 border-orange-500/50 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                                        <Settings2 className="h-10 w-10 text-orange-500" />
                                    </div>
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
