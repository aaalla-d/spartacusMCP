# Styling & Theming Tools Examples

This directory contains examples for all styling and theming tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **generate-theme** - Custom theme generation
2. **generate-css-variables** - CSS custom properties generation
3. **create-design-tokens** - Design token system creation
4. **optimize-scss** - SCSS optimization and analysis
5. **create-component-styles** - Component-specific styling
6. **generate-responsive-styles** - Responsive design utilities
7. **create-brand-theme** - Brand-specific theme creation
8. **analyze-css-usage** - CSS usage analysis and cleanup

## 📋 Basic Examples

### 1. Generate Custom Theme

```json
{
  "tool": "generate-theme",
  "arguments": {
    "themeName": "corporate-blue",
    "baseTheme": "spartacus",
    "outputPath": "./src/styles/themes/corporate-blue",
    "colorPalette": {
      "primary": "#1976d2",
      "secondary": "#424242",
      "accent": "#ff4081",
      "warn": "#f44336",
      "success": "#4caf50"
    },
    "typography": {
      "fontFamily": "Roboto, sans-serif",
      "fontSize": "14px",
      "lineHeight": "1.5"
    },
    "spacing": {
      "base": "8px",
      "scale": [0.5, 1, 1.5, 2, 3, 4, 6, 8]
    },
    "includeComponents": true,
    "includeUtilities": true,
    "includeTokens": true
  }
}
```

### 2. Generate CSS Variables

```json
{
  "tool": "generate-css-variables",
  "arguments": {
    "variableSet": "colors",
    "outputPath": "./src/styles/variables/colors.scss",
    "variables": {
      "--primary-color": "#1976d2",
      "--secondary-color": "#424242",
      "--background-color": "#ffffff",
      "--text-color": "#333333",
      "--border-color": "#e0e0e0"
    },
    "generateFallbacks": true,
    "includeDocumentation": true
  }
}
```

### 3. Create Design Tokens

```json
{
  "tool": "create-design-tokens",
  "arguments": {
    "inputFormat": "figma",
    "inputPath": "./design-tokens/figma-tokens.json",
    "outputPath": "./src/styles/tokens",
    "outputFormat": "scss",
    "categories": ["colors", "typography", "spacing", "shadows", "borders"],
    "generateUtilities": true
  }
}
```

### 4. Optimize SCSS

```json
{
  "tool": "optimize-scss",
  "arguments": {
    "inputPath": "./src/styles",
    "outputPath": "./src/styles/optimized",
    "optimizations": ["remove-unused", "merge-duplicates", "minify-selectors"],
    "generateReport": true
  }
}
```

## 🎨 Advanced Theming Examples

### Complete Brand Theme Creation

```json
{
  "tool": "generate-theme",
  "arguments": {
    "themeName": "luxury-brand",
    "baseTheme": "spartacus",
    "outputPath": "./src/styles/themes/luxury-brand",
    "colorPalette": {
      "primary": "#d4af37",
      "secondary": "#2c2c2c",
      "accent": "#c9a96e",
      "warn": "#dc3545",
      "success": "#28a745",
      "info": "#17a2b8",
      "light": "#f8f9fa",
      "dark": "#343a40",
      "neutral": {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#eeeeee",
        "300": "#e0e0e0",
        "400": "#bdbdbd",
        "500": "#9e9e9e",
        "600": "#757575",
        "700": "#616161",
        "800": "#424242",
        "900": "#212121"
      }
    },
    "typography": {
      "fontFamily": {
        "primary": "Playfair Display, serif",
        "secondary": "Source Sans Pro, sans-serif",
        "monospace": "Monaco, monospace"
      },
      "fontSizes": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem"
      },
      "fontWeights": {
        "light": 300,
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      },
      "lineHeights": {
        "tight": 1.25,
        "normal": 1.5,
        "relaxed": 1.75
      }
    },
    "spacing": {
      "base": "8px",
      "scale": [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64]
    },
    "breakpoints": {
      "xs": "0px",
      "sm": "576px",
      "md": "768px",
      "lg": "992px",
      "xl": "1200px",
      "xxl": "1400px"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "base": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    "borders": {
      "width": {
        "thin": "1px",
        "base": "2px",
        "thick": "4px"
      },
      "radius": {
        "none": "0",
        "sm": "0.125rem",
        "base": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      }
    },
    "includeComponents": true,
    "includeUtilities": true,
    "includeTokens": true,
    "includeDarkMode": true,
    "includeRTL": true,
    "generateDocumentation": true
  }
}
```

