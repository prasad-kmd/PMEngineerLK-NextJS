"use client"

import { useState, useCallback } from "react"
import {
    Calculator,
    Search,
    GraduationCap,
    Wallet,
    Info,
    CheckCircle2,
    XCircle,
    AlertCircle,
    BookOpen
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AIContentIndicator } from "@/components/ai-content-indicator"

// Data from PDF
const DEPARTMENTS: Record<string, string> = {
    "AG": "Agricultural and Plantation Engineering",
    "CV": "Civil Engineering",
    "EE": "Electrical and Computer Engineering",
    "MH": "Mathematics and Philosophy of Engineering",
    "DM": "Mechanical Engineering",
    "TA": "Textile and Apparel Technology",
    "FD": "Faculty of Engineering Technology"
}

const CATEGORIES: Record<string, string> = {
    "Z": "Mathematics",
    "B": "Basic Science",
    "K": "Computing",
    "S": "Engineering Sciences and/or Design",
    "Y": "Engineering Projects",
    "M": "Management",
    "J": "General",
    "I": "Industrial"
}

const FEES = {
    LEVEL_2: 1400,
    LEVEL_3_4: 2080,
    LEVEL_5_6_7: 3220,
    REGISTRATION: 500,
    FACILITIES: 2500,
    LIBRARY: 100,
    INSTRUMENT: 12500
}

const GRADES = [
    { range: "Z > 85", grade: "A+", gpv: 4.0 },
    { range: "75 ≤ Z < 85", grade: "A", gpv: 4.0 },
    { range: "70 ≤ Z < 75", grade: "A-", gpv: 3.7 },
    { range: "63 ≤ Z < 70", grade: "B+", gpv: 3.3 },
    { range: "55 ≤ Z < 63", grade: "B", gpv: 3.0 },
    { range: "50 ≤ Z < 55", grade: "B-", gpv: 2.7 },
    { range: "45 ≤ Z < 50", grade: "C+", gpv: 2.3 },
    { range: "40 ≤ Z < 45", grade: "C", gpv: 2.0 },
    { range: "35 ≤ Z < 40", grade: "C-", gpv: 1.7 },
    { range: "30 ≤ Z < 35", grade: "D+", gpv: 1.3 },
    { range: "20 ≤ Z < 30", grade: "D", gpv: 1.0 },
    { range: "Z < 20", grade: "E", gpv: 0.0 },
]

