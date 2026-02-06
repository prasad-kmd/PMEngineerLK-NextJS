import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the engineering documentation platform.",
}

export default function PrivacyPolicyPage() {
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
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold mozilla-headline">Privacy Policy</h1>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <p>
            This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use our service and tells you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Information Collection</h2>
          <p>
            We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> Collected automatically when using the service.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service.</li>
          </ul>

          <h2 className="text-foreground font-bold text-xl mt-8">How We Use Your Data</h2>
          <p>
            The company may use personal data for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our service.</li>
            <li>To manage your account and requests.</li>
            <li>To provide you with news, special offers and general information.</li>
          </ul>

          <h2 className="text-foreground font-bold text-xl mt-8">Security of Your Data</h2>
          <p>
            The security of your personal data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>
        </div>
      </div>
    </div>
  )
}