### Multi-Brand Theme System

```json
{
  "tool": "create-brand-theme",
  "arguments": {
    "brands": [
      {
        "name": "brand-a",
        "displayName": "Brand A",
        "colors": {
          "primary": "#ff6b35",
          "secondary": "#004e89"
        },
        "logo": "./assets/brand-a/logo.svg",
        "favicon": "./assets/brand-a/favicon.ico"
      },
      {
        "name": "brand-b",
        "displayName": "Brand B",
        "colors": {
          "primary": "#7209b7",
          "secondary": "#560bad"
        },
        "logo": "./assets/brand-b/logo.svg",
        "favicon": "./assets/brand-b/favicon.ico"
      }
    ],
    "outputPath": "./src/styles/brands",
    "sharedTokens": "./src/styles/tokens/shared.scss",
    "generateSwitcher": true,
    "includeDynamicLoading": true,
    "generateDocumentation": true
  }
}
```

### Responsive Design System

```json
{
  "tool": "generate-responsive-styles",
  "arguments": {
    "outputPath": "./src/styles/responsive",
    "breakpoints": {
      "mobile": "320px",
      "tablet": "768px",
      "desktop": "1024px",
      "wide": "1440px"
    },
    "containerSizes": {
      "mobile": "100%",
      "tablet": "750px",
      "desktop": "970px",
      "wide": "1170px"
    },
    "gridSystem": {
      "columns": 12,
      "gutter": "30px",
      "includeFlexbox": true,
      "includeCSS Grid": true
    },
    "utilities": [
      "display",
      "flexbox",
      "spacing",
      "typography",
      "visibility"
    ],
    "generateMixins": true,
    "includeDocumentation": true
  }
}
```

## 🎯 Component-Specific Styling

### Product Component Styling

```json
{
  "tool": "create-component-styles",
  "arguments": {
    "componentName": "ProductCard",
    "outputPath": "./src/app/components/product-card/product-card.component.scss",
    "styleType": "component",
    "includeVariants": true,
    "variants": [
      {
        "name": "compact",
        "modifiers": {
          "padding": "0.5rem",
          "fontSize": "0.875rem"
        }
      },
      {
        "name": "featured",
        "modifiers": {
          "border": "2px solid var(--primary-color)",
          "boxShadow": "var(--shadow-lg)"
        }
      }
    ],
    "includeStates": true,
    "states": ["hover", "focus", "active", "disabled"],
    "includeResponsive": true,
    "includeAccessibility": true
  }
}
```

### Cart Component Styling

```json
{
  "tool": "create-component-styles",
  "arguments": {
    "componentName": "CartSummary",
    "outputPath": "./src/app/components/cart-summary/cart-summary.component.scss",
    "styleType": "component",
    "includeAnimations": true,
    "animations": [
      {
        "name": "slideIn",
        "duration": "0.3s",
        "easing": "ease-out"
      },
      {
        "name": "fadeIn",
        "duration": "0.2s",
        "easing": "ease-in"
      }
    ],
    "includeVariants": true,
    "variants": [
      {
        "name": "mini",
        "modifiers": {
          "maxWidth": "300px",
          "fontSize": "0.875rem"
        }
      },
      {
        "name": "expanded",
        "modifiers": {
          "minWidth": "400px",
          "padding": "2rem"
        }
      }
    ],
    "includeStates": true,
    "includeResponsive": true
  }
}
```

