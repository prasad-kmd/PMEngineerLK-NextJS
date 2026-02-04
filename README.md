# Blogfolio Webapp

A modern, responsive web application for documenting a mechanical and mechatronics engineering undergraduate group project. Built with Next.js, Tailwind CSS, and featuring integrated support for mathematical equations (KaTeX), charts (Chart.js), and code syntax highlighting (Highlight.js).

This webapp serves as a comprehensive blogfolio platform for documenting engineering journeys, identifying and solving real-world challenges, and sharing technical expertise.

## Features

### File-Based Content Management System

- **Automatic Page Generation**: Create `.md` or `.html` files in content directories to automatically generate pages
- **Four Content Types**:
  - **Blog** (`/blog/`) - Detailed project proposals and technical analyses
  - **Articles** (`/articles/`) - Progress logs and reflections
  - **Projects** (`/projects/`) - Methodologies and processes
  - **Tutorials** (`/tutorials/`) - General updates and announcements
- **Dynamic Routing**: Files automatically become accessible at `/{type}/{filename}`
- **Frontmatter Support**: YAML frontmatter for metadata (title, date, description)

### Technical Integrations

- **KaTeX**: Render mathematical equations inline (`$...$`) and display mode (`$$...$$`)
- **Chart.js**: Interactive data visualizations and charts
- **Highlight.js**: Syntax highlighting for code blocks (JavaScript, Python, C++, Bash)
- **Markdown Support**: Full markdown rendering with GitHub-flavored markdown

### Design

- **Dark Theme**: Professional dark color scheme with teal accent
- **Responsive**: Mobile-first design that works on all devices
- **Modern & Elegant**: Clean typography, card-based layouts, smooth transitions
- **Sidebar Navigation**: Persistent navigation with active state indicators
- **Accessible**: Semantic HTML, proper ARIA labels, keyboard navigation

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript
- **Math Rendering**: KaTeX
- **Charts**: Chart.js with react-chartjs-2
- **Code Highlighting**: Highlight.js
- **Markdown**: marked + gray-matter
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git (for version control)

### Installation

1. **Clone or download the repository**

```bash
git clone <repository-url>
cd engineering-project-webapp
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Content Management

### Creating Content

Content is managed through files in the `content/` directory:

```
content/
├── blog/
├── articles/
├── projects/
└── tutorials/
```

### File Format

#### Markdown Files (`.md`)

```markdown
---
title: "Your Title Here"
date: "2025-01-15"
description: "Brief description of the content"
---

## Your Content

Write your content here using markdown syntax.

### Math Equations

Inline math: $E = mc^2$

Display math:

$$
F = ma
$$

### Code Blocks

```python
def hello_world():
    print("Hello, World!")
```

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

#### HTML Files (`.html`)

```html
---
title: "Your Title Here"
date: "2025-01-15"
description: "Brief description"
---

<h2>Your Content</h2>
<p>Write your content using HTML.</p>
```

### Example: Creating a New Blog Post

1. Create a new file: `content/blog/my-new-post.md`
2. Add frontmatter and content:

```markdown
---
title: "My Innovative Engineering Journey"
date: "2025-01-20"
description: "A revolutionary approach to solving problem X"
---

## Problem Statement

Describe the problem...

## Proposed Solution

Explain your solution...
```

3. The page will automatically be available at `/blog/my-new-post`

## Project Structure

```
engineering-project-webapp/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout with navigation
│   ├── globals.css          # Global styles and theme
│   ├── blog/                # Blog section
│   │   ├── page.tsx         # Blog list page
│   │   └── [slug]/          # Dynamic blog pages
│   ├── articles/            # Articles section
│   ├── projects/            # Projects section
│   └── tutorials/           # Tutorials section
├── components/              # React components
│   ├── navigation.tsx       # Sidebar navigation
│   ├── content-renderer.tsx # Content display with KaTeX/Highlight.js
│   └── chart-example.tsx    # Chart.js examples
├── content/                 # Content files
│   ├── blog/               # Project blog (.md or .html files)
│   ├── articles/           # Diary entries
│   ├── projects/           # Workflow documentation
│   └── tutorials/          # Blog posts
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   └── content.ts          # Content management system
├── public/                  # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Using Technical Features

### Mathematical Equations (KaTeX)

**Inline Math**: Wrap equations in single dollar signs

```markdown
The formula $E = mc^2$ shows the relationship between energy and mass.
```

**Display Math**: Wrap equations in double dollar signs

```markdown
$$
F = G \frac{m_1 m_2}{r^2}
$$
```

**Complex Equations**:

```markdown
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

