# Fonts Directory

This directory contains all the font files used in the project.

## Structure

```
fonts/
├── index.css        # Font face declarations and imports
├── README.md        # This file
└── [font-files]     # Font files in various formats (woff2, woff)
```

## Adding New Fonts

1. Add your font files to this directory
2. Update `index.css` with the appropriate `@font-face` declarations
3. Import `index.css` in your main stylesheet or component

## Supported Formats

We recommend using the following formats in order of preference:
1. WOFF2 (.woff2) - Best compression and modern browser support
2. WOFF (.woff) - Good compression and wide browser support

## Usage Example

```css
/* In index.css */
@font-face {
  font-family: 'YourFont';
  src: url('./YourFont-Regular.woff2') format('woff2'),
       url('./YourFont-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

```css
/* In your component or stylesheet */
.your-element {
  font-family: 'YourFont', sans-serif;
}
```

## Best Practices

1. Always include a fallback font
2. Use `font-display: swap` for better performance
3. Preload critical fonts
4. Include multiple weights only if needed
5. Consider using variable fonts for multiple weights 