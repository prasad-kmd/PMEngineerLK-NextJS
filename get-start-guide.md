# Getting Started Guide

This guide provides a detailed, step-by-step process for setting up the **Next Notion CMS** project on your local machine and enabling its full suite of features.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 20.x** or higher
- **pnpm 9** (preferred) or npm
- **Git**
- A **Notion** account
- A **Supabase** account (for PostgreSQL)

---

## 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/prasad-kmd/PMEngineerLK-NextJS.git
cd PMEngineerLK-NextJS
```

## 2. Install Dependencies

Use `pnpm` to install the required packages:

```bash
pnpm install
```

## 3. Notion Setup (Headless CMS)

The project uses Notion to manage all content (Blogs, Articles, Projects, etc.).

1.  **Create an Integration**:
    - Go to [Notion - My Integrations](https://www.notion.so/my-integrations).
    - Click **+ New integration**.
    - Name it (e.g., "PMEngineerLK CMS") and select the workspace.
    - Copy the **Internal Integration Token** (this is your `NOTION_AUTH_TOKEN`).

2.  **Set Up Databases**:
    - Create the following databases in Notion: **Blog**, **Articles**, **Tutorials**, **Projects**, **Wiki**, and **Authors**.
    - **Required Properties**:
        - `Title` (Title)
        - `Slug` (Rich Text)
        - `Date` (Date)
        - `Thumbnail` (Files & Media)
        - `RTime` (Number - Reading time in minutes)
        - `Category` (Select)
        - `Description` (Rich Text)
        - `Author` (Relation to Authors DB or Rich Text)
        - `Published` (Checkbox)
    - For the **Authors** database: `Name` (Title), `Slug` (Rich Text), `Bio` (Rich Text), `Avatar` (Files & Media).

3.  **Connect Databases**:
    - Open each database in Notion.
    - Click the **...** (three dots) > **Connect to** > Select your integration.

4.  **Get Database IDs**:
    - Extract IDs from the database URLs: `https://www.notion.so/[workspace]/[DATABASE_ID]?v=[view]`.

## 4. Supabase (PostgreSQL) Setup

Used for authentication (Better Auth) and system logs.

1.  **Create a Project**: Sign in to [Supabase](https://supabase.com/) and create a new project.
2.  **Get Connection String**: 
    - Go to **Project Settings** > **Database**.
    - Copy the **Transaction** connection string for `DATABASE_URL`.
    - Ensure you replace `[YOUR-PASSWORD]` with your actual password.

## 5. Enable Authentication (Better Auth)

1.  **Auth Secret**: Generate a random 32-character string.
    - Unix: `openssl rand -base64 32`
    - PowerShell: `[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))`
2.  **Social Providers**:
    - **GitHub**: Create an OAuth App in [GitHub Developer Settings](https://github.com/settings/developers). Set Homepage URL and Callback URL (e.g., `http://localhost:3000/api/auth/callback/github`).
    - **Google**: Create credentials in [Google Cloud Console](https://console.cloud.google.com/). Enable "Google People API".
    - Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, etc., to your env.

## 6. Enable Analytics (PostHog)

1.  **Create Project**: Sign up at [PostHog](https://posthog.com/).
2.  **Get Keys**: 
    - Go to **Project Settings**.
    - Copy **Project API Key** (`NEXT_PUBLIC_POSTHOG_KEY`).
    - Copy **Project ID** (`POSTHOG_PROJECT_ID`).
    - Generate a **Personal API Key** for server-side analytics (`POSTHOG_PERSONAL_API_KEY`).

## 7. Enable Contact Form (Telegram)

The contact form sends submissions to a Telegram bot.

1.  **Create Bot**: Message [@BotFather](https://t.me/botfather) on Telegram to create a bot and get the `TELEGRAM_TOKEN`.
2.  **Get Chat ID**: Message your bot, then visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` to find your `chat_id` (`TELEGRAM_CHAT_ID`).

## 8. Environment Variables

Create a `.env.local` file with all the collected keys:

```env
# Notion
NOTION_AUTH_TOKEN=secret_xxx
NOTION_BLOG_ID=...
NOTION_ARTICLES_ID=...
NOTION_PROJECTS_ID=...
NOTION_TUTORIALS_ID=...
NOTION_WIKI_ID=...
NOTION_AUTHORS_ID=...

# Database
DATABASE_URL=postgresql://postgres:[password]@db.[id].supabase.co:6543/postgres?pgbouncer=true

# Auth
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Security
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=...
POSTHOG_PROJECT_ID=...
POSTHOG_PERSONAL_API_KEY=...

# Telegram
TELEGRAM_TOKEN=...
TELEGRAM_CHAT_ID=...
```

## 9. Final Steps

1.  **Push Schema**: `pnpm db:push`
2.  **Run Development**: `pnpm dev`
3.  **Build**: `pnpm build`

---

## Verification

- **Content**: Ensure content from Notion appears on `/blog`, `/articles`, etc.
- **Auth**: Test signing in with a configured social provider.
- **Tools**: Access engineering tools at `/tools`.
- **Analytics**: Check PostHog dashboard for captured events.
