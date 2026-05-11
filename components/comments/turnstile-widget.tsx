"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { env } from "@/lib/env";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: (error?: unknown) => void;
  onExpire?: () => void;
}

export interface TurnstileWidgetRef {
  reset: () => void;
}

export const TurnstileWidget = forwardRef<
  TurnstileWidgetRef,
  TurnstileWidgetProps
>(({ onVerify, onError, onExpire }, ref) => {
  const { resolvedTheme } = useTheme();
  const turnstileRef = useRef<TurnstileInstance>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      turnstileRef.current?.reset();
    },
  }));

  const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Cloudflare Turnstile Site Key is missing. Using test key.");
      return (
        <div className="flex justify-start my-2 min-h-[65px]">
          <Turnstile
            ref={turnstileRef}
            siteKey="1x00000000000000000000AA"
            injectScript={true}
            options={{
              theme: (resolvedTheme as "light" | "dark") || "auto",
              size: "normal",
            }}
            onSuccess={onVerify}
            onError={onError}
            onExpire={onExpire}
          />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center p-4 my-2 min-h-[65px] rounded-xl border border-destructive/20 bg-destructive/5 text-destructive">
        <p className="text-xs font-bold">Configuration Error</p>
        <p className="text-[10px] opacity-70">
          Turnstile Site Key is missing. Please check your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-start my-2 min-h-[65px]">
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        injectScript={true}
        options={{
          theme: (resolvedTheme as "light" | "dark") || "auto",
          size: "normal",
        }}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
      />
    </div>
  );
});

TurnstileWidget.displayName = "TurnstileWidget";
