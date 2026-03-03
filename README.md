# PrasadM | Engineering Blogfolio

A comprehensive, high-performance personal blogfolio and engineering workspace built with Next.js 15, Tailwind CSS 4, and TypeScript. This platform is designed to document an engineering journey, featuring a file-based CMS, interactive tools, and technical documentation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PrasadM/pm-blogfolio-webapp)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/PrasadM/pm-blogfolio-webapp)

## 🚀 Key Features

### 🛠️ Engineering Workspace
A suite of over 30+ interactive tools for electronics, mechanical engineering, mechatronics, and data science.
- **Electronics**: Resistor Solver, Voltage Divider, PCB Trace/Impedance, 555 Timer, LED Resistor, Op-Amp Gain.
- **Mechanical**: Moment of Inertia, ISO Fits & Tolerances, Beam Deflection, Gear Ratio, Bolt Torque Chart.
- **Mechatronics**: PID Simulator & Tuner, PWM to Voltage, Stepper Motor, Battery Estimator, Sensor Scaling.
- **Software & Math**: Matrix Calculator, Curve Fitter, LaTeX/MathML Converter, Regex Architect, JSON Validator.
- **Productivity**: Markdown Editor, User Persona Creator, Resume Creator, Color Contrast Checker.
- **Education**: Engineering Student Navigator (OUSL Guide 2025/26).

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
- **PWA Ready**: Offline support with a manual Service Worker implementation and optimized `manifest.json`.
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
- Reinstall: `rm -rf node_modules && npm install`

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
- **The Open University of Sri Lanka** for academic support.
- **Open Source Community** for libraries like Next.js, Tailwind, and KaTeX.

## 📧 Contact
For inquiries, reach out via the [Contact Page](/contact) on the website.

---
**Built with ❤️ by PrasadM | Sri Lanka | 2025**
