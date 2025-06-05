import type { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { logger } from "./utils/logger.js";
import { ComponentGenerator } from "./tools/component/index.js";
import { ServiceGenerator } from "./tools/service/index.js";
import { ModelGenerator } from "./tools/model/index.js";
import { ProjectAnalyzer } from "./tools/analysis/index.js";
import { CMSGenerator } from "./tools/cms/index.js";
import { APIGenerator } from "./tools/api/index.js";
import { ThemeGenerator } from "./tools/styling/index.js";
import { I18nGenerator } from "./tools/i18n/index.js";
import { TestGenerator } from "./tools/testing/index.js";
import { MigrationTools } from "./tools/migration/index.js";
import { SecurityTools } from "./tools/security/index.js";
import { DevOpsTools } from "./tools/devops/index.js";
import { CommerceTools } from "./tools/commerce/index.js";
import { B2BTools } from "./tools/b2b/index.js";
import { AnalyticsTools } from "./tools/analytics/index.js";
import { SEOTools } from "./tools/seo/index.js";
import { QualityTools } from "./tools/quality/index.js";
import { DocumentationTools } from "./tools/documentation/index.js";

export async function handleToolCall(request: CallToolRequestSchema): Promise<any> {
  const { name, arguments: args } = request.params;
  
  logger.info(`Executing tool: ${name}`);
  logger.debug(`Tool arguments:`, args);

  try {
    switch (name) {
      // ===== COMPONENT GENERATION =====
      case "create_spartacus_component":
        return await ComponentGenerator.createComponent(args);
      case "create_component_variant":
        return await ComponentGenerator.createVariant(args);
      case "refactor_component":
        return await ComponentGenerator.refactorComponent(args);

      // ===== SERVICE GENERATION =====
      case "generate_spartacus_service":
        return await ServiceGenerator.generateService(args);
      case "generate_ngrx_store":
        return await ServiceGenerator.generateNgrxStore(args);

      // ===== MODEL GENERATION =====
      case "create_spartacus_model":
        return await ModelGenerator.createModel(args);

      // ===== PROJECT ANALYSIS =====
      case "analyze_spartacus_structure":
        return await ProjectAnalyzer.analyzeStructure(args);
      case "detect_anti_patterns":
        return await ProjectAnalyzer.detectAntiPatterns(args);
      case "analyze_bundle_size":
        return await ProjectAnalyzer.analyzeBundleSize(args);

      // ===== CMS & CONTENT MANAGEMENT =====
      case "generate_cms_component":
        return await CMSGenerator.generateCMSComponent(args);
      case "create_content_slot":
        return await CMSGenerator.createContentSlot(args);

      // ===== API & BACKEND INTEGRATION =====
      case "generate_occ_client":
        return await APIGenerator.generateOCCClient(args);
      case "generate_graphql_client":
        return await APIGenerator.generateGraphQLClient(args);
      case "generate_mock_data":
        return await APIGenerator.generateMockData(args);

      // ===== STYLING & THEMING =====
      case "generate_theme":
        return await ThemeGenerator.generateTheme(args);
      case "generate_css_variables":
        return await ThemeGenerator.generateCSSVariables(args);
      case "create_design_tokens":
        return await ThemeGenerator.createDesignTokens(args);

      // ===== INTERNATIONALIZATION =====
      case "generate_i18n_keys":
        return await I18nGenerator.generateI18nKeys(args);
      case "add_rtl_support":
        return await I18nGenerator.addRTLSupport(args);

      // ===== TESTING =====
      case "generate_component_tests":
        return await TestGenerator.generateComponentTests(args);
      case "generate_storybook_stories":
        return await TestGenerator.generateStorybookStories(args);
      case "create_performance_tests":
        return await TestGenerator.createPerformanceTests(args);

      // ===== MIGRATION & UPGRADE =====
      case "migrate_spartacus_version":
        return await MigrationTools.migrateSpartacusVersion(args);
      case "migrate_angular_version":
        return await MigrationTools.migrateAngularVersion(args);
      case "detect_breaking_changes":
        return await MigrationTools.detectBreakingChanges(args);

      // ===== SECURITY & COMPLIANCE =====
      case "security_scan":
        return await SecurityTools.securityScan(args);
      case "generate_gdpr_compliance":
        return await SecurityTools.generateGDPRCompliance(args);
      case "generate_csp_config":
        return await SecurityTools.generateCSPConfig(args);

      // ===== DEVOPS & DEPLOYMENT =====
      case "generate_ci_pipeline":
        return await DevOpsTools.generateCIPipeline(args);
      case "generate_docker_config":
        return await DevOpsTools.generateDockerConfig(args);
      case "generate_monitoring_config":
        return await DevOpsTools.generateMonitoringConfig(args);

      // ===== COMMERCE FEATURES =====
      case "generate_product_configurator":
        return await CommerceTools.generateProductConfigurator(args);
      case "generate_cart_enhancements":
        return await CommerceTools.generateCartEnhancements(args);
      case "generate_checkout_customization":
        return await CommerceTools.generateCheckoutCustomization(args);

      // ===== B2B FEATURES =====
      case "generate_organization_management":
        return await B2BTools.generateOrganizationManagement(args);
      case "generate_approval_workflow":
        return await B2BTools.generateApprovalWorkflow(args);
      case "generate_budget_management":
        return await B2BTools.generateBudgetManagement(args);

      // ===== ANALYTICS & MONITORING =====
      case "add_performance_monitoring":
        return await AnalyticsTools.addPerformanceMonitoring(args);
      case "add_analytics_tracking":
        return await AnalyticsTools.addAnalyticsTracking(args);
      case "generate_ab_testing":
        return await AnalyticsTools.generateABTesting(args);

      // ===== SEO & MARKETING =====
      case "optimize_seo":
        return await SEOTools.optimizeSEO(args);
      case "add_social_media_integration":
        return await SEOTools.addSocialMediaIntegration(args);

      // ===== CODE QUALITY =====
      case "fix_linting_issues":
        return await QualityTools.fixLintingIssues(args);
      case "analyze_dependencies":
        return await QualityTools.analyzeDependencies(args);

      // ===== DOCUMENTATION =====
      case "generate_documentation":
        return await DocumentationTools.generateDocumentation(args);
      case "generate_api_docs":
        return await DocumentationTools.generateAPIDocumentation(args);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    logger.error(`Error executing tool ${name}:`, error);
    return {
      content: [
        {
          type: "text",
          text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
}

export function validateToolArguments(toolName: string, args: any): void {
  // Basic validation - can be extended with more specific validation per tool
  if (!args) {
    throw new Error(`Missing arguments for tool: ${toolName}`);
  }

  // Common validations
  if (args.outputPath && typeof args.outputPath !== 'string') {
    throw new Error('outputPath must be a string');
  }

  if (args.projectPath && typeof args.projectPath !== 'string') {
    throw new Error('projectPath must be a string');
  }

  if (args.componentPath && typeof args.componentPath !== 'string') {
    throw new Error('componentPath must be a string');
  }

  // Tool-specific validations
  switch (toolName) {
    case "create_spartacus_component":
      if (!args.name || typeof args.name !== 'string') {
        throw new Error('Component name is required and must be a string');
      }
      if (!args.selector || typeof args.selector !== 'string') {
        throw new Error('Component selector is required and must be a string');
      }
      if (!args.category || typeof args.category !== 'string') {
        throw new Error('Component category is required and must be a string');
      }
      break;

    case "generate_spartacus_service":
      if (!args.name || typeof args.name !== 'string') {
        throw new Error('Service name is required and must be a string');
      }
      break;

    case "create_spartacus_model":
      if (!args.name || typeof args.name !== 'string') {
        throw new Error('Model name is required and must be a string');
      }
      break;

    case "analyze_spartacus_structure":
      if (!args.projectPath || typeof args.projectPath !== 'string') {
        throw new Error('Project path is required and must be a string');
      }
      break;

    // Add more specific validations as needed
  }
} 