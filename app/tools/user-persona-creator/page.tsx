"use client"

import React, { useState, useRef } from "react"
import { Users, User, Target, AlertCircle, Quote, Download, Trash2, Plus, Briefcase, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Persona {
  name: string
  role: string
  age: string
  location: string
  bio: string
  goals: string[]
  painPoints: string[]
  motivations: string[]
}

const initialPersona: Persona = {
  name: "Alex Johnson",
  role: "Senior Project Manager",
  age: "34",
  location: "New York, USA",
  bio: "Alex is a results-driven professional with over 10 years of experience in leading cross-functional teams. They are always looking for ways to optimize workflow and improve team communication.",
  goals: ["Streamline project delivery", "Reduce meeting overhead"],
  painPoints: ["Lack of clear documentation", "Tool fragmentation"],
  motivations: ["Efficiency", "Team Growth"],
}

export default function UserPersonaCreator() {
  const [persona, setPersona] = useState<Persona>(initialPersona)
  const personaRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof Persona, value: string) => {
    setPersona((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: "goals" | "painPoints" | "motivations", index: number, value: string) => {
    const newArray = [...persona[field]]
    newArray[index] = value
    setPersona((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: "goals" | "painPoints" | "motivations") => {
    setPersona((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeArrayItem = (field: "goals" | "painPoints" | "motivations", index: number) => {
    setPersona((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }))
  }

  const handleExport = () => {
    // In a real app, we'd use html-to-image
    // For now, we'll trigger a print
    window.print()
    toast.success("Opening print dialog for export...")
  }

  return (
    <div className="min-h-screen pb-20 px-6 lg:px-8 pt-12 print:p-0">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Users className="h-3 w-3" />
            Engineering Tools
          </div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 amoriaregular">User Persona Creator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Design detailed user personas to better understand your target audience and build more empathetic engineering solutions.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Editor */}
          <div className="space-y-8 print:hidden">
            <Card className="p-6 border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 philosopher">
                <User className="h-5 w-5 text-primary" /> Basic Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={persona.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Occupation</Label>
                  <Input id="role" value={persona.role} onChange={(e) => handleInputChange("role", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" value={persona.age} onChange={(e) => handleInputChange("age", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={persona.location} onChange={(e) => handleInputChange("location", e.target.value)} />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 philosopher">
                <Quote className="h-5 w-5 text-primary" /> Bio & Background
              </h3>
              <Textarea 
                placeholder="Describe the persona's background, daily life, and professional context..."
                className="min-h-[120px]"
                value={persona.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            </Card>

            <div className="grid gap-6 md:grid-cols-1">
               {[
                 { title: "Goals", field: "goals", icon: Target, color: "text-green-500" },
                 { title: "Pain Points", field: "painPoints", icon: AlertCircle, color: "text-red-500" },
                 { title: "Motivations", field: "motivations", icon: Heart, color: "text-pink-500" },
               ].map((section) => (
                 <Card key={section.field} className="p-6 border-border bg-card/50 backdrop-blur-sm">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-bold flex items-center gap-2 philosopher">
                       <section.icon className={`h-5 w-5 ${section.color}`} /> {section.title}
                     </h3>
                     <Button variant="ghost" size="sm" onClick={() => addArrayItem(section.field as any)}>
                       <Plus className="h-4 w-4" />
                     </Button>
                   </div>
                   <div className="space-y-3">
                     {persona[section.field as keyof Persona] instanceof Array && (persona[section.field as keyof Persona] as string[]).map((item, idx) => (
                       <div key={idx} className="flex gap-2">
                         <Input 
                           value={item} 
                           onChange={(e) => handleArrayChange(section.field as any, idx, e.target.value)}
                           placeholder={`Add a ${section.title.toLowerCase()}...`}
                         />
                         <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeArrayItem(section.field as any, idx)}>
                           <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                         </Button>
                       </div>
                     ))}
                   </div>
                 </Card>
               ))}
            </div>

            <div className="flex justify-center pt-4">
               <Button size="lg" className="rounded-full px-12 font-bold" onClick={handleExport}>
                 <Download className="mr-2 h-5 w-5" />
                 Export Persona (PDF)
               </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="print:block" ref={personaRef}>
             <Card className="sticky top-24 overflow-hidden border-border bg-white dark:bg-zinc-950 shadow-2xl print:shadow-none print:border-none print:static">
                <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 flex items-end px-8 pb-4">
                   <div className="h-24 w-24 rounded-2xl bg-background border-4 border-white dark:border-zinc-950 flex items-center justify-center shadow-lg -mb-12">
                      <User className="h-12 w-12 text-primary" />
                   </div>
                </div>
                <div className="px-8 pt-16 pb-8">
                   <div className="mb-8">
                      <h2 className="text-3xl font-bold amoriaregular mb-1">{persona.name}</h2>
                      <p className="text-primary font-semibold flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {persona.role}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                         <span>Age: {persona.age}</span>
                         <span>Location: {persona.location}</span>
                      </div>
                   </div>

                   <div className="grid gap-8">
                      <section>
                         <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70 mb-3 google-sans">Background</h4>
                         <p className="text-sm leading-relaxed text-muted-foreground italic">
                           &quot;{persona.bio}&quot;
                         </p>
                      </section>

                      <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2">
                         <section>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-green-600/70 mb-3 google-sans">Goals</h4>
                            <ul className="space-y-2">
                               {persona.goals.map((goal, i) => (
                                 <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                   <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                   {goal}
                                 </li>
                               ))}
                            </ul>
                         </section>
                         <section>
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600/70 mb-3 google-sans">Pain Points</h4>
                            <ul className="space-y-2">
                               {persona.painPoints.map((point, i) => (
                                 <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                   <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                   {point}
                                 </li>
                               ))}
                            </ul>
                         </section>
                      </div>

                      <section>
                         <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600/70 mb-3 google-sans">Motivations</h4>
                         <div className="flex flex-wrap gap-2">
                            {persona.motivations.map((m, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold">
                                {m}
                              </span>
                            ))}
                         </div>
                      </section>
                   </div>
                </div>
                <div className="bg-muted/30 px-8 py-4 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                   <span>PERSONA GENERATED BY PM-ENGINEER TOOLS</span>
                   <span>© {new Date().getFullYear()}</span>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
