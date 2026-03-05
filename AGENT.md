# Claware.ai - Project Context

## Product Overview

**Claware.ai** is a deployment platform that helps users quickly deploy **OpenClaw** - an AI assistant that actually gets things done through popular messaging apps.

### Core Value Proposition
- **Mission**: Enable anyone to deploy their own AI assistant in minutes
- **Target Users**: Non-developers and people without technical backgrounds who want AI automation
- **Key Differentiator**: Open-source, deployable via WhatsApp/Telegram/any chat app you already use

### OpenClaw Features (Product Being Deployed)
- Clears your inbox automatically
- Sends emails on your behalf
- Manages your calendar and scheduling
- Checks you in for flights
- Works through WhatsApp, Telegram, or any chat application

### Claware Features (Deployment Platform)
- **Zero-Setup Deployment**: Pick a model, choose a channel, and deploy with Claware — no server setup, no code, no configuration
- **Fully Managed Service**: No technical knowledge required — we handle the install, hardening, integrations, and ongoing care so you can focus on running your business
- **Security-First Defaults**: Pre-configured security settings and SKILLS Agent out of the box — safe and ready to use from minute one

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| React | React | 19.2.3 |
| Styling | Tailwind CSS | v4 |
| Language | TypeScript | 5.x |
| Font | Geist (Vercel) | via next/font |
| Icons | Lucide React | (to be added) |
| Build Output | Static Export | configured |

---

## Project Structure

```
claware.ai/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with Geist font
│       ├── page.tsx        # Landing page (to implement)
│       └── globals.css     # Global styles + Tailwind
├── public/
│   └── (static assets)
├── next.config.ts          # Next.js configuration
├── package.json
├── tsconfig.json
└── AGENT.md               # This file
```

---

## Design System

### Color Palette
- **Primary Red**: `#E53935` or `rgb(229, 57, 53)` - Brand color, CTA buttons
- **Background Light**: `#FAFAFA` or `bg-zinc-50` - Page background
- **Background White**: `#FFFFFF` - Cards, sections
- **Text Primary**: `#18181B` or `text-zinc-900` - Headlines
- **Text Secondary**: `#52525B` or `text-zinc-600` - Body text
- **Text Muted**: `#A1A1AA` or `text-zinc-400` - Captions
- **Border**: `#E4E4E7` or `border-zinc-200` - Card borders

### Typography
- **Font Family**: Geist Sans (body), Geist Mono (code/mono)
- **Hero Title**: text-5xl / 3rem, font-bold, tracking-tight
- **Section Title**: text-2xl / 1.5rem, font-semibold
- **Body**: text-base / 1rem, leading-relaxed
- **Small/Caption**: text-sm / 0.875rem

### Spacing & Layout
- **Max Width**: max-w-6xl (1152px) for content
- **Section Padding**: py-16 to py-24
- **Card Padding**: p-6
- **Gap**: gap-4 (16px) standard, gap-8 (32px) for sections
- **Border Radius**: rounded-2xl for cards, rounded-full for buttons

---

## Landing Page Architecture

Based on the reference design, the homepage should include:

### 1. Hero Section
- **Logo**: Red crab/claw mascot (SVG)
- **Headline**: "OpenClaw" - large, bold, brand red color
- **Tagline**: "THE AI THAT ACTUALLY DOES THINGS."
- **Description**: "Clears your inbox, sends emails, manages your calendar, checks you in for flights. All from WhatsApp, Telegram, or any chat app you already use."
- **CTA Button**: "Deploy Your OpenClaw" or "Get Started"

### 2. Announcement Banner (News)
- Badge with "NEW" label
- Text: "OpenClaw Partners with VirusTotal for Skill Security"
- Arrow icon linking to blog post
- Pill-shaped container with subtle border

### 3. Testimonials Section ("What People Say")
- Section header with arrow icon
- "View all" link
- Horizontal scrolling card grid
- Each card contains:
  - User avatar (circular)
  - Quote text (truncated with ellipsis)
  - Twitter handle (@username) in brand red

### 4. Features Grid (To Add)
- Deploy in minutes
- WhatsApp/Telegram integration
- Privacy-first design
- Open source

### 5. CTA Section
- "Ready to deploy your AI assistant?"
- Primary CTA button
- Secondary link to documentation

---

## Key Implementation Notes

### Icons Required
```bash
npm install lucide-react
```
- ArrowRight (for links)
- ChevronRight (for navigation)
- MessageCircle (for WhatsApp/Telegram)
- Mail (for email feature)
- Calendar (for calendar feature)
- Plane (for flight check-in)
- Sparkles (for AI features)

### Images Required
1. **Logo/Mascot**: Red crab/claw character (create as SVG or use placeholder)
2. **User Avatars**: Circular profile images for testimonials (can use placeholders)

### Animation Considerations
- Subtle fade-in on scroll for sections
- Hover states on cards (slight elevation/shadow)
- Smooth transitions (transition-all duration-300)

---

## SEO & Meta

```typescript
export const metadata: Metadata = {
  title: "Claware.ai - Deploy OpenClaw | AI That Actually Does Things",
  description: "Deploy your own AI assistant in minutes. OpenClaw clears your inbox, sends emails, manages your calendar, and checks you in for flights via WhatsApp or Telegram.",
  keywords: ["OpenClaw", "AI assistant", "WhatsApp bot", "Telegram bot", "deploy AI", "automation"],
};
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

---

## References & Resources

- **OpenClaw**: https://github.com/undaunted-inspired/OpenClaw
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind v4 Docs**: https://tailwindcss.com/docs
- **Design Reference**: (see attached screenshot)
