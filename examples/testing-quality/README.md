# Testing & Quality Tools Examples

This directory contains examples for all testing and quality tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **generate-unit-tests** - Unit test generation
2. **generate-e2e-tests** - End-to-end test creation
3. **setup-test-environment** - Test environment configuration
4. **create-test-data** - Test data generation
5. **run-quality-checks** - Code quality analysis
6. **generate-test-reports** - Test reporting
7. **setup-performance-tests** - Performance testing setup
8. **create-accessibility-tests** - Accessibility testing
9. **setup-visual-regression** - Visual regression testing
10. **generate-api-tests** - API testing setup

## 📋 Basic Examples

### 1. Generate Unit Tests

```json
{
  "tool": "generate-unit-tests",
  "arguments": {
    "componentPath": "./src/app/components/product-card",
    "outputPath": "./src/app/components/product-card/product-card.component.spec.ts",
    "testFramework": "jasmine",
    "coverage": {
      "statements": 90,
      "branches": 85,
      "functions": 90,
      "lines": 90
    },
    "includeIntegrationTests": true,
    "mockDependencies": true
  }
}
```

### 2. Generate E2E Tests

```json
{
  "tool": "generate-e2e-tests",
  "arguments": {
    "testSuite": "product-purchase-flow",
    "outputPath": "./e2e/product-purchase.e2e-spec.ts",
    "framework": "cypress",
    "baseUrl": "http://localhost:4200",
    "scenarios": [
      "browse-products",
      "add-to-cart",
      "checkout",
      "payment",
      "order-confirmation"
    ],
    "includeVisualTests": true
  }
}
```

### 3. Setup Test Environment

```json
{
  "tool": "setup-test-environment",
  "arguments": {
    "projectPath": "./",
    "testFrameworks": ["jasmine", "cypress", "playwright"],
    "mockServices": true,
    "testData": {
      "generateFixtures": true,
      "includeUserData": true,
      "includeProductData": true
    },
    "coverage": {
      "enabled": true,
      "threshold": 80,
      "reporters": ["html", "lcov", "text"]
    }
  }
}
```

### 4. Create Test Data

```json
{
  "tool": "create-test-data",
  "arguments": {
    "outputPath": "./src/test-data",
    "dataTypes": ["users", "products", "orders", "categories"],
    "format": "json",
    "locale": "en-US",
    "quantity": {
      "users": 50,
      "products": 100,
      "orders": 200,
      "categories": 20
    },
    "relationships": true
  }
}
```

## 🎯 Advanced Testing Examples

### Comprehensive Unit Test Suite

```json
{
  "tool": "generate-unit-tests",
  "arguments": {
    "projectPath": "./src/app",
    "outputPath": "./src/app/tests",
    "testFramework": "jasmine",
    "testTypes": {
      "components": {
        "enabled": true,
        "includeShallow": true,
        "includeDeep": true,
        "mockChildComponents": true,
        "testInputs": true,
        "testOutputs": true,
        "testLifecycleHooks": true
      },
      "services": {
        "enabled": true,
        "mockHttpCalls": true,
        "testErrorHandling": true,
        "testCaching": true,
        "testStateManagement": true
      },
      "pipes": {
        "enabled": true,
        "testTransformations": true,
        "testEdgeCases": true
      },
      "guards": {
        "enabled": true,
        "testRouteProtection": true,
        "testPermissions": true
      },
      "resolvers": {
        "enabled": true,
        "testDataResolution": true,
        "testErrorScenarios": true
      }
    },
    "coverage": {
      "statements": 95,
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "excludePatterns": ["**/*.spec.ts", "**/test-data/**"]
    },
    "mocking": {
      "strategy": "auto",
      "mockExternalDependencies": true,
      "mockHttpClient": true,
      "mockLocalStorage": true,
      "mockSessionStorage": true,
      "customMocks": [
        {
          "service": "AuthService",
          "methods": ["login", "logout", "isAuthenticated"]
        },
        {
          "service": "CartService",
          "methods": ["addToCart", "removeFromCart", "getCartItems"]
        }
      ]
    },
    "assertions": {
      "includeCustomMatchers": true,
      "includeAsyncMatchers": true,
      "includeAccessibilityMatchers": true
    },
    "setup": {
      "includeTestBed": true,
      "includeCommonImports": true,
      "includeTestUtilities": true,
      "includePageObjects": true
    }
  }
}
```

