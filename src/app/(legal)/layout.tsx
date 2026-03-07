import { Metadata } from 'next';
import { Zap, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal - Claware',
  description: 'Terms of Service and Privacy Policy for Claware',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <header className="w-full px-6 py-4 relative z-10 border-b border-stone-200/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 transition-all duration-300 group-hover:shadow-rose-500/30 group-hover:scale-105">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-semibold text-stone-800 group-hover:text-rose-600 transition-colors duration-300">Claware</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/tos"
              className="text-sm text-stone-600 hover:text-rose-600 transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-stone-600 hover:text-rose-600 transition-colors duration-300"
            >
              Privacy
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 w-full">
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/60 p-8 md:p-12 shadow-sm">
            {children}
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 relative z-10 border-t border-stone-200/50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center rounded bg-gradient-to-br from-rose-500 to-orange-500 text-white">
              <Zap className="w-2.5 h-2.5" />
            </div>
            <span className="text-sm font-medium text-stone-700">Claware</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/tos" className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200">
              Privacy Policy
            </Link>
            <a 
              href="mailto:support@claware.ai" 
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition-colors duration-200"
            >
              <Mail className="w-3 h-3" />
              <span>Contact</span>
            </a>
          </div>
          
          <p className="text-xs text-stone-400">
            © 2026 Claware
          </p>
        </div>
      </footer>
    </div>
  );
}
