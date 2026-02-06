"use client"

import { useState, useCallback, useEffect } from "react"
import temml from "temml"
import "./temml.css"
import { Replace } from "lucide-react"
import PredefinedEquations from "@/components/tools/latex-mathml-converter/predefined-equations"
import EquationEditor from "@/components/tools/latex-mathml-converter/equation-editor"
import ActionButtons from "@/components/tools/latex-mathml-converter/action-buttons"
import MathMLModal from "@/components/tools/latex-mathml-converter/mathml-modal"

export default function LatexToMathmlPage() {
  const [latex, setLatex] = useState("E = mc^2")
  const [mathml, setMathml] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const convertLatexToMathML = useCallback((latexCode: string) => {
    if (!latexCode.trim()) {
      setMathml("")
      return
    }
    try {
      const mml = temml.renderToString(latexCode, {
        displayMode: true,
        xml: true
      })
      setMathml(mml)
    } catch (error) {
      console.error("Temml rendering error:", error)
      setMathml("error")
    }
  }, [])

  useEffect(() => {
    convertLatexToMathML(latex)
  }, [latex, convertLatexToMathML])

  const handleLatexChange = (value: string) => {
    setLatex(value)
  }

  const handleEquationSelect = (equation: string) => {
    setLatex(prev => prev + equation)
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 flex flex-col items-center">
      <div className="mx-auto max-w-5xl w-full space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-2 justify-center lg:justify-start text-foreground">
            <Replace className="h-8 w-8 text-purple-500" />
            MathML Integration Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-md shadow-xl">
            <PredefinedEquations onSelectEquation={handleEquationSelect} />
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-md shadow-xl">
            <EquationEditor
              latex={latex}
              mathml={mathml}
              onLatexChange={handleLatexChange}
            />
          </div>

          <ActionButtons
            mathml={mathml}
            latex={latex}
            onViewMathML={() => setIsModalOpen(true)}
          />
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400">
          <p><strong>Note:</strong> This tool uses TeMMl for high-performance MathML generation. MathML is widely supported by modern browsers and can be used in HTML for high-quality mathematical rendering without external libraries.</p>
        </div>
      </div>

      <MathMLModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mathml={mathml}
      />
    </div>
  )
}