### Complete E2E Test Suite

```json
{
  "tool": "generate-e2e-tests",
  "arguments": {
    "projectPath": "./e2e",
    "framework": "playwright",
    "configuration": {
      "browsers": ["chromium", "firefox", "webkit"],
      "viewports": [
        {"width": 1920, "height": 1080},
        {"width": 1366, "height": 768},
        {"width": 375, "height": 667}
      ],
      "baseUrl": "http://localhost:4200",
      "timeout": 30000,
      "retries": 2
    },
    "testSuites": [
      {
        "name": "user-authentication",
        "description": "User login, registration, and profile management",
        "scenarios": [
          {
            "name": "successful-login",
            "steps": [
              "navigate-to-login",
              "enter-credentials",
              "submit-form",
              "verify-dashboard"
            ]
          },
          {
            "name": "failed-login",
            "steps": [
              "navigate-to-login",
              "enter-invalid-credentials",
              "submit-form",
              "verify-error-message"
            ]
          },
          {
            "name": "user-registration",
            "steps": [
              "navigate-to-register",
              "fill-registration-form",
              "submit-form",
              "verify-confirmation"
            ]
          }
        ]
      },
      {
        "name": "product-catalog",
        "description": "Product browsing and search functionality",
        "scenarios": [
          {
            "name": "browse-categories",
            "steps": [
              "navigate-to-homepage",
              "click-category",
              "verify-products-displayed",
              "apply-filters",
              "verify-filtered-results"
            ]
          },
          {
            "name": "product-search",
            "steps": [
              "navigate-to-homepage",
              "enter-search-term",
              "submit-search",
              "verify-search-results",
              "click-product",
              "verify-product-details"
            ]
          }
        ]
      },
      {
        "name": "shopping-cart",
        "description": "Cart management and checkout process",
        "scenarios": [
          {
            "name": "add-to-cart",
            "steps": [
              "navigate-to-product",
              "select-options",
              "add-to-cart",
              "verify-cart-updated",
              "view-cart",
              "verify-cart-contents"
            ]
          },
          {
            "name": "checkout-process",
            "steps": [
              "add-products-to-cart",
              "proceed-to-checkout",
              "enter-shipping-info",
              "select-payment-method",
              "review-order",
              "place-order",
              "verify-confirmation"
            ]
          }
        ]
      }
    ],
    "pageObjects": {
      "generate": true,
      "pattern": "page-object-model",
      "includeSelectors": true,
      "includeActions": true,
      "includeAssertions": true
    },
    "dataManagement": {
      "useFixtures": true,
      "generateTestData": true,
      "cleanupAfterTests": true,
      "seedDatabase": true
    },
    "reporting": {
      "formats": ["html", "json", "junit"],
      "includeScreenshots": true,
      "includeVideos": true,
      "includeTraces": true
    },
    "parallelization": {
      "enabled": true,
      "workers": 4,
      "shardTests": true
    }
  }
}
```

### Performance Testing Setup

