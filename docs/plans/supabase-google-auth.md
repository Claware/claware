# Supabase Google Auth Integration Plan

> **Goal:** Implement Google OAuth authentication using Supabase Auth for the Claware deployment page

**Architecture:** Use PKCE flow with server-side session management. Store user selections (model/channel) in localStorage before OAuth redirect, restore them after successful authentication.

**Tech Stack:** Next.js App Router, Supabase Auth, Google OAuth 2.0, PKCE flow

---

## Prerequisites (Completed)
- [x] Google Cloud project created
- [x] OAuth 2.0 Client ID and Secret configured
- [x] Supabase project configured with Google provider
- [x] Redirect URI added: `http://localhost:3000/auth/callback`

---

## Implementation Steps

### Task 1: Install Supabase Dependencies

**Files:**
- Modify: `package.json`

**Command:**
```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Step 1: Run installation command**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Step 2: Verify installation**

Check `package.json` for:
- `@supabase/supabase-js`
- `@supabase/ssr`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add supabase auth dependencies"
```

---

### Task 2: Create Environment Variables Template

**Files:**
- Create: `.env.local.example`

**Step 1: Create environment template file**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Step 2: Commit**

```bash
git add .env.local.example
git commit -m "chore: add supabase env template"
```

---

### Task 3: Create Supabase Client Utilities

**Files:**
- Create: `src/lib/supabase/client.ts` - Browser client
- Create: `src/lib/supabase/server.ts` - Server client
- Create: `src/lib/supabase/middleware.ts` - Middleware helper

**Step 1: Create browser client**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Step 2: Create server client**

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}
```

**Step 3: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add supabase client utilities"
```

---

### Task 4: Create Auth Callback Route

**Files:**
- Create: `src/app/auth/callback/route.ts`

**Step 1: Create callback route handler**

```typescript
// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Return to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
```

**Step 2: Commit**

```bash
git add src/app/auth/callback/route.ts
git commit -m "feat: add auth callback route handler"
```

---

### Task 5: Update Landing Page with Auth Flow

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add state persistence before OAuth**

Store selected model/channel to localStorage before redirect:

```typescript
const handleSignInWithGoogle = async () => {
  // Store user selections before redirect
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
```

**Step 2: Replace button with working handler**

Change the Google Sign In button from `<a>` to `<button>` with onClick handler.

**Step 3: Test the flow**

1. Select a model (Claude Opus 4.5)
2. Select a channel (Telegram)
3. Click "Sign in with Google"
4. Verify redirect to Google OAuth

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate supabase google auth with state persistence"
```

---

### Task 6: Create Dashboard Page (Post-Auth)

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/middleware.ts`

**Step 1: Create protected dashboard page**

```typescript
// src/app/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <p>Your OpenClaw deployment is being prepared...</p>
    </div>
  );
}
```

**Step 2: Create middleware for session refresh**

```typescript
// src/middleware.ts
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

**Step 3: Commit**

```bash
git add src/app/dashboard/page.tsx src/middleware.ts
git commit -m "feat: add protected dashboard and auth middleware"
```

---

### Task 7: Create Error Page

**Files:**
- Create: `src/app/auth/auth-code-error/page.tsx`

**Step 1: Create error page**

Simple error page with link back to home.

**Step 2: Commit**

```bash
git add src/app/auth/auth-code-error/page.tsx
git commit -m "feat: add auth error page"
```

---

## Testing Checklist

- [ ] Click Google Sign In redirects to Google OAuth
- [ ] After Google auth, user is redirected to `/dashboard`
- [ ] Selected model/channel are preserved (check localStorage)
- [ ] Unauthenticated users trying to access `/dashboard` are redirected to `/`
- [ ] Authenticated users can access `/dashboard`
- [ ] User session persists across page reloads

---

## Post-Implementation Tasks

1. **Environment Setup:** Add actual Supabase credentials to `.env.local`
2. **Production Redirects:** Update Google OAuth redirect URIs for production
3. **User Data Sync:** Restore model/channel selections from localStorage on dashboard
4. **Deployment Flow:** Connect dashboard to actual OpenClaw deployment API

---

## References

- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Google OAuth PKCE Flow: https://supabase.com/docs/guides/auth/server-side/pkce-flow
- Next.js Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
