# Next.js Starter Template

A production-ready Next.js 15 starter template with tRPC, Prisma, Inngest, BetterAuth, and Tailwind CSS.

## Features

- **Next.js 15** with App Router and React 19
- **tRPC** for end-to-end type-safe APIs
- **Prisma** with PostgreSQL for database management
- **BetterAuth** for authentication (email/password + OAuth)
- **Inngest** for background jobs and workflows
- **Tailwind CSS 4** for styling
- **TypeScript** with strict mode enabled
- **Vercel AI SDK** with Anthropic and OpenAI support

## Quick Start

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mat-hiretalk/elevora-starter&env=DATABASE_URL,BETTER_AUTH_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/YOUR_USERNAME/YOUR_REPO%23environment-variables)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd starter-template
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values:

   - `DATABASE_URL`: PostgreSQL connection string
   - `BETTER_AUTH_SECRET`: Random 32+ character string (use `openssl rand -base64 32`)

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Run the development server**

   ```bash
   pnpm dev              # Next.js only (port 3888)
   pnpm dev:with-inngest # Next.js + Inngest dev server
   ```

6. **Open your browser**
   - App: http://localhost:3888
   - Inngest: http://localhost:8288

## Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── api/
│   │   ├── auth/            # BetterAuth routes
│   │   ├── trpc/            # tRPC API routes
│   │   └── inngest/         # Inngest webhook
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── lib/
│   ├── auth.ts              # BetterAuth server config
│   ├── auth-client.ts       # BetterAuth client hooks
│   ├── db/                  # Prisma client
│   ├── inngest/             # Inngest functions
│   │   ├── client.ts        # Inngest client
│   │   └── functions/       # Background jobs
│   ├── trpc/                # tRPC configuration
│   │   ├── client.tsx       # Client-side tRPC
│   │   ├── server.ts        # Server-side tRPC
│   │   ├── context.ts       # Request context
│   │   ├── trpc.ts          # tRPC initialization
│   │   └── routers/         # API routes
│   └── utils/               # Utility functions
├── prisma/
│   └── schema.prisma        # Database schema
├── components/              # React components
├── middleware.ts            # Next.js middleware (auth)
└── package.json
```

## Environment Variables

### Required

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for session encryption (32+ chars)

### Optional

OAuth providers:

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`

AI providers:

- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`

## Available Scripts

```bash
pnpm dev                 # Start Next.js on port 3888
pnpm dev:with-inngest    # Start Next.js + Inngest dev server
pnpm build               # Build for production
pnpm start               # Start production server
pnpm lint                # Run ESLint
pnpm db:push             # Push Prisma schema to database
pnpm db:studio           # Open Prisma Studio
pnpm db:generate         # Generate Prisma client
```

## Database

The template uses Prisma with PostgreSQL. The schema includes:

- **User**, **Session**, **Account**, **Verification** tables for BetterAuth
- Customizable schema name (default: `public`)

To add your own models, edit `prisma/schema.prisma` and run:

```bash
pnpm db:push
```

## Authentication

BetterAuth is configured with:

- Email/password authentication
- Google OAuth (optional)
- GitHub OAuth (optional)

Protected routes are handled in `middleware.ts`. Use `protectedProcedure` in tRPC for authenticated endpoints.

## tRPC

Example router at `lib/trpc/routers/example.ts`:

```typescript
// Server-side
import { createCaller } from "@/lib/trpc/server";
const caller = await createCaller();
const data = await caller.example.hello({ name: "World" });

// Client-side
import { trpc } from "@/lib/trpc/client";
const { data } = trpc.example.hello.useQuery({ name: "World" });
```

## Inngest

Example function at `lib/inngest/functions/example.ts`. Trigger events with:

```typescript
import { inngest } from "@/lib/inngest/client";

await inngest.send({
  name: "app/example",
  data: { message: "Hello" },
});
```

Monitor functions at http://localhost:8288 during development.

## Deployment

### Vercel

1. Click the "Deploy to Vercel" button above
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (use Vercel Postgres or external provider)
   - `BETTER_AUTH_SECRET`
3. Deploy!

### Other Platforms

The template works on any platform that supports Next.js:

- Set environment variables
- Run `pnpm build && pnpm start`
- Ensure PostgreSQL is accessible

## Customization

1. **Update schema name**: Change `@@schema("public")` in `prisma/schema.prisma`
2. **Add UI components**: Install shadcn/ui or use existing Radix UI components
3. **Configure OAuth**: Add client IDs/secrets to `.env` and update `lib/auth.ts`
4. **Add routes**: Create new files in `app/` directory
5. **Add API endpoints**: Create new routers in `lib/trpc/routers/`
6. **Add background jobs**: Create new functions in `lib/inngest/functions/`

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [tRPC](https://trpc.io/) - Type-safe APIs
- [Prisma](https://www.prisma.io/) - Database ORM
- [BetterAuth](https://www.better-auth.com/) - Authentication
- [Inngest](https://www.inngest.com/) - Background jobs
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