```json
{
  "tool": "setup-performance-tests",
  "arguments": {
    "projectPath": "./performance-tests",
    "framework": "lighthouse",
    "configuration": {
      "baseUrl": "http://localhost:4200",
      "pages": [
        {
          "name": "homepage",
          "url": "/",
          "thresholds": {
            "performance": 90,
            "accessibility": 95,
            "bestPractices": 90,
            "seo": 90,
            "pwa": 80
          }
        },
        {
          "name": "product-list",
          "url": "/category/electronics",
          "thresholds": {
            "performance": 85,
            "accessibility": 95,
            "bestPractices": 90,
            "seo": 85
          }
        },
        {
          "name": "product-detail",
          "url": "/product/123",
          "thresholds": {
            "performance": 85,
            "accessibility": 95,
            "bestPractices": 90,
            "seo": 90
          }
        }
      ],
      "metrics": {
        "coreWebVitals": {
          "lcp": 2.5,
          "fid": 100,
          "cls": 0.1
        },
        "customMetrics": [
          {
            "name": "time-to-interactive",
            "threshold": 3000
          },
          {
            "name": "first-contentful-paint",
            "threshold": 1500
          }
        ]
      },
      "loadTesting": {
        "enabled": true,
        "tool": "k6",
        "scenarios": [
          {
            "name": "normal-load",
            "virtualUsers": 10,
            "duration": "5m",
            "rampUp": "30s"
          },
          {
            "name": "stress-test",
            "virtualUsers": 100,
            "duration": "2m",
            "rampUp": "1m"
          }
        ]
      }
    },
    "monitoring": {
      "realUserMonitoring": true,
      "syntheticMonitoring": true,
      "alerting": {
        "enabled": true,
        "thresholds": {
          "responseTime": 2000,
          "errorRate": 1,
          "availability": 99.9
        }
      }
    },
    "reporting": {
      "formats": ["html", "json", "csv"],
      "includeRecommendations": true,
      "includeTrends": true,
      "scheduledReports": true
    }
  }
}
```

### Accessibility Testing Suite

```json
{
  "tool": "create-accessibility-tests",
  "arguments": {
    "projectPath": "./accessibility-tests",
    "framework": "axe-core",
    "configuration": {
      "standards": ["WCAG2A", "WCAG2AA", "WCAG21AA", "Section508"],
      "browsers": ["chrome", "firefox", "safari"],
      "viewports": [
        {"width": 1920, "height": 1080},
        {"width": 768, "height": 1024},
        {"width": 375, "height": 667}
      ]
    },
    "testScenarios": [
      {
        "name": "keyboard-navigation",
        "description": "Test keyboard accessibility",
        "tests": [
          "tab-order",
          "focus-management",
          "keyboard-shortcuts",
          "escape-key-handling"
        ]
      },
      {
        "name": "screen-reader",
        "description": "Test screen reader compatibility",
        "tests": [
          "aria-labels",
          "heading-structure",
          "landmark-regions",
          "form-labels",
          "image-alt-text"
        ]
      },
      {
        "name": "color-contrast",
        "description": "Test color contrast ratios",
        "tests": [
          "text-contrast",
          "interactive-element-contrast",
          "focus-indicator-contrast"
        ]
      },
      {
        "name": "responsive-accessibility",
        "description": "Test accessibility across devices",
        "tests": [
          "mobile-touch-targets",
          "zoom-functionality",
          "orientation-support"
        ]
      }
    ],
    "automation": {
      "enabled": true,
      "runOnBuild": true,
      "failOnViolations": true,
      "severity": "moderate"
    },
    "reporting": {
      "formats": ["html", "json", "sarif"],
      "includeScreenshots": true,
      "includeRemediation": true,
      "generateSummary": true
    }
  }
}
```

### Visual Regression Testing

