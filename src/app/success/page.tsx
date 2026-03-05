import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Check, Zap, Mail, ExternalLink } from "lucide-react";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = searchParams;

  if (!session_id) {
    redirect("/subscribe");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "customer"],
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    redirect("/subscribe");
  }

  if (session.status === "open") {
    redirect("/subscribe");
  }

  if (session.status !== "complete") {
    redirect("/subscribe");
  }

  const customerEmail = session.customer_details?.email || "";

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E53935]/10 text-[#E53935]">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-lg font-semibold text-zinc-900">Claware</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-zinc-600 mb-6">
            Thank you for subscribing to Claware. Your OpenClaw deployment is being prepared.
          </p>

          {/* Confirmation Details */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 text-left mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-500">Confirmation sent to</p>
                  <p className="font-medium text-zinc-900">{customerEmail}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <h3 className="text-sm font-medium text-zinc-900 mb-3">What happens next?</h3>
                <ul className="space-y-2">
                  {[
                    "You'll receive setup instructions via email",
                    "Connect your Telegram bot (takes 2 minutes)",
                    "Start chatting with your OpenClaw",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-zinc-600">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-500 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-white border border-zinc-200 rounded-xl font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-300"
            >
              Manage Subscription
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full py-3 px-6 text-sm text-zinc-500 hover:text-[#E53935] transition-colors"
            >
              Return to Home
            </Link>
          </div>

          {/* Support */}
          <p className="text-xs text-zinc-400 mt-8">
            Questions? Contact us at{" "}
            <a href="mailto:support@claware.ai" className="text-[#E53935] hover:underline">
              support@claware.ai
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
