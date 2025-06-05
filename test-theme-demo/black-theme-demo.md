# Black Theme Demo - Spartacus MCP Server

This demo shows how to use the Spartacus MCP Server to create a complete black theme for your Spartacus storefront.

## 🎨 Theme Overview

**Theme Name**: Midnight Black Theme
**Style**: Dark, modern, professional
**Target**: Premium e-commerce experience

## 🛠️ MCP Server Commands Used

### 1. Create Theme Component

```json
{
  "name": "MidnightTheme",
  "selector": "cx-midnight-theme",
  "category": "styling",
  "outputPath": "./src/app/themes/midnight",
  "hasModule": true,
  "hasService": true,
  "hasModel": true,
  "cmsComponent": "MidnightThemeComponent",
  "dependencies": ["ThemeService", "ConfigService"]
}
```

### 2. Create Theme Configuration Service

```json
{
  "name": "ThemeConfigService",
  "outputPath": "./src/app/themes/midnight/services",
  "injectable": true,
  "dependencies": ["ConfigService", "WindowRef"]
}
```

### 3. Create Theme Models

```json
{
  "name": "ThemeConfig",
  "outputPath": "./src/app/themes/midnight/models",
  "properties": {
    "primaryColor": "string",
    "secondaryColor": "string",
    "backgroundColor": "string",
    "textColor": "string",
    "accentColor": "string",
    "borderColor": "string",
    "shadowColor": "string"
  }
}
```

## 📁 Generated File Structure

```
src/app/themes/midnight/
├── midnight-theme.component.ts
├── midnight-theme.component.html
├── midnight-theme.component.scss
├── midnight-theme.component.spec.ts
├── midnight-theme.module.ts
├── midnight-theme.service.ts
├── midnight-theme.service.spec.ts
├── midnight-theme.model.ts
├── services/
│   ├── theme-config-service.service.ts
│   └── theme-config-service.service.spec.ts
├── models/
│   └── theme-config.model.ts
└── index.ts
```

## 🎨 Theme Implementation

The MCP server generates the foundation, and here's how to implement the black theme:

### Color Palette
- **Primary**: #000000 (Pure Black)
- **Secondary**: #1a1a1a (Dark Gray)
- **Background**: #0d0d0d (Almost Black)
- **Text**: #ffffff (White)
- **Accent**: #ff6b35 (Orange)
- **Border**: #333333 (Medium Gray)
- **Shadow**: rgba(255, 255, 255, 0.1) (White Shadow)

### Key Features
- Dark navigation with subtle borders
- High contrast text for accessibility
- Orange accent for CTAs and highlights
- Subtle shadows and gradients
- Mobile-responsive design
- Smooth transitions and animations

## 🚀 Usage

1. Generate components using MCP server
2. Customize the generated SCSS with black theme colors
3. Import theme module in your app
4. Configure CMS components
5. Test across different devices

## 📱 Responsive Design

The theme adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility

- WCAG 2.1 AA compliant
- High contrast ratios
- Keyboard navigation support
- Screen reader friendly 