"use client"

import { useState, useEffect } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"
import { Replace, Copy } from "lucide-react"
import { toast } from "sonner"

export default function LatexToMathmlPage() {
    const [latex, setLatex] = useState("E = mc^2")
    const [mathml, setMathml] = useState("")

    useEffect(() => {
        try {
            const output = katex.renderToString(latex, {
                displayMode: true,
                throwOnError: false,
                output: "mathml",
            })
            setMathml(output)
        } catch (err) {
            console.error(err)
            setMathml("Error generating MathML")
        }
    }, [latex])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mathml)
        toast.success("MathML copied to clipboard!")
    }

    return (
        <div className="min-h-screen p-6 lg:p-8 flex flex-col items-center">
            <div className="mx-auto max-w-4xl w-full">
                <div className="mb-8 text-center lg:text-left">
                    <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-2 justify-center lg:justify-start">
                        <Replace className="h-8 w-8 text-purple-500" />
                        MathML Integration Engine
                    </h1>
                    <p className="text-muted-foreground mt-1">Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-medium">LaTeX Input</label>
                        <textarea
                            value={latex}
                            onChange={(e) => setLatex(e.target.value)}
                            placeholder="Enter LaTeX here..."
                            className="flex-1 w-full p-4 rounded-xl border border-border bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[300px]"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">MathML Output</label>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-md text-xs transition-colors"
                            >
                                <Copy className="h-3 w-3" />
                                Copy MathML
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={mathml}
                            className="flex-1 w-full p-4 rounded-xl border border-border bg-muted/30 font-mono text-xs focus:outline-none resize-none min-h-[300px]"
                        />
                    </div>
                </div>

                <div className="mt-8 p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-lg font-semibold mb-4">Preview</h2>
                    <div className="flex items-center justify-center p-8 bg-muted/10 rounded-lg border border-border min-h-[100px] overflow-auto">
                        <div dangerouslySetInnerHTML={{ __html: katex.renderToString(latex, { displayMode: true, throwOnError: false }) }} />
                    </div>
                </div>

                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400">
                    <p><strong>Note:</strong> MathML is widely supported by modern browsers and can be used in HTML for high-quality mathematical rendering without external libraries.</p>
                </div>
            </div>
        </div>
    )
}
