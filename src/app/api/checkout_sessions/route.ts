import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Parse request body for model and channel
    const body = await request.json().catch(() => ({}));
    const { model, channel } = body;
    
    // Use the price ID from environment variables
    const priceId = process.env.STRIPE_PRICE_ID;
    
    if (!priceId) {
      throw new Error("STRIPE_PRICE_ID is not configured");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/subscribe?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscribe?canceled=true`,
      automatic_tax: { enabled: true },
      customer_email: user?.email,
      metadata: {
        model: model || "opus",
        channel: channel || "telegram",
        user_id: user?.id || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
