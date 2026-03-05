import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Validate Telegram bot token format: numbers:alphanumeric
const BOT_TOKEN_REGEX = /^\d+:[A-Za-z0-9_-]+$/;

// Extract bot name from token (everything after the colon, before any underscores or hyphens)
function extractBotName(token: string): string | null {
  const match = token.match(/^\d+:([A-Za-z0-9_-]+)$/);
  if (match) {
    // Return the name part (e.g., "Claware_bot" -> "Claware_bot")
    return match[1];
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { bot_token } = body;

    // Validate token
    if (!bot_token || typeof bot_token !== "string") {
      return NextResponse.json(
        { success: false, error: "Bot token is required" },
        { status: 400 }
      );
    }

    if (!BOT_TOKEN_REGEX.test(bot_token)) {
      return NextResponse.json(
        { success: false, error: "Invalid bot token format" },
        { status: 400 }
      );
    }

    // Extract bot name from token
    const botName = extractBotName(bot_token);

    // Check if user already has a telegram channel
    const { data: existingChannel } = await supabase
      .from("channels")
      .select("id")
      .eq("user_id", user.id)
      .eq("channel_type", "telegram")
      .single();

    let result;

    if (existingChannel) {
      // Update existing channel
      const { data, error } = await supabase
        .from("channels")
        .update({
          bot_token: bot_token,
          bot_name: botName,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingChannel.id)
        .select("id, channel_type, bot_name, is_active, created_at")
        .single();

      if (error) {
        console.error("Error updating channel:", error);
        return NextResponse.json(
          { success: false, error: "Failed to update channel" },
          { status: 500 }
        );
      }

      result = data;
    } else {
      // Insert new channel
      const { data, error } = await supabase
        .from("channels")
        .insert({
          user_id: user.id,
          channel_type: "telegram",
          bot_token: bot_token,
          bot_name: botName,
          is_active: true,
        })
        .select("id, channel_type, bot_name, is_active, created_at")
        .single();

      if (error) {
        console.error("Error creating channel:", error);
        return NextResponse.json(
          { success: false, error: "Failed to create channel" },
          { status: 500 }
        );
      }

      result = data;
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get user's channels
export async function GET() {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user's channels
    const { data: channels, error } = await supabase
      .from("channels")
      .select("id, channel_type, bot_name, is_active, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching channels:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch channels" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: channels || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
