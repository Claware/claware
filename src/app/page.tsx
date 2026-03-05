'use client';

import { useState } from "react";
import { Zap, Bot, MessageCircle, Smartphone, Mail, Check, ChevronDown } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E53935]/10 text-[#E53935]">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-lg font-semibold text-zinc-900">Claware</span>
          </div>

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
            Select your AI model and messaging channel to get started
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

          {/* Google Sign In Button */}
          <a
            href="#"
            className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-white border border-zinc-200 rounded-xl font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </a>

          <p className="text-center text-sm text-zinc-500 mt-4">
            Sign in to deploy your OpenClaw and connect your channels.
          </p>
        </div>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="px-4 py-6 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <p className="text-sm text-zinc-500">
            © 2025 Claware. Deploy OpenClaw with one click.
          </p>
        </div>
      </footer>
    </div>
  );
}
