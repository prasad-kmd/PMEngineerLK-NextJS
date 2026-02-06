import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the engineering documentation platform.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative border-b border-border h-[40vh] min-h-[300px]">
        <Image src="/img/page/workflow.webp" alt="Privacy Policy" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl amoriaregular">Privacy Policy</h1>
            <p className="mt-4 text-lg text-gray-200">
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link 
          href="/pages" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm m-0 italic text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
          </div>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 philosopher">Introduction</h2>
            <p>
              This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use our service and tells you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 philosopher">Information Collection</h2>
            <p>
              We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information in accordance with this Privacy Policy. 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage Data:</strong> Collected automatically when using the service, including IP addresses, browser types, and pages visited.</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and store certain information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 philosopher">How We Use Your Data</h2>
            <p>
              The company may use personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service, including to monitor the usage of our service.</li>
              <li>To manage your account and requests as a user of the service.</li>
              <li>To provide you with news, updates, and general information about other services or events which we offer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 philosopher">Security of Your Data</h2>
            <p>
              The security of your personal data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