```json
{
  "tool": "setup-visual-regression",
  "arguments": {
    "projectPath": "./visual-tests",
    "framework": "percy",
    "configuration": {
      "baseUrl": "http://localhost:4200",
      "browsers": [
        {"name": "chrome", "version": "latest"},
        {"name": "firefox", "version": "latest"},
        {"name": "safari", "version": "latest"}
      ],
      "viewports": [
        {"width": 1920, "height": 1080, "name": "desktop"},
        {"width": 1366, "height": 768, "name": "laptop"},
        {"width": 768, "height": 1024, "name": "tablet"},
        {"width": 375, "height": 667, "name": "mobile"}
      ]
    },
    "testPages": [
      {
        "name": "homepage",
        "url": "/",
        "selectors": [
          ".header",
          ".hero-banner",
          ".product-carousel",
          ".footer"
        ],
        "interactions": [
          {
            "type": "hover",
            "selector": ".navigation-item"
          },
          {
            "type": "click",
            "selector": ".menu-toggle"
          }
        ]
      },
      {
        "name": "product-list",
        "url": "/category/electronics",
        "selectors": [
          ".product-grid",
          ".filter-sidebar",
          ".pagination"
        ],
        "states": [
          "default",
          "filtered",
          "sorted"
        ]
      },
      {
        "name": "product-detail",
        "url": "/product/123",
        "selectors": [
          ".product-images",
          ".product-info",
          ".add-to-cart-section",
          ".product-reviews"
        ],
        "interactions": [
          {
            "type": "click",
            "selector": ".image-thumbnail"
          },
          {
            "type": "select",
            "selector": ".size-selector",
            "value": "Large"
          }
        ]
      }
    ],
    "thresholds": {
      "similarity": 0.95,
      "pixelDifference": 100,
      "autoApprove": false
    },
    "integration": {
      "cicd": true,
      "pullRequestComments": true,
      "slackNotifications": true
    }
  }
}
```

## 🔍 Quality Analysis Examples

### Comprehensive Quality Checks

```json
{
  "tool": "run-quality-checks",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./reports/quality-analysis.html",
    "checks": {
      "codeQuality": {
        "enabled": true,
        "tools": ["eslint", "tslint", "sonarjs"],
        "rules": "strict",
        "failOnWarnings": false
      },
      "security": {
        "enabled": true,
        "tools": ["npm-audit", "snyk", "semgrep"],
        "severity": "medium",
        "excludeDevDependencies": false
      },
      "performance": {
        "enabled": true,
        "bundleAnalysis": true,
        "duplicateDetection": true,
        "unusedCodeDetection": true
      },
      "accessibility": {
        "enabled": true,
        "standards": ["WCAG2AA"],
        "includeColorContrast": true
      },
      "bestPractices": {
        "enabled": true,
        "angular": true,
        "typescript": true,
        "rxjs": true
      }
    },
    "thresholds": {
      "codeQuality": 8.0,
      "security": "high",
      "performance": 85,
      "accessibility": 95,
      "testCoverage": 80
    },
    "reporting": {
      "formats": ["html", "json", "junit"],
      "includeRecommendations": true,
      "includeTrends": true,
      "generateBadges": true
    }
  }
}
```

### API Testing Suite

```json
{
  "tool": "generate-api-tests",
  "arguments": {
    "projectPath": "./api-tests",
    "framework": "newman",
    "configuration": {
      "baseUrl": "https://api.example.com",
      "environment": "test",
      "authentication": {
        "type": "bearer",
        "tokenEndpoint": "/auth/token"
      }
    },
    "testSuites": [
      {
        "name": "user-management",
        "description": "User CRUD operations",
        "endpoints": [
          {
            "name": "create-user",
            "method": "POST",
            "path": "/users",
            "tests": [
              "status-code-201",
              "response-time-under-500ms",
              "response-schema-validation",
              "user-id-generated"
            ]
          },
          {
            "name": "get-user",
            "method": "GET",
            "path": "/users/{userId}",
            "tests": [
              "status-code-200",
              "response-time-under-200ms",
              "user-data-complete"
            ]
          },
          {
            "name": "update-user",
            "method": "PUT",
            "path": "/users/{userId}",
            "tests": [
              "status-code-200",
              "response-time-under-300ms",
              "user-data-updated"
            ]
          },
          {
            "name": "delete-user",
            "method": "DELETE",
            "path": "/users/{userId}",
            "tests": [
              "status-code-204",
              "user-not-found-after-deletion"
            ]
          }
        ]
      },
      {
        "name": "product-catalog",
        "description": "Product management APIs",
        "endpoints": [
          {
            "name": "get-products",
            "method": "GET",
            "path": "/products",
            "parameters": {
              "query": ["category", "limit", "offset"],
              "headers": ["Accept", "Authorization"]
            },
            "tests": [
              "status-code-200",
              "response-time-under-1000ms",
              "products-array-returned",
              "pagination-headers-present"
            ]
          },
          {
            "name": "search-products",
            "method": "GET",
            "path": "/products/search",
            "parameters": {
              "query": ["q", "filters", "sort"]
            },
            "tests": [
              "status-code-200",
              "search-results-relevant",
              "facets-returned"
            ]
          }
        ]
      }
    ],
    "dataManagement": {
      "useTestData": true,
      "generateMockData": true,
      "cleanupAfterTests": true
    },
    "monitoring": {
      "enabled": true,
      "metrics": ["response-time", "error-rate", "throughput"],
      "alerting": true
    }
  }
}
```

