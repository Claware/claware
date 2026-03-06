'use client';

import { useState } from 'react';
import { Zap, Bot, MessageCircle, Smartphone, Mail, Check, Sparkles, Brain, MessageSquare, Layers } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Model options with distinctive icons
const models = [
  { id: 'opus', name: 'Claude Opus 4.5', icon: Brain, color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-600' },
  { id: 'gpt4', name: 'GPT-4o', icon: Sparkles, color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-600' },
  { id: 'gemini', name: 'Gemini 2.5 Pro', icon: Layers, color: 'from-blue-500/20 to-indigo-500/20', iconColor: 'text-blue-600' },
];

// Channel options
const channels = [
  { id: 'telegram', name: 'Telegram', icon: MessageCircle, available: true },
  { id: 'discord', name: 'Discord', icon: MessageSquare, available: false },
  { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone, available: false },
  { id: 'email', name: 'Email', icon: Mail, available: false },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('opus');
  const [selectedChannel, setSelectedChannel] = useState('telegram');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState<string | null>(null);

  const handleSignInWithGoogle = async () => {
    localStorage.setItem('selectedModel', selectedModel);
    localStorage.setItem('selectedChannel', selectedChannel);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex flex-col relative overflow-hidden">
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 via-orange-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-100/20 via-rose-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full px-6 py-4 relative z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 transition-all duration-300 group-hover:shadow-rose-500/30 group-hover:scale-105">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold text-stone-800 group-hover:text-rose-600 transition-colors duration-300">Claware</span>
          </a>

          <a
            href="mailto:support@claware.ai"
            className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-rose-600 transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Support</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        <div className="max-w-2xl mx-auto px-6 py-6 md:py-8 w-full">
          {/* Hero Section - Compact */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/50 shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-medium text-stone-600">No coding required</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight leading-[1.15] mb-3 text-balance">
              Deploy your OpenClaw in minutes
            </h1>
            
            <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed text-balance">
              Your own 24/7 OpenClaw on a dedicated server. No setup, no config files — just works.
            </p>
          </div>

          {/* Model Selection - Compact Cards */}
          <div className="mb-5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              <Brain className="w-3.5 h-3.5" />
              AI Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  onMouseEnter={() => setIsHovered(model.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onMouseDown={() => setIsPressed(model.id)}
                  onMouseUp={() => setIsPressed(null)}
                  className={`
                    relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F5]
                    ${selectedModel === model.id
                      ? 'border-rose-500/60 bg-white shadow-md shadow-rose-500/10'
                      : 'border-stone-200/60 bg-white/50 hover:border-stone-300 hover:bg-white hover:shadow-sm'
                    }
                    ${isPressed === model.id ? 'scale-[0.98]' : ''}
                  `}
                >
                  {/* Selection indicator */}
                  <div className={`
                    absolute top-2 right-2 w-4 h-4 rounded-full border-2 transition-all duration-200
                    ${selectedModel === model.id
                      ? 'border-rose-500 bg-rose-500'
                      : 'border-stone-300 group-hover:border-stone-400'
                    }
                  `}>
                    {selectedModel === model.id && (
                      <Check className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" strokeWidth={3} />
                    )}
                  </div>

                  {/* Icon with gradient background */}
                  <div className={`
                    w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                    bg-gradient-to-br ${model.color}
                    ${isHovered === model.id ? 'scale-110' : ''}
                  `}>
                    <model.icon className={`w-4.5 h-4.5 ${model.iconColor}`} />
                  </div>

                  <span className="font-medium text-stone-900 text-xs">{model.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Channel Selection - Compact Cards */}
          <div className="mb-6">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              <MessageCircle className="w-3.5 h-3.5" />
              Messaging Channel
            </label>
            <div className="grid grid-cols-4 gap-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  disabled={!channel.available}
                  onClick={() => channel.available && setSelectedChannel(channel.id)}
                  onMouseEnter={() => channel.available && setIsHovered(channel.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onMouseDown={() => channel.available && setIsPressed(channel.id)}
                  onMouseUp={() => setIsPressed(null)}
                  className={`
                    relative group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F5]
                    ${!channel.available ? 'opacity-40 cursor-not-allowed border-stone-200/40 bg-stone-100/50' : ''}
                    ${channel.available && selectedChannel === channel.id
                      ? 'border-rose-500/60 bg-white shadow-md shadow-rose-500/10'
                      : channel.available
                        ? 'border-stone-200/60 bg-white/50 hover:border-stone-300 hover:bg-white hover:shadow-sm'
                        : ''
                    }
                    ${isPressed === channel.id ? 'scale-[0.98]' : ''}
                  `}
                >
                  {/* Selection indicator (only for available) */}
                  {channel.available && (
                    <div className={`
                      absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200
                      ${selectedChannel === channel.id
                        ? 'border-rose-500 bg-rose-500'
                        : 'border-stone-300 group-hover:border-stone-400'
                      }
                    `}>
                      {selectedChannel === channel.id && (
                        <Check className="w-2 h-2 text-white absolute inset-0 m-auto" strokeWidth={3} />
                      )}
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300
                    ${selectedChannel === channel.id && channel.available
                      ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20'
                      : 'bg-stone-100 group-hover:bg-stone-200'
                    }
                    ${isHovered === channel.id ? 'scale-110' : ''}
                  `}>
                    <channel.icon className={`
                      w-3.5 h-3.5 transition-colors duration-200
                      ${selectedChannel === channel.id && channel.available
                        ? 'text-rose-600'
                        : 'text-stone-500 group-hover:text-stone-600'
                      }
                    `} />
                  </div>

                  <div className="text-center">
                    <span className="font-medium text-stone-900 text-xs block">{channel.name}</span>
                    {!channel.available && (
                      <span className="text-[9px] text-stone-500 font-medium">Soon</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-3">
            <button
              onClick={handleSignInWithGoogle}
              onMouseEnter={() => setIsHovered('cta')}
              onMouseLeave={() => setIsHovered(null)}
              onMouseDown={() => setIsPressed('cta')}
              onMouseUp={() => setIsPressed(null)}
              className={`
                group w-full flex items-center justify-center gap-2.5 py-3.5 px-6
                bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900
                text-white rounded-xl font-semibold text-base
                shadow-lg shadow-stone-900/20
                transition-all duration-300 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F5]
                hover:shadow-xl hover:shadow-stone-900/30
                active:scale-[0.98]
                ${isPressed === 'cta' ? 'scale-[0.98]' : ''}
              `}
            >
              <Zap className={`
                w-4 h-4 text-amber-400 transition-all duration-300
                ${isHovered === 'cta' ? 'scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : ''}
              `} />
              Deploy My OpenClaw
            </button>

            <p className="text-center text-xs text-stone-500 flex items-center justify-center gap-2">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
               setup in minutes
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="text-stone-400">Google sign-in</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            © 2026 Claware
          </p>
          <div className="flex items-center gap-4">
            <a href="/#privacy" className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200">Privacy</a>
            <a href="/#terms" className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