## 🔧 Design Token Examples

### Complete Design Token System

```json
{
  "tool": "create-design-tokens",
  "arguments": {
    "inputFormat": "json",
    "inputPath": "./design-system/tokens.json",
    "outputPath": "./src/styles/tokens",
    "outputFormats": ["scss", "css", "json", "js"],
    "tokenCategories": {
      "colors": {
        "semantic": true,
        "generateUtilities": true,
        "includeAlpha": true
      },
      "typography": {
        "includeWebfonts": true,
        "generateUtilities": true,
        "includeLineHeight": true
      },
      "spacing": {
        "generateUtilities": true,
        "includeNegative": true
      },
      "shadows": {
        "generateUtilities": true,
        "includeInset": true
      },
      "borders": {
        "generateUtilities": true,
        "includeRadius": true
      },
      "animations": {
        "generateUtilities": true,
        "includeKeyframes": true
      }
    },
    "transformations": {
      "nameCase": "kebab",
      "prefix": "cx",
      "includeComments": true
    },
    "generateDocumentation": true,
    "documentationFormat": "markdown"
  }
}
```

### Figma to Spartacus Token Conversion

```json
{
  "tool": "create-design-tokens",
  "arguments": {
    "inputFormat": "figma",
    "inputPath": "./design-tokens/figma-export.json",
    "outputPath": "./src/styles/tokens/figma",
    "outputFormat": "scss",
    "figmaConfig": {
      "extractColors": true,
      "extractTypography": true,
      "extractSpacing": true,
      "extractEffects": true,
      "includeComponents": false
    },
    "transformations": {
      "colorFormat": "hsl",
      "unitConversion": "rem",
      "nameMapping": {
        "Primary/500": "primary",
        "Secondary/500": "secondary",
        "Neutral/100": "background"
      }
    },
    "validation": {
      "checkContrast": true,
      "minContrastRatio": 4.5,
      "validateNaming": true
    },
    "generateReport": true
  }
}
```

## 📊 CSS Analysis & Optimization

### Comprehensive CSS Analysis

```json
{
  "tool": "analyze-css-usage",
  "arguments": {
    "projectPath": "./",
    "cssFiles": ["./src/styles/**/*.scss", "./src/app/**/*.scss"],
    "htmlFiles": ["./src/app/**/*.html"],
    "analysisType": "comprehensive",
    "checks": [
      "unused-selectors",
      "duplicate-rules",
      "specificity-issues",
      "performance-issues",
      "accessibility-issues"
    ],
    "generateReport": true,
    "outputPath": "./reports/css-analysis.html",
    "includeRecommendations": true
  }
}
```

### SCSS Optimization with Performance Focus

```json
{
  "tool": "optimize-scss",
  "arguments": {
    "inputPath": "./src/styles",
    "outputPath": "./src/styles/optimized",
    "optimizations": [
      "remove-unused-variables",
      "merge-duplicate-selectors",
      "optimize-nesting",
      "remove-empty-rules",
      "optimize-imports",
      "compress-colors",
      "optimize-media-queries"
    ],
    "performanceOptimizations": {
      "criticalCSS": true,
      "splitByRoute": true,
      "lazyLoadNonCritical": true
    },
    "preserveComments": false,
    "generateSourceMaps": true,
    "generateReport": true,
    "reportPath": "./reports/scss-optimization.json"
  }
}
```

## 🌙 Dark Mode & Accessibility

### Dark Mode Theme Generation

```json
{
  "tool": "generate-theme",
  "arguments": {
    "themeName": "dark-mode",
    "baseTheme": "spartacus",
    "outputPath": "./src/styles/themes/dark",
    "colorPalette": {
      "primary": "#bb86fc",
      "secondary": "#03dac6",
      "background": "#121212",
      "surface": "#1e1e1e",
      "text": "#ffffff",
      "textSecondary": "#b3b3b3"
    },
    "darkMode": true,
    "accessibility": {
      "highContrast": true,
      "focusIndicators": true,
      "reducedMotion": true
    },
    "includeComponents": true,
    "includeUtilities": true,
    "generateToggle": true
  }
}
```

