"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MoveUpRight, ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"
import { cn } from "@/lib/utils"

export default function StepperCalculator() {
    const [stepAngle, setStepAngle] = useState<string>("1.8")
    const [microstepping, setMicrostepping] = useState<string>("16")
    const [driveType, setDriveType] = useState<string>("leadscrew")

    // Leadscrew inputs
    const [pitch, setPitch] = useState<string>("8")

    // Belt inputs
    const [beltPitch, setBeltPitch] = useState<string>("2")
    const [pulleyTeeth, setPulleyTeeth] = useState<string>("20")

    const result = useMemo(() => {
        const angle = parseFloat(stepAngle) || 1.8
        const ms = parseFloat(microstepping) || 1
        const stepsPerRev = (360 / angle) * ms

        let stepsPerMm = 0
        if (driveType === "leadscrew") {
            const p = parseFloat(pitch) || 1
            stepsPerMm = stepsPerRev / p
        } else {
            const bp = parseFloat(beltPitch) || 1
            const pt = parseFloat(pulleyTeeth) || 1
            stepsPerMm = stepsPerRev / (bp * pt)
        }

        return {
            stepsPerMm: stepsPerMm.toFixed(2),
            stepsPerRev: stepsPerRev.toFixed(0)
        }
    }, [stepAngle, microstepping, driveType, pitch, beltPitch, pulleyTeeth])

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-4xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <MoveUpRight className="h-8 w-8 text-rose-500" />
                        Stepper Motor Calculator
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate steps/mm settings for 3D printers and CNC machines.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Motor & Driver</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="angle">Step Angle (°)</Label>
                                        <select id="angle" className="w-full bg-background border border-input rounded-md h-10 px-3 text-sm" value={stepAngle} onChange={(e) => setStepAngle(e.target.value)}>
                                            <option value="1.8">1.8° (200 steps)</option>
                                            <option value="0.9">0.9° (400 steps)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ms">Microstepping</Label>
                                        <Input id="ms" type="number" value={microstepping} onChange={(e) => setMicrostepping(e.target.value)} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Mechanical Drive</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Drive Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={() => setDriveType("leadscrew")} className={cn("px-4 py-2 text-xs rounded-md border transition-all", driveType === "leadscrew" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground")}>Leadscrew</button>
                                        <button onClick={() => setDriveType("belt")} className={cn("px-4 py-2 text-xs rounded-md border transition-all", driveType === "belt" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground")}>Belt & Pulley</button>
                                    </div>
                                </div>

                                {driveType === "leadscrew" ? (
                                    <div className="space-y-2">
                                        <Label htmlFor="pitch">Leadscrew Pitch (mm/rev)</Label>
                                        <Input id="pitch" type="number" value={pitch} onChange={(e) => setPitch(e.target.value)} />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bp">Belt Pitch (mm)</Label>
                                            <Input id="bp" type="number" value={beltPitch} onChange={(e) => setBeltPitch(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pt">Pulley Teeth</Label>
                                            <Input id="pt" type="number" value={pulleyTeeth} onChange={(e) => setPulleyTeeth(e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col justify-center p-8">
                            <div className="text-center space-y-12">
                                <div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Resolution</div>
                                    <div className="text-6xl font-bold text-rose-500 tabular-nums">
                                        {result?.stepsPerMm}
                                    </div>
                                    <div className="mt-2 text-xl text-muted-foreground uppercase tracking-widest font-bold">Steps / mm</div>
                                </div>

                                <div className="pt-8 border-t border-border/50">
                                    <div className="flex items-center justify-between text-sm px-4">
                                        <span className="text-muted-foreground">Steps per Revolution</span>
                                        <span className="font-bold tabular-nums">{result?.stepsPerRev}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Settings className="h-12 w-12 text-rose-500/20 animate-[spin_10s_linear_infinite]" />
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
