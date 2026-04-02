# PrasadM | Engineering Blogfolio

A comprehensive, high-performance personal blogfolio and engineering workspace built with Next.js 16, Tailwind CSS 4, and TypeScript. This platform is designed to document an engineering journey, featuring a file-based CMS, interactive tools, and technical documentation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PrasadM/pm-blogfolio-webapp)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/PrasadM/pm-blogfolio-webapp)

---

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub License](https://img.shields.io/github/license/prasad-kmd/pmEngineerLK-NextJS?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/prasad-kmd/pmEngineerLK-NextJS?style=for-the-badge&logo=github&logoColor=black)
![GitHub contributors](https://img.shields.io/github/contributors/prasad-kmd/pmEngineerLK-NextJS?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/prasad-kmd/pmEngineerLK-NextJS?display_timestamp=committer&style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/prasad-kmd/pmEngineerLK-NextJS?style=for-the-badge)

<!-- ![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma) -->

## <!-- ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase) -->

![Static Badge](https://img.shields.io/badge/VIBE-CODE-purple?style=for-the-badge&logo=googlejules&logoColor=white) ![Static Badge](https://img.shields.io/badge/VIBE-CODE-blue?style=for-the-badge&logo=googlegemini&logoColor=white)

<!-- ![Static Badge](https://img.shields.io/badge/VIBE-CODE-black?style=for-the-badge&logo=v0&logoColor=white) -->

## 🚀 Key Features

### 🛠️ Engineering Workspace

A suite of over 30+ interactive tools for electronics, mechanical engineering, mechatronics, and data science.

- **Electronics**: Resistor Solver, Voltage Divider, PCB Trace/Impedance, 555 Timer, LED Resistor, Op-Amp Gain.
- **Mechanical**: Moment of Inertia, ISO Fits & Tolerances, Beam Deflection, Gear Ratio, Bolt Torque Chart.
- **Mechatronics**: PID Simulator & Tuner, PWM to Voltage, Stepper Motor, Battery Estimator, Sensor Scaling.
- **Software & Math**: Matrix Calculator, Curve Fitter, LaTeX/MathML Converter, Regex Architect, JSON Validator, Stream Compressor.
- **Productivity**: Markdown Editor, User Persona Creator, Resume Creator, Color Contrast Checker.

### 📚 Content Management System

- **File-Based**: Simply add `.md` or `.html` files to the `content/` directory.
- **Auto-Generation**: Pages for Blog, Articles, Projects, Wiki, and Tutorials are automatically generated based on the file system.
- **Interactive Quizzes**: Embed assessments directly into content using a custom `[quiz]` syntax.
- **Technical Support**: Native support for KaTeX (math), Highlight.js (syntax highlighting), and Chart.js (data viz).

### 🔍 Discovery & Navigation

- **Command Palette (Cmd+K)**: Site-wide search and navigation powered by a dedicated search index.
- **Wiki & Glossary**: Structured technical knowledge base and filterable glossary.
- **Site Directory**: A categorized overview (`/pages`) of every section of the site.
- **External Aggregators**: Live discovery feeds from arXiv (research), Open Library (books), CheapShark (gaming deals), and Blogger RSS feeds.

### 🌐 Performance & UX

- **PWA Ready**: Offline support with a robust Service Worker implementation, cross-document View Transitions (Scale effect), and an advanced `manifest.json` with launch handlers and share targets.
- **Responsive Design**: Optimized for all devices with mobile-specific performance tweaks.
- **Enhanced UI**: Glassmorphism effects, custom cursor, custom context menu, and click-spark effects.
- **Connectivity Listener**: Real-time online/offline notifications using Sonner toasts.

---

## 🏗️ Architecture & Implementation

### Core Features

- **Dynamic Content Engine**: Uses `fs` and `gray-matter` in `lib/content.ts` to parse content files. Markdown is converted via `marked` with custom extensions.
- **Interactive Quiz System**: Quizzes are defined as JSON within `[quiz]` blocks, interleaved with React components via `ContentRenderer`.
- **Engineering Tools**: Self-contained React components using `Chart.js`, `Temml`, `html2canvas`, and `jsPDF`.
- **Table of Contents (TOC)**: Automatically generated using a flexible regex parser for all content headings.

### Optional Features

- **Custom Service Worker**: Implements "Network-first" for navigation and "Cache-first" for assets (`public/sw.js`).
- **SafeLink Redirects**: A security interstitial route (`/external-link`) for all outbound traffic.
- **Global Theme Management**: Powered by `next-themes` with system-aware transitions.
- **Custom UI Components**: `CustomCursor` and `CustomContextMenu` provide link-specific actions and visual feedback.

---

## 🛠️ Using Technical Features

### Mathematical Equations (KaTeX)

**Inline Math**: Wrap equations in single dollar signs: `The formula $E = mc^2$ is iconic.`
**Display Math**: Wrap equations in double dollar signs:

```markdown
$$
F = G \frac{m_1 m_2}{r^2}
$$
```

### Code Syntax Highlighting (Highlight.js)

Use fenced code blocks with language specification:

```python
def hello():
    print("Hello Engineering!")
```

### Charts (Chart.js)

Integrate interactive charts directly. Example usage in `components/chart-example.tsx`.

---

## ✍️ Content Management

### Adding New Content

1. Add a `.md` or `.html` file to `content/blog/`, `content/projects/`, etc.
2. Include YAML frontmatter:

```markdown
---
title: "Advanced PID Tuning"
date: "2025-05-20"
description: "A deep dive into optimizing PID parameters."
category: "Mechatronics"
tags: ["Control Theory", "Robotics"]
technical: "Intermediate"
---
```

### Embedding a Quiz

```json
[quiz]
{
  "title": "Control Theory Basics",
  "questions": [
    {
      "question": "What does the 'D' in PID stand for?",
      "options": ["Direct", "Derivative", "Differential", "Digital"],
      "answer": 1,
      "explanation": "D stands for Derivative."
    }
  ]
}
[/quiz]
```

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Routes & Layouts)
├── components/           # UI Components (Shadcn, Custom, Tools)
├── content/              # CMS Content (.md, .html)
├── hooks/                # Custom React Hooks
├── lib/                  # Utilities and CMS Logic
├── public/               # Static Assets (Fonts, Icons, SW)
├── types/                # TypeScript Definitions
└── README.md             # This documentation
```

<details>
<summary><b>Full Project Structure</b></summary>
<code><pre>
📦 pmEngineerLK-NextJS
├─ .dockerignore
├─ .env.local.example
├─ .eslintignore
├─ .eslintrc.json
├─ .github
│  ├─ dependabot.yml
│  └─ workflows
│     └─ generate-changelog.yml
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ .well-known
│  └─ assetlinks.json
├─ CODE_OF_CONDUCT.md
├─ LICENSE
├─ README.md
├─ SECURITY.md
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ accessibility
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ entertainment
│  │  │  └─ search-hint
│  │  │     └─ route.ts
│  │  ├─ og
│  │  │  └─ route.tsx
│  │  ├─ search
│  │  │  └─ route.ts
│  │  └─ secrets
│  │     └─ route.ts
│  ├─ articles
│  │  ├─ [slug]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ blog
│  │  ├─ [slug]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ changelog
│  │  └─ page.tsx
│  ├─ cheat-sheets
│  │  └─ page.tsx
│  ├─ contact
│  │  ├─ ContactForm.tsx
│  │  └─ page.tsx
│  ├─ disclaimer
│  │  └─ page.tsx
│  ├─ entertainment
│  │  ├─ layout.tsx
│  │  ├─ movie
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ search
│  │  │  └─ page.tsx
│  │  └─ tv
│  │     └─ [id]
│  │        └─ page.tsx
│  ├─ error.tsx
│  ├─ external-link
│  │  └─ page.tsx
│  ├─ feed.xml
│  │  └─ route.ts
│  ├─ feeds
│  │  └─ page.tsx
│  ├─ font
│  │  └─ en
│  │     ├─ AMORIARegular.woff2
│  │     ├─ MozillaHeadline-Regular.woff2
│  │     └─ Philosopher.woff2
│  ├─ gallery
│  │  └─ page.tsx
│  ├─ game-deal
│  │  └─ page.tsx
│  ├─ global-error.tsx
│  ├─ globals.css
│  ├─ glossary
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ not-found.tsx
│  ├─ now
│  │  └─ page.tsx
│  ├─ open-books
│  │  └─ page.tsx
│  ├─ open-source
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ pages
│  │  └─ page.tsx
│  ├─ portfolio
│  │  └─ page.tsx
│  ├─ privacy-policy
│  │  └─ page.tsx
│  ├─ projects
│  │  ├─ [slug]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ quiz
│  │  ├─ [slug]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ reading-list
│  │  └─ page.tsx
│  ├─ researches
│  │  └─ page.tsx
│  ├─ resources
│  │  └─ page.tsx
│  ├─ roadmap
│  │  └─ page.tsx
│  ├─ search
│  │  └─ page.tsx
│  ├─ security
│  │  └─ page.tsx
│  ├─ sitemap.ts
│  ├─ snippets
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ sponsorship
│  │  └─ page.tsx
│  ├─ status
│  │  └─ page.tsx
│  ├─ style-guide
│  │  └─ page.tsx
│  ├─ team
│  │  └─ page.tsx
│  ├─ terms-and-conditions
│  │  └─ page.tsx
│  ├─ tools
│  │  ├─ 555-timer-calculator
│  │  │  └─ page.tsx
│  │  ├─ battery-life-estimator
│  │  │  └─ page.tsx
│  │  ├─ beam-deflection-calculator
│  │  │  └─ page.tsx
│  │  ├─ bolt-torque-chart
│  │  │  └─ page.tsx
│  │  ├─ color-contrast-checker
│  │  │  └─ page.tsx
│  │  ├─ compressor
│  │  │  └─ page.tsx
│  │  ├─ css-unit-converter
│  │  │  └─ page.tsx
│  │  ├─ curve-fitter
│  │  │  └─ page.tsx
│  │  ├─ data-transform
│  │  │  └─ page.tsx
│  │  ├─ diff-checker
│  │  │  └─ page.tsx
│  │  ├─ gear-ratio-calculator
│  │  │  └─ page.tsx
│  │  ├─ html-encoder
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ iso-fits-tolerances
│  │  │  └─ page.tsx
│  │  ├─ json-formatter
│  │  │  └─ page.tsx
│  │  ├─ latex-equation-editor
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ latex-mathml-converter
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ temml.css
│  │  ├─ led-resistor-calculator
│  │  │  └─ page.tsx
│  │  ├─ markdown-editor
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ material-database
│  │  │  └─ page.tsx
│  │  ├─ matrix-calculator
│  │  │  └─ page.tsx
│  │  ├─ moment-of-inertia-calculator
│  │  │  └─ page.tsx
│  │  ├─ op-amp-gain-calculator
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ pcb-impedance-calculator
│  │  │  └─ page.tsx
│  │  ├─ pcb-trace-width
│  │  │  └─ page.tsx
│  │  ├─ pid-controller-simulator
│  │  │  └─ page.tsx
│  │  ├─ pid-tuner
│  │  │  └─ page.tsx
│  │  ├─ pwm-voltage-converter
│  │  │  └─ page.tsx
│  │  ├─ regex-architect
│  │  │  └─ page.tsx
│  │  ├─ resistor-color-code
│  │  │  └─ page.tsx
│  │  ├─ resume-creator
│  │  │  └─ page.tsx
│  │  ├─ scientific-calculator
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ sensor-scaling-calculator
│  │  │  └─ page.tsx
│  │  ├─ stepper-motor-calculator
│  │  │  └─ page.tsx
│  │  ├─ student-guide-navigator
│  │  │  ├─ courses.ts
│  │  │  └─ page.tsx
│  │  ├─ unit-circle
│  │  │  └─ page.tsx
│  │  ├─ unit-converter
│  │  │  └─ page.tsx
│  │  ├─ user-persona-creator
│  │  │  └─ page.tsx
│  │  └─ voltage-divider-designer
│  │     └─ page.tsx
│  ├─ tutorials
│  │  ├─ [slug]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ uses
│  │  └─ page.tsx
│  └─ wiki
│     ├─ [slug]
│     │  └─ page.tsx
│     └─ page.tsx
├─ components.json
├─ components
│  ├─ ClickSpark.tsx
│  ├─ MagicBento.tsx
│  ├─ ai-content-indicator.tsx
│  ├─ bookmark-button.tsx
│  ├─ bookmarks-modal.tsx
│  ├─ chart-example.tsx
│  ├─ connectivity-listener.tsx
│  ├─ content-renderer.tsx
│  ├─ custom-context-menu.tsx
│  ├─ custom-cursor.tsx
│  ├─ entertainment
│  │  ├─ bookmark-button.tsx
│  │  ├─ download-options.tsx
│  │  ├─ hero-carousel.tsx
│  │  ├─ movie-card.tsx
│  │  ├─ my-list.tsx
│  │  ├─ search-input.tsx
│  │  ├─ tv-controls.tsx
│  │  └─ video-player.tsx
│  ├─ featured-hero.tsx
│  ├─ floating-navbar.tsx
│  ├─ footer.tsx
│  ├─ gallery-client.tsx
│  ├─ hero-slideshow.tsx
│  ├─ magic-bento-client.tsx
│  ├─ navigation.tsx
│  ├─ portfolio-hero-actions.tsx
│  ├─ push-notification-manager.tsx
│  ├─ quiz-library
│  │  └─ quiz-list.tsx
│  ├─ quiz.tsx
│  ├─ related-content.tsx
│  ├─ roadmap.tsx
│  ├─ scroll-progress.tsx
│  ├─ scroll-to-top.tsx
│  ├─ search.tsx
│  ├─ service-worker-registrar.tsx
│  ├─ sidebar-context.tsx
│  ├─ skill-matrix.tsx
│  ├─ theme-provider.tsx
│  ├─ toc.tsx
│  ├─ tools
│  │  └─ latex-mathml-converter
│  │     ├─ Equation.tsx
│  │     ├─ InputControls.tsx
│  │     ├─ MoreEquationsModal.tsx
│  │     ├─ action-buttons.tsx
│  │     ├─ equation-editor.tsx
│  │     ├─ equation-preview.tsx
│  │     ├─ mathml-modal.tsx
│  │     └─ predefined-equations.tsx
│  ├─ ui
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ dialog.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ safe-link.tsx
│  │  ├─ select.tsx
│  │  ├─ slider.tsx
│  │  ├─ tabs.tsx
│  │  ├─ textarea.tsx
│  │  └─ tooltip.tsx
│  ├─ view-transitions.tsx
│  └─ web-share-button.tsx
├─ content
│  ├─ articles
│  │  ├─ Bernoulli_s-Equation-SFEE.html
│  │  ├─ Table-Of-Laplace-Transforms.html
│  │  └─ ousl-engineering-student-guide.html
│  ├─ blog
│  │  ├─ Convolution-Properties-and-Theorems-20260304.html
│  │  ├─ Sinhala-Archaic-Numbers-20260214.html
│  │  └─ cpp-for-mechatronics-students-20260214.html
│  ├─ projects
│  │  ├─ autonomous-rover-deep-dive.md
│  │  ├─ design-methodology.md
│  │  └─ waste-management-jules.html
│  ├─ quizzes
│  │  ├─ electronics-basics.html
│  │  └─ mechanical-materials.html
│  ├─ tutorials
│  │  ├─ Convolution-Of-Ramp-And-Exponential-Signals.html
│  │  ├─ Convolution-Properties-and-Theorems-20230304.md
│  │  ├─ Optimization-of-Cooling-Fin-Dimensions-20260218.html
│  │  ├─ Using-MATLAB-for-Discrete-Time-Convolution.html
│  │  ├─ complex-functions-analyticity.html
│  │  ├─ critical-points-of-multivariable-function-20260218.html
│  │  ├─ finite-difference-method-2d-temperature.html
│  │  ├─ interactive-learning-test.html
│  │  ├─ multivariable-calculus-second-derivative-test.html
│  │  ├─ one.html
│  │  ├─ optimization-lagrange-multipliers.html
│  │  └─ rate-of-change-directional-derivatives.html
│  └─ wiki
│     ├─ motor-selection.md
│     └─ template-test.md
├─ eslint.config.mjs
├─ frontmatter.json
├─ hooks
│  ├─ use-bookmarks.ts
│  ├─ use-bookmarks.tsx
│  ├─ use-debounce.ts
│  ├─ use-entertainment-bookmarks.ts
│  ├─ use-local-storage.ts
│  └─ use-persistent-state.ts
├─ lib
│  ├─ config.ts
│  ├─ content.ts
│  ├─ github.ts
│  ├─ omdb.ts
│  ├─ tmdb.ts
│  ├─ utils.ts
│  └─ yts.ts
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
│  ├─ content
│  │  └─ blog
│  │     ├─ C++ Starter Projects.avif
│  │     └─ Sinhala Archaic Numbers.avif
│  ├─ data
│  │  ├─ changelog.json
│  │  ├─ ousl_courses.json
│  │  └─ ousl_programmes.json
│  ├─ fonts
│  │  ├─ GoogleSans-Regular.woff
│  │  ├─ GoogleSans-Regular.woff2
│  │  ├─ Inter-Regular.woff
│  │  ├─ Inter-Regular.woff2
│  │  ├─ JetBrainsMono-Regular.woff
│  │  ├─ JetBrainsMono-Regular.woff2
│  │  ├─ MaterialSymbolsRounded-VariableFont_FILL,GRAD,opsz,wght.woff2
│  │  ├─ MozillaHeadline-ExtraLight.woff
│  │  ├─ MozillaHeadline-ExtraLight.woff2
│  │  ├─ MozillaHeadline-Regular.woff
│  │  ├─ MozillaHeadline-Regular.woff2
│  │  ├─ MozillaText-ExtraLight.woff
│  │  ├─ MozillaText-ExtraLight.woff2
│  │  ├─ MozillaText-Regular.woff
│  │  ├─ MozillaText-Regular.woff2
│  │  ├─ NotoSans-Regular.woff
│  │  ├─ NotoSans-Regular.woff2
│  │  ├─ NotoSansDisplay-Regular.woff
│  │  ├─ NotoSansDisplay-Regular.woff2
│  │  ├─ NotoSerifSinhala-Regular.woff
│  │  ├─ NotoSerifSinhala-Regular.woff2
│  │  ├─ Roboto-Regular.woff
│  │  ├─ Roboto-Regular.woff2
│  │  ├─ SpaceMono-Regular.woff
│  │  ├─ SpaceMono-Regular.woff2
│  │  ├─ Temml.woff2
│  │  ├─ demo.html
│  │  ├─ en
│  │  │  ├─ AMORIARegular.woff2
│  │  │  ├─ MozillaHeadline-Regular.woff2
│  │  │  └─ Philosopher.woff2
│  │  ├─ stylesheet.css
│  │  └─ ttf
│  │     ├─ GoogleSans-VariableFont_GRAD,opsz,wght.ttf
│  │     ├─ Inter-VariableFont_opsz,wght.ttf
│  │     ├─ JetBrainsMono-VariableFont_wght.ttf
│  │     ├─ MaterialSymbolsRounded-VariableFont_FILL,GRAD,opsz,wght.ttf
│  │     ├─ MozillaHeadline-Regular.ttf
│  │     ├─ MozillaHeadline-VariableFont_wdth,wght.ttf
│  │     ├─ MozillaText-Regular.ttf
│  │     ├─ MozillaText-VariableFont_wght.ttf
│  │     ├─ NotoSans-VariableFont_wdth,wght.ttf
│  │     ├─ NotoSansDisplay-VariableFont_wdth,wght.ttf
│  │     ├─ NotoSerifSinhala-VariableFont_wdth,wght.ttf
│  │     ├─ Roboto-VariableFont_wdth,wght.ttf
│  │     └─ SpaceMono-Regular.ttf
│  ├─ img
│  │  ├─ about_us.webp
│  │  ├─ blogfolios_og_icon.png
│  │  ├─ contact_us.webp
│  │  ├─ favicon
│  │  │  ├─ blog_48px.png
│  │  │  ├─ icons8_project_management.ico
│  │  │  ├─ icons8_project_management.svg
│  │  │  ├─ icons8_project_management_16.png
│  │  │  ├─ icons8_project_management_256.png
│  │  │  ├─ icons8_project_management_32.png
│  │  │  ├─ icons8_working_with_a_laptop.ico
│  │  │  ├─ icons8_working_with_a_laptop_128.png
│  │  │  ├─ icons8_working_with_a_laptop_16.png
│  │  │  ├─ icons8_working_with_a_laptop_256.png
│  │  │  ├─ icons8_working_with_a_laptop_32.png
│  │  │  ├─ icons8_working_with_a_laptop_48.png
│  │  │  ├─ icons8_working_with_a_laptop_64.png
│  │  │  ├─ pages_48px.png
│  │  │  ├─ portfolio_48px.png
│  │  │  └─ projects_48px.png
│  │  ├─ hero
│  │  │  ├─ 1.webp
│  │  │  ├─ 2.webp
│  │  │  ├─ 3.webp
│  │  │  ├─ 4.webp
│  │  │  └─ 5.jpg
│  │  ├─ page
│  │  │  ├─ blackhole.webp
│  │  │  ├─ diary.webp
│  │  │  ├─ diary_page.webp
│  │  │  ├─ ideas.webp
│  │  │  ├─ ideas_2.webp
│  │  │  ├─ ideas_item.webp
│  │  │  ├─ posts.webp
│  │  │  └─ workflow.webp
│  │  ├─ placeholder
│  │  │  ├─ placeholder-logo.png
│  │  │  ├─ placeholder-logo.svg
│  │  │  ├─ placeholder-user.jpg
│  │  │  ├─ placeholder.jpg
│  │  │  └─ placeholder.svg
│  │  └─ tutorials
│  │     ├─ complex-functions-analyticity.avif
│  │     ├─ finite-difference-method-2d-temperature.avif
│  │     ├─ multivariable-calculus-second-derivative-test.avif
│  │     ├─ optimization-lagrange-multipliers.avif
│  │     └─ rate-of-change-directional-derivatives.avif
│  ├─ manifest.json
│  └─ sw.js
├─ styles
│  └─ globals.css
├─ tailwind.config.js
├─ templates
│  ├─ README.md
│  ├─ blog-post.html
│  ├─ blog-post.md
│  ├─ project.html
│  ├─ project.md
│  ├─ tutorial.html
│  ├─ tutorial.md
│  ├─ wiki-entry.html
│  └─ wiki-entry.md
├─ tsconfig.json
└─ types
   ├─ changelog.ts
   ├─ github.ts
   └─ tmdb.ts
</pre></code>

 
</details>

---

## 🔮 Roadmap & Future Implementations

- [ ] **Interactive Roadmap**: A visual version of the engineering journey.
- [ ] **User Accounts**: Save configurations and track learning progress.
- [ ] **AI Technical Assistant**: Integrated LLM for technical queries.
- [ ] **Multi-language Support (i18n)**: Expanding global accessibility.
- [ ] **Community Forum**: Space for sharing engineering insights.
- [ ] **Public API**: Expose calculation engines for integrations.

---

## 🔧 Troubleshooting

### Content Not Showing

- Verify file extension is `.md` or `.html`.
- Check if the folder exists in `content/`.
- Ensure valid YAML frontmatter.

### Math Not Rendering

- Check syntax (`$` for inline, `$$` for block).
- Ensure `katex` CSS is imported in `layout.tsx`.

### Build Errors

- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && pnpm install`

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub.
2. Import in Vercel.
3. Automated deployment.

### Other Platforms

Supports Netlify, AWS Amplify, Railway, or self-hosting with Node.js.

---

## 📄 License

This project is for educational purposes and personal documentation. Feel free to use it as a reference for your own engineering blogfolio.

## 🤝 Acknowledgments

- **Open Source Community** for libraries like Next.js, Tailwind, and KaTeX.

## 📧 Contact

For inquiries, reach out via the [Contact Page](https://prasadm.vercel.app/contact) on the website.

---

**Built with ❤️ by PrasadM | Sri Lanka | 2026**

<a href="https://github.com/prasad-kmd/pmEngineerLK-NextJS/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=prasad-kmd/pmEngineerLK-NextJS" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
