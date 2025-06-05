# Component Generation Examples

This directory contains examples for all component generation tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **create-component** - Basic component creation
2. **create-smart-component** - Smart component with state management
3. **create-b2b-component** - B2B-specific component
4. **create-b2c-component** - B2C-specific component
5. **create-cms-component** - CMS-enabled component
6. **create-product-component** - Product-related component
7. **create-cart-component** - Cart-related component
8. **create-checkout-component** - Checkout-related component
9. **create-user-component** - User management component
10. **create-search-component** - Search functionality component
11. **create-navigation-component** - Navigation component
12. **create-layout-component** - Layout component
13. **create-form-component** - Form component with validation
14. **refactor-component** - Component refactoring
15. **optimize-component** - Component optimization

## 📋 Examples

### 1. Basic Component Creation

```json
{
  "tool": "create-component",
  "arguments": {
    "name": "ProductCard",
    "outputPath": "./src/app/components",
    "type": "component",
    "includeTests": true,
    "includeStorybook": true,
    "styling": "scss"
  }
}
```

### 2. Smart Component with State Management

```json
{
  "tool": "create-smart-component",
  "arguments": {
    "name": "ProductList",
    "outputPath": "./src/app/components",
    "stateManagement": "ngrx",
    "apiIntegration": true,
    "includeEffects": true,
    "includeSelectors": true,
    "includeTests": true
  }
}
```

### 3. B2B Component

```json
{
  "tool": "create-b2b-component",
  "arguments": {
    "name": "OrganizationManagement",
    "outputPath": "./src/app/b2b/components",
    "features": ["user-management", "approval-process", "cost-center"],
    "includePermissions": true,
    "includeWorkflow": true,
    "includeTests": true
  }
}
```

### 4. B2C Component

```json
{
  "tool": "create-b2c-component",
  "arguments": {
    "name": "WishlistButton",
    "outputPath": "./src/app/b2c/components",
    "features": ["wishlist", "social-sharing", "recommendations"],
    "includePersonalization": true,
    "includeAnalytics": true,
    "includeTests": true
  }
}
```

### 5. CMS Component

```json
{
  "tool": "create-cms-component",
  "arguments": {
    "name": "BannerComponent",
    "outputPath": "./src/app/cms/components",
    "cmsComponentType": "SimpleBannerComponent",
    "smartEditEnabled": true,
    "personalizationEnabled": true,
    "includeTests": true
  }
}
```

### 6. Product Component

```json
{
  "tool": "create-product-component",
  "arguments": {
    "name": "ProductDetails",
    "outputPath": "./src/app/product/components",
    "features": ["variants", "reviews", "recommendations", "zoom"],
    "includeB2BFeatures": false,
    "includeInventory": true,
    "includeTests": true
  }
}
```

### 7. Cart Component

```json
{
  "tool": "create-cart-component",
  "arguments": {
    "name": "MiniCart",
    "outputPath": "./src/app/cart/components",
    "features": ["quick-add", "promotions", "saved-carts"],
    "includeB2BFeatures": true,
    "includeValidation": true,
    "includeTests": true
  }
}
```

### 8. Checkout Component

```json
{
  "tool": "create-checkout-component",
  "arguments": {
    "name": "PaymentMethod",
    "outputPath": "./src/app/checkout/components",
    "paymentMethods": ["credit-card", "paypal", "apple-pay"],
    "includeValidation": true,
    "includeSecurity": true,
    "includeTests": true
  }
}
```

### 9. User Component

```json
{
  "tool": "create-user-component",
  "arguments": {
    "name": "UserProfile",
    "outputPath": "./src/app/user/components",
    "features": ["profile-edit", "address-book", "order-history"],
    "includeAuthentication": true,
    "includePermissions": true,
    "includeTests": true
  }
}
```

### 10. Search Component

```json
{
  "tool": "create-search-component",
  "arguments": {
    "name": "ProductSearch",
    "outputPath": "./src/app/search/components",
    "features": ["autocomplete", "facets", "sorting", "pagination"],
    "includeFilters": true,
    "includeAnalytics": true,
    "includeTests": true
  }
}
```

### 11. Navigation Component

```json
{
  "tool": "create-navigation-component",
  "arguments": {
    "name": "MegaMenu",
    "outputPath": "./src/app/navigation/components",
    "navigationLevels": 3,
    "includeSearch": true,
    "includeMobile": true,
    "includeAccessibility": true,
    "includeTests": true
  }
}
```

### 12. Layout Component

```json
{
  "tool": "create-layout-component",
  "arguments": {
    "name": "ProductListLayout",
    "outputPath": "./src/app/layout/components",
    "layoutType": "grid",
    "responsive": true,
    "includeFilters": true,
    "includePagination": true,
    "includeTests": true
  }
}
```

### 13. Form Component

```json
{
  "tool": "create-form-component",
  "arguments": {
    "name": "ContactForm",
    "outputPath": "./src/app/forms/components",
    "formType": "reactive",
    "validationRules": ["required", "email", "phone"],
    "includeAccessibility": true,
    "includeI18n": true,
    "includeTests": true
  }
}
```

### 14. Component Refactoring

```json
{
  "tool": "refactor-component",
  "arguments": {
    "componentPath": "./src/app/components/product-card.component.ts",
    "refactorType": "extract-service",
    "targetService": "ProductCardService",
    "preserveTests": true,
    "updateImports": true
  }
}
```

### 15. Component Optimization

```json
{
  "tool": "optimize-component",
  "arguments": {
    "componentPath": "./src/app/components/product-list.component.ts",
    "optimizations": ["change-detection", "lazy-loading", "bundle-size"],
    "generateReport": true,
    "preserveTests": true
  }
}
```

## 🎯 Common Parameters

### Required Parameters
- **name**: Component name (PascalCase)
- **outputPath**: Directory where component will be created

### Optional Parameters
- **includeTests**: Generate unit tests (default: true)
- **includeStorybook**: Generate Storybook stories (default: false)
- **styling**: CSS preprocessor (scss, css, less)
- **changeDetection**: OnPush or Default
- **standalone**: Create standalone component (Angular 14+)

### Feature-Specific Parameters
- **features**: Array of feature flags
- **stateManagement**: ngrx, akita, or none
- **apiIntegration**: Enable API integration
- **includePermissions**: Add permission checks
- **includeAnalytics**: Add analytics tracking

## 💡 Best Practices

1. **Use descriptive names** for components
2. **Enable tests** for all components
3. **Choose appropriate features** for your use case
4. **Consider B2B vs B2C** requirements
5. **Include accessibility** features when needed
6. **Use OnPush change detection** for performance
7. **Enable i18n** for multi-language support

## 🔧 Next Steps

After generating components:
1. Review generated code
2. Customize styling
3. Add business logic
4. Run tests
5. Update documentation 