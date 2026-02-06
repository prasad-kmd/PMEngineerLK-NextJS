import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer for the engineering documentation platform.",
}

export default function DisclaimerPage() {
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
          <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold mozilla-headline">Disclaimer</h1>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p>
            The information provided on this engineering documentation platform is for general informational and educational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Professional Disclaimer</h2>
          <p>
            The site cannot and does not contain engineering advice. The engineering information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of engineering advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">External Links Disclaimer</h2>
          <p>
            The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
          </p>

          <h2 className="text-foreground font-bold text-xl mt-8">Errors and Omissions Disclaimer</h2>
          <p>
            While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, we are not responsible for any errors or omissions, or for the results obtained from the use of this information.
          </p>
        </div>
      </div>
    </div>
  )
}