### Accessibility-First Styling

```json
{
  "tool": "create-component-styles",
  "arguments": {
    "componentName": "AccessibleButton",
    "outputPath": "./src/styles/components/accessible-button.scss",
    "accessibility": {
      "focusVisible": true,
      "highContrast": true,
      "reducedMotion": true,
      "screenReader": true,
      "colorBlindness": true
    },
    "contrastRatios": {
      "normal": 4.5,
      "large": 3.0,
      "enhanced": 7.0
    },
    "includeARIA": true,
    "generateDocumentation": true
  }
}
```

## 🎨 Advanced Customization Examples

### E-commerce Specific Theme

```json
{
  "tool": "generate-theme",
  "arguments": {
    "themeName": "ecommerce-pro",
    "baseTheme": "spartacus",
    "outputPath": "./src/styles/themes/ecommerce-pro",
    "ecommerceFeatures": {
      "productCards": {
        "hoverEffects": true,
        "quickView": true,
        "wishlistButton": true,
        "compareButton": true
      },
      "cart": {
        "miniCart": true,
        "progressIndicator": true,
        "recommendations": true
      },
      "checkout": {
        "stepIndicator": true,
        "validation": true,
        "securityBadges": true
      },
      "search": {
        "autocomplete": true,
        "filters": true,
        "sorting": true
      }
    },
    "animations": {
      "pageTransitions": true,
      "microInteractions": true,
      "loadingStates": true
    },
    "performance": {
      "criticalCSS": true,
      "lazyLoading": true,
      "caching": true
    }
  }
}
```

### B2B Theme Customization

```json
{
  "tool": "generate-theme",
  "arguments": {
    "themeName": "b2b-corporate",
    "baseTheme": "spartacus",
    "outputPath": "./src/styles/themes/b2b-corporate",
    "b2bFeatures": {
      "organizationManagement": true,
      "approvalWorkflows": true,
      "bulkOrdering": true,
      "quotations": true,
      "accountHierarchy": true
    },
    "colorPalette": {
      "primary": "#0066cc",
      "secondary": "#4d4d4d",
      "accent": "#ff9900",
      "success": "#00cc66",
      "warning": "#ffcc00",
      "error": "#cc0000"
    },
    "typography": {
      "fontFamily": "Arial, sans-serif",
      "businessFriendly": true,
      "readability": "high"
    },
    "layout": {
      "density": "comfortable",
      "navigation": "sidebar",
      "dashboard": true
    }
  }
}
```

## 💡 Best Practices

### Theme Development
1. **Start with design tokens** for consistency
2. **Use semantic color names** instead of literal colors
3. **Implement proper contrast ratios** for accessibility
4. **Test across different devices** and screen sizes
5. **Consider dark mode** from the beginning

### SCSS Organization
1. **Follow the 7-1 pattern** for file structure
2. **Use meaningful variable names** with proper prefixes
3. **Avoid deep nesting** (max 3-4 levels)
4. **Utilize mixins and functions** for reusability
5. **Document your code** with comments

### Performance Optimization
1. **Generate critical CSS** for above-the-fold content
2. **Lazy load non-critical styles** for better performance
3. **Optimize images and fonts** used in CSS
4. **Use CSS custom properties** for dynamic theming
5. **Minimize and compress** production CSS

### Accessibility Guidelines
1. **Maintain proper color contrast** ratios
2. **Provide focus indicators** for keyboard navigation
3. **Support reduced motion** preferences
4. **Use semantic HTML** with appropriate styling
5. **Test with screen readers** and assistive technologies

## 🔧 Next Steps

After creating themes and styles:
1. **Test thoroughly** across browsers and devices
2. **Validate accessibility** compliance
3. **Optimize for performance** in production
4. **Document theme usage** for team members
5. **Set up automated testing** for style regressions
6. **Create style guides** and component libraries 