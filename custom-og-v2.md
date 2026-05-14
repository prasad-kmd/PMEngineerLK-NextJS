# Custom OG Image Generator V2: Research & Design Notes

This document outlines potential future enhancements for the Custom OG Image Generator tool. These features are NOT yet implemented and serve as a roadmap for future development.

## 1. Custom Fonts in ImageResponse

Currently, the generator relies on standard system fonts (sans-serif) for reliability and performance. Adding custom fonts would significantly enhance branding.

### Implementation Strategy
- **Hosting:** Font files (.ttf) should be hosted in the `public/fonts` directory or fetched from a reliable CDN like Google Fonts (direct file links).
- **Fetching:** Use `fetch()` to retrieve the font as an `ArrayBuffer` within the Edge function.
- **Integration:** Pass the font data to the `ImageResponse` options:
  ```typescript
  const interRegular = await fetch(new URL('../../public/fonts/Inter-Regular.ttf', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
  
  return new ImageResponse(..., {
    fonts: [
      {
        name: 'Inter',
        data: interRegular,
        style: 'normal',
        weight: 400,
      },
    ],
  });
  ```

### Considerations
- **Performance:** Fetching fonts on every request can add latency. Caching the font buffer or using a fast storage layer is essential.
- **Edge Limits:** Be mindful of the total bundle size and memory limits in Edge functions when loading multiple font weights.

## 2. Advanced Font Customization UI

Allowing admins to tweak typography directly from the UI.

### Proposed Controls
- **Font Family Select:** A dropdown of curated font pairings (e.g., "Modern Sans", "Classic Serif", "Tech Mono").
- **Font Size Sliders:** Granular control over Title and Description sizes (e.g., 40px to 120px).
- **Line Height & Letter Spacing:** Inputs to fine-tune readability for different text lengths.

### Validation
- **Clamping:** Enforce minimum and maximum font sizes to prevent layout breaking.
- **Auto-scaling:** Implement a "Best Fit" toggle that calculates the optimal font size based on character count.

## 3. Background & Texture Customization

Enhancing the visual depth of the OG images beyond simple gradients.

### Suggested Templates
- **Grid/Noise:** A subtle engineering grid or film grain overlay.
- **Abstract Patterns:** SVG-based patterns (dots, waves, isometric cubes) that react to the accent color.
- **Gradient Packs:** A selection of "Vibe" gradients (e.g., "Midnight", "Sunset", "Ocean").

### Implementation
- **Query Param Scheme:** `bg=grid|noise|dots|gradientA`
- **SVG Injection:** Using React components to render SVG patterns directly within the `ImageResponse` JSX.

## 4. Safety & Complexity Concerns
- **SSRF Hardening:** As more customization is added, ensuring that user-provided values (especially URLs for fonts or backgrounds) are strictly validated.
- **Generation Time:** Complex layouts with multiple remote assets and SVG filters might approach the Edge function timeout limits.
- **Layout Robustness:** Ensuring the "No Image" vs "With Image" layouts remain balanced even with extreme font size selections.
