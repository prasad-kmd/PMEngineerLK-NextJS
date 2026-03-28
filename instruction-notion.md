# 📓 Comprehensive Notion CMS Setup Guide

This guide details the critical steps to integrate Notion as your Content Management System (CMS). Follow these steps carefully to ensure a successful setup for your Blog, Articles, Projects, Tutorials, and Wiki.

## 1. Notion Organization & Schemas

### Step 1: Create a Root Page
Create a new page in Notion (e.g., "Engineering Blogfolio CMS"). Make this page **Public** (Publish to web) to allow the site to fetch its content.

### Step 2: Create Specialized Databases
For each content type, create a **Database** (e.g., as a sub-page of your root). Ensure each database has the following **Properties** (Property name, Property type):

#### 📝 Blog Database
- **Name**: (Title) The title of your post.
- **Date**: (Date) The publication date.
- **Description**: (Text) A short summary of the post.
- **Slug**: (Text) A custom URL-friendly identifier (optional).
- **Technical**: (Select) Level (e.g., Beginner, Intermediate, Advanced).
- **Tags**: (Multi-select) Keywords for categorization.

#### 📄 Articles Database
- (Same properties as Blog)

#### 🛠️ Projects Database
- (Same properties as Blog)

#### 🎓 Tutorials Database
- (Same properties as Blog)

#### 📚 Wiki Database
- **Name**: (Title) The topic title.
- **Technical**: (Select) Category (e.g., Mechanical, Electronics).
- **Description**: (Text) A brief definition.
- **Tags**: (Multi-select) Related topics.

### Step 3: Extract Critical IDs
Copy the link to your Root Page and each database. The 32-character string at the end of the URL is the ID.

---

## 2. Secure Integration (Optional but Recommended)

If you prefer not to make your pages fully "Public" or want to use Notion's official API for some parts:
1. Go to [Notion My Integrations](https://www.notion.com/my-integrations).
2. Create a new **Internal Integration**.
3. Copy the **Internal Integration Secret**.
4. **Important**: Go to your root page in Notion, click **...** > **Add connections**, and find your integration to grant it access.

---

## 3. Configuration in the Code

### Step 1: Environment Variables
Add these to your `.env.local` or Vercel dashboard:
```env
# Required for root access
NOTION_ROOT_PAGE_ID=your_root_page_id

# Database IDs (Required for listing items)
NOTION_BLOG_ID=your_blog_db_id
NOTION_ARTICLES_ID=your_articles_db_id
NOTION_PROJECTS_ID=your_projects_db_id
NOTION_TUTORIALS_ID=your_tutorials_db_id
NOTION_WIKI_ID=your_wiki_db_id

# (Optional) For Private/Internal Integration
NOTION_AUTH_TOKEN=your_internal_integration_secret
```

### Step 2: Deployment on Vercel
1. Go to **Settings > Environment Variables**.
2. Add all the IDs and secrets listed above.
3. Trigger a **Redeploy** to apply the changes.

---

## 🔧 Troubleshooting Critical Steps

- **Database Items Not Showing**: Ensure the database is shared with the integration OR the database itself is also published to the web.
- **Properties Not Syncing**: Property names in Notion must match exactly (e.g., "Date" vs "date").
- **ID Confusion**: The ID is the 32-character hexadecimal string. Do not include hyphens if they are present in the URL.

---
**Done!** Your site is now powered by a structured Notion database architecture. You can now manage your entire engineering portfolio with real-time updates directly from Notion.