export default function StudentGuideNavigator() {
    const [courseCode, setCourseCode] = useState("")
    const [decoded, setDecoded] = useState<any>(null)

    const [credits, setCredits] = useState({
        level2: 0,
        level34: 0,
        level567: 0
    })
    const [isNewStudent, setIsNewStudent] = useState(false)

    const [alPhysics, setAlPhysics] = useState("")
    const [alMath, setAlMath] = useState("")
    const [alChemistry, setAlChemistry] = useState("")

    const decodeCourse = useCallback(() => {
        const code = courseCode.toUpperCase().trim()
        if (code.length < 5) return

        const dept = DEPARTMENTS[code.substring(0, 2)] || "Unknown Department"
        const category = CATEGORIES[code.substring(2, 3)] || "Unknown Category"
        const level = code.substring(3, 4)
        const creditDigit = code.substring(4, 5)

        let creditValue = parseInt(creditDigit)
        if (isNaN(creditValue)) {
            // Handle letters A-Z (10-35)
            creditValue = creditDigit.charCodeAt(0) - 65 + 10
        }

        setDecoded({
            dept,
            category,
            level,
            credits: creditValue
        })
    }, [courseCode])

    const calculateFees = () => {
        const tuition = (credits.level2 * FEES.LEVEL_2) +
                        (credits.level34 * FEES.LEVEL_3_4) +
                        (credits.level567 * FEES.LEVEL_5_6_7)
        const fixed = FEES.REGISTRATION + FEES.FACILITIES + FEES.LIBRARY + (isNewStudent ? FEES.INSTRUMENT : 0)
        const total = tuition + fixed
        const firstInstalment = (tuition * 0.6) + fixed
        const secondInstalment = tuition * 0.4

        return { tuition, fixed, total, firstInstalment, secondInstalment }
    }

    const checkEligibility = () => {
        const passes = [alPhysics, alMath, alChemistry].map(s => s.toUpperCase())
        const eligible = passes.every(p => ["A", "B", "C", "S"].includes(p))
        const ieslEligible = passes.filter(p => ["A", "B", "C"].includes(p)).length >= 2 && passes.includes("S") || passes.filter(p => ["A", "B", "C"].includes(p)).length >= 3

        return { eligible, ieslEligible }
    }

    const { tuition, fixed, total, firstInstalment, secondInstalment } = calculateFees()
    const { eligible, ieslEligible } = checkEligibility()

    return (
        <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <Badge variant="outline" className="mb-4 py-1 px-4 text-primary border-primary/20 bg-primary/5">
                        New Utility
                    </Badge>
                    <h1 className="mb-4 text-4xl font-bold mozilla-headline tracking-tight">Engineering Student Navigator</h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed roboto">
                        Interactive guiding tool for OUSL Engineering Students based on the 2025/2026 Student Guidebook.
                    </p>
                </div>

                <Tabs defaultValue="decoder" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-4 rounded-xl">
                        <TabsTrigger value="decoder" className="gap-2"><Search className="h-4 w-4" /> Decoder</TabsTrigger>
                        <TabsTrigger value="fees" className="gap-2"><Wallet className="h-4 w-4" /> Fees</TabsTrigger>
                        <TabsTrigger value="eligibility" className="gap-2"><GraduationCap className="h-4 w-4" /> Eligibility</TabsTrigger>
                        <TabsTrigger value="grades" className="gap-2"><Calculator className="h-4 w-4" /> Grades</TabsTrigger>
                    </TabsList>

                    <TabsContent value="decoder">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Search className="h-5 w-5 text-primary" />
                                    Course Code Decoder
                                </CardTitle>
                                <CardDescription>
                                    Break down any OUSL course code (e.g., DMS3203) to understand its properties.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="course-code">Enter Course Code</Label>
                                        <Input
                                            id="course-code"
                                            placeholder="e.g. DMS3203"
                                            value={courseCode}
                                            onChange={(e) => setCourseCode(e.target.value)}
                                            onKeyUp={(e) => e.key === 'Enter' && decodeCourse()}
                                        />
                                    </div>
                                    <Button onClick={decodeCourse} className="mt-8">Decode</Button>
                                </div>

                                {decoded && (
                                    <div className="grid gap-4 md:grid-cols-2 rounded-xl border border-border p-4 bg-muted/30">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Department</p>
                                            <p className="font-semibold text-foreground">{decoded.dept}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Category</p>
                                            <p className="font-semibold text-foreground">{decoded.category}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Academic Level</p>
                                            <Badge variant="secondary">Level {decoded.level}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Credit Value</p>
                                            <p className="font-semibold text-foreground">{decoded.credits} Credits ({decoded.credits * 50} Learning Hours)</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="fees">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-primary" />
                                    Fee Estimator (2025/2026)
                                </CardTitle>
                                <CardDescription>
                                    Estimate your annual university fees based on registered credits.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Credits at Level 2 (Rs. 1,400/cr)</Label>
                                            <Input type="number" value={credits.level2} onChange={e => setCredits({...credits, level2: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Credits at Level 3 & 4 (Rs. 2,080/cr)</Label>
                                            <Input type="number" value={credits.level34} onChange={e => setCredits({...credits, level34: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Credits at Level 5, 6 & 7 (Rs. 3,220/cr)</Label>
                                            <Input type="number" value={credits.level567} onChange={e => setCredits({...credits, level567: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="flex items-center space-x-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id="new-student"
                                                checked={isNewStudent}
                                                onChange={e => setIsNewStudent(e.target.checked)}
                                                className="rounded border-border"
                                            />
                                            <Label htmlFor="new-student">New Student (Add Instrument Usage Fee)</Label>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4">
                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                            Summary <Info className="h-4 w-4 text-muted-foreground" />
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Total Tuition:</span>
                                                <span className="font-semibold">Rs. {tuition.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Fixed Fees:</span>
                                                <span className="font-semibold">Rs. {fixed.toLocaleString()}</span>
                                            </div>
                                            <div className="border-t border-primary/20 pt-2 flex justify-between text-lg font-bold text-primary">
                                                <span>Total Payable:</span>
                                                <span>Rs. {total.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-primary/10 space-y-3">
                                            <p className="text-xs font-bold uppercase text-muted-foreground">Instalment Plan</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 rounded-lg bg-background border border-border">
                                                    <p className="text-[10px] text-muted-foreground uppercase">1st (60% + Fixed)</p>
                                                    <p className="font-bold">Rs. {firstInstalment.toLocaleString()}</p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-background border border-border">
                                                    <p className="text-[10px] text-muted-foreground uppercase">2nd (40% Tuition)</p>
                                                    <p className="font-bold">Rs. {secondInstalment.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="eligibility">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    BSc Honours Entry Checker
                                </CardTitle>
                                <CardDescription>
                                    Check if you meet the entry requirements for the BSc Honours in Engineering.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Physics Grade</Label>
                                        <Input placeholder="A/B/C/S/F" value={alPhysics} onChange={e => setAlPhysics(e.target.value)} maxLength={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Combined Maths Grade</Label>
                                        <Input placeholder="A/B/C/S/F" value={alMath} onChange={e => setAlMath(e.target.value)} maxLength={1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Chemistry Grade</Label>
                                        <Input placeholder="A/B/C/S/F" value={alChemistry} onChange={e => setAlChemistry(e.target.value)} maxLength={1} />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className={`p-4 rounded-xl border flex gap-4 ${eligible ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                        {eligible ? <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" /> : <XCircle className="h-6 w-6 text-red-500 shrink-0" />}
                                        <div>
                                            <p className="font-bold">University Admission</p>
                                            <p className="text-sm text-muted-foreground">
                                                {eligible ? "Eligible for BSc Hons (Eng) admission." : "Must have at least 'S' passes in all 3 subjects."}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-xl border flex gap-4 ${ieslEligible ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                        {ieslEligible ? <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" /> : <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" />}
                                        <div>
                                            <p className="font-bold">IESL Recognition</p>
                                            <p className="text-sm text-muted-foreground">
                                                {ieslEligible ? "Meets IESL membership criteria (2C, 1S)." : "Requires 2 'C' passes and 1 'S' pass in one sitting."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="grades">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5 text-primary" />
                                    Grades and GPV Reference
                                </CardTitle>
                                <CardDescription>
                                    Standardized grading system for the Faculty of Engineering Technology.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-hidden rounded-xl border border-border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-bold">Z-Mark Range</th>
                                                <th className="px-4 py-3 text-left font-bold">Grade</th>
                                                <th className="px-4 py-3 text-left font-bold">Grade Point Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {GRADES.map((g, idx) => (
                                                <tr key={idx} className="hover:bg-muted/50 transition-colors">
                                                    <td className="px-4 py-2 font-local-jetbrains-mono">{g.range}</td>
                                                    <td className="px-4 py-2 font-bold">{g.grade}</td>
                                                    <td className="px-4 py-2">{g.gpv.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-12 rounded-3xl border border-border bg-card/50 p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold google-sans mb-2">Need more details?</h2>
                        <p className="text-muted-foreground text-sm mb-4">
                            Check out our comprehensive text guide for a deep dive into registration procedures, industrial training details, and student support services.
                        </p>
                        <Button variant="outline" asChild className="rounded-full">
                            <a href="/articles/ousl-engineering-student-guide">Read Full Guide</a>
                        </Button>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
