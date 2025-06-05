# CMS & Content Management Tools Examples

This directory contains examples for all CMS and content management tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **create-cms-component** - CMS component creation
2. **create-content-slot** - Content slot management
3. **setup-personalization** - Personalization configuration
4. **create-page-template** - Page template creation
5. **manage-content-catalog** - Content catalog management
6. **create-banner-component** - Banner component creation

## 📋 Basic Examples

### 1. Create CMS Component

```json
{
  "tool": "create-cms-component",
  "arguments": {
    "componentName": "ProductBanner",
    "componentType": "banner",
    "outputPath": "./src/app/cms-components/product-banner",
    "includeModel": true,
    "includeService": true,
    "includeTests": true,
    "cmsMapping": true
  }
}
```

### 2. Create Content Slot

```json
{
  "tool": "create-content-slot",
  "arguments": {
    "slotName": "HeaderBannerSlot",
    "slotPosition": "header",
    "allowedComponents": ["BannerComponent", "CarouselComponent"],
    "maxComponents": 3,
    "responsive": true
  }
}
```

### 3. Setup Personalization

```json
{
  "tool": "setup-personalization",
  "arguments": {
    "rules": [
      {
        "name": "VIP Customer Banner",
        "trigger": "user.segment === 'VIP'",
        "action": "show-component",
        "component": "VIPBannerComponent"
      }
    ],
    "segments": ["VIP", "Regular", "New"],
    "trackingEnabled": true
  }
}
```

### 4. Create Page Template

```json
{
  "tool": "create-page-template",
  "arguments": {
    "templateName": "ProductDetailTemplate",
    "templateType": "product",
    "outputPath": "./src/app/cms-templates/product-detail",
    "slots": [
      "HeaderSlot",
      "NavigationSlot",
      "ProductImageSlot",
      "ProductInfoSlot",
      "RecommendationsSlot",
      "FooterSlot"
    ],
    "responsive": true
  }
}
```

## 🎯 Advanced CMS Examples

### Complete E-commerce CMS Component

```json
{
  "tool": "create-cms-component",
  "arguments": {
    "componentName": "ProductCarousel",
    "componentType": "carousel",
    "outputPath": "./src/app/cms-components/product-carousel",
    "cmsConfig": {
      "typeCode": "ProductCarouselComponent",
      "name": "Product Carousel Component",
      "description": "Displays a carousel of featured products"
    },
    "properties": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "localizable": true
      },
      {
        "name": "products",
        "type": "ProductReference[]",
        "required": true,
        "maxItems": 10
      },
      {
        "name": "autoPlay",
        "type": "boolean",
        "defaultValue": true
      },
      {
        "name": "interval",
        "type": "number",
        "defaultValue": 5000,
        "min": 1000,
        "max": 10000
      },
      {
        "name": "showDots",
        "type": "boolean",
        "defaultValue": true
      },
      {
        "name": "showArrows",
        "type": "boolean",
        "defaultValue": true
      }
    ],
    "styling": {
      "includeCSS": true,
      "responsive": true,
      "themes": ["default", "dark", "minimal"]
    },
    "functionality": {
      "lazyLoading": true,
      "touchSupport": true,
      "keyboardNavigation": true,
      "accessibility": true
    },
    "includeModel": true,
    "includeService": true,
    "includeTests": true,
    "includeStorybook": true,
    "cmsMapping": true,
    "generateDocumentation": true
  }
}
```

### Multi-Language Content Slot

```json
{
  "tool": "create-content-slot",
  "arguments": {
    "slotName": "LocalizedBannerSlot",
    "slotPosition": "hero-section",
    "configuration": {
      "allowedComponents": [
        "BannerComponent",
        "VideoComponent",
        "CarouselComponent"
      ],
      "maxComponents": 1,
      "minComponents": 1,
      "required": true
    },
    "localization": {
      "enabled": true,
      "languages": ["en", "de", "fr", "es", "it"],
      "fallbackLanguage": "en",
      "inheritFromParent": true
    },
    "responsive": {
      "enabled": true,
      "breakpoints": {
        "mobile": "768px",
        "tablet": "1024px",
        "desktop": "1200px"
      },
      "hideOnMobile": false,
      "reorderOnTablet": false
    },
    "personalization": {
      "enabled": true,
      "segments": ["VIP", "Regular", "New"],
      "rules": [
        {
          "segment": "VIP",
          "component": "VIPBannerComponent",
          "priority": 1
        },
        {
          "segment": "New",
          "component": "WelcomeBannerComponent",
          "priority": 2
        }
      ]
    },
    "caching": {
      "enabled": true,
      "ttl": 3600,
      "varyBy": ["language", "segment", "device"]
    },
    "analytics": {
      "trackViews": true,
      "trackClicks": true,
      "customEvents": ["banner-interaction", "carousel-slide"]
    }
  }
}
```

