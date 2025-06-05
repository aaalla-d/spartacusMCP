# Service & State Management Examples

This directory contains examples for all service and state management tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **create-service** - Basic service creation
2. **create-facade** - Facade service with business logic
3. **setup-ngrx-store** - NgRx store configuration
4. **create-ngrx-feature** - NgRx feature module
5. **create-api-client** - API client service
6. **create-interceptor** - HTTP interceptor
7. **create-guard** - Route guard
8. **create-resolver** - Route resolver
9. **create-validator** - Custom validator
10. **optimize-services** - Service optimization

## 📋 Examples

### 1. Basic Service Creation

```json
{
  "tool": "create-service",
  "arguments": {
    "name": "ProductService",
    "outputPath": "./src/app/services",
    "serviceType": "business",
    "includeTests": true,
    "includeInterface": true,
    "injectableScope": "root"
  }
}
```

### 2. Facade Service

```json
{
  "tool": "create-facade",
  "arguments": {
    "name": "ProductFacade",
    "outputPath": "./src/app/facades",
    "domain": "product",
    "includeStateManagement": true,
    "includeCache": true,
    "includeErrorHandling": true,
    "includeTests": true
  }
}
```

### 3. NgRx Store Setup

```json
{
  "tool": "setup-ngrx-store",
  "arguments": {
    "projectPath": "./src/app",
    "features": ["product", "cart", "user", "checkout"],
    "includeDevTools": true,
    "includeEffects": true,
    "includeRouterStore": true,
    "includeEntityAdapter": true
  }
}
```

### 4. NgRx Feature Module

```json
{
  "tool": "create-ngrx-feature",
  "arguments": {
    "featureName": "product",
    "outputPath": "./src/app/store/features",
    "entities": ["Product", "ProductVariant", "ProductReview"],
    "includeEffects": true,
    "includeSelectors": true,
    "includeTests": true,
    "useEntityAdapter": true
  }
}
```

### 5. API Client Service

```json
{
  "tool": "create-api-client",
  "arguments": {
    "name": "ProductApiClient",
    "outputPath": "./src/app/api",
    "baseUrl": "/api/v1/products",
    "endpoints": [
      {
        "name": "getProducts",
        "method": "GET",
        "path": "",
        "params": ["page", "size", "sort"]
      },
      {
        "name": "getProduct",
        "method": "GET",
        "path": "/{id}",
        "params": ["id"]
      },
      {
        "name": "createProduct",
        "method": "POST",
        "path": "",
        "body": "Product"
      }
    ],
    "includeErrorHandling": true,
    "includeRetry": true,
    "includeTests": true
  }
}
```

### 6. HTTP Interceptor

```json
{
  "tool": "create-interceptor",
  "arguments": {
    "name": "AuthInterceptor",
    "outputPath": "./src/app/interceptors",
    "interceptorType": "authentication",
    "features": ["token-injection", "token-refresh", "error-handling"],
    "includeTests": true,
    "includeLogging": true
  }
}
```

### 7. Route Guard

```json
{
  "tool": "create-guard",
  "arguments": {
    "name": "AuthGuard",
    "outputPath": "./src/app/guards",
    "guardType": "canActivate",
    "authenticationRequired": true,
    "permissions": ["read:products", "write:cart"],
    "redirectRoute": "/login",
    "includeTests": true
  }
}
```

### 8. Route Resolver

```json
{
  "tool": "create-resolver",
  "arguments": {
    "name": "ProductResolver",
    "outputPath": "./src/app/resolvers",
    "resolveType": "Product",
    "dependencies": ["ProductService", "UserService"],
    "includeErrorHandling": true,
    "includeCache": true,
    "includeTests": true
  }
}
```

### 9. Custom Validator

```json
{
  "tool": "create-validator",
  "arguments": {
    "name": "EmailValidator",
    "outputPath": "./src/app/validators",
    "validatorType": "async",
    "validationRules": {
      "pattern": "email",
      "uniqueness": true,
      "domain": ["company.com", "business.com"]
    },
    "includeTests": true,
    "includeI18n": true
  }
}
```

### 10. Service Optimization

```json
{
  "tool": "optimize-services",
  "arguments": {
    "projectPath": "./src/app",
    "optimizations": ["tree-shaking", "lazy-loading", "caching", "bundling"],
    "analyzeUsage": true,
    "generateReport": true,
    "preserveTests": true
  }
}
```

