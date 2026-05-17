# Technical Setup & Feature Guide

This document provides technical details for the newly implemented UI and SEO enhancements in the PMEngineerLK-NextJS project.

~~## 1. Terminal Showcase Hero~~

~~The home page hero now features a high-fidelity terminal showcase that simulates a boot sequence and content discovery loop~~

~~- **Implementation**: `components/hero-terminal-showcase.tsx`~~
~~- **Data Flow**: Server-side fetched content in `app/page.tsx` is passed as props to `FeaturedHero`, which then passes it to the `HeroTerminalShowcase`.~~
~~- **Timing**: ~~
~~- Boot Sequence: 5 seconds~~
~~- **Timing**: ~~
~~- Content Items: 5 seconds per item (infinite loop)~~
~~- **Aesthetics**: Typewriter effects with full support for `prefers-reduced-motion` (instantly shows text if enabled).~~
~~- **Aesthetics**: Typewriter effects with full support for `prefers-reduced-motion` (instantly shows text if enabled).~~

## 2. Centralized SEO & Metadata

A robust SEO engine has been implemented to ensure consistent and rich metadata across all content types.

- **Helper**: `lib/seo/metadata.ts`
- **Features**:
  - **Dynamic Excerpts**: Automatically generates ~160 character descriptions by stripping Markdown/HTML and collapsing whitespace.
  - **Enhanced OG Images**: Generates absolute URLs for the `/api/og` endpoint, including `title`, `description`, and `type` parameters.
- **Affected Routes**:
  - Blog, Articles, Projects, Tutorials, Wiki detail pages.
  - Home and Gallery index pages.

## 3. Dynamic Notion Gallery

The gallery has been migrated from a static hard-coded array to a dynamically manageable Notion-backed system.

### Notion Configuration
Create a new Notion database for the gallery with these properties:
- `Name/Title` (Title)
- `Description` (Rich Text)
- `Image` (Files & Media) - **Required**: The high-resolution image.
- `Thumbnail` (Files & Media) - **Optional**: Optimized small preview.
- `Category` (Select)
- `Order` (Number) - Used for primary sorting (ascending).
- `Status` (Select) - Must be set to `Published` to appear.
- `Date` (Date) - Secondary sort (descending).

### Environment Variables
Add the Database ID to your `.env.local`:
```env
NOTION_GALLERY_ID=your_database_id_here
```

### Technical Implementation
- **Fetching Logic**: `lib/notion/gallery.ts` (shared between Server Components and API).
- **API Endpoint**: `/api/gallery` (supports cursor-based pagination).
- **Frontend**: `components/gallery-client.tsx`
  - **Infinite Scroll**: Powered by `IntersectionObserver`.
  - **Bandwidth Optimization**: Grid uses thumbnails; Modal loads full-resolution only on demand.
  - **Accessibility**: Uses Radix UI `Dialog` for focus management and keyboard controls.

## 4. Local Development Fallback

If `NOTION_GALLERY_ID` is not provided or Notion is disabled, the gallery gracefully falls back to a high-fidelity local dataset defined in `lib/notion/gallery.ts`, preserving all UI features like infinite scroll and modals.
