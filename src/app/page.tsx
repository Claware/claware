'use client';

import { useState } from "react";
import { Zap, Bot, MessageCircle, Smartphone, Mail, Check, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Model options
const models = [
  { id: "opus", name: "Claude Opus 4.5", icon: Bot },
  { id: "gpt4", name: "GPT-4o", icon: Bot },
  { id: "gemini", name: "Gemini 2.5 Pro", icon: Bot },
];

// Channel options
const channels = [
  { id: "telegram", name: "Telegram", icon: MessageCircle, available: true },
  { id: "discord", name: "Discord", icon: Bot, available: false },
  { id: "whatsapp", name: "WhatsApp", icon: Smartphone, available: false },
  { id: "email", name: "Email", icon: Mail, available: false },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState("opus");
  const [selectedChannel, setSelectedChannel] = useState("telegram");

  const handleSignInWithGoogle = async () => {
    // Store user selections before OAuth redirect
    localStorage.setItem("selectedModel", selectedModel);
    localStorage.setItem("selectedChannel", selectedChannel);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E53935]/10 text-[#E53935] transition-transform group-hover:scale-105">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-lg font-semibold text-zinc-900 group-hover:text-[#E53935] transition-colors">Claware</span>
          </a>

          {/* Contact Support */}
          <a
            href="mailto:support@claware.ai"
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[#E53935] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto px-4 py-8 w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E53935]/10 text-[#E53935]">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-zinc-900 mb-2">
            Deploy Your OpenClaw in Minutes
          </h1>
          <p className="text-center text-zinc-500 mb-12">
            Skip the technical headaches.
            <br />
            Deploy your own 24/7 OpenClaw in minutes — no coding, no configuration, just one click.
          </p>

          {/* Model Selection - Horizontal Pills */}
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-700 mb-4">Which model do you want as default?</h2>
            <div className="flex flex-wrap gap-3">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    selectedModel === model.id
                      ? "border-[#E53935] bg-white shadow-sm"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-md ${
                      selectedModel === model.id ? "bg-[#E53935]/10 text-[#E53935]" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    <model.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-zinc-900 text-sm whitespace-nowrap">{model.name}</span>
                  {selectedModel === model.id ? (
                    <Check className="w-4 h-4 text-[#E53935]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Channel Selection - Horizontal Pills */}
          <div className="mb-10">
            <h2 className="text-sm font-medium text-zinc-700 mb-4">Which channel do you want to use for sending messages?</h2>
            <div className="flex flex-wrap gap-3">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  disabled={!channel.available}
                  onClick={() => channel.available && setSelectedChannel(channel.id)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    selectedChannel === channel.id
                      ? "border-[#E53935] bg-white shadow-sm"
                      : channel.available
                        ? "border-zinc-200 bg-white hover:border-zinc-300"
                        : "border-zinc-200 bg-zinc-50 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-md ${
                      selectedChannel === channel.id
                        ? "bg-[#E53935]/10 text-[#E53935]"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    <channel.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-zinc-900 text-sm whitespace-nowrap">{channel.name}</span>
                    {!channel.available && (
                      <span className="text-[10px] text-zinc-400 -mt-0.5">Coming soon</span>
                    )}
                  </div>
                  {selectedChannel === channel.id ? (
                    <Check className="w-4 h-4 text-[#E53935]" />
                  ) : channel.available ? (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 my-8" />

          {/* Deploy Button */}
          <button
            onClick={handleSignInWithGoogle}
            className="group cursor-pointer flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-zinc-900 text-white rounded-xl font-semibold transition-all duration-200 hover:bg-zinc-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5 text-[#E53935] group-hover:drop-shadow-[0_0_8px_rgba(229,57,53,0.6)] transition-all duration-300" />
            Deploy My OpenClaw
          </button>

          <p className="text-center text-sm text-zinc-500 mt-4">
            Secure sign-in with Google. Deploy in minutes.
          </p>
        </div>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="px-4 py-6 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <p className="text-sm text-zinc-500">
            © 2026 Claware.ai - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
