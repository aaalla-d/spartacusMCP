import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export function createToolDefinitions(): Tool[] {
  return [
    // ===== COMPONENT GENERATION =====
    {
      name: "create_spartacus_component",
      description: "Generate a complete Spartacus component with all necessary files",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Component name (e.g., 'ProductCard')" },
          selector: { type: "string", description: "Component selector (e.g., 'app-product-card')" },
          category: { type: "string", description: "Component category", enum: ["cms", "product", "user", "cart", "checkout", "navigation", "misc"] },
          outputPath: { type: "string", description: "Output directory path" },
          createModule: { type: "boolean", description: "Create module file (default: true)" },
          createService: { type: "boolean", description: "Create service file (default: false)" },
          createModel: { type: "boolean", description: "Create model interfaces (default: false)" },
          responsive: { type: "boolean", description: "Add responsive breakpoint handling (default: false)" },
          accessibility: { type: "boolean", description: "Add accessibility features (default: true)" },
          performance: { type: "boolean", description: "Add performance optimizations (default: true)" },
          testing: { type: "boolean", description: "Generate test files (default: true)" }
        },
        required: ["name", "selector", "category", "outputPath"]
      }
    },
    {
      name: "create_component_variant",
      description: "Create component variants (smart vs presentational, container vs UI)",
      inputSchema: {
        type: "object",
        properties: {
          baseName: { type: "string", description: "Base component name" },
          variantType: { type: "string", description: "Variant type", enum: ["smart", "presentational", "container", "ui"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["baseName", "variantType", "outputPath"]
      }
    },
    {
      name: "refactor_component",
      description: "Refactor existing component to follow Spartacus patterns",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Path to existing component" },
          targetPattern: { type: "string", description: "Target pattern", enum: ["spartacus-standard", "cms-component", "feature-component"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentPath", "targetPattern", "outputPath"]
      }
    },

    // ===== SERVICE GENERATION =====
    {
      name: "generate_spartacus_service",
      description: "Generate Spartacus service with dependency injection",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Service name" },
          outputPath: { type: "string", description: "Output directory path" },
          injectable: { type: "boolean", description: "Make service injectable (default: true)" },
          dependencies: { type: "array", items: { type: "string" }, description: "Service dependencies" },
          serviceType: { type: "string", description: "Service type", enum: ["data", "facade", "adapter", "connector", "utility"] },
          apiIntegration: { type: "boolean", description: "Include API integration (default: false)" },
          caching: { type: "boolean", description: "Add caching capabilities (default: false)" },
          errorHandling: { type: "boolean", description: "Add error handling (default: true)" }
        },
        required: ["name", "outputPath"]
      }
    },
    {
      name: "generate_ngrx_store",
      description: "Generate NgRx store with actions, reducers, effects, and selectors",
      inputSchema: {
        type: "object",
        properties: {
          featureName: { type: "string", description: "Feature name for the store" },
          outputPath: { type: "string", description: "Output directory path" },
          entities: { type: "array", items: { type: "string" }, description: "Entity names" },
          includeEffects: { type: "boolean", description: "Include effects (default: true)" },
          includeSelectors: { type: "boolean", description: "Include selectors (default: true)" },
          asyncActions: { type: "boolean", description: "Include async actions (default: true)" }
        },
        required: ["featureName", "outputPath"]
      }
    },

    // ===== MODEL GENERATION =====
    {
      name: "create_spartacus_model",
      description: "Generate TypeScript models and interfaces",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Model name" },
          outputPath: { type: "string", description: "Output directory path" },
          properties: { type: "array", items: { type: "object" }, description: "Model properties" },
          extends: { type: "string", description: "Interface to extend" },
          generateValidator: { type: "boolean", description: "Generate validation schema (default: false)" },
          generateMapper: { type: "boolean", description: "Generate mapper functions (default: false)" }
        },
        required: ["name", "outputPath"]
      }
    },

    // ===== PROJECT ANALYSIS =====
    {
      name: "analyze_spartacus_structure",
      description: "Analyze existing Spartacus project structure and patterns",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Path to Spartacus project" },
          analysisType: { type: "string", description: "Analysis type", enum: ["full", "components", "services", "modules", "dependencies"] },
          outputFormat: { type: "string", description: "Output format", enum: ["json", "markdown", "html"] }
        },
        required: ["projectPath"]
      }
    },
    {
      name: "detect_anti_patterns",
      description: "Detect anti-patterns and performance issues in code",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Path to project" },
          checkTypes: { type: "array", items: { type: "string" }, description: "Types of checks to perform" }
        },
        required: ["projectPath"]
      }
    },
    {
      name: "analyze_bundle_size",
      description: "Analyze bundle size impact of components",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Path to project" },
          componentPath: { type: "string", description: "Path to specific component (optional)" }
        },
        required: ["projectPath"]
      }
    },

    // ===== CMS & CONTENT MANAGEMENT =====
    {
      name: "generate_cms_component",
      description: "Generate CMS component with configuration",
      inputSchema: {
        type: "object",
        properties: {
          componentName: { type: "string", description: "CMS component name" },
          cmsType: { type: "string", description: "CMS component type" },
          outputPath: { type: "string", description: "Output directory path" },
          slots: { type: "array", items: { type: "string" }, description: "Content slots" },
          personalization: { type: "boolean", description: "Add personalization support (default: false)" }
        },
        required: ["componentName", "cmsType", "outputPath"]
      }
    },
    {
      name: "create_content_slot",
      description: "Create custom content slots and outlets",
      inputSchema: {
        type: "object",
        properties: {
          slotName: { type: "string", description: "Content slot name" },
          position: { type: "string", description: "Slot position" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["slotName", "position", "outputPath"]
      }
    },

    // ===== API & BACKEND INTEGRATION =====
    {
      name: "generate_occ_client",
      description: "Generate type-safe OCC API client for custom endpoints",
      inputSchema: {
        type: "object",
        properties: {
          endpointName: { type: "string", description: "API endpoint name" },
          baseUrl: { type: "string", description: "Base API URL" },
          methods: { type: "array", items: { type: "string" }, description: "HTTP methods to support" },
          outputPath: { type: "string", description: "Output directory path" },
          authentication: { type: "boolean", description: "Include authentication (default: true)" },
          errorHandling: { type: "boolean", description: "Include error handling (default: true)" }
        },
        required: ["endpointName", "outputPath"]
      }
    },
    {
      name: "generate_graphql_client",
      description: "Create GraphQL queries and mutations",
      inputSchema: {
        type: "object",
        properties: {
          schemaPath: { type: "string", description: "GraphQL schema path" },
          operationType: { type: "string", description: "Operation type", enum: ["query", "mutation", "subscription"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["schemaPath", "operationType", "outputPath"]
      }
    },
    {
      name: "generate_mock_data",
      description: "Generate realistic test data for development",
      inputSchema: {
        type: "object",
        properties: {
          dataType: { type: "string", description: "Type of data to generate" },
          count: { type: "number", description: "Number of items to generate" },
          outputPath: { type: "string", description: "Output directory path" },
          format: { type: "string", description: "Output format", enum: ["json", "typescript", "javascript"] }
        },
        required: ["dataType", "outputPath"]
      }
    },

    // ===== STYLING & THEMING =====
    {
      name: "generate_theme",
      description: "Create custom themes following Spartacus design system",
      inputSchema: {
        type: "object",
        properties: {
          themeName: { type: "string", description: "Theme name" },
          baseTheme: { type: "string", description: "Base theme to extend" },
          colorPalette: { type: "object", description: "Custom color palette" },
          outputPath: { type: "string", description: "Output directory path" },
          includeComponents: { type: "boolean", description: "Include component styles (default: true)" }
        },
        required: ["themeName", "outputPath"]
      }
    },
    {
      name: "generate_css_variables",
      description: "Generate and manage CSS custom properties",
      inputSchema: {
        type: "object",
        properties: {
          variableSet: { type: "string", description: "Variable set name" },
          variables: { type: "object", description: "CSS variables to generate" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["variableSet", "outputPath"]
      }
    },
    {
      name: "create_design_tokens",
      description: "Convert design tokens to Spartacus variables",
      inputSchema: {
        type: "object",
        properties: {
          tokensPath: { type: "string", description: "Path to design tokens file" },
          outputPath: { type: "string", description: "Output directory path" },
          format: { type: "string", description: "Input format", enum: ["json", "yaml", "figma"] }
        },
        required: ["tokensPath", "outputPath"]
      }
    },

    // ===== INTERNATIONALIZATION =====
    {
      name: "generate_i18n_keys",
      description: "Auto-generate translation keys and files",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path to scan" },
          languages: { type: "array", items: { type: "string" }, description: "Target languages" },
          outputPath: { type: "string", description: "Output directory path" },
          keyPrefix: { type: "string", description: "Key prefix" }
        },
        required: ["componentPath", "outputPath"]
      }
    },
    {
      name: "add_rtl_support",
      description: "Add right-to-left language support",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentPath", "outputPath"]
      }
    },

    // ===== TESTING =====
    {
      name: "generate_component_tests",
      description: "Generate comprehensive unit tests for components",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          testType: { type: "string", description: "Test type", enum: ["unit", "integration", "e2e"] },
          outputPath: { type: "string", description: "Output directory path" },
          coverage: { type: "boolean", description: "Include coverage requirements (default: true)" }
        },
        required: ["componentPath", "outputPath"]
      }
    },
    {
      name: "generate_storybook_stories",
      description: "Generate Storybook stories for components",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" },
          includeControls: { type: "boolean", description: "Include interactive controls (default: true)" }
        },
        required: ["componentPath", "outputPath"]
      }
    },
    {
      name: "create_performance_tests",
      description: "Create performance benchmarks and tests",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          testScenarios: { type: "array", items: { type: "string" }, description: "Test scenarios" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentPath", "outputPath"]
      }
    },

    // ===== MIGRATION & UPGRADE =====
    {
      name: "migrate_spartacus_version",
      description: "Migrate components between Spartacus versions",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          fromVersion: { type: "string", description: "Source version" },
          toVersion: { type: "string", description: "Target version" },
          dryRun: { type: "boolean", description: "Perform dry run (default: true)" }
        },
        required: ["projectPath", "fromVersion", "toVersion"]
      }
    },
    {
      name: "migrate_angular_version",
      description: "Update components for new Angular versions",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          targetVersion: { type: "string", description: "Target Angular version" },
          updateDependencies: { type: "boolean", description: "Update dependencies (default: true)" }
        },
        required: ["projectPath", "targetVersion"]
      }
    },
    {
      name: "detect_breaking_changes",
      description: "Identify deprecated APIs and suggest alternatives",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          targetVersion: { type: "string", description: "Target version" }
        },
        required: ["projectPath", "targetVersion"]
      }
    },

    // ===== SECURITY & COMPLIANCE =====
    {
      name: "security_scan",
      description: "Check for common security vulnerabilities",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          scanType: { type: "string", description: "Scan type", enum: ["dependencies", "code", "configuration", "all"] }
        },
        required: ["projectPath"]
      }
    },
    {
      name: "generate_gdpr_compliance",
      description: "Generate privacy-compliant components",
      inputSchema: {
        type: "object",
        properties: {
          componentType: { type: "string", description: "Component type" },
          dataTypes: { type: "array", items: { type: "string" }, description: "Data types handled" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentType", "outputPath"]
      }
    },
    {
      name: "generate_csp_config",
      description: "Generate Content Security Policy headers and configurations",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          outputPath: { type: "string", description: "Output directory path" },
          strictMode: { type: "boolean", description: "Enable strict mode (default: false)" }
        },
        required: ["projectPath", "outputPath"]
      }
    },

    // ===== DEVOPS & DEPLOYMENT =====
    {
      name: "generate_ci_pipeline",
      description: "Create CI/CD pipeline configurations",
      inputSchema: {
        type: "object",
        properties: {
          platform: { type: "string", description: "CI/CD platform", enum: ["github", "gitlab", "azure", "jenkins"] },
          projectPath: { type: "string", description: "Project path" },
          includeTests: { type: "boolean", description: "Include test stages (default: true)" },
          includeDeploy: { type: "boolean", description: "Include deployment stages (default: true)" }
        },
        required: ["platform", "projectPath"]
      }
    },
    {
      name: "generate_docker_config",
      description: "Generate Dockerfile and docker-compose configurations",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          environment: { type: "string", description: "Target environment", enum: ["development", "production", "staging"] },
          includeNginx: { type: "boolean", description: "Include Nginx configuration (default: true)" }
        },
        required: ["projectPath"]
      }
    },
    {
      name: "generate_monitoring_config",
      description: "Add application health monitoring and logging",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          monitoringType: { type: "string", description: "Monitoring type", enum: ["prometheus", "elk", "datadog", "newrelic"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["projectPath", "outputPath"]
      }
    },

    // ===== COMMERCE FEATURES =====
    {
      name: "generate_product_configurator",
      description: "Generate configurable product components",
      inputSchema: {
        type: "object",
        properties: {
          productType: { type: "string", description: "Product type" },
          configurableAttributes: { type: "array", items: { type: "string" }, description: "Configurable attributes" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["productType", "outputPath"]
      }
    },
    {
      name: "generate_cart_enhancements",
      description: "Create custom cart functionality and rules",
      inputSchema: {
        type: "object",
        properties: {
          enhancementType: { type: "string", description: "Enhancement type", enum: ["validation", "promotion", "shipping", "payment"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["enhancementType", "outputPath"]
      }
    },
    {
      name: "generate_checkout_customization",
      description: "Create custom checkout steps and validation",
      inputSchema: {
        type: "object",
        properties: {
          checkoutType: { type: "string", description: "Checkout type", enum: ["single-page", "multi-step", "express"] },
          customSteps: { type: "array", items: { type: "string" }, description: "Custom checkout steps" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["checkoutType", "outputPath"]
      }
    },

    // ===== B2B FEATURES =====
    {
      name: "generate_organization_management",
      description: "Generate B2B organization components",
      inputSchema: {
        type: "object",
        properties: {
          componentType: { type: "string", description: "Component type", enum: ["user-management", "unit-management", "permission-management"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentType", "outputPath"]
      }
    },
    {
      name: "generate_approval_workflow",
      description: "Create custom approval processes",
      inputSchema: {
        type: "object",
        properties: {
          workflowType: { type: "string", description: "Workflow type", enum: ["order", "budget", "user", "custom"] },
          approvalLevels: { type: "number", description: "Number of approval levels" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["workflowType", "outputPath"]
      }
    },
    {
      name: "generate_budget_management",
      description: "Generate budget tracking components",
      inputSchema: {
        type: "object",
        properties: {
          budgetType: { type: "string", description: "Budget type", enum: ["monthly", "yearly", "project-based"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["budgetType", "outputPath"]
      }
    },

    // ===== ANALYTICS & MONITORING =====
    {
      name: "add_performance_monitoring",
      description: "Add Core Web Vitals and performance tracking",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          metricsType: { type: "string", description: "Metrics type", enum: ["core-web-vitals", "custom", "business"] },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["componentPath", "outputPath"]
      }
    },
    {
      name: "add_analytics_tracking",
      description: "Add Google Analytics, Adobe Analytics integration",
      inputSchema: {
        type: "object",
        properties: {
          analyticsProvider: { type: "string", description: "Analytics provider", enum: ["google", "adobe", "mixpanel", "segment"] },
          componentPath: { type: "string", description: "Component path" },
          events: { type: "array", items: { type: "string" }, description: "Events to track" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["analyticsProvider", "componentPath", "outputPath"]
      }
    },
    {
      name: "generate_ab_testing",
      description: "Generate A/B testing and experiment tracking code",
      inputSchema: {
        type: "object",
        properties: {
          experimentName: { type: "string", description: "Experiment name" },
          variants: { type: "array", items: { type: "string" }, description: "Test variants" },
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["experimentName", "componentPath", "outputPath"]
      }
    },

    // ===== SEO & MARKETING =====
    {
      name: "optimize_seo",
      description: "Generate meta tags, structured data, sitemaps",
      inputSchema: {
        type: "object",
        properties: {
          pageType: { type: "string", description: "Page type", enum: ["product", "category", "cms", "landing"] },
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" },
          includeStructuredData: { type: "boolean", description: "Include structured data (default: true)" }
        },
        required: ["pageType", "componentPath", "outputPath"]
      }
    },
    {
      name: "add_social_media_integration",
      description: "Add Open Graph, Twitter Card support",
      inputSchema: {
        type: "object",
        properties: {
          platforms: { type: "array", items: { type: "string" }, description: "Social media platforms" },
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" }
        },
        required: ["platforms", "componentPath", "outputPath"]
      }
    },

    // ===== CODE QUALITY =====
    {
      name: "fix_linting_issues",
      description: "Auto-fix ESLint/Prettier issues in generated code",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          fixTypes: { type: "array", items: { type: "string" }, description: "Types of fixes to apply" }
        },
        required: ["projectPath"]
      }
    },
    {
      name: "analyze_dependencies",
      description: "Check for unused imports and circular dependencies",
      inputSchema: {
        type: "object",
        properties: {
          projectPath: { type: "string", description: "Project path" },
          analysisType: { type: "string", description: "Analysis type", enum: ["unused", "circular", "outdated", "all"] }
        },
        required: ["projectPath"]
      }
    },

    // ===== DOCUMENTATION =====
    {
      name: "generate_documentation",
      description: "Auto-generate component documentation from code",
      inputSchema: {
        type: "object",
        properties: {
          componentPath: { type: "string", description: "Component path" },
          outputPath: { type: "string", description: "Output directory path" },
          format: { type: "string", description: "Documentation format", enum: ["markdown", "html", "json"] },
          includeExamples: { type: "boolean", description: "Include usage examples (default: true)" }
        },
        required: ["componentPath", "outputPath"]
      }
    },
    {
      name: "generate_api_docs",
      description: "Generate OpenAPI specs for custom endpoints",
      inputSchema: {
        type: "object",
        properties: {
          endpointsPath: { type: "string", description: "Endpoints path" },
          outputPath: { type: "string", description: "Output directory path" },
          format: { type: "string", description: "Output format", enum: ["yaml", "json"] }
        },
        required: ["endpointsPath", "outputPath"]
      }
    }
  ];
} 