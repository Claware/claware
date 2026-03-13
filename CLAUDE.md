# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claware.ai is a deployment platform for OpenClaw - an AI assistant that integrates with messaging apps. Users can deploy their own AI assistant via Google OAuth, select AI models (Claude, GPT, Gemini), and connect messaging channels (Telegram, Discord, WhatsApp, Email).

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **React**: 19.2.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Font**: Geist (via next/font/google)
- **Icons**: Lucide React + @lobehub/icons for AI brand icons

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (legal)/           # Route group for legal pages
│   │   ├── [legal]/page.tsx   # Dynamic MDX renderer for terms/privacy
│   │   └── layout.tsx
│   ├── api/               # API routes
│   │   ├── checkout_sessions/   # Stripe checkout session creation
│   │   └── channels/            # Messaging channel configuration
│   ├── auth/              # Authentication callbacks and error pages
│   ├── blog/              # Blog listing page
│   ├── subscribe/         # Subscription page
│   ├── success/           # Payment success page
│   ├── layout.tsx         # Root layout with Geist font + structured data
│   ├── page.tsx           # Landing page with model/channel selection
│   ├── globals.css        # Tailwind v4 imports + custom utilities
│   ├── sitemap.ts         # Generated sitemap
│   └── robots.txt
├── components/            # React components (feature-organized)
│   └── blog/             # Blog-specific components
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase clients (client.ts, server.ts, middleware.ts)
│   ├── supabase.ts       # Legacy client export
│   ├── stripe.ts         # Server-only Stripe instance
│   └── utils.ts          # Tailwind merge utility (cn function)
├── data/                 # Static data
│   └── blog.ts          # Blog articles, authors, categories
├── content/             # MDX content
│   └── legal/           # Terms and privacy MDX files
└── middleware.ts        # Supabase auth session middleware
```

## Key Architecture Patterns

### Path Aliases
- `@/*` maps to `./src/*` - use for all imports from src

### Authentication Flow
- Google OAuth via Supabase Auth
- `src/middleware.ts` refreshes sessions on every request
- Auth callback handled at `/auth/callback/route.ts`
- User selections (model, channel) stored in localStorage before auth

### Payment Flow
- Stripe Checkout for subscriptions
- API endpoint: `POST /api/checkout_sessions`
- Metadata includes selected model, channel, and user_id
- Success redirect includes session_id for verification

### MDX Content
- MDX configured in `next.config.ts` with remark-gfm plugin
- Component mapping in `mdx-components.tsx` for consistent styling
- Legal pages use dynamic route `[legal]/page.tsx` to render MDX from `src/content/legal/`

### Design System
- Background: `#F8F7F5` (warm off-white)
- Primary accent: rose/orange gradient (`from-rose-500 to-orange-500`)
- Text primary: stone-900, secondary: stone-600, muted: stone-400
- Card style: white/80 background, stone-200/60 border, rounded-2xl
- Typography: Geist Sans (body), Geist Mono (code)

### State Management
- React useState for local UI state
- localStorage for persisting user selections pre-authentication
- Supabase for user session and auth state

## Environment Variables

Required variables (see `.env.local.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
NEXT_PUBLIC_APP_URL=
```

## Component Conventions

- Use `'use client'` directive for interactive components
- Icons from `lucide-react` or `@lobehub/icons` for AI brands
- Tailwind classes follow order: layout → spacing → appearance → interactions
- Button hover states use transition-all duration-200/300
- Use `cn()` utility from `lib/utils.ts` for conditional class merging

## API Route Patterns

- Use `createClient()` from `@/lib/supabase/server` for server-side auth
- Stripe routes are in `src/app/api/checkout_sessions/route.ts`
- Return `NextResponse.json()` for API responses
