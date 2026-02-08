"use client"

import { useState, useEffect } from "react"
import { 
    Scaling, 
    ArrowRightLeft, 
    Ruler, 
    Weight, 
    Thermometer, 
    Gauge, 
    Zap, 
    RotateCcw,
    Clipboard,
    Check,
    ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { AIContentIndicator } from "@/components/ai-content-indicator"

type UnitCategory = "length" | "mass" | "temperature" | "pressure" | "energy" | "torque"

interface Unit {
    label: string
    value: string
    factor?: number // Conversion factor to base unit
    offset?: number // For temperature
}

const unitData: Record<UnitCategory, Unit[]> = {
    length: [
        { label: "Meters (m)", value: "m", factor: 1 },
        { label: "Kilometers (km)", value: "km", factor: 1000 },
        { label: "Centimeters (cm)", value: "cm", factor: 0.01 },
        { label: "Millimeters (mm)", value: "mm", factor: 0.001 },
        { label: "Inches (in)", value: "in", factor: 0.0254 },
        { label: "Feet (ft)", value: "ft", factor: 0.3048 },
        { label: "Yards (yd)", value: "yd", factor: 0.9144 },
        { label: "Miles (mi)", value: "mi", factor: 1609.34 },
    ],
    mass: [
        { label: "Kilograms (kg)", value: "kg", factor: 1 },
        { label: "Grams (g)", value: "g", factor: 0.001 },
        { label: "Milligrams (mg)", value: "mg", factor: 0.000001 },
        { label: "Pounds (lb)", value: "lb", factor: 0.453592 },
        { label: "Ounces (oz)", value: "oz", factor: 0.0283495 },
    ],
    temperature: [
        { label: "Celsius (°C)", value: "c", factor: 1, offset: 0 },
        { label: "Fahrenheit (°F)", value: "f" },
        { label: "Kelvin (K)", value: "k", factor: 1, offset: 273.15 },
    ],
    pressure: [
        { label: "Pascal (Pa)", value: "pa", factor: 1 },
        { label: "Kilopascal (kPa)", value: "kpa", factor: 1000 },
        { label: "Bar", value: "bar", factor: 100000 },
        { label: "PSI", value: "psi", factor: 6894.76 },
        { label: "Atmosphere (atm)", value: "atm", factor: 101325 },
    ],
    energy: [
        { label: "Joule (J)", value: "j", factor: 1 },
        { label: "Kilojoule (kJ)", value: "kj", factor: 1000 },
        { label: "Calories (cal)", value: "cal", factor: 4.184 },
        { label: "Kilocalories (kcal)", value: "kcal", factor: 4184 },
        { label: "Watt-hour (Wh)", value: "wh", factor: 3600 },
        { label: "Kilowatt-hour (kWh)", value: "kwh", factor: 3600000 },
    ],
    torque: [
        { label: "Newton-meter (N·m)", value: "nm", factor: 1 },
        { label: "Pound-foot (lb·ft)", value: "lbft", factor: 1.355818 },
        { label: "Kilogram-meter (kg·m)", value: "kgm", factor: 9.80665 },
    ]
}

const categories: { label: string; value: UnitCategory; icon: React.ElementType }[] = [
    { label: "Length", value: "length", icon: Ruler },
    { label: "Mass", value: "mass", icon: Weight },
    { label: "Temperature", value: "temperature", icon: Thermometer },
    { label: "Pressure", value: "pressure", icon: Gauge },
    { label: "Energy", value: "energy", icon: Zap },
    { label: "Torque", value: "torque", icon: RotateCcw },
]

export default function UnitConverterPage() {
    const [category, setCategory] = useState<UnitCategory>("length")
    const [fromUnit, setFromUnit] = useState(unitData["length"][0].value)
    const [toUnit, setToUnit] = useState(unitData["length"][1].value)
    const [fromValue, setFromValue] = useState("1")
    const [toValue, setToValue] = useState("")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        convert(fromValue, fromUnit, toUnit, category)
    }, [category, fromUnit, toUnit, fromValue])

    const convert = (val: string, from: string, to: string, cat: UnitCategory) => {
        const num = parseFloat(val)
        if (isNaN(num)) {
            setToValue("")
            return
        }

        let result = 0

        if (cat === "temperature") {
            let celsius = 0
            if (from === "c") celsius = num
            else if (from === "f") celsius = (num - 32) * 5 / 9
            else if (from === "k") celsius = num - 273.15

            if (to === "c") result = celsius
            else if (to === "f") result = (celsius * 9 / 5) + 32
            else if (to === "k") result = celsius + 273.15
        } else {
            const units = unitData[cat]
            const fromObj = units.find(u => u.value === from)
            const toObj = units.find(u => u.value === to)

            if (fromObj && toObj) {
                const baseValue = num * (fromObj.factor || 1)
                result = baseValue / (toObj.factor || 1)
            }
        }

        setToValue(parseFloat(result.toFixed(6)).toString())
    }

    const handleSwap = () => {
        const tempUnit = fromUnit
        setFromUnit(toUnit)
        setToUnit(tempUnit)
        setFromValue(toValue)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(toValue)
        setCopied(true)
        toast.success("Result copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleCategoryChange = (val: UnitCategory) => {
        setCategory(val)
        setFromUnit(unitData[val][0].value)
        setToUnit(unitData[val][1].value)
    }

    return (
        <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center lg:text-left">
                    <h1 className="mb-4 text-4xl font-bold mozilla-headline">Precision Unit Converter</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed local-inter">
                        Standardized metric and imperial unit conversions for engineering parameters.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Category Sidebar */}
                    <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategoryChange(cat.value)}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                                    category === cat.value
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                }`}
                            >
                                <cat.icon className="h-4 w-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Converter UI */}
                    <div className="lg:col-span-3">
                        <Card className="border-border bg-card/50 backdrop-blur-md">
                            <CardContent className="p-8">
                                <div className="grid gap-8">
                                    {/* From section */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">From</Label>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <input
                                                type="number"
                                                value={fromValue}
                                                onChange={(e) => setFromValue(e.target.value)}
                                                className="h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                placeholder="Enter value..."
                                            />
                                            <div className="relative">
                                                <select 
                                                    value={fromUnit} 
                                                    onChange={(e) => setFromUnit(e.target.value)}
                                                    className="h-12 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    {unitData[category].map((u) => (
                                                        <option key={u.value} value={u.value}>
                                                            {u.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="flex justify-center -my-4 relative z-10">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleSwap}
                                            className="h-10 w-10 rounded-full border-primary/20 bg-background shadow-md hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <ArrowRightLeft className="h-4 w-4 rotate-90 sm:rotate-0" />
                                        </Button>
                                    </div>

                                    {/* To section */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">To</Label>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="relative">
                                                <input
                                                    value={toValue}
                                                    readOnly
                                                    className="h-12 w-full rounded-md border border-input bg-muted/30 px-3 py-2 pr-10 text-lg font-mono focus-visible:outline-none"
                                                />
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <select 
                                                    value={toUnit} 
                                                    onChange={(e) => setToUnit(e.target.value)}
                                                    className="h-12 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    {unitData[category].map((u) => (
                                                        <option key={u.value} value={u.value}>
                                                            {u.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Engineering Note */}
                        <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                            <h3 className="mb-1 text-sm font-bold text-blue-500 flex items-center gap-2">
                                <Scaling className="h-4 w-4" />
                                Engineering Note
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Conversion factors are based on standard NIST values. For high-precision aerospace or medical applications, please verify with official IEEE-754 standards. Temperature conversions utilize absolute zero constants where applicable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <AIContentIndicator />
        </div>
    )
}
