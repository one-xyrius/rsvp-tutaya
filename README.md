# rsvp-tutaya

Birthday Invitation App built with Next.js, Supabase, Drizzle ORM, and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, React Server Components
- **Styling**: Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Next.js Server Actions & Route Handlers (Layered Architecture)
- **Database**: Supabase (PostgreSQL) + Drizzle ORM
- **Validation**: Zod schemas
- **CI/CD**: GitHub Actions → Cloudflare Pages

## Architecture

```
/src
├── app/            # Next.js App Router (pages, layouts)
├── controllers/    # HTTP handlers (Server Actions, Route Handlers)
├── services/       # Business logic
├── repositories/   # Data access (Drizzle/Supabase)
├── types/          # Zod schemas + TypeScript types
├── components/     # UI (shadcn/ui components)
└── lib/            # Utilities (Supabase client, etc.)
```

## Setup

1. Clone repo:
   ```bash
   git clone https://github.com/one-xyrius/rsvp-tutaya.git
   cd rsvp-tutaya
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your credentials.

4. Run migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start dev server:
   ```bash
   npm run dev
   ```

## Themes

- **Kids**: Bright, playful, and full of joy
- **Teens**: Cool, stylish, and modern
- **Adults**: Elegant, sophisticated, and timeless

## Deployment

Push to `main` triggers GitHub Actions workflow that deploys to Cloudflare Pages.
