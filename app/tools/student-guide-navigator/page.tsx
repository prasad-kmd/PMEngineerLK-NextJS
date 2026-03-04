"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
    Search,
    GraduationCap,
    Wallet,
    Info,
    CheckCircle2,
    AlertCircle,
    Map,
    TrendingUp,
    LayoutDashboard,
    Save,
    Trash2,
    Calendar,
    Download,
    Upload,
    Plus,
    Minus,
    History,
    FileText,
    ArrowUpRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AIContentIndicator } from "@/components/ai-content-indicator"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { toast } from "sonner"
import Loading from "@/app/loading"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Constants
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
    "I": "Industrial",
    "W": "Industrial Training"
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

interface Course {
    code: string;
    name: string;
    credits: number;
    level: number;
    category: string;
    dept: string;
    prerequisites: string;
    specializations: string[];
}

interface Programme {
    id: string;
    name: string;
    min_credits: number;
    min_l56?: number;
    min_l6?: number;
    categories: Record<string, any>;
}

export default function StudentGuideNavigator() {
    // Data Loading
    const [allCourses, setAllCourses] = useState<Course[]>([])
    const [programmes, setProgrammes] = useState<Programme[]>([])
    const [loading, setLoading] = useState(true)

    // User State (Persisted)
    // User State (Persisted)
    const [userPlan, setUserPlan] = useLocalStorage<Record<string, number>>("ousl_user_plan_v4", {})
    const [completedCourses, setCompletedCourses] = useLocalStorage<Record<string, number>>("ousl_completed_v2", {})
    const [selectedSpec, setSelectedSpec] = useLocalStorage<string>("ousl_selected_spec", "Civil Engineering")
    const [selectedProgrammeId, setSelectedProgrammeId] = useLocalStorage<string>("ousl_selected_programme", "bsc_hons_eng")
    const [isNewStudent, setIsNewStudent] = useLocalStorage<boolean>("ousl_is_new_student", false)

    // UI State
    const [searchQuery, setSearchQuery] = useState("")
    const [filterDept, setFilterDept] = useState("all")
    const [filterLevel, setFilterLevel] = useState("all")
    const [filterCategory, setFilterCategory] = useState("all")
    const [activeTab, setActiveTab] = useState("dashboard")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, programmesRes] = await Promise.all([
                    fetch('/data/ousl_courses.json'),
                    fetch('/data/ousl_programmes.json')
                ])
                const coursesData = await coursesRes.json()
                const programmesData = await programmesRes.json()
                setAllCourses(coursesData)
                setProgrammes(programmesData)
            } catch (error) {
                console.error("Failed to load OUSL data:", error)
                toast.error("Failed to load course data.")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Derived State
    const currentProgramme = useMemo(() => programmes.find(p => p.id === selectedProgrammeId), [programmes, selectedProgrammeId])
    
    const plannedCourseDetails = useMemo(() => 
        allCourses.filter(c => 
            Object.keys(userPlan).includes(c.code) && 
            (c.specializations.includes(selectedSpec) || c.specializations.length > 5)
        ), 
    [allCourses, userPlan, selectedSpec])

    const completedCourseDetails = useMemo(() => 
        allCourses.filter(c => 
            Object.keys(completedCourses).includes(c.code) && 
            (c.specializations.includes(selectedSpec) || c.specializations.length > 5)
        ), 
    [allCourses, completedCourses, selectedSpec])

    const filteredCourseList = useMemo(() => {
        return allCourses.filter(c => {
            const isRelevant = c.specializations.includes(selectedSpec) || c.specializations.length > 5 // Common
            if (!isRelevant) return false

            const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 c.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesDept = filterDept === "all" || c.dept === filterDept
            const matchesLevel = filterLevel === "all" || c.level.toString() === filterLevel
            const matchesCategory = filterCategory === "all" || c.category === filterCategory
            return matchesSearch && matchesDept && matchesLevel && matchesCategory
        })
    }, [allCourses, searchQuery, filterDept, filterLevel, filterCategory, selectedSpec])

    const gpaCalculation = useMemo(() => {
        // OUSL Honours GPA Rules:
        // Consider best 80 credits from Level 4, 5, 6.
        // Priority: (i) Compulsory L5/6, (ii) Elective L5/6, (iii) Compulsory L4
        
        const gpaCourses = completedCourseDetails
            .filter(c => c.level >= 4)
            .map(c => ({
                ...c,
                gpv: completedCourses[c.code] || 0
            }))
            .sort((a, b) => {
                // First by Level (higher first for simplicity/priority)
                if (b.level !== a.level) return b.level - a.level
                // Then by GPV (best grades first)
                return b.gpv - a.gpv
            })

        let totalCredits = 0
        let weightedSum = 0
        const limit = 80

        for (const c of gpaCourses) {
            const remaining = limit - totalCredits
            if (remaining <= 0) break
            
            const used = Math.min(c.credits, remaining)
            weightedSum += used * c.gpv
            totalCredits += used
        }

        return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00"
    }, [completedCourseDetails, completedCourses])

    const progressStats = useMemo(() => {
        const combinedCodes = Array.from(new Set([...Object.keys(userPlan), ...Object.keys(completedCourses)]))
        const combined = allCourses.filter(c => combinedCodes.includes(c.code))
        
        const totalCredits = combined.reduce((sum, c) => sum + c.credits, 0)
        const l56Credits = combined.filter(c => c.level >= 5).reduce((sum, c) => sum + c.credits, 0)
        const l6Credits = combined.filter(c => c.level === 6).reduce((sum, c) => sum + c.credits, 0)

        const categoryBreakdown = combined.reduce((acc, c) => {
            acc[c.category] = (acc[c.category] || 0) + c.credits
            return acc
        }, {} as Record<string, number>)

        return { totalCredits, l56Credits, l6Credits, categoryBreakdown }
    }, [allCourses, userPlan, completedCourses])

    // Actions
    const isCourseInSpec = useCallback((course: Course) => {
        return course.specializations.includes(selectedSpec) || course.specializations.length > 5
    }, [selectedSpec])

    const togglePlan = (code: string) => {
        const course = allCourses.find(c => c.code === code)
        if (!course) return

        if (userPlan[code] !== undefined) {
            const next = { ...userPlan }
            delete next[code]
            setUserPlan(next)
            toast.info(`Removed ${code} from plan.`)
        } else {
            if (!isCourseInSpec(course)) {
                toast.error(`Course ${code} is not part of ${selectedSpec}.`)
                return
            }
            setUserPlan({ ...userPlan, [code]: 1 })
            toast.success(`Added ${code} to plan.`)
        }
    }

    const setCourseSemester = (code: string, sem: number) => {
        setUserPlan({ ...userPlan, [code]: sem })
    }

    const toggleComplete = (code: string, gpv: number = 3.0) => {
        const course = allCourses.find(c => c.code === code)
        if (!course) return

        if (completedCourses[code] !== undefined) {
            const next = { ...completedCourses }
            delete next[code]
            setCompletedCourses(next)
        } else {
            if (!isCourseInSpec(course)) {
                toast.error(`Course ${code} is not part of ${selectedSpec}.`)
                return
            }
            setCompletedCourses({ ...completedCourses, [code]: gpv })
            // If completed, remove from plan
            const nextPlan = { ...userPlan }
            delete nextPlan[code]
            setUserPlan(nextPlan)
        }
    }

    const updateGrade = (code: string, gpv: number) => {
        setCompletedCourses({ ...completedCourses, [code]: gpv })
    }

    const resetData = () => {
        if (confirm("Are you sure you want to clear your plan and progress?")) {
            setUserPlan({})
            setCompletedCourses({})
            toast.success("All data cleared.")
        }
    }

    const backupData = () => {
        const data = {
            userPlan,
            completedCourses,
            selectedSpec,
            selectedProgrammeId,
            isNewStudent,
            version: "2.0",
            exportedAt: new Date().toISOString()
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `ousl_navigator_backup_${new Date().toISOString().split('T')[0]}.json`
        a.click()
        toast.success("Backup downloaded successfully.")
    }

    const restoreData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string)
                if (data.userPlan) setUserPlan(data.userPlan)
                if (data.completedCourses) setCompletedCourses(data.completedCourses)
                if (data.selectedSpec) setSelectedSpec(data.selectedSpec)
                if (data.selectedProgrammeId) setSelectedProgrammeId(data.selectedProgrammeId)
                if (data.isNewStudent !== undefined) setIsNewStudent(data.isNewStudent)
                toast.success("Data restored successfully.")
            } catch (err) {
                toast.error("Invalid backup file.")
            }
        }
        reader.readAsText(file)
    }

    // Fee Calculation
    const feeSummary = useMemo(() => {
        const tuition = plannedCourseDetails.reduce((sum, c) => {
            if (c.level === 2) return sum + (c.credits * FEES.LEVEL_2)
            if (c.level <= 4) return sum + (c.credits * FEES.LEVEL_3_4)
            return sum + (c.credits * FEES.LEVEL_5_6_7)
        }, 0)
        const fixed = FEES.REGISTRATION + FEES.FACILITIES + FEES.LIBRARY + (isNewStudent ? FEES.INSTRUMENT : 0)
        return { tuition, fixed, total: tuition + fixed }
    }, [plannedCourseDetails, isNewStudent])

    if (loading) return <Loading />

    return (
        <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center relative">
                    <Badge variant="outline" className="mb-4 py-1 px-4 text-primary border-primary/20 bg-primary/5">
                        BSc Hons (Eng) Edition
                    </Badge>
                    <h1 className="mb-4 text-4xl font-bold mozilla-headline tracking-tight">Engineering Student Navigator</h1>
                    
                    <div className="flex flex-col items-center justify-center gap-6 mt-8">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Field of Study:</Label>
                            <Select value={selectedSpec} onValueChange={setSelectedSpec}>
                                <SelectTrigger className="w-full md:w-[320px] h-12 text-base font-bold bg-card/50 backdrop-blur-md border-primary/20 rounded-2xl shadow-sm">
                                    <SelectValue placeholder="Select Your Specialization" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-primary/10">
                                    {Array.from(new Set(allCourses.flatMap(c => c.specializations))).sort().map(s => (
                                        <SelectItem key={s} value={s} className="rounded-lg">{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 p-1 bg-card/30 backdrop-blur-sm border border-primary/10 rounded-full shadow-inner">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all" onClick={backupData}>
                                            <Download className="h-3.5 w-3.5" /> Export Data
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">Download JSON backup of your plan</TooltipContent>
                                </Tooltip>
                                
                                <div className="w-[1px] h-4 bg-primary/10 self-center mx-1" />

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="relative">
                                            <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 rounded-full text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all relative">
                                                <Upload className="h-3.5 w-3.5" /> Import Data
                                                <input 
                                                    type="file" 
                                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                                    onChange={restoreData}
                                                    accept=".json"
                                                />
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">Upload a previous backup file</TooltipContent>
                                </Tooltip>

                                <div className="w-[1px] h-4 bg-primary/10 self-center mx-1" />

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-9 px-4 gap-2 rounded-full text-xs font-bold text-red-500/70 hover:bg-red-500/10 hover:text-red-600 transition-all" onClick={resetData}>
                                            <Trash2 className="h-3.5 w-3.5" /> Clear All
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">Permanently delete your local progress</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Sidebar / Overview */}
                    <div className="space-y-6">
                        <Card className="border-primary/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">My Programme</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Select value={selectedProgrammeId} onValueChange={setSelectedProgrammeId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {programmes.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <div className="mt-4 pt-4 border-t border-border space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>Progress:</span>
                                        <span className="font-bold">{progressStats.totalCredits} / {currentProgramme?.min_credits} cr</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary" 
                                            style={{ width: `${Math.min(100, (progressStats.totalCredits / (currentProgramme?.min_credits || 140)) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Wallet className="h-4 w-4 text-primary" /> Estimated Fees
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Planned Credits:</span>
                                    <span className="font-bold">{plannedCourseDetails.reduce((s, c) => s + c.credits, 0)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-primary">
                                    <span>Total:</span>
                                    <span className="mozilla-headline">Rs. {feeSummary.total.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground leading-tight italic pt-2">
                                    Includes tuition for planned courses and fixed annual fees.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="rounded-2xl border border-border p-4 bg-background/50 backdrop-blur-sm space-y-4">
                            <h4 className="text-xs font-black uppercase text-muted-foreground">Quick Shortcuts</h4>
                            <div className="grid gap-2">
                                <Button variant="ghost" className="justify-start gap-2 h-8 text-xs" onClick={() => setActiveTab("audit")}>
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Degree Audit
                                </Button>
                                <Button variant="ghost" className="justify-start gap-2 h-8 text-xs" onClick={() => setActiveTab("planner")}>
                                    <Calendar className="h-3.5 w-3.5" /> Semester Planner
                                </Button>
                                <Button variant="ghost" className="justify-start gap-2 h-8 text-xs" asChild>
                                    <a href="/articles/ousl-engineering-student-guide"><FileText className="h-3.5 w-3.5" /> Full Guide</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <TabsList className="bg-card border border-border h-auto p-1">
                                <TabsTrigger value="dashboard" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</TabsTrigger>
                                <TabsTrigger value="planner" className="gap-2"><Map className="h-4 w-4" /> Planner</TabsTrigger>
                                <TabsTrigger value="audit" className="gap-2"><GraduationCap className="h-4 w-4" /> Audit</TabsTrigger>
                                <TabsTrigger value="courses" className="gap-2"><Search className="h-4 w-4" /> Courses</TabsTrigger>
                                <TabsTrigger value="gpa" className="gap-2"><TrendingUp className="h-4 w-4" /> GPA Calc</TabsTrigger>
                            </TabsList>

                            {/* Dashboard View */}
                            <TabsContent value="dashboard" className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs font-bold uppercase">Actual GPA</CardTitle></CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="text-3xl font-black text-primary">{gpaCalculation}</div>
                                            <p className="text-[10px] text-muted-foreground">Based on completed L4-6</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs font-bold uppercase">Planned Credits</CardTitle></CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="text-3xl font-black">{plannedCourseDetails.length}</div>
                                            <p className="text-[10px] text-muted-foreground">Courses added to roadmap</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs font-bold uppercase">Completed</CardTitle></CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="text-3xl font-black">{Object.keys(completedCourses).length}</div>
                                            <p className="text-[10px] text-muted-foreground">Courses marked as passed</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Category Breakdown</CardTitle>
                                        <CardDescription>Visualizing your progress across OUSL course categories.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {Object.entries(currentProgramme?.categories || {}).map(([cat, req]: [string, any]) => {
                                                const current = progressStats.categoryBreakdown[cat] || 0
                                                const percent = (current / req.min) * 100
                                                return (
                                                    <div key={cat} className="space-y-1">
                                                        <div className="flex justify-between text-xs font-bold">
                                                            <span>{CATEGORIES[cat] || cat} ({cat})</span>
                                                            <span>{current} / {req.min} cr</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full transition-all duration-500 ${percent >= 100 ? 'bg-emerald-500' : 'bg-primary'}`} 
                                                                style={{ width: `${Math.min(100, percent)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Planner View */}
                            <TabsContent value="planner" className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold mozilla-headline">My Registration Roadmap</h3>
                                        <p className="text-sm text-muted-foreground">Drag courses here to plan your semesters.</p>
                                    </div>
                                    <div className="flex gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 items-center">
                                        <AlertCircle className="h-4 w-4" /> Max 38 cr / Year
                                    </div>
                                </div>
                                
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h4 className="font-bold flex items-center gap-2"><History className="h-4 w-4 text-primary" /> Planned Courses</h4>
                                        {plannedCourseDetails.length === 0 ? (
                                            <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl text-muted-foreground text-sm">
                                                No courses planned yet. Search and add courses from the "Courses" tab.
                                            </div>
                                        ) : (
                                            <div className="grid gap-3">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                                                    const semCourses = plannedCourseDetails.filter(c => userPlan[c.code] === sem)
                                                    if (semCourses.length === 0 && ![1, 2].includes(sem)) return null
                                                    return (
                                                        <div key={sem} className="space-y-2">
                                                            <div className="flex justify-between items-center px-2">
                                                                <h5 className="text-[10px] font-black uppercase text-muted-foreground">Semester {sem}</h5>
                                                                <span className="text-[10px] font-bold text-primary">{semCourses.reduce((s, c) => s + c.credits, 0)} Credits</span>
                                                            </div>
                                                            {semCourses.map(c => (
                                                                <div key={c.code} className="p-3 bg-card border border-border rounded-xl flex justify-between items-center group">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[10px] font-black text-primary px-1 bg-primary/10 rounded">{c.code}</span>
                                                                            <span className="text-[10px] text-muted-foreground font-bold">L{c.level} | {c.credits} cr</span>
                                                                        </div>
                                                                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{c.name}</p>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Select value={userPlan[c.code].toString()} onValueChange={(v) => setCourseSemester(c.code, parseInt(v))}>
                                                                            <SelectTrigger className="h-7 w-16 text-[10px] font-bold">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {[1,2,3,4,5,6,7,8].map(s => <SelectItem key={s} value={s.toString()} className="text-[10px]">Sem {s}</SelectItem>)}
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => togglePlan(c.code)}>
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Card className="h-fit">
                                        <CardHeader>
                                            <CardTitle className="text-base">Prerequisite Checker</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {plannedCourseDetails.map(c => {
                                                if (c.prerequisites === "None") return null;
                                                // Simple checker logic
                                                const hasPrereq = Object.keys(completedCourses).some(cc => c.prerequisites.includes(cc))
                                                return (
                                                    <div key={c.code} className={`flex items-start gap-3 p-3 rounded-lg border ${hasPrereq ? 'bg-emerald-50/50 border-emerald-200 text-emerald-700' : 'bg-red-50/50 border-red-200 text-red-700'}`}>
                                                        {hasPrereq ? <CheckCircle2 className="h-4 w-4 mt-0.5" /> : <AlertCircle className="h-4 w-4 mt-0.5" />}
                                                        <div className="text-xs">
                                                            <p className="font-bold">{c.code} Prereq</p>
                                                            <p className="opacity-80">Requires: {c.prerequisites}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Audit View */}
                            <TabsContent value="audit" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5 text-primary" /> Degree Completion Audit
                                        </CardTitle>
                                        <CardDescription>Checking requirements for {currentProgramme?.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            <AuditCard 
                                                title="Total Credits" 
                                                current={progressStats.totalCredits} 
                                                target={currentProgramme?.min_credits || 140} 
                                            />
                                            {currentProgramme?.min_l56 && (
                                                <AuditCard 
                                                    title="Level 5 & 6" 
                                                    current={progressStats.l56Credits} 
                                                    target={currentProgramme.min_l56} 
                                                />
                                            )}
                                            {currentProgramme?.min_l6 && (
                                                <AuditCard 
                                                    title="Level 6 Only" 
                                                    current={progressStats.l6Credits} 
                                                    target={currentProgramme.min_l6} 
                                                />
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold border-b border-border pb-2">Category Status</h4>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {Object.entries(currentProgramme?.categories || {}).map(([cat, req]: [string, any]) => {
                                                    const current = progressStats.categoryBreakdown[cat] || 0
                                                    const isComplete = current >= req.min
                                                    return (
                                                        <div key={cat} className={`flex items-center justify-between p-3 rounded-xl border ${isComplete ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border bg-muted/20'}`}>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isComplete ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                                                    {isComplete ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-black text-xs">{cat}</span>}
                                                                </div>
                                                                <span className="text-sm font-bold">{CATEGORIES[cat] || cat}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm font-black">{current} <span className="text-xs text-muted-foreground font-normal">/ {req.min} cr</span></p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Target GPA Simulator View */}
                            <TabsContent value="gpa" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-primary" /> Honours GPA Calculator
                                        </CardTitle>
                                        <CardDescription>GPA is calculated based on your completed L4, L5, and L6 courses (best 80 credits).</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid gap-8 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold border-b pb-2">Completed L4-6 Grades</h4>
                                                {completedCourseDetails.filter(c => c.level >= 4).length === 0 ? (
                                                    <p className="text-xs text-muted-foreground italic">No L4-6 courses marked as completed yet.</p>
                                                ) : (
                                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                                        {completedCourseDetails.filter(c => c.level >= 4).map(c => (
                                                            <div key={c.code} className="flex justify-between items-center p-2 rounded bg-muted/30 border border-border">
                                                                <div>
                                                                    <p className="text-[10px] font-bold text-primary">{c.code}</p>
                                                                    <p className="text-xs font-medium truncate max-w-[150px]">{c.name}</p>
                                                                </div>
                                                                <Select 
                                                                    value={completedCourses[c.code].toFixed(1)} 
                                                                    onValueChange={(v) => updateGrade(c.code, parseFloat(v))}
                                                                >
                                                                    <SelectTrigger className="h-8 w-24">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {GRADES.map(g => (
                                                                            <SelectItem key={g.grade} value={g.gpv.toFixed(1)}>{g.grade} ({g.gpv.toFixed(1)})</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
                                                <p className="text-sm font-bold uppercase text-muted-foreground">Current Honours GPA</p>
                                                <div className="text-6xl font-black text-primary mozilla-headline">
                                                    {gpaCalculation}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-emerald-600">
                                                        {parseFloat(gpaCalculation) >= 3.7 ? "First Class Eligibility" :
                                                         parseFloat(gpaCalculation) >= 3.3 ? "Second Upper Eligibility" :
                                                         parseFloat(gpaCalculation) >= 3.0 ? "Second Lower Eligibility" : "Pass"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground">
                                                        Considering {completedCourseDetails.filter(c => c.level >= 4).reduce((s,c) => s+c.credits, 0)} credits.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>


                            {/* Course Browser View */}
                            <TabsContent value="courses" className="space-y-6">
                                <div className="space-y-4 bg-background p-6 rounded-2xl border border-border shadow-sm">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input 
                                                placeholder="Search by name or code..." 
                                                className="pl-10"
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 md:flex gap-2">
                                            <Select value={filterLevel} onValueChange={setFilterLevel}>
                                                <SelectTrigger className="w-[100px]"><SelectValue placeholder="Level" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Levels</SelectItem>
                                                    <SelectItem value="3">L3</SelectItem>
                                                    <SelectItem value="4">L4</SelectItem>
                                                    <SelectItem value="5">L5</SelectItem>
                                                    <SelectItem value="6">L6</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select value={filterDept} onValueChange={setFilterDept}>
                                                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Dept" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Depts</SelectItem>
                                                    {Object.entries(DEPARTMENTS).map(([k, v]) => (
                                                        <SelectItem key={k} value={k}>{k} - {v.split(' ')[0]}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Category" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Cats</SelectItem>
                                                    {Object.entries(CATEGORIES).map(([k,v]) => <SelectItem key={k} value={k}>{k} - {v}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourseList.map(c => (
                                        <Card key={c.code} className="overflow-hidden hover:border-primary/50 transition-all group h-fit">
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="outline" className="font-local-jetbrains-mono border-primary/20 text-primary">{c.code}</Badge>
                                                    <div className="flex gap-1">
                                                        <Badge variant="secondary" className="text-[10px]">L{c.level}</Badge>
                                                        <Badge variant="secondary" className="text-[10px]">{c.credits}cr</Badge>
                                                    </div>
                                                </div>
                                                <h4 className="font-bold leading-tight group-hover:text-primary transition-colors min-h-[40px]">{c.name}</h4>
                                                
                                                <div className="pt-2 border-t border-border flex justify-between items-center">
                                                    <div className="flex gap-2">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button 
                                                                        variant={userPlan[c.code] !== undefined ? "default" : "outline"} 
                                                                        size="sm" 
                                                                        className="h-8 w-8 p-0"
                                                                        onClick={() => togglePlan(c.code)}
                                                                        aria-label="Plan this course"
                                                                    >
                                                                        {userPlan[c.code] !== undefined ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent side="top">Plan this course</TooltipContent>
                                                            </Tooltip>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button 
                                                                        variant={completedCourses[c.code] !== undefined ? "default" : "outline"} 
                                                                        size="sm" 
                                                                        className={`h-8 w-8 p-0 ${completedCourses[c.code] !== undefined ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500' : ''}`}
                                                                        onClick={() => toggleComplete(c.code)}
                                                                        aria-label="Mark as completed"
                                                                    >
                                                                        <CheckCircle2 className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent side="top">Mark as completed</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    <Badge className="text-[10px] bg-muted text-muted-foreground hover:bg-muted">{c.dept}</Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="mt-20 p-8 rounded-[40px] border border-primary/20 bg-primary/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-primary/10 transition-transform group-hover:scale-110 duration-500">
                        <GraduationCap className="h-48 w-48" />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-2xl font-bold mozilla-headline mb-4">Engineering Career Path</h2>
                        <p className="text-muted-foreground mb-6 roboto">
                            The Faculty of Engineering Technology at OUSL provides a path to recognized corporate membership with IESL. Our navigator ensures you maintain the required credit distribution for a high-impact engineering career.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button className="rounded-full gap-2" asChild>
                                <a href="/tools">View More Tools <ArrowUpRight className="h-4 w-4" /></a>
                            </Button>
                            <Button variant="outline" className="rounded-full gap-2" asChild>
                                <a href="/contact">Support Cell <Info className="h-4 w-4" /></a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}

function AuditCard({ title, current, target }: { title: string, current: number, target: number }) {
    const isComplete = current >= target
    return (
        <div className={`p-5 rounded-2xl border ${isComplete ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-card border-border'}`}>
            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">{title}</p>
            <div className="flex justify-between items-end">
                <p className={`text-2xl font-black ${isComplete ? 'text-emerald-600' : 'text-foreground'}`}>
                    {current} <span className="text-sm font-normal text-muted-foreground">/ {target}</span>
                </p>
                {isComplete && <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />}
            </div>
            <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-700 ${isComplete ? 'bg-emerald-500' : 'bg-primary'}`}
                    style={{ width: `${Math.min(100, (current/target)*100)}%` }}
                />
            </div>
        </div>
    )
}
