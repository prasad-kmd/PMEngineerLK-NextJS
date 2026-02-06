"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCcw, Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-32 lg:px-8">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--destructive)_0%,transparent_100%)] opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[100px]" />

      <div className="relative z-10 max-w-2xl">
        <div className="flex justify-center mb-6">
            <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
        </div>
        <p className="text-xl font-medium text-destructive mozilla-headline">System Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl amoriaregular">
          Something went wrong
        </h1>
        <p className="mt-6 text-lg leading-7 text-muted-foreground">
          An unexpected error has occurred. We&apos;ve been notified and are working to fix it.
          Please try refreshing the page or contact support if the problem persists.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => reset()}
            size="lg"
            className="rounded-full px-8 transition-all hover:scale-105"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-full px-8 transition-all hover:scale-105">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>

        {error.digest && (
            <p className="mt-8 text-xs text-muted-foreground/50 font-mono">
                Error ID: {error.digest}
            </p>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-destructive/5 blur-3xl" />
    </div>
  )
}
