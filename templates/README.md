# Content Templates for PMEngineerLK

This directory contains Markdown templates for various content types on the site. Use these to ensure consistency and take advantage of built-in features like quizzes and special alerts.

## Available Templates

- [blog-post.md](./blog-post.md): For general blog posts.
- [tutorial.md](./tutorial.md): For step-by-step guides.
- [wiki-entry.md](./wiki-entry.md): For technical references and wiki entries.
- [project.md](./project.md): For documenting engineering projects.

## How to Use

1. Copy the content of a template file.
2. Create a new `.md` or `.html` file in the corresponding `content/` subdirectory (e.g., `content/blog/`).
3. Fill in the front matter and content.

## Key Features

### Front Matter Fields

| Field         | Description                                        | Example                  |
| :------------ | :------------------------------------------------- | :----------------------- |
| `title`       | The main heading of the page.                      | `"My Engineering Post"`  |
| `date`        | Publication date (YYYY-MM-DD).                     | `"2024-03-04"`           |
| `description` | Short summary for SEO and cards.                   | `"Learn how to..."`      |
| `technical`   | Category (used in Wiki/Tutorials).                 | `"Mechatronics"`         |
| `tags`        | List of relevant keywords.                         | `["motors", "robotics"]` |
| `final`       | (Blog only) Shows a green "Marked as Final" badge. | `true`                   |

### Quizzes

Quizzes are supported via the `[quiz]` block. The content must be a valid JSON object following this structure:

```markdown
[quiz]
{
"title": "Optional Quiz Title",
"questions": [
{
"question": "The question text?",
"options": ["Option A", "Option B", "Option C"],
"answer": 0,
"explanation": "Detailed explanation shown after answering."
}
]
}
[/quiz]
```

Note: `answer` is a **0-based index** (0 for the first option).

### Special Alerts (Tailwind Styled)

The content renderer supports GitHub-style alerts:

- `> [!NOTE]` (Blue)
- `> [!TIP]` (Green)
- `> [!IMPORTANT]` (Purple)
- `> [!WARNING]` (Yellow)
- `> [!CAUTION]` (Red)

These automatically respect dark/light modes.

### Math Notation

Latex-style math is supported:

- Inline: `$E=mc^2$`
- Block: `$$ equation $$`

## Tips

- Avoid using the exact same `slug` (filename) across different content types if possible.
- Quizzes are interactive and will show a progress bar.
- Images used in the content will be automatically extracted for the preview card.
