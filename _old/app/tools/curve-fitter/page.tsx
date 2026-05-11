"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, ChevronLeft, Info, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIContentIndicator } from "@/components/ai-content-indicator"
import { usePersistentState } from "@/hooks/use-persistent-state"
import { toast } from "sonner"

export default function CurveFitter() {
    const [data, setData] = usePersistentState<string>("curve-data", "1, 2.1\n2, 3.9\n3, 6.2\n4, 8.1\n5, 10.3")
    const [type, setType] = usePersistentState<string>("curve-type", "linear")

    const points = useMemo(() => {
        const lines = data.split('\n').filter(l => l.trim() !== '')
        return lines.map(l => {
            const [x, y] = l.split(/[, \t]+/).map(parseFloat)
            return { x, y }
        }).filter(p => !isNaN(p.x) && !isNaN(p.y))
    }, [data])

    const results = useMemo(() => {
        if (points.length < 2) return null
        const n = points.length

        if (type === "linear") {
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0
            for (const p of points) {
                sumX += p.x
                sumY += p.y
                sumXY += p.x * p.y
                sumX2 += p.x * p.x
            }

            const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
            const b = (sumY - m * sumX) / n

            const yMean = sumY / n
            let ssRes = 0, ssTot = 0
            for (const p of points) {
                const yPred = m * p.x + b
                ssRes += Math.pow(p.y - yPred, 2)
                ssTot += Math.pow(p.y - yMean, 2)
            }
            const r2 = 1 - (ssRes / (ssTot || 1))

            return {
                params: { m: m.toFixed(4), b: b.toFixed(4) },
                r2: r2.toFixed(4),
                equation: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}`
            }
        } else if (type === "quadratic") {
            if (points.length < 3) return null
            let s0 = n, s1 = 0, s2 = 0, s3 = 0, s4 = 0
            let sy = 0, sxy = 0, sx2y = 0
            for (const p of points) {
                const x2 = p.x * p.x
                s1 += p.x
                s2 += x2
                s3 += x2 * p.x
                s4 += x2 * x2
                sy += p.y
                sxy += p.x * p.y
                sx2y += x2 * p.y
            }

            const det = s4 * (s2 * s0 - s1 * s1) - s3 * (s3 * s0 - s1 * s2) + s2 * (s3 * s1 - s2 * s2)
            if (Math.abs(det) < 1e-10) return null

            const a = (sx2y * (s2 * s0 - s1 * s1) - s3 * (sxy * s0 - s1 * sy) + s2 * (sxy * s1 - s2 * sy)) / det
            const b = (s4 * (sxy * s0 - s1 * sy) - sx2y * (s3 * s0 - s1 * s2) + s2 * (s3 * sy - sxy * s2)) / det
            const c = (s4 * (s2 * sy - sxy * s1) - s3 * (s3 * sy - sxy * s2) + sx2y * (s3 * s1 - s2 * s2)) / det

            const yMean = sy / n
            let ssRes = 0, ssTot = 0
            for (const p of points) {
                const yPred = a * p.x * p.x + b * p.x + c
                ssRes += Math.pow(p.y - yPred, 2)
                ssTot += Math.pow(p.y - yMean, 2)
            }
            const r2 = 1 - (ssRes / (ssTot || 1))

            return {
                params: { a: a.toFixed(4), b: b.toFixed(4), c: c.toFixed(4) },
                r2: r2.toFixed(4),
                equation: `y = ${a.toFixed(2)}x² + ${b.toFixed(2)}x + ${c.toFixed(2)}`
            }
        }
        return null
    }, [points, type])

    const exportCSV = () => {
        if (points.length === 0) {
            toast.error("No data to export")
            return
        }
        const csvContent = "data:text/csv;charset=utf-8,"
            + "X,Y\n"
            + points.map(p => `${p.x},${p.y}`).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "curve_data.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("Data exported to CSV")
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
                        <LineChart className="h-8 w-8 text-blue-500" />
                        Curve Fitter
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Fit a linear or polynomial model to your data points using the least squares method.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4">
                                    <CardTitle className="text-lg">Fit Type</CardTitle>
                                    <div className="flex bg-muted p-1 rounded-lg">
                                        <button
                                            onClick={() => setType("linear")}
                                            className={`px-3 py-1 text-xs rounded-md transition-all ${type === "linear" ? "bg-background shadow-sm font-bold text-primary" : "text-muted-foreground"}`}
                                        >
                                            Linear
                                        </button>
                                        <button
                                            onClick={() => setType("quadratic")}
                                            className={`px-3 py-1 text-xs rounded-md transition-all ${type === "quadratic" ? "bg-background shadow-sm font-bold text-primary" : "text-muted-foreground"}`}
                                        >
                                            Quadratic
                                        </button>
                                    </div>
                                </div>
                                <CardTitle className="text-lg">Input Data Points (x, y)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <Label htmlFor="data">Enter points (one pair per line)</Label>
                                    <Button variant="outline" size="sm" onClick={exportCSV} className="h-7 px-2 text-[10px]">
                                        <Download className="h-3 w-3 mr-1" /> Export CSV
                                    </Button>
                                </div>
                                <Textarea
                                    id="data"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    placeholder="1, 2.1&#10;2, 3.9..."
                                    className="min-h-[200px] font-mono text-sm"
                                />
                                <p className="text-[10px] text-muted-foreground italic">
                                    Format: "x, y" or "x [space] y"
                                </p>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs">
                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                Regression analysis finds parameters that minimize the sum of squared residuals between observed data and the fitted curve.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5 h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-lg">Regression Results</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-center space-y-6">
                                <div className="text-center">
                                    <div className="text-xs uppercase text-muted-foreground font-bold mb-2">Best Fit Equation</div>
                                    <div className="text-3xl font-bold text-blue-500 font-mono">
                                        {results ? results.equation : "--"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {results && Object.entries(results.params).map(([k, v]) => (
                                        <div key={k} className="p-3 rounded-xl bg-background/50 border border-border/50 flex justify-between items-center">
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold">Parameter {k}</span>
                                            <span className="text-lg font-bold tabular-nums">{v as string}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                                    <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">R-Squared (Coefficient of Determination)</div>
                                    <div className={`text-2xl font-bold tabular-nums ${results && parseFloat(results.r2) > 0.9 ? "text-green-500" : "text-amber-500"}`}>
                                        {results ? results.r2 : "--"}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-2">
                                        (1.0 is a perfect fit)
                                    </p>
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
