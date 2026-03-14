'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Zap, Check, X, ExternalLink } from "lucide-react";
import { toast, Toaster } from "sonner";

function SubscribeContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  const [status, setStatus] = useState(isSuccess ? "completed" : "loading");
  const [botToken, setBotToken] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStatus, setConnectStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSuccess || isCanceled) {
      return; // Don't auto-redirect if showing success/canceled UI
    }

    const initCheckout = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/";
          return;
        }

        // Load selections from localStorage
        const model = localStorage.getItem("selectedModel") || "opus";
        const channel = localStorage.getItem("selectedChannel") || "telegram";
        const pricingType = localStorage.getItem("pricingType") || "cloud";

        setStatus("redirecting");

        // Create checkout session and redirect
        const response = await fetch("/api/checkout_sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model, channel, pricingType }),
        });

        if (!response.ok) {
          throw new Error("Failed to create checkout session");
        }

        const { url } = await response.json();

        if (url) {
          window.location.href = url;
        } else {
          throw new Error("No checkout URL received");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        setStatus("error");
      }
    };

    initCheckout();
  }, [isSuccess, isCanceled]);

  const handleConnect = async () => {
    if (!botToken.trim()) return;

    setIsConnecting(true);
    setConnectStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bot_token: botToken.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save bot token");
      }

      setConnectStatus("success");
    } catch (error) {
      console.error("Connect error:", error);
      setConnectStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to connect bot");
    } finally {
      setIsConnecting(false);
    }
  };

  // Success State - Show Channel Configuration
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-4 border-b border-zinc-200 bg-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E53935]/10 text-[#E53935]">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-semibold text-zinc-900">Claware</span>
            </div>
          </div>
        </header>

        {/* Success Banner */}
        <div className="bg-green-50 border-b border-green-100 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-green-900">Payment Successful!</h1>
              <p className="text-sm text-green-700">Your subscription is active. Now let&apos;s connect your channel.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Instructions & Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 mb-2">Connect Telegram</h2>
                  <p className="text-zinc-600">Follow these steps to get your bot token from BotFather.</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Open Telegram and go to @BotFather",
                      description: "Search for @BotFather in Telegram and start a chat.",
                    },
                    {
                      step: 2,
                      title: "Start a chat and type /newbot",
                      description: "This command creates a new bot.",
                    },
                    {
                      step: 3,
                      title: "Follow the prompts",
                      description: "Name your bot and choose a unique username ending in 'bot'.",
                    },
                    {
                      step: 4,
                      title: "Copy your bot token",
                      description: "BotFather will send you a message with your bot token. It looks like: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
                    },
                    {
                      step: 5,
                      title: "Paste the token below",
                      description: "Enter the token in the field and click Save & Connect.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-medium text-zinc-900">{item.title}</h3>
                        <p className="text-sm text-zinc-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://t.me/BotFather"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E53935] hover:underline text-sm"
                >
                  Open @BotFather in Telegram
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Bot Token Input - Moved to left bottom */}
                <div className="pt-4 border-t border-zinc-200">
                  <label className="text-sm font-medium text-zinc-700 mb-2 block">
                    Enter bot token
                  </label>
                  <input
                    type="text"
                    value={botToken}
                    onChange={(e) => {
                      setBotToken(e.target.value);
                      setConnectStatus("idle");
                      setErrorMessage("");
                    }}
                    placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      connectStatus === "error"
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : connectStatus === "success"
                          ? "border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                          : "border-zinc-200 focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/20"
                    }`}
                  />

                  {/* Status Messages */}
                  {connectStatus === "success" && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-green-600">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>We're setting up your OpenClaw. Watch your email for a notification when it's ready.</span>
                    </div>
                  )}

                  {connectStatus === "error" && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-red-600">
                      <X className="w-4 h-4 mt-0.5" />
                      <span>{errorMessage || "Failed to connect. Please check your token and try again."}</span>
                    </div>
                  )}

                  <button
                    onClick={handleConnect}
                    disabled={!botToken || isConnecting}
                    className="w-full mt-4 py-3 px-6 bg-[#E53935] text-white font-medium rounded-xl transition-all duration-200 hover:bg-[#C62828] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? "Connecting..." : "Save & Connect"}
                  </button>

                  <button
                    onClick={() => {
                      toast.success("We'll contact you via email shortly.");
                      setTimeout(() => {
                        window.location.href = "/";
                      }, 2000);
                    }}
                    className="w-full mt-3 py-3 px-6 bg-white text-stone-600 font-medium rounded-xl border border-stone-200 transition-all duration-200 hover:bg-stone-50 hover:border-stone-300"
                  >
                    Skip for now
                  </button>
                </div>
              </div>

              {/* Right - Screenshot Image Only */}
              <div className="flex items-start justify-center lg:justify-end">
                <div className="rounded-xl overflow-hidden shadow-2xl max-w-md w-full">
                  <img
                    src="/openclaw-telegram-bot-token.png"
                    alt="BotFather Telegram conversation showing how to create a bot and get the token"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Canceled State
  if (isCanceled) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mx-auto mb-6">
            <X className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">Order Canceled</h1>
          <p className="text-sm text-zinc-500 mb-6">
            Your payment was canceled. You can try again when you&apos;re ready.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="inline-flex items-center px-6 py-3 bg-[#E53935] text-white font-medium rounded-xl transition-all duration-200 hover:bg-[#C62828]"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Loading / Redirecting State
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E53935]/10 text-[#E53935] mx-auto mb-6">
          <Zap className="w-8 h-8" />
        </div>

        {status === "loading" && (
          <>
            <h1 className="text-xl font-semibold text-zinc-900 mb-2">Preparing your checkout</h1>
            <p className="text-sm text-zinc-500 mb-6">Just a moment...</p>
            <div className="w-8 h-8 border-2 border-[#E53935] border-t-transparent rounded-full animate-spin mx-auto" />
          </>
        )}

        {status === "redirecting" && (
          <>
            <h1 className="text-xl font-semibold text-zinc-900 mb-2">Redirecting to Stripe</h1>
            <p className="text-sm text-zinc-500">Secure payment page loading...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold text-zinc-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-zinc-500 mb-6">Unable to start checkout. Please try again.</p>
            <button
              onClick={() => window.location.href = "/"}
              className="inline-flex items-center px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Return Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E53935]/10 text-[#E53935]">
            <Zap className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      }>
        <SubscribeContent />
      </Suspense>
      <Toaster position="top-center" richColors />
    </>
  );
}