### Advanced Personalization Setup

```json
{
  "tool": "setup-personalization",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./src/app/personalization",
    "segments": [
      {
        "name": "VIP",
        "description": "VIP customers with high lifetime value",
        "criteria": {
          "totalSpent": ">= 5000",
          "orderCount": ">= 10",
          "membershipLevel": "gold"
        }
      },
      {
        "name": "Frequent",
        "description": "Frequent shoppers",
        "criteria": {
          "orderCount": ">= 5",
          "lastOrderDate": "< 30 days"
        }
      },
      {
        "name": "NewCustomer",
        "description": "New customers",
        "criteria": {
          "registrationDate": "< 7 days",
          "orderCount": "= 0"
        }
      },
      {
        "name": "MobileUser",
        "description": "Mobile device users",
        "criteria": {
          "deviceType": "mobile"
        }
      }
    ],
    "rules": [
      {
        "name": "VIP Welcome Banner",
        "description": "Show special banner for VIP customers",
        "trigger": {
          "segment": "VIP",
          "page": "homepage"
        },
        "action": {
          "type": "show-component",
          "component": "VIPWelcomeBanner",
          "slot": "HeaderBannerSlot",
          "priority": 1
        },
        "schedule": {
          "startDate": "2024-01-01",
          "endDate": "2024-12-31",
          "timeZone": "UTC"
        }
      },
      {
        "name": "Mobile Product Recommendations",
        "description": "Show mobile-optimized product recommendations",
        "trigger": {
          "segment": "MobileUser",
          "page": "product-detail"
        },
        "action": {
          "type": "replace-component",
          "originalComponent": "ProductRecommendations",
          "newComponent": "MobileProductRecommendations",
          "slot": "RecommendationsSlot"
        }
      },
      {
        "name": "New Customer Onboarding",
        "description": "Show onboarding flow for new customers",
        "trigger": {
          "segment": "NewCustomer",
          "page": "any"
        },
        "action": {
          "type": "show-modal",
          "component": "OnboardingModal",
          "delay": 3000,
          "frequency": "once"
        }
      }
    ],
    "tracking": {
      "enabled": true,
      "events": [
        "segment-assignment",
        "rule-triggered",
        "component-shown",
        "component-clicked"
      ],
      "analytics": {
        "googleAnalytics": true,
        "adobeAnalytics": false,
        "customProvider": "internal"
      }
    },
    "testing": {
      "abTesting": true,
      "multivariate": true,
      "statisticalSignificance": 95,
      "minSampleSize": 1000
    },
    "caching": {
      "segmentCache": {
        "enabled": true,
        "ttl": 1800
      },
      "ruleCache": {
        "enabled": true,
        "ttl": 3600
      }
    }
  }
}
```

### Complex Page Template