## 📊 Test Reporting Examples

### Comprehensive Test Reports

```json
{
  "tool": "generate-test-reports",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./reports",
    "reportTypes": {
      "coverage": {
        "enabled": true,
        "formats": ["html", "lcov", "cobertura"],
        "includeUncoveredLines": true,
        "includeBranchCoverage": true
      },
      "testResults": {
        "enabled": true,
        "formats": ["html", "junit", "json"],
        "includeFailureDetails": true,
        "includeScreenshots": true
      },
      "performance": {
        "enabled": true,
        "includeMetrics": true,
        "includeTrends": true,
        "compareBaseline": true
      },
      "accessibility": {
        "enabled": true,
        "includeViolations": true,
        "includeRemediation": true,
        "groupByPage": true
      },
      "security": {
        "enabled": true,
        "includeVulnerabilities": true,
        "includeMitigations": true,
        "groupBySeverity": true
      }
    },
    "aggregation": {
      "enabled": true,
      "combinedReport": true,
      "dashboard": true,
      "trends": {
        "enabled": true,
        "period": "30d",
        "includeComparisons": true
      }
    },
    "distribution": {
      "email": {
        "enabled": true,
        "recipients": ["team@example.com"],
        "schedule": "daily"
      },
      "slack": {
        "enabled": true,
        "channel": "#qa-reports",
        "onFailure": true
      },
      "storage": {
        "s3": {
          "enabled": true,
          "bucket": "test-reports",
          "retention": "90d"
        }
      }
    }
  }
}
```

## 💡 Best Practices

### Test Strategy
1. **Follow the testing pyramid** - More unit tests, fewer E2E tests
2. **Write tests first** when possible (TDD approach)
3. **Keep tests independent** and isolated
4. **Use descriptive test names** that explain the scenario
5. **Maintain test data** separately from test logic

### Test Organization
1. **Group related tests** in describe blocks
2. **Use consistent naming** conventions
3. **Keep tests focused** on single functionality
4. **Avoid test interdependencies** 
5. **Use page objects** for E2E tests

### Quality Assurance
1. **Set quality gates** in CI/CD pipeline
2. **Monitor test execution** times and flakiness
3. **Review test coverage** regularly
4. **Update tests** when requirements change
5. **Automate quality checks** where possible

### Performance Testing
1. **Test early and often** in development cycle
2. **Use realistic test data** and scenarios
3. **Monitor key metrics** consistently
4. **Set performance budgets** and stick to them
5. **Test across different** devices and networks

## 🔧 Next Steps

After setting up testing tools:
1. **Integrate tests** into CI/CD pipeline
2. **Set up test data** management strategy
3. **Configure test environments** for different stages
4. **Train team members** on testing practices
5. **Establish quality gates** and review processes
6. **Monitor test metrics** and improve continuously 