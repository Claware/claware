import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Parse request body for model, channel, and pricing type
    const body = await request.json().catch(() => ({}));
    const { model, channel, pricingType } = body;

    // Determine price ID based on pricing type
    // pricingType: 'cloud' | 'flashdrive'
    const priceId = pricingType === 'flashdrive'
      ? process.env.STRIPE_PRICE_ID_FLASHDRIVE
      : process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      throw new Error(`Price ID is not configured for ${pricingType || 'cloud'} deployment`);
    }

    // Determine mode based on pricing type
    // flashdrive = one-time payment for physical product
    // cloud = subscription for service
    const isFlashDrive = pricingType === 'flashdrive';

    const sessionConfig: any = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isFlashDrive ? "payment" : "subscription",
      success_url: `${origin}/subscribe?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscribe?canceled=true`,
      customer_email: user?.email,
      metadata: {
        model: model || "opus",
        channel: channel || "telegram",
        user_id: user?.id || "",
        pricing_type: pricingType || "cloud",
      },
    };

    // Only enable automatic tax for subscriptions
    if (!isFlashDrive) {
      sessionConfig.automatic_tax = { enabled: true };
    }

    // For flash drive, collect shipping address
    if (isFlashDrive) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'SG', 'HK'],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