```json
{
  "tool": "create-page-template",
  "arguments": {
    "templateName": "CategoryPageTemplate",
    "templateType": "category",
    "outputPath": "./src/app/cms-templates/category-page",
    "layout": {
      "type": "grid",
      "columns": 12,
      "rows": "auto"
    },
    "slots": [
      {
        "name": "HeaderSlot",
        "position": {
          "row": 1,
          "column": "1/13",
          "height": "auto"
        },
        "allowedComponents": ["NavigationComponent", "SearchComponent"],
        "required": true
      },
      {
        "name": "BreadcrumbSlot",
        "position": {
          "row": 2,
          "column": "1/13",
          "height": "auto"
        },
        "allowedComponents": ["BreadcrumbComponent"],
        "maxComponents": 1
      },
      {
        "name": "CategoryBannerSlot",
        "position": {
          "row": 3,
          "column": "1/13",
          "height": "300px"
        },
        "allowedComponents": ["BannerComponent", "VideoComponent"],
        "maxComponents": 1,
        "responsive": {
          "mobile": {
            "height": "200px"
          }
        }
      },
      {
        "name": "FilterSlot",
        "position": {
          "row": 4,
          "column": "1/4",
          "height": "auto"
        },
        "allowedComponents": ["FilterComponent", "FacetComponent"],
        "responsive": {
          "mobile": {
            "column": "1/13",
            "row": 5
          }
        }
      },
      {
        "name": "ProductListSlot",
        "position": {
          "row": 4,
          "column": "4/13",
          "height": "auto"
        },
        "allowedComponents": ["ProductListComponent", "ProductGridComponent"],
        "required": true,
        "responsive": {
          "mobile": {
            "column": "1/13",
            "row": 4
          }
        }
      },
      {
        "name": "RecommendationsSlot",
        "position": {
          "row": 5,
          "column": "1/13",
          "height": "auto"
        },
        "allowedComponents": ["ProductCarouselComponent", "RecommendationComponent"]
      },
      {
        "name": "FooterSlot",
        "position": {
          "row": 6,
          "column": "1/13",
          "height": "auto"
        },
        "allowedComponents": ["FooterComponent"],
        "required": true
      }
    ],
    "responsive": {
      "enabled": true,
      "breakpoints": {
        "mobile": "768px",
        "tablet": "1024px",
        "desktop": "1200px"
      }
    },
    "seo": {
      "enabled": true,
      "metaTags": [
        "title",
        "description",
        "keywords",
        "og:title",
        "og:description",
        "og:image"
      ],
      "structuredData": true,
      "canonicalUrl": true
    },
    "performance": {
      "lazyLoading": true,
      "criticalCSS": true,
      "preloadComponents": ["ProductListComponent"]
    },
    "accessibility": {
      "enabled": true,
      "skipLinks": true,
      "landmarks": true,
      "headingStructure": true
    }
  }
}
```

## 📊 Content Catalog Management

### Content Catalog Setup

```json
{
  "tool": "manage-content-catalog",
  "arguments": {
    "catalogName": "ElectronicsContentCatalog",
    "catalogVersion": "Online",
    "outputPath": "./src/app/cms-catalog",
    "structure": {
      "categories": [
        {
          "name": "Homepage",
          "description": "Homepage content",
          "pages": ["homepage"]
        },
        {
          "name": "Product Pages",
          "description": "Product-related content",
          "pages": ["product-detail", "product-list", "category"]
        },
        {
          "name": "Checkout",
          "description": "Checkout process content",
          "pages": ["cart", "checkout", "order-confirmation"]
        },
        {
          "name": "User Account",
          "description": "User account pages",
          "pages": ["login", "register", "profile", "order-history"]
        }
      ],
      "components": [
        {
          "category": "Banners",
          "types": ["BannerComponent", "CarouselComponent", "VideoComponent"]
        },
        {
          "category": "Product Display",
          "types": ["ProductListComponent", "ProductCarouselComponent", "ProductComparisonComponent"]
        },
        {
          "category": "Navigation",
          "types": ["NavigationComponent", "BreadcrumbComponent", "FooterComponent"]
        },
        {
          "category": "Content",
          "types": ["TextComponent", "ImageComponent", "LinkListComponent"]
        }
      ]
    },
    "workflow": {
      "enabled": true,
      "stages": ["draft", "review", "approved", "published"],
      "approvers": ["content-manager", "marketing-manager"],
      "notifications": true
    },
    "versioning": {
      "enabled": true,
      "maxVersions": 10,
      "autoArchive": true
    },
    "localization": {
      "enabled": true,
      "languages": ["en", "de", "fr", "es"],
      "fallbackLanguage": "en"
    },
    "permissions": {
      "roles": [
        {
          "name": "content-editor",
          "permissions": ["read", "create", "edit"]
        },
        {
          "name": "content-manager",
          "permissions": ["read", "create", "edit", "approve", "publish"]
        },
        {
          "name": "marketing-manager",
          "permissions": ["read", "approve", "publish"]
        }
      ]
    }
  }
}
```

### Banner Component with Rich Features

