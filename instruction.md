# Notion CMS Migration Instructions

This document provides comprehensive, step-by-step instructions for completing the migration from a Git-based CMS to a Notion-based CMS.

## **1. Notion Setup**

### **A. Create a Notion Integration**
1. Go to [Notion - My Integrations](https://www.notion.so/my-integrations).
2. Click **"+ New integration"**.
3. Set the name (e.g., "Engineering Blogfolio CMS") and select the workspace.
4. Keep the default capabilities (Read, Update, and Insert content; No user information needed).
5. Click **Submit** to create the integration.
6. Copy the **Internal Integration Token**. This will be your `NOTION_AUTH_TOKEN`.

### **B. Set up Databases**
You need to create five databases in Notion for: **Blog**, **Articles**, **Tutorials**, **Projects**, and **Wiki**.

#### **Database Schema**
Each database should have the following properties:

| Property Name | Property Type | Description |
| :--- | :--- | :--- |
| **Title** | Title | The display name of the content item. |
| **Slug** | Text | The URL slug (e.g., `my-awesome-post`). |
| **Date** | Date | Publication date. |
| **Status** | Status | Set to `Published` for the item to appear on the site. |
| **Description** | Text | A brief summary for the card view. |
| **Tags** | Multi-select | Keywords for filtering. |
| **Category** | Select | Main category (used for quizzes and organization). |
| **Final** | Checkbox | (Optional) Mark as a final/complete post. |
| **AIAssisted** | Checkbox | (Optional) Show an indicator if AI was used. |
| **Technical** | Text | (Optional) Tech stack or technical details. |

#### **Sharing Databases with the Integration**
For **each** database created:
1. Open the database in Notion.
2. Click the three dots **(...)** in the top right corner.
3. Scroll down to **"Connect to"**.
4. Search for your integration name and select it.

### **C. Obtain Database IDs**
For each database, the ID is the part of the URL after the workspace name and before the `?v=...` part.
- URL format: `https://www.notion.so/myworkspace/DATABASE_ID?v=...`
- Copy these IDs for each of the five content types.

---

## **2. Environment Variables**

Add the following variables to your `.env.local` file (for local development) and to your Vercel project dashboard:

```env
NOTION_AUTH_TOKEN=secret_your_token_here
NOTION_BLOG_ID=your_blog_database_id
NOTION_ARTICLES_ID=your_articles_database_id
NOTION_TUTORIALS_ID=your_tutorials_database_id
NOTION_PROJECTS_ID=your_projects_database_id
NOTION_WIKI_ID=your_wiki_database_id
```

---

## **3. Implementation Details**

- **Data Fetching:** The site now uses `@notionhq/client` to fetch content.
- **Markdown Conversion:** We use `notion-to-md` to convert Notion blocks into Markdown, which is then rendered using the existing `marked` setup.
- **Caching:** In-memory caching is implemented using `p-memoize` to reduce API calls during a single build process or server session.
- **Fallback:** If a Notion Database ID is missing or the API call fails, the system is designed to gracefully fall back to reading files from the `content/` directory.

---

## **4. Deployment & Verification**

### **Vercel Deployment**
1. Push the code changes to your repository.
2. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
3. Navigate to **Settings > Environment Variables**.
4. Add all the environment variables listed in Section 2.
5. Trigger a new deployment.

### **Verification**
1. Visit the deployed site.
2. Check `/blog`, `/articles`, `/tutorials`, `/projects`, and `/wiki`.
3. Ensure that items marked as "Published" in Notion appear on the site.
4. Verify that formatting (images, code blocks, math) is preserved.

---

## **5. Rollback**

If you encounter issues and need to revert to the Git-based system:
1. Simply **remove the Notion environment variables** from Vercel/`.env.local`.
2. The system will automatically fall back to the `content/` folder.
3. Alternatively, you can revert the code changes using Git:
   ```bash
   git checkout main
   ```

---

## **Tips for Notion Content**
- **Images:** Use Notion's "Image" block. The converter will handle them.
- **Math:** Use Notion's inline or block equations. They are compatible with the site's rendering engine.
- **Quizzes:** You can still embed quizzes by adding the `[quiz] { JSON } [/quiz]` block directly in the Notion page as a text block.
