"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calculator,
    Delete,
    RotateCcw,
    Equal,
    Settings2,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

export default function ScientificCalculator() {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [cursorPos, setCursorPos] = useState<number | null>(null);

    useEffect(() => {
        if (cursorPos !== null && textareaRef.current) {
            textareaRef.current.setSelectionRange(cursorPos, cursorPos);
            textareaRef.current.focus();
            setCursorPos(null);
        }
    }, [cursorPos, expression]);

    const insertAtCursor = (text: string, cursorOffset: number = 0) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const newExpression = expression.substring(0, start) + text + expression.substring(end);
        setExpression(newExpression);
        setCursorPos(start + (cursorOffset || text.length));
    };

    const handleButtonClick = (val: string) => {
        if (["sin", "cos", "tan", "ln", "log10", "sqrt"].includes(val)) {
            insertAtCursor(`${val}()`, val.length + 1);
        } else if (val === "pow") {
            insertAtCursor("**");
        } else if (val === "pi") {
            insertAtCursor("π");
        } else if (val === "e") {
            insertAtCursor("e");
        } else {
            insertAtCursor(val);
        }
    };

    const clear = () => {
        setExpression("");
        setResult(null);
    };

    const backspace = () => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;

        if (start !== end) {
            const newExpression = expression.substring(0, start) + expression.substring(end);
            setExpression(newExpression);
            setCursorPos(start);
        } else if (start > 0) {
            const newExpression = expression.substring(0, start - 1) + expression.substring(start);
            setExpression(newExpression);
            setCursorPos(start - 1);
        }
    };

    const calculate = (isAuto = false) => {
        if (!expression.trim()) {
            setResult(null);
            return;
        }
        try {
            let sanitized = expression
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(")
                .replace(/ln\(/g, "Math.log(")
                .replace(/log10\(/g, "Math.log10(")
                .replace(/sqrt\(/g, "Math.sqrt(")
                .replace(/÷/g, "/")
                .replace(/×/g, "*");

            sanitized = sanitized.replace(/(\d)(Math|π|e|\()/g, "$1*$2");
            sanitized = sanitized.replace(/\)(\d|Math|π|e|\()/g, ")*$1");

            const finalCheck = sanitized.replace(/Math\.[a-zA-Z0-9]+/g, "").replace(/[0-9\+\-\*\/\.\(\)\s]/g, "");
            if (finalCheck.length > 0) {
                throw new Error("Invalid characters");
            }

            // eslint-disable-next-line no-eval
            const res = eval(sanitized);
            const resStr = Number.isFinite(res) ? res.toString() : "Error";

            if (resStr !== "Error") {
                setResult(resStr);
                if (!isAuto) {
                    setHistory(prev => [expression + " = " + resStr, ...prev].slice(0, 5));
                }
            } else if (!isAuto) {
                setResult("Error");
            }
        } catch (e) {
            if (!isAuto) setResult("Error");
        }
    };

    // Auto-calculate logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (expression.trim()) {
                calculate(true);
            } else {
                setResult(null);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [expression]);

    const buttons = [
        { label: <InlineMath math="\sin" />, value: "sin" },
        { label: <InlineMath math="\cos" />, value: "cos" },
        { label: <InlineMath math="\tan" />, value: "tan" },
        { label: <InlineMath math="\pi" />, value: "pi" },
        { label: <InlineMath math="\log_{10}" />, value: "log10" },
        { label: <InlineMath math="\ln" />, value: "ln" },
        { label: <InlineMath math="\sqrt{x}" />, value: "sqrt" },
        { label: <InlineMath math="e" />, value: "e" },
        { label: <InlineMath math="x^y" />, value: "pow" },
        { label: "(", value: "(" },
        { label: ")", value: ")" },
        { label: <RotateCcw className="w-4 h-4 text-orange-500" />, value: "clear", action: clear, variant: "outline" as const },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
        { label: "÷", value: "÷", variant: "secondary" as const },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "×", value: "×", variant: "secondary" as const },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "-", value: "-", variant: "secondary" as const },
        { label: "0", value: "0" },
        { label: ".", value: "." },
        { label: <Delete className="w-4 h-4 text-red-500" />, value: "backspace", action: backspace, variant: "outline" as const },
        { label: "+", value: "+", variant: "secondary" as const },
    ];

    return (
        <div className="min-h-screen p-2 md:p-4 lg:p-6 flex flex-col items-center bg-background overflow-x-hidden">
            <div className="mx-auto max-w-5xl w-full flex flex-col h-full">
                {/* Standard Header - Thinner margin */}
                <div className="mb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="text-center md:text-left">
                        <Link href="/tools" className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <ChevronLeft className="w-3 h-3" />
                            Back to Tools
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold mozilla-headline flex items-center gap-2 justify-center md:justify-start">
                            <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            Precision Engineering Calculator
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 min-h-0">
                    {/* Input and Output side by side - Reduced height */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 shrink-0">
                        <Card className="shadow-sm border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-2 sm:p-3">
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold flex justify-between">
                                    <span>Input Expression</span>
                                </div>
                                <textarea
                                    ref={textareaRef}
                                    value={expression}
                                    onChange={(e) => setExpression(e.target.value)}
                                    placeholder="e.g. sin(π/2)"
                                    className="w-full bg-transparent border-none text-right text-lg sm:text-xl font-mono focus:ring-0 resize-none h-14 sm:h-16 py-0 overflow-y-auto"
                                    spellCheck={false}
                                />
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-primary/20 bg-primary/5 backdrop-blur-sm border-l-4 border-l-primary">
                            <CardContent className="p-2 sm:p-3 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Result</div>
                                    {result && result !== "Error" && <div className="text-[8px] font-mono text-primary/70 px-1.5 py-0.5 bg-primary/10 rounded">AUTOCALC</div>}
                                </div>
                                <div className="flex-1 flex items-center justify-end overflow-hidden">
                                    {result !== null && (
                                        <span className={`text-2xl sm:text-3xl font-bold truncate ${result === "Error" ? "text-destructive" : "text-primary"} animate-in zoom-in-95 duration-200`}>
                                            {result}
                                        </span>
                                    )}
                                    {result === null && (
                                        <span className="text-muted-foreground/20 text-2xl font-bold font-mono">0.00</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
                        {/* Button Grid - Tightened */}
                        <div className="lg:col-span-8 flex flex-col gap-2 min-h-0">
                            <div className="grid grid-cols-4 gap-1.5 flex-1 min-h-0">
                                {buttons.map((btn, idx) => (
                                    <Button
                                        key={idx}
                                        variant={btn.variant || "ghost"}
                                        className={`h-full min-h-[40px] text-xs sm:text-sm font-medium transition-all active:scale-[0.95] ${typeof btn.label === 'string' && !isNaN(Number(btn.label)) ? 'bg-accent/20 hover:bg-accent/40' : ''
                                            }`}
                                        onClick={() => btn.action ? btn.action() : handleButtonClick(btn.value)}
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                                <Button
                                    className="col-span-4 h-10 sm:h-12 text-sm sm:text-base font-bold shadow-md shadow-primary/10 group relative overflow-hidden shrink-0"
                                    onClick={() => calculate()}
                                >
                                    <Equal className="w-4 h-4 mr-2" />
                                    Calculate
                                </Button>
                            </div>
                        </div>

                        {/* History / Tips - More compact */}
                        <div className="lg:col-span-4 space-y-3 hidden lg:block">
                            <Card className="border-border/50 bg-card/30">
                                <CardContent className="p-3">
                                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">History</h3>
                                    {history.length > 0 ? (
                                        <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                                            {history.map((item, i) => (
                                                <div key={i} className="text-[11px] font-mono p-1.5 rounded bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer truncate" onClick={() => setExpression(item.split(" = ")[0])}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[10px] text-muted-foreground italic">No history yet.</p>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="text-[9px] text-muted-foreground/70 px-1 space-y-1">
                                <div className="flex justify-between border-b border-border/30 pb-0.5">
                                    <span>RADIAN MODE</span>
                                    <span>ON</span>
                                </div>
                                <p>Scientific functions: sin, cos, tan, ln, log10, sqrt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
