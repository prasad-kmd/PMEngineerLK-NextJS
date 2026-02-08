"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, ChevronLeft, Info, Search, Filter } from "lucide-react"
import Link from "next/link"
import { AIContentIndicator } from "@/components/ai-content-indicator"

const TORQUE_DATA = [
    { size: "M3", pitch: "0.50", c88: 1.3, c109: 1.9, c129: 2.2 },
    { size: "M4", pitch: "0.70", c88: 3.0, c109: 4.3, c129: 5.1 },
    { size: "M5", pitch: "0.80", c88: 5.9, c109: 8.4, c129: 10 },
    { size: "M6", pitch: "1.00", c88: 10.1, c109: 14.3, c129: 17.1 },
    { size: "M8", pitch: "1.25", c88: 24.6, c109: 34.6, c129: 41.5 },
    { size: "M10", pitch: "1.50", c88: 48, c109: 68, c129: 82 },
    { size: "M12", pitch: "1.75", c88: 84, c109: 119, c129: 143 },
    { size: "M14", pitch: "2.00", c88: 135, c109: 190, c129: 228 },
    { size: "M16", pitch: "2.00", c88: 206, c109: 290, c129: 348 },
    { size: "M18", pitch: "2.50", c88: 283, c109: 399, c129: 479 },
    { size: "M20", pitch: "2.50", c88: 403, c109: 567, c129: 680 },
]

export default function BoltTorqueChart() {
    const [search, setSearch] = useState("")

    const filteredData = TORQUE_DATA.filter(d =>
        d.size.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-5xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                            <Wrench className="h-8 w-8 text-zinc-500" />
                            Bolt Torque Reference Chart
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Standard metric torque specifications (Nm) for property classes 8.8, 10.9, and 12.9.
                        </p>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search size (e.g. M8)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
                                    <th className="px-6 py-4">Bolt Size</th>
                                    <th className="px-6 py-4">Pitch (mm)</th>
                                    <th className="px-6 py-4 text-blue-500">Class 8.8</th>
                                    <th className="px-6 py-4 text-orange-500">Class 10.9</th>
                                    <th className="px-6 py-4 text-red-500">Class 12.9</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredData.map((row) => (
                                    <tr key={row.size} className="hover:bg-primary/5 transition-colors group">
                                        <td className="px-6 py-4 font-bold google-sans">{row.size}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{row.pitch}</td>
                                        <td className="px-6 py-4 font-bold tabular-nums">{row.c88} <span className="text-[10px] text-muted-foreground font-normal ml-1">Nm</span></td>
                                        <td className="px-6 py-4 font-bold tabular-nums text-orange-500/80 group-hover:text-orange-500">{row.c109} <span className="text-[10px] text-muted-foreground font-normal ml-1">Nm</span></td>
                                        <td className="px-6 py-4 font-bold tabular-nums text-red-500/80 group-hover:text-red-500">{row.c129} <span className="text-[10px] text-muted-foreground font-normal ml-1">Nm</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-500/10 border border-zinc-500/20 text-[11px] text-zinc-300">
                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>
                            Torque values are for metric coarse threads and assume a friction coefficient of µ = 0.14 (dry assembly). Always refer to manufacturer specifications for critical applications.
                        </p>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300">
                        <Filter className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold uppercase mb-1">Calculation Basis</p>
                            <p>Values shown represent approximately 90% of the yield strength of the bolt.</p>
                        </div>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