### Code Syntax Highlighting (Highlight.js)

Use fenced code blocks with language specification:

```python
def calculate_force(mass, acceleration):
    return mass * acceleration

force = calculate_force(10, 9.81)
print(f"Force: {force} N")
```

Supported languages: JavaScript, Python, C++, Bash, and more.

### Charts (Chart.js)

Charts can be added to content pages by creating custom components. See `components/chart-example.tsx` for examples.

To add a chart to your content:

1. Create a chart component in `components/`
2. Import and use it in your content page
3. Or embed chart data in markdown using custom syntax (requires additional setup)

## Customization

### Changing Colors

Edit `app/globals.css` to modify the color scheme:

```css
:root {
  --background: oklch(0.145 0.01 264);  /* Dark blue-gray */
  --foreground: oklch(0.95 0.01 264);   /* Light text */
  --primary: oklch(0.65 0.15 195);      /* Teal accent */
  /* ... other colors ... */
}
```

### Changing Fonts

Edit `app/layout.tsx` to change fonts:

```typescript
import { Cute_Font as Your_Font } from 'next/font/google'

const yourFont = Your_Font({
  subsets: ["latin"],
  variable: "--font-your-font",
})
```

Then update `globals.css`:

```css
@theme inline {
  --font-sans: var(--font-your-font);
}
```

### Adding New Content Types

1. Create a new directory in `content/` (e.g., `content/research/`)
2. Create list page: `app/research/page.tsx`
3. Create dynamic page: `app/research/[slug]/page.tsx`
4. Use `getContentByType()` and `getContentItem()` from `lib/content.ts`
5. Add navigation link in `components/navigation.tsx`

## Sample Content

The project includes sample content demonstrating:

- **Smart Irrigation System** - IoT-based agricultural solution
- **Low-Cost Agricultural Machinery** - Affordable equipment for small farmers
- **Automated Waste Segregation** - AI-powered recycling system
- **Project Diary** - Progress documentation
- **Design Methodology** - Engineering workflow
- **Welcome Post** - Project introduction

These can be modified or deleted as needed.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Development Tips

### Hot Reload

The development server supports hot reload. Changes to code and content files will automatically refresh the browser.

### Adding Dependencies

```bash
npm install <package-name>
```

### TypeScript

The project uses TypeScript for type safety. Type definitions are in `*.tsx` and `*.ts` files.

### Linting

```bash
npm run lint
```

## Troubleshooting

### Content Not Showing

- Ensure files are in the correct `content/{type}/` directory
- Check file extension is `.md` or `.html`
- Verify frontmatter YAML is valid
- Restart development server

### Math Not Rendering

- Check equation syntax (single `$` for inline, double `$$` for display)
- Ensure no spaces between `$` and equation
- Look for unescaped special characters

### Code Not Highlighting

- Specify language in code fence: ```python
- Check if language is registered in `content-renderer.tsx`
- Add new languages by importing from `highlight.js/lib/languages/`

### Build Errors

- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

## Contributing

This is an academic project. For questions or suggestions:

1. Document issues in project diary
2. Discuss with team members
3. Update workflow documentation
4. Commit changes with clear messages

## License

This project is for educational purposes as part of an undergraduate engineering program.

## Acknowledgments

- **Supervisor**: For guidance and support
- **University**: For resources and facilities
- **Open Source Community**: For the amazing tools and libraries

## Contact

For more information about this project, please refer to the content on the website or contact the project team through your university.

---

**Built with ❤️ by Mechanical & Mechatronics Engineering Students**

**Sri Lanka | 2025**