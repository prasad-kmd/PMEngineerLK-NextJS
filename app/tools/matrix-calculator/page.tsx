"use client"

import React, { useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sigma, ChevronLeft, Info, Grid3X3, Download, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIContentIndicator } from "@/components/ai-content-indicator"
import { usePersistentState } from "@/hooks/use-persistent-state"
import { toast } from "sonner"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function MatrixCalculator() {
    const resultsRef = useRef<HTMLDivElement>(null)
    const [isExporting, setIsExporting] = useState(false)
    const [matrix, setMatrix] = usePersistentState<number[][]>("matrix-3x3", [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ])
    const [vectorB, setVectorB] = usePersistentState<number[]>("matrix-vector-b", [1, 0, 0])

    const updateCell = (r: number, c: number, val: string) => {
        const newMatrix = [...matrix.map(row => [...row])]
        newMatrix[r][c] = parseFloat(val) || 0
        setMatrix(newMatrix)
    }

    const updateVector = (i: number, val: string) => {
        const newVector = [...vectorB]
        newVector[i] = parseFloat(val) || 0
        setVectorB(newVector)
    }

    const results = useMemo(() => {
        const m = matrix
        const det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
                    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
                    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])

        let inverse: number[][] | null = null
        let solution: number[] | null = null

        if (Math.abs(det) > 1e-10) {
            const adj: number[][] = [
                [
                    (m[1][1] * m[2][2] - m[1][2] * m[2][1]),
                    -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
                    (m[0][1] * m[1][2] - m[0][2] * m[1][1])
                ],
                [
                    -(m[1][0] * m[2][2] - m[1][2] * m[2][0]),
                    (m[0][0] * m[2][2] - m[0][2] * m[2][0]),
                    -(m[0][0] * m[1][2] - m[0][2] * m[1][0])
                ],
                [
                    (m[1][0] * m[2][1] - m[1][1] * m[2][0]),
                    -(m[0][0] * m[2][1] - m[0][1] * m[2][0]),
                    (m[0][0] * m[1][1] - m[0][1] * m[1][0])
                ]
            ]
            inverse = adj.map(row => row.map(val => val / det))

            // Solve Ax = B using x = A^-1 * B
            solution = [
                inverse[0][0] * vectorB[0] + inverse[0][1] * vectorB[1] + inverse[0][2] * vectorB[2],
                inverse[1][0] * vectorB[0] + inverse[1][1] * vectorB[1] + inverse[1][2] * vectorB[2],
                inverse[2][0] * vectorB[0] + inverse[2][1] * vectorB[1] + inverse[2][2] * vectorB[2]
            ]
        }

        const trace = m[0][0] + m[1][1] + m[2][2]

        return { det, inverse, solution, trace }
    }, [matrix, vectorB])

    const handleExport = async () => {
        if (!resultsRef.current) return
        setIsExporting(true)
        const toastId = toast.loading("Generating PDF...")

        try {
            const canvas = await html2canvas(resultsRef.current, {
                scale: 2,
                backgroundColor: "#020617",
            })
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width / 2, canvas.height / 2]
            })
            pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2)
            pdf.save("matrix_results.pdf")
            toast.success("Exported successfully", { id: toastId })
        } catch (e) {
            toast.error("Export failed", { id: toastId })
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto max-w-5xl">
                <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Workspace
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
                        <Grid3X3 className="h-8 w-8 text-purple-500" />
                        3x3 Matrix & Linear System
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Calculate properties of a 3x3 matrix and solve linear systems of the form Ax = B.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Matrix A</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2">
                                    {matrix.map((row, r) =>
                                        row.map((val, c) => (
                                            <Input
                                                key={`${r}-${c}`}
                                                type="number"
                                                value={val}
                                                onChange={(e) => updateCell(r, c, e.target.value)}
                                                className="text-center font-mono"
                                            />
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Vector B (for Ax = B)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2">
                                    {vectorB.map((val, i) => (
                                        <Input
                                            key={`b-${i}`}
                                            type="number"
                                            value={val}
                                            onChange={(e) => updateVector(i, e.target.value)}
                                            className="text-center font-mono"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs">
                            <Info className="h-4 w-4 shrink-0 mt-0.5" />
                            <p>
                                Linear systems arise in many engineering fields, including structural analysis, electrical circuits, and fluid dynamics.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card ref={resultsRef} className="border-primary/20 bg-primary/5 h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Analysis & Solution</CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleExport} disabled={isExporting}>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                                        <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Determinant</div>
                                        <div className="text-2xl font-bold text-purple-500 tabular-nums">
                                            {results.det.toFixed(4).replace(/\.?0+$/, '')}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                                        <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Trace</div>
                                        <div className="text-2xl font-bold text-muted-foreground tabular-nums">
                                            {results.trace.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs uppercase text-muted-foreground font-bold">Solution Vector (x)</Label>
                                    {results.solution ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {results.solution.map((val, i) => (
                                                <div key={`sol-${i}`} className="p-3 bg-purple-500/10 border border-purple-500/30 rounded text-center font-mono font-bold text-purple-300">
                                                    {val.toFixed(4).replace(/\.?0+$/, '')}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-center text-red-200 text-sm">
                                            No unique solution exists
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs uppercase text-muted-foreground font-bold">Inverse Matrix (A⁻¹)</Label>
                                    {results.inverse ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {results.inverse.map((row, r) =>
                                                row.map((val, c) => (
                                                    <div key={`inv-${r}-${c}`} className="p-2 bg-background/50 border border-border/50 rounded text-center font-mono text-[10px]">
                                                        {val.toFixed(3).replace(/\.?0+$/, '')}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-center text-red-200 text-sm">
                                            Singular Matrix (Rank &lt; 3)
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 rounded-lg border border-border/50 bg-background/30 mt-auto">
                                    <h4 className="text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
                                        <Sigma className="h-3 w-3" />
                                        Advanced Properties
                                    </h4>
                                    <div className="text-[11px] text-muted-foreground space-y-1">
                                        <p>• Condition: {results.det === 0 ? "Infinite" : "Stable"}</p>
                                        <p>• Rank: {results.det !== 0 ? 3 : "Degenerate"}</p>
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
