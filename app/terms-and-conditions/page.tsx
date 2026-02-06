import type { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for the engineering documentation platform.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 bg-background">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/pages" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Scale className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold mozilla-headline">Terms and Conditions</h1>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <p>
            Please read these terms and conditions carefully before using our service.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of this service and the agreement that operates between you and the company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the service.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Intellectual Property</h2>
          <p>
            The service and its original content (excluding content provided by you or other users), features and functionality are and will remain the exclusive property of the company and its licensors.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Limitation of Liability</h2>
          <p>
            In no event shall the company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury) arising out of or in any way related to the use of or inability to use the service.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Governing Law</h2>
          <p>
            The laws of the country, excluding its conflicts of law rules, shall govern this terms and your use of the service. Your use of the application may also be subject to other local, state, national, or international laws.
          </p>
        </div>
      </div>
    </div>
  )
}