```json
{
  "tool": "create-banner-component",
  "arguments": {
    "componentName": "HeroBanner",
    "outputPath": "./src/app/cms-components/hero-banner",
    "bannerType": "hero",
    "features": {
      "responsive": true,
      "lazyLoading": true,
      "animation": true,
      "overlay": true,
      "callToAction": true
    },
    "properties": [
      {
        "name": "backgroundImage",
        "type": "Media",
        "required": true,
        "responsive": {
          "desktop": "1920x600",
          "tablet": "1024x400",
          "mobile": "768x300"
        }
      },
      {
        "name": "headline",
        "type": "string",
        "required": true,
        "localizable": true,
        "maxLength": 100
      },
      {
        "name": "subheadline",
        "type": "string",
        "localizable": true,
        "maxLength": 200
      },
      {
        "name": "ctaText",
        "type": "string",
        "localizable": true,
        "defaultValue": "Shop Now"
      },
      {
        "name": "ctaLink",
        "type": "CMSLinkComponent",
        "required": true
      },
      {
        "name": "overlayOpacity",
        "type": "number",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "defaultValue": 0.3
      },
      {
        "name": "textAlignment",
        "type": "enum",
        "values": ["left", "center", "right"],
        "defaultValue": "center"
      },
      {
        "name": "animationType",
        "type": "enum",
        "values": ["fade", "slide", "zoom", "none"],
        "defaultValue": "fade"
      }
    ],
    "styling": {
      "includeCSS": true,
      "themes": ["default", "dark", "minimal"],
      "customizable": true
    },
    "accessibility": {
      "altText": true,
      "ariaLabels": true,
      "keyboardNavigation": true,
      "screenReader": true
    },
    "analytics": {
      "trackViews": true,
      "trackClicks": true,
      "customEvents": ["banner-load", "cta-click"]
    },
    "seo": {
      "structuredData": true,
      "metaTags": true
    },
    "includeTests": true,
    "includeStorybook": true,
    "generateDocumentation": true
  }
}
```

## 🎨 Content Personalization Examples

### A/B Testing Configuration

```json
{
  "tool": "setup-personalization",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./src/app/personalization",
    "abTesting": {
      "enabled": true,
      "experiments": [
        {
          "name": "Homepage Hero Banner Test",
          "description": "Test different hero banner designs",
          "hypothesis": "New banner design will increase conversion rate",
          "variants": [
            {
              "name": "control",
              "component": "HeroBannerOriginal",
              "traffic": 50,
              "description": "Original hero banner"
            },
            {
              "name": "variant-a",
              "component": "HeroBannerNew",
              "traffic": 50,
              "description": "New hero banner with different CTA"
            }
          ],
          "targetAudience": {
            "segments": ["all"],
            "excludeSegments": ["VIP"]
          },
          "goals": [
            {
              "name": "conversion-rate",
              "type": "conversion",
              "event": "purchase-completed",
              "primary": true
            },
            {
              "name": "click-through-rate",
              "type": "engagement",
              "event": "cta-clicked",
              "primary": false
            }
          ],
          "duration": {
            "startDate": "2024-01-01",
            "endDate": "2024-01-31"
          },
          "statisticalSettings": {
            "significance": 95,
            "power": 80,
            "minSampleSize": 1000
          }
        }
      ]
    },
    "multivariateTests": {
      "enabled": true,
      "experiments": [
        {
          "name": "Product Page Optimization",
          "description": "Test multiple elements on product page",
          "factors": [
            {
              "name": "product-image-size",
              "variants": ["small", "medium", "large"]
            },
            {
              "name": "add-to-cart-button",
              "variants": ["blue", "green", "orange"]
            },
            {
              "name": "product-description",
              "variants": ["short", "detailed"]
            }
          ],
          "traffic": 30,
          "duration": {
            "startDate": "2024-02-01",
            "endDate": "2024-02-29"
          }
        }
      ]
    }
  }
}
```

## 💡 Best Practices

### CMS Component Development
1. **Follow naming conventions** for consistency
2. **Include proper TypeScript types** for all properties
3. **Implement responsive design** from the start
4. **Add accessibility features** by default
5. **Include comprehensive tests** for all functionality

### Content Management
1. **Use semantic slot names** that describe purpose
2. **Implement proper content validation** rules
3. **Set up content workflows** for quality control
4. **Enable content versioning** for rollback capability
5. **Plan for localization** early in development

### Personalization Strategy
1. **Start with simple segments** and expand gradually
2. **Test personalization rules** thoroughly before deployment
3. **Monitor performance impact** of personalization
4. **Respect user privacy** and consent preferences
5. **Document all personalization logic** for maintenance

### Performance Optimization
1. **Implement lazy loading** for content components
2. **Use content caching** strategically
3. **Optimize images** for different devices
4. **Minimize component bundle sizes** through code splitting
5. **Monitor content loading times** and optimize accordingly

## 🔧 Next Steps

After setting up CMS tools:
1. **Create content governance** policies and procedures
2. **Train content editors** on the new tools and workflows
3. **Set up content analytics** to measure effectiveness
4. **Implement content backup** and recovery procedures
5. **Plan for content migration** from existing systems
6. **Establish content review** and approval processes 