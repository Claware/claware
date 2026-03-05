# Stripe Checkout Integration Plan

> **Goal:** Integrate Stripe Checkout for subscription payments after Google OAuth login

**Architecture:** After successful Google authentication, redirect user to `/subscribe` page with a checkout button. Clicking the button creates a Stripe Checkout session and redirects to Stripe's hosted payment page.

**Tech Stack:** Next.js App Router, Stripe Checkout, Subscription mode

---

## Prerequisites

- [x] Stripe account created
- [x] Product and Price configured in Stripe Dashboard
- [x] Test API keys available (pk_test_*, sk_test_*)

---

## Implementation Steps

### Task 1: Install Stripe Dependencies

**Files:**
- Modify: `package.json`

**Command:**
```bash
npm install stripe
```

**Step 1: Run installation**

```bash
npm install stripe
```

**Step 2: Verify package.json**

Check for `stripe` in dependencies.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add stripe for checkout integration"
```

---

### Task 2: Create Stripe Library

**Files:**
- Create: `src/lib/stripe.ts`

**Step 1: Create server-only stripe client**

```typescript
import 'server-only';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
```

**Step 2: Commit**

```bash
git add src/lib/stripe.ts
git commit -m "feat: add stripe server client"
```

---

### Task 3: Create Checkout Session API Route

**Files:**
- Create: `src/app/api/checkout_sessions/route.ts`

**Step 1: Create POST route handler**

Creates a Checkout Session with:
- Mode: `subscription` (for recurring payments)
- Price ID from Stripe Dashboard
- Success URL: `/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/subscribe?canceled=true`

**Step 2: Commit**

```bash
git add src/app/api/checkout_sessions/route.ts
git commit -m "feat: add checkout session API route"
```

---

### Task 4: Update Auth Callback Redirect

**Files:**
- Modify: `src/app/auth/callback/route.ts`

**Step 1: Change redirect from `/dashboard` to `/subscribe`**

```typescript
const next = searchParams.get("next") ?? "/subscribe";
```

**Step 2: Commit**

```bash
git add src/app/auth/callback/route.ts
git commit -m "chore: redirect to subscribe page after auth"
```

---

### Task 5: Create Subscribe Page

**Files:**
- Create: `src/app/subscribe/page.tsx`
- Delete: `src/app/dashboard/page.tsx` (replaced)

**Step 1: Create subscribe page**

- Check authentication (redirect to `/` if not logged in)
- Show plan details (OpenClaw deployment)
- Display selected model & channel from localStorage
- Checkout button that POSTs to `/api/checkout_sessions`
- Handle `?canceled=true` param to show message

**Step 2: Remove old dashboard**

```bash
rm src/app/dashboard/page.tsx
```

**Step 3: Commit**

```bash
git add src/app/subscribe/page.tsx
git rm src/app/dashboard/page.tsx
git commit -m "feat: add subscribe page with stripe checkout"
```

---

### Task 6: Create Success Page

**Files:**
- Create: `src/app/success/page.tsx`

**Step 1: Create success page**

- Get `session_id` from search params
- Retrieve checkout session from Stripe
- Verify payment status is `complete`
- Show confirmation message with customer email
- Display deployment info

**Step 2: Commit**

```bash
git add src/app/success/page.tsx
git commit -m "feat: add checkout success page"
```

---

## Environment Variables

Add to `.env.local`:

```env
# Stripe Configuration
```

---

## Testing Checklist

- [ ] Google login redirects to `/subscribe`
- [ ] Subscribe page shows selected model/channel
- [ ] Click "Subscribe" creates Stripe session
- [ ] Redirected to Stripe hosted checkout
- [ ] Test card `4242 4242 4242 4242` succeeds
- [ ] Success page shows confirmation
- [ ] Cancel returns to `/subscribe?canceled=true` with message

---

## Flow

```
Google Login
  → /auth/callback (exchange code)
  → /subscribe (show plan & checkout button)
    → POST /api/checkout_sessions
    → Stripe Hosted Checkout
      → /success (payment complete)
      → /subscribe?canceled=true (user canceled)
```

---

## References

- Stripe Checkout Quickstart: https://docs.stripe.com/checkout/quickstart
- Test Cards: https://docs.stripe.com/testing