## 🎯 Advanced Examples

### Complete E-commerce Service Setup

```json
{
  "tool": "create-facade",
  "arguments": {
    "name": "EcommerceFacade",
    "outputPath": "./src/app/facades",
    "domain": "ecommerce",
    "services": [
      {
        "name": "ProductService",
        "methods": ["getProducts", "getProduct", "searchProducts"]
      },
      {
        "name": "CartService", 
        "methods": ["addToCart", "removeFromCart", "updateQuantity"]
      },
      {
        "name": "CheckoutService",
        "methods": ["createOrder", "processPayment", "confirmOrder"]
      }
    ],
    "includeStateManagement": true,
    "includeCache": true,
    "includeErrorHandling": true,
    "includeTests": true
  }
}
```

### B2B Service with Permissions

```json
{
  "tool": "create-service",
  "arguments": {
    "name": "B2BOrderService",
    "outputPath": "./src/app/b2b/services",
    "serviceType": "business",
    "features": [
      "approval-workflow",
      "cost-center-validation", 
      "budget-checking",
      "purchase-limits"
    ],
    "permissions": [
      "create:orders",
      "approve:orders", 
      "view:cost-centers",
      "manage:budgets"
    ],
    "includeTests": true,
    "includeAuditLog": true
  }
}
```

### Multi-Site Service

```json
{
  "tool": "create-service",
  "arguments": {
    "name": "MultiSiteService",
    "outputPath": "./src/app/services",
    "serviceType": "configuration",
    "features": [
      "site-detection",
      "currency-switching",
      "language-switching",
      "region-specific-content"
    ],
    "includeCache": true,
    "includeTests": true,
    "supportedSites": ["us", "eu", "asia"]
  }
}
```

## 🔧 Configuration Examples

### NgRx Store Configuration

```json
{
  "tool": "setup-ngrx-store",
  "arguments": {
    "projectPath": "./src/app",
    "storeConfig": {
      "runtimeChecks": {
        "strictStateImmutability": true,
        "strictActionImmutability": true,
        "strictStateSerializability": true,
        "strictActionSerializability": true
      },
      "metaReducers": ["logger", "hydration"],
      "initialState": {}
    },
    "features": [
      {
        "name": "product",
        "entities": ["Product", "Category", "Brand"],
        "includeEffects": true
      },
      {
        "name": "cart", 
        "entities": ["CartEntry", "Promotion"],
        "includeEffects": true
      }
    ],
    "includeDevTools": true,
    "includeRouterStore": true
  }
}
```

### API Client with Authentication

```json
{
  "tool": "create-api-client",
  "arguments": {
    "name": "SecureApiClient",
    "outputPath": "./src/app/api",
    "baseUrl": "/api/v2",
    "authentication": {
      "type": "oauth2",
      "tokenEndpoint": "/oauth/token",
      "refreshEndpoint": "/oauth/refresh",
      "scopes": ["read", "write", "admin"]
    },
    "interceptors": ["auth", "error", "loading", "retry"],
    "retryConfig": {
      "maxRetries": 3,
      "retryDelay": 1000,
      "retryCondition": ["network-error", "5xx"]
    },
    "includeTests": true
  }
}
```

## 💡 Best Practices

### Service Design
1. **Single Responsibility** - Each service should have one clear purpose
2. **Dependency Injection** - Use Angular's DI system properly
3. **Error Handling** - Implement comprehensive error handling
4. **Testing** - Write unit tests for all services
5. **Documentation** - Document service APIs and usage

### State Management
1. **Immutability** - Always use immutable state updates
2. **Normalization** - Normalize complex state structures
3. **Selectors** - Use memoized selectors for performance
4. **Effects** - Handle side effects in NgRx effects
5. **DevTools** - Use Redux DevTools for debugging

### API Integration
1. **Type Safety** - Use TypeScript interfaces for API responses
2. **Error Handling** - Handle HTTP errors gracefully
3. **Caching** - Implement appropriate caching strategies
4. **Retry Logic** - Add retry logic for failed requests
5. **Loading States** - Manage loading states properly

## 🔧 Next Steps

After creating services:
1. **Configure dependency injection** in modules
2. **Set up error handling** and logging
3. **Implement caching** strategies
4. **Add monitoring** and analytics
5. **Write integration tests**
6. **Document APIs** and usage patterns 