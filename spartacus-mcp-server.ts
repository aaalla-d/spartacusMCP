#!/usr/bin/env node

/**
 * SAP Spartacus MCP Server
 * 
 * This MCP server provides tools for creating custom components in SAP Spartacus
 * following the established patterns and conventions.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import * as path from 'path';

interface ComponentConfig {
  name: string;
  selector: string;
  category: string;
  outputPath: string;
  hasModule?: boolean;
  hasService?: boolean;
  hasModel?: boolean;
  cmsComponent?: string;
  dependencies?: string[];
  properties?: Record<string, string>;
  responsive?: boolean;
  accessibility?: boolean;
  animations?: boolean;
  mobileFirst?: boolean;
}

interface ThemeConfig {
  name: string;
  outputPath: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  components?: string[];
}

interface ServiceConfig {
  name: string;
  outputPath: string;
  injectable?: boolean;
  dependencies?: string[];
}

interface ModelConfig {
  name: string;
  outputPath: string;
  properties?: Record<string, string>;
  extends?: string;
}

interface ProjectAnalysisConfig {
  projectPath: string;
}

interface SharedModuleConfig {
  outputPath: string;
  components?: string[];
  services?: string[];
  imports?: string[];
  exports?: string[];
  providers?: string[];
}

interface HomepageConfig {
  name: string;
  selector: string;
  route: string;
  outputPath: string;
  hasModule?: boolean;
  hasService?: boolean;
  components?: string[];
  dependencies?: string[];
  properties?: Record<string, string>;
  responsive?: boolean;
  accessibility?: boolean;
  seo?: boolean;
}

class SpartacusMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'spartacus-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_spartacus_component',
            description: 'Create a new Spartacus component with all necessary files following Spartacus conventions',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Component name in PascalCase (e.g., ProductIntro)',
                },
                selector: {
                  type: 'string',
                  description: 'Component selector (e.g., cx-product-intro)',
                },
                category: {
                  type: 'string',
                  description: 'Component category (product, user, content, navigation, etc.)',
                },
                outputPath: {
                  type: 'string',
                  description: 'Output directory path',
                },
                hasModule: {
                  type: 'boolean',
                  description: 'Whether to create a module file',
                  default: true,
                },
                hasService: {
                  type: 'boolean',
                  description: 'Whether to create a service file',
                  default: false,
                },
                hasModel: {
                  type: 'boolean',
                  description: 'Whether to create a model file',
                  default: false,
                },
                cmsComponent: {
                  type: 'string',
                  description: 'CMS component name for configuration',
                },
                dependencies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Additional dependencies to import',
                },
                properties: {
                  type: 'object',
                  description: 'Component properties with their types',
                },
                responsive: {
                  type: 'boolean',
                  description: 'Whether to include responsive design features',
                  default: false,
                },
                accessibility: {
                  type: 'boolean',
                  description: 'Whether to include accessibility features',
                  default: false,
                },
                animations: {
                  type: 'boolean',
                  description: 'Whether to include animations',
                  default: false,
                },
                mobileFirst: {
                  type: 'boolean',
                  description: 'Whether to use mobile-first design approach',
                  default: false,
                },
              },
              required: ['name', 'selector', 'category', 'outputPath'],
            },
          },
          {
            name: 'create_spartacus_theme',
            description: 'Create a complete Spartacus theme with SCSS variables and component styles',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Theme name in kebab-case (e.g., midnight-green)',
                },
                outputPath: {
                  type: 'string',
                  description: 'Output directory path for the theme',
                },
                primaryColor: {
                  type: 'string',
                  description: 'Primary color (hex code)',
                  default: '#000000',
                },
                secondaryColor: {
                  type: 'string',
                  description: 'Secondary color (hex code)',
                  default: '#1a1a1a',
                },
                accentColor: {
                  type: 'string',
                  description: 'Accent color (hex code)',
                  default: '#86BC24',
                },
                backgroundColor: {
                  type: 'string',
                  description: 'Background color (hex code)',
                  default: '#0d0d0d',
                },
                textColor: {
                  type: 'string',
                  description: 'Text color (hex code)',
                  default: '#ffffff',
                },
                components: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of component styles to include',
                },
              },
              required: ['name', 'outputPath'],
            },
          },
          {
            name: 'create_shared_module',
            description: 'Create a shared module to organize components and services',
            inputSchema: {
              type: 'object',
              properties: {
                outputPath: {
                  type: 'string',
                  description: 'Output path for the shared module',
                },
                components: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of component names to include',
                },
                services: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of service names to include',
                },
                imports: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of modules to import',
                },
                exports: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of components to export',
                },
                providers: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of services to provide',
                },
              },
              required: ['outputPath'],
            },
          },
          {
            name: 'create_homepage',
            description: 'Create a custom homepage component with routing and SEO',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Homepage component name',
                  default: 'Homepage',
                },
                selector: {
                  type: 'string',
                  description: 'Component selector',
                  default: 'cx-homepage',
                },
                route: {
                  type: 'string',
                  description: 'Route path',
                  default: '/',
                },
                outputPath: {
                  type: 'string',
                  description: 'Output directory path',
                },
                hasModule: {
                  type: 'boolean',
                  description: 'Whether to create a module file',
                  default: true,
                },
                hasService: {
                  type: 'boolean',
                  description: 'Whether to create a service file',
                  default: true,
                },
                components: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of child components to include',
                },
                dependencies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Additional dependencies to import',
                },
                properties: {
                  type: 'object',
                  description: 'Component properties with their types',
                },
                responsive: {
                  type: 'boolean',
                  description: 'Whether to include responsive design features',
                  default: false,
                },
                accessibility: {
                  type: 'boolean',
                  description: 'Whether to include accessibility features',
                  default: false,
                },
                seo: {
                  type: 'boolean',
                  description: 'Whether to include SEO features',
                  default: false,
                },
              },
              required: ['outputPath'],
            },
          },
          {
            name: 'analyze_spartacus_structure',
            description: 'Analyze the Spartacus project structure and provide insights',
            inputSchema: {
              type: 'object',
              properties: {
                projectPath: {
                  type: 'string',
                  description: 'Path to the Spartacus project',
                },
              },
              required: ['projectPath'],
            },
          },
          {
            name: 'generate_spartacus_service',
            description: 'Generate a Spartacus service following the established patterns',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Service name in PascalCase',
                },
                outputPath: {
                  type: 'string',
                  description: 'Output directory path',
                },
                injectable: {
                  type: 'boolean',
                  description: 'Whether the service should be injectable',
                  default: true,
                },
                dependencies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Service dependencies',
                },
              },
              required: ['name', 'outputPath'],
            },
          },
          {
            name: 'create_spartacus_model',
            description: 'Create TypeScript interfaces and models for Spartacus',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Model name in PascalCase',
                },
                outputPath: {
                  type: 'string',
                  description: 'Output directory path',
                },
                properties: {
                  type: 'object',
                  description: 'Model properties with their types',
                },
                extends: {
                  type: 'string',
                  description: 'Interface to extend from',
                },
              },
              required: ['name', 'outputPath'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'create_spartacus_component':
          return this.createSpartacusComponent(request.params.arguments as unknown as ComponentConfig);
        case 'create_spartacus_theme':
          return this.createSpartacusTheme(request.params.arguments as unknown as ThemeConfig);
        case 'create_shared_module':
          return this.createSharedModule(request.params.arguments as unknown as SharedModuleConfig);
        case 'create_homepage':
          return this.createHomepage(request.params.arguments as unknown as HomepageConfig);
        case 'analyze_spartacus_structure':
          return this.analyzeSpartacusStructure(request.params.arguments as unknown as ProjectAnalysisConfig);
        case 'generate_spartacus_service':
          return this.generateSpartacusService(request.params.arguments as unknown as ServiceConfig);
        case 'create_spartacus_model':
          return this.createSpartacusModel(request.params.arguments as unknown as ModelConfig);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  private async createSpartacusComponent(args: ComponentConfig) {
    try {
      const {
        name,
        selector,
        category,
        outputPath,
        hasModule = true,
        hasService = false,
        hasModel = false,
        cmsComponent,
        dependencies = [],
        properties,
        responsive,
        accessibility,
        animations,
        mobileFirst,
      } = args;

      const kebabName = this.toKebabCase(name);
      const componentDir = path.join(outputPath, kebabName);

      // Create directory
      await fs.mkdir(componentDir, { recursive: true });

      const files: string[] = [];

      // Generate component files
      const componentTs = this.generateComponentTs(name, selector, dependencies);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.ts`), componentTs);
      files.push(`${kebabName}.component.ts`);

      const componentHtml = this.generateComponentHtml(name, selector);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.html`), componentHtml);
      files.push(`${kebabName}.component.html`);

      const componentScss = this.generateComponentScss(selector);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.scss`), componentScss);
      files.push(`${kebabName}.component.scss`);

      const componentSpec = this.generateComponentSpec(name);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.spec.ts`), componentSpec);
      files.push(`${kebabName}.component.spec.ts`);

      if (hasModule) {
        const moduleTs = this.generateModuleTs(name, cmsComponent);
        await fs.writeFile(path.join(componentDir, `${kebabName}.module.ts`), moduleTs);
        files.push(`${kebabName}.module.ts`);
      }

      if (hasService) {
        const serviceTs = this.generateServiceTs(name, true, dependencies);
        await fs.writeFile(path.join(componentDir, `${kebabName}.service.ts`), serviceTs);
        files.push(`${kebabName}.service.ts`);

        const serviceSpec = this.generateServiceSpec(name);
        await fs.writeFile(path.join(componentDir, `${kebabName}.service.spec.ts`), serviceSpec);
        files.push(`${kebabName}.service.spec.ts`);
      }

      if (hasModel) {
        const modelTs = this.generateModelTs(name, properties, undefined);
        await fs.writeFile(path.join(componentDir, `${kebabName}.model.ts`), modelTs);
        files.push(`${kebabName}.model.ts`);
      }

      const indexTs = this.generateIndexTs(name, hasModule, hasService, hasModel);
      await fs.writeFile(path.join(componentDir, 'index.ts'), indexTs);
      files.push('index.ts');

      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created Spartacus component '${name}'\n\n` +
                  `📁 Component directory: ${componentDir}\n\n` +
                  `📋 Generated files:\n${files.map(f => `  - ${f}`).join('\n')}\n\n` +
                  `🎯 Category: ${category}\n` +
                  `🏷️  Selector: ${selector}\n\n` +
                  `Next steps:\n` +
                  `1. Import the component module in your app module\n` +
                  `2. Add the component to your templates\n` +
                  `3. Customize the component logic and styling\n` +
                  `4. Run tests to ensure everything works correctly`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create component: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async analyzeSpartacusStructure(args: ProjectAnalysisConfig) {
    try {
      const { projectPath } = args;
      
      // Check if path exists
      try {
        await fs.access(projectPath);
      } catch {
        throw new Error(`Project path does not exist: ${projectPath}`);
      }

      const analysis = {
        projectPath,
        structure: {} as Record<string, any>,
        recommendations: [] as string[],
        spartacusVersion: 'Unknown',
        angularVersion: 'Unknown',
      };

      // Analyze package.json
      try {
        const packageJsonPath = path.join(projectPath, 'package.json');
        const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);
        
        // Extract versions
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        analysis.spartacusVersion = deps['@spartacus/core'] || 'Not found';
        analysis.angularVersion = deps['@angular/core'] || 'Not found';
        
        analysis.structure = {
          hasPackageJson: true,
          dependencies: Object.keys(packageJson.dependencies || {}),
          devDependencies: Object.keys(packageJson.devDependencies || {}),
        };
      } catch (error) {
        analysis.recommendations.push('⚠️  package.json not found or invalid');
      }

      // Check for common Spartacus directories
      const commonDirs = ['src/app', 'src/assets', 'src/styles'];
      for (const dir of commonDirs) {
        try {
          await fs.access(path.join(projectPath, dir));
          (analysis.structure as any)[dir.replace('/', '_')] = true;
        } catch {
          (analysis.structure as any)[dir.replace('/', '_')] = false;
          analysis.recommendations.push(`📁 Consider creating ${dir} directory`);
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `📊 Spartacus Project Analysis\n\n` +
                  `📍 Project Path: ${projectPath}\n` +
                  `🏷️  Spartacus Version: ${analysis.spartacusVersion}\n` +
                  `🅰️  Angular Version: ${analysis.angularVersion}\n\n` +
                  `📁 Project Structure:\n${JSON.stringify(analysis.structure, null, 2)}\n\n` +
                  `💡 Recommendations:\n${analysis.recommendations.map(r => `  ${r}`).join('\n') || '  ✅ No issues found'}\n\n` +
                  `🔍 Analysis completed successfully!`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to analyze project: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async generateSpartacusService(args: ServiceConfig) {
    try {
      const { name, outputPath, injectable = true, dependencies = [] } = args;
      
      const kebabName = this.toKebabCase(name);
      const serviceDir = path.join(outputPath, kebabName);
      
      await fs.mkdir(serviceDir, { recursive: true });
      
      const files: string[] = [];
      
      const serviceTs = this.generateServiceTs(name, injectable, dependencies);
      await fs.writeFile(path.join(serviceDir, `${kebabName}.service.ts`), serviceTs);
      files.push(`${kebabName}.service.ts`);
      
      const serviceSpec = this.generateServiceSpec(name);
      await fs.writeFile(path.join(serviceDir, `${kebabName}.service.spec.ts`), serviceSpec);
      files.push(`${kebabName}.service.spec.ts`);
      
      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created Spartacus service '${name}'\n\n` +
                  `📁 Service directory: ${serviceDir}\n\n` +
                  `📋 Generated files:\n${files.map(f => `  - ${f}`).join('\n')}\n\n` +
                  `🔧 Injectable: ${injectable}\n` +
                  `📦 Dependencies: ${dependencies.length > 0 ? dependencies.join(', ') : 'None'}\n\n` +
                  `Next steps:\n` +
                  `1. Implement service methods\n` +
                  `2. Add service to providers in module\n` +
                  `3. Inject service in components that need it\n` +
                  `4. Write unit tests for service methods`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create service: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async createSpartacusModel(args: ModelConfig) {
    try {
      const { name, outputPath, properties = {}, extends: extendsInterface } = args;
      
      const kebabName = this.toKebabCase(name);
      const modelPath = path.join(outputPath, `${kebabName}.model.ts`);
      
      await fs.mkdir(outputPath, { recursive: true });
      
      const modelTs = this.generateModelTs(name, properties, extendsInterface);
      await fs.writeFile(modelPath, modelTs);
      
      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created Spartacus model '${name}'\n\n` +
                  `📁 Model file: ${modelPath}\n\n` +
                  `🏗️  Properties: ${Object.keys(properties).length > 0 ? Object.keys(properties).join(', ') : 'None defined'}\n` +
                  `🔗 Extends: ${extendsInterface || 'None'}\n\n` +
                  `Next steps:\n` +
                  `1. Add additional properties as needed\n` +
                  `2. Import model in components and services\n` +
                  `3. Use model for type safety\n` +
                  `4. Consider adding validation if needed`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create model: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async createSpartacusTheme(args: ThemeConfig) {
    try {
      const {
        name,
        outputPath,
        primaryColor = '#000000',
        secondaryColor = '#1a1a1a',
        accentColor = '#86BC24',
        backgroundColor = '#0d0d0d',
        textColor = '#ffffff',
        components = [],
      } = args;

      const themeDir = path.join(outputPath, name);
      await fs.mkdir(themeDir, { recursive: true });

      const files: string[] = [];

      // Generate main theme file
      const themeScss = this.generateThemeScss(name, {
        primaryColor,
        secondaryColor,
        accentColor,
        backgroundColor,
        textColor,
        components,
      });
      await fs.writeFile(path.join(themeDir, `_${name}.scss`), themeScss);
      files.push(`_${name}.scss`);

      // Generate component styles directory
      const componentsDir = path.join(themeDir, 'components');
      await fs.mkdir(componentsDir, { recursive: true });

      // Generate component style files
      for (const component of components) {
        const componentScss = this.generateComponentThemeScss(component, accentColor);
        await fs.writeFile(path.join(componentsDir, `_${component}.scss`), componentScss);
        files.push(`components/_${component}.scss`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created Spartacus theme '${name}'\n\n` +
                  `📁 Theme directory: ${themeDir}\n\n` +
                  `📋 Generated files:\n${files.map(f => `  - ${f}`).join('\n')}\n\n` +
                  `🎨 Colors:\n` +
                  `  - Primary: ${primaryColor}\n` +
                  `  - Secondary: ${secondaryColor}\n` +
                  `  - Accent: ${accentColor}\n` +
                  `  - Background: ${backgroundColor}\n` +
                  `  - Text: ${textColor}\n\n` +
                  `🧩 Components: ${components.length > 0 ? components.join(', ') : 'None'}\n\n` +
                  `Next steps:\n` +
                  `1. Import the theme in your main styles file\n` +
                  `2. Customize component styles as needed\n` +
                  `3. Test the theme across different components\n` +
                  `4. Add responsive breakpoints if needed`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create theme: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async createSharedModule(args: SharedModuleConfig) {
    try {
      const {
        outputPath,
        components = [],
        services = [],
        imports = [],
        exports = [],
        providers = [],
      } = args;

      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      const moduleTs = this.generateSharedModuleTs({
        components,
        services,
        imports,
        exports,
        providers,
      });
      await fs.writeFile(outputPath, moduleTs);

      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created shared module\n\n` +
                  `📁 Module file: ${outputPath}\n\n` +
                  `🧩 Components: ${components.length > 0 ? components.join(', ') : 'None'}\n` +
                  `🔧 Services: ${services.length > 0 ? services.join(', ') : 'None'}\n` +
                  `📦 Imports: ${imports.length > 0 ? imports.join(', ') : 'None'}\n` +
                  `📤 Exports: ${exports.length > 0 ? exports.join(', ') : 'None'}\n` +
                  `🏭 Providers: ${providers.length > 0 ? providers.join(', ') : 'None'}\n\n` +
                  `Next steps:\n` +
                  `1. Import this module in your app module\n` +
                  `2. Add more components and services as needed\n` +
                  `3. Update exports to make components available\n` +
                  `4. Configure providers for dependency injection`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create shared module: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async createHomepage(args: HomepageConfig) {
    try {
      const {
        name = 'Homepage',
        selector = 'cx-homepage',
        route = '/',
        outputPath,
        hasModule = true,
        hasService = true,
        components = [],
        dependencies = [],
        properties = {},
        responsive = false,
        accessibility = false,
        seo = false,
      } = args;

      const kebabName = this.toKebabCase(name);
      const homepageDir = path.join(outputPath, kebabName);

      await fs.mkdir(homepageDir, { recursive: true });

      const files: string[] = [];

      // Generate homepage component
      const componentTs = this.generateHomepageComponentTs(name, selector, {
        components,
        dependencies,
        properties,
        responsive,
        accessibility,
        seo,
      });
      await fs.writeFile(path.join(homepageDir, `${kebabName}.component.ts`), componentTs);
      files.push(`${kebabName}.component.ts`);

      const componentHtml = this.generateHomepageComponentHtml(name, selector, components);
      await fs.writeFile(path.join(homepageDir, `${kebabName}.component.html`), componentHtml);
      files.push(`${kebabName}.component.html`);

      const componentScss = this.generateHomepageComponentScss(selector, responsive);
      await fs.writeFile(path.join(homepageDir, `${kebabName}.component.scss`), componentScss);
      files.push(`${kebabName}.component.scss`);

      const componentSpec = this.generateComponentSpec(name);
      await fs.writeFile(path.join(homepageDir, `${kebabName}.component.spec.ts`), componentSpec);
      files.push(`${kebabName}.component.spec.ts`);

      if (hasModule) {
        const moduleTs = this.generateHomepageModuleTs(name, route, components);
        await fs.writeFile(path.join(homepageDir, `${kebabName}.module.ts`), moduleTs);
        files.push(`${kebabName}.module.ts`);
      }

      if (hasService) {
        const serviceTs = this.generateHomepageServiceTs(name, dependencies, seo);
        await fs.writeFile(path.join(homepageDir, `${kebabName}.service.ts`), serviceTs);
        files.push(`${kebabName}.service.ts`);

        const serviceSpec = this.generateServiceSpec(name);
        await fs.writeFile(path.join(homepageDir, `${kebabName}.service.spec.ts`), serviceSpec);
        files.push(`${kebabName}.service.spec.ts`);
      }

      const indexTs = this.generateIndexTs(name, hasModule, hasService, false);
      await fs.writeFile(path.join(homepageDir, 'index.ts'), indexTs);
      files.push('index.ts');

      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully created homepage component '${name}'\n\n` +
                  `📁 Component directory: ${homepageDir}\n\n` +
                  `📋 Generated files:\n${files.map(f => `  - ${f}`).join('\n')}\n\n` +
                  `🏷️  Selector: ${selector}\n` +
                  `🛣️  Route: ${route}\n` +
                  `🧩 Child Components: ${components.length > 0 ? components.join(', ') : 'None'}\n` +
                  `📱 Responsive: ${responsive ? 'Yes' : 'No'}\n` +
                  `♿ Accessibility: ${accessibility ? 'Yes' : 'No'}\n` +
                  `🔍 SEO: ${seo ? 'Yes' : 'No'}\n\n` +
                  `Next steps:\n` +
                  `1. Import the homepage module in your app routing\n` +
                  `2. Configure the route in your routing module\n` +
                  `3. Add child components to the template\n` +
                  `4. Customize the homepage content and styling`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create homepage: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // Template generation methods
  private generateComponentTs(name: string, selector: string, dependencies: string[] = []): string {
    const dependencyImports = dependencies.length > 0 
      ? dependencies.map(dep => `import { ${dep} } from '@spartacus/core';`).join('\n') + '\n'
      : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
${dependencyImports}
@Component({
  selector: '${selector}',
  templateUrl: './${this.toKebabCase(name)}.component.html',
  styleUrls: ['./${this.toKebabCase(name)}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${name}Component {
  constructor() {
    // TODO: Implement component logic
  }

  // TODO: Add component methods
}
`;
  }

  private generateComponentHtml(name: string, selector: string): string {
    return `<!--
  SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
  SPDX-License-Identifier: Apache-2.0
-->

<div class="${selector.replace('cx-', '')}">
  <h2>{{ '${name.toLowerCase()}.title' | cxTranslate }}</h2>
  
  <!-- TODO: Add component template -->
  <p>{{ '${name.toLowerCase()}.description' | cxTranslate }}</p>
</div>
`;
  }

  private generateComponentScss(selector: string): string {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

.${selector.replace('cx-', '')} {
  // TODO: Add component styles using Spartacus design tokens
  
  h2 {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: var(--cx-color-text);
    line-height: 1.5;
  }
}
`;
  }

  private generateComponentSpec(name: string): string {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${name}Component } from './${this.toKebabCase(name)}.component';

describe('${name}Component', () => {
  let component: ${name}Component;
  let fixture: ComponentFixture<${name}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${name}Component],
    }).compileComponents();

    fixture = TestBed.createComponent(${name}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Add more specific tests
});
`;
  }

  private generateModuleTs(name: string, cmsComponent?: string): string {
    const cmsConfig = cmsComponent ? `
import { CmsConfig } from '@spartacus/core';

const cmsComponents: CmsConfig = {
  cmsComponents: {
    ${cmsComponent}: {
      component: ${name}Component,
    },
  },
};` : '';

    const cmsImports = cmsComponent ? `
    ConfigModule.withConfig(cmsComponents),` : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule } from '@spartacus/core';
import { ${name}Component } from './${this.toKebabCase(name)}.component';
${cmsConfig}

@NgModule({
  declarations: [${name}Component],
  imports: [
    CommonModule,${cmsImports}
  ],
  exports: [${name}Component],
})
export class ${name}Module {}
`;
  }

  private generateServiceTs(name: string, injectable: boolean = true, dependencies: string[] = []): string {
    const injectableDecorator = injectable ? '@Injectable({\n  providedIn: \'root\',\n})\n' : '';
    const dependencyImports = dependencies.length > 0 
      ? dependencies.map(dep => `import { ${dep} } from '@spartacus/core';`).join('\n') + '\n'
      : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
${dependencyImports}
${injectableDecorator}export class ${name}Service {
  constructor() {
    // TODO: Inject dependencies
  }

  // TODO: Add service methods
}
`;
  }

  private generateServiceSpec(name: string): string {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { ${name}Service } from './${this.toKebabCase(name)}.service';

describe('${name}Service', () => {
  let service: ${name}Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(${name}Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Add more specific tests
});
`;
  }

  private generateModelTs(name: string, properties: Record<string, string> = {}, extendsInterface?: string): string {
    const extendsClause = extendsInterface ? ` extends ${extendsInterface}` : '';
    const propertyLines = Object.entries(properties)
      .map(([key, type]) => `  ${key}: ${type};`)
      .join('\n');

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ${name}${extendsClause} {
${propertyLines || '  // TODO: Add interface properties'}
}
`;
  }

  private generateIndexTs(name: string, hasModule: boolean, hasService: boolean, hasModel: boolean): string {
    const exports: string[] = [`export * from './${this.toKebabCase(name)}.component';`];
    
    if (hasModule) {
      exports.push(`export * from './${this.toKebabCase(name)}.module';`);
    }
    if (hasService) {
      exports.push(`export * from './${this.toKebabCase(name)}.service';`);
    }
    if (hasModel) {
      exports.push(`export * from './${this.toKebabCase(name)}.model';`);
    }

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

${exports.join('\n')}
`;
  }

  private generateThemeScss(name: string, colors: any): string {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Theme: ${name.charAt(0).toUpperCase() + name.slice(1)} Theme
// Description: Custom Spartacus theme with modern design
// Version: 1.0.0

@import '~@spartacus/styles/scss/theme/santorini';

// ========================================
// ${name.toUpperCase()} THEME VARIABLES
// ========================================

// Core Brand Colors
$cx-color-primary: ${colors.primaryColor} !default;
$cx-color-secondary: ${colors.secondaryColor} !default;
$cx-color-background: ${colors.backgroundColor} !default;
$cx-color-text: ${colors.textColor} !default;
$cx-color-accent: ${colors.accentColor} !default;
$cx-color-accent-hover: ${this.adjustColor(colors.accentColor, -10)} !default;
$cx-color-accent-light: ${this.adjustColor(colors.accentColor, 10)} !default;

// Extended Color Palette
$cx-color-inverse: ${colors.textColor === '#ffffff' ? '#000000' : '#ffffff'} !default;
$cx-color-success: ${colors.accentColor} !default;
$cx-color-warning: #ffc107 !default;
$cx-color-danger: #dc3545 !default;
$cx-color-info: #17a2b8 !default;

// Global Theme Styles
body {
  background-color: $cx-color-background;
  color: $cx-color-text;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

// Selection styles
::selection {
  background-color: $cx-color-accent;
  color: $cx-color-background;
}

::-moz-selection {
  background-color: $cx-color-accent;
  color: $cx-color-background;
}

// Component imports
${colors.components.map((comp: string) => `@import 'components/${comp}';`).join('\n')}
`;
  }

  private generateComponentThemeScss(componentName: string, accentColor: string): string {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ${componentName} Component Theme Styles

.${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')} {
  // Component-specific theme variables
  --component-accent: ${accentColor};
  --component-accent-hover: ${this.adjustColor(accentColor, -10)};
  
  // Base styles
  background-color: var(--cx-color-secondary, #1a1a1a);
  border: 1px solid var(--cx-color-border, #333333);
  border-radius: var(--cx-border-radius, 0.375rem);
  
  // Interactive elements
  .btn-primary {
    background-color: var(--component-accent);
    border-color: var(--component-accent);
    color: var(--cx-color-background);
    
    &:hover {
      background-color: var(--component-accent-hover);
      border-color: var(--component-accent-hover);
    }
  }
  
  // Links and text
  a {
    color: var(--component-accent);
    
    &:hover {
      color: var(--component-accent-hover);
    }
  }
  
  // Focus states for accessibility
  *:focus {
    outline: 2px solid var(--component-accent);
    outline-offset: 2px;
  }
}
`;
  }

  private generateSharedModuleTs(config: any): string {
    const { components, services, imports, exports, providers } = config;
    
    const componentImports = components.map((comp: string) => 
      `import { ${comp}Component } from './components/${this.toKebabCase(comp)}/${this.toKebabCase(comp)}.component';`
    ).join('\n');
    
    const serviceImports = services.map((service: string) => 
      `import { ${service}Service } from './components/${this.toKebabCase(service)}/${this.toKebabCase(service)}.service';`
    ).join('\n');

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
${imports.map((imp: string) => `import { ${imp} } from '@spartacus/core';`).join('\n')}
${componentImports}
${serviceImports}

@NgModule({
  declarations: [
    ${components.map((comp: string) => `${comp}Component`).join(',\n    ')}
  ],
  imports: [
    CommonModule,
    ${imports.join(',\n    ')}
  ],
  exports: [
    ${exports.join(',\n    ')}
  ],
  providers: [
    ${providers.join(',\n    ')}
  ],
})
export class SharedComponentsModule {}
`;
  }

  private generateHomepageComponentTs(name: string, selector: string, config: any): string {
    const { components, dependencies, properties, responsive, accessibility, seo } = config;
    
    const dependencyImports = dependencies.length > 0 
      ? dependencies.map((dep: string) => `import { ${dep} } from '@spartacus/core';`).join('\n') + '\n'
      : '';

    const propertyDeclarations = Object.entries(properties)
      .map(([key, type]) => `  @Input() ${key}: ${type};`)
      .join('\n');

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
${dependencyImports}
@Component({
  selector: '${selector}',
  templateUrl: './${this.toKebabCase(name)}.component.html',
  styleUrls: ['./${this.toKebabCase(name)}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${name}Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

${propertyDeclarations}

  constructor() {
    // TODO: Inject dependencies
  }

  ngOnInit(): void {
    ${seo ? '// TODO: Set page meta data' : '// TODO: Initialize component'}
    ${responsive ? '// TODO: Setup responsive handling' : ''}
    ${accessibility ? '// TODO: Setup accessibility features' : ''}
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: Add component methods
}
`;
  }

  private generateHomepageComponentHtml(name: string, selector: string, components: string[]): string {
    const componentTags = components.map(comp => 
      `  <${this.toKebabCase(comp).replace(/([A-Z])/g, '-$1').toLowerCase()}></${this.toKebabCase(comp).replace(/([A-Z])/g, '-$1').toLowerCase()}>`
    ).join('\n');

    return `<!--
  SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
  SPDX-License-Identifier: Apache-2.0
-->

<div class="${selector.replace('cx-', '')}" role="main" aria-label="Homepage content">
  <h1 class="sr-only">{{ '${name.toLowerCase()}.title' | cxTranslate }}</h1>
  
${componentTags || '  <!-- TODO: Add homepage components -->'}
</div>
`;
  }

  private generateHomepageComponentScss(selector: string, responsive: boolean): string {
    const responsiveStyles = responsive ? `
  
  // Responsive breakpoints
  @media (max-width: 767px) {
    padding: 1rem;
    
    .component-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 1.5rem;
    
    .component-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }
  
  @media (min-width: 1200px) {
    padding: 2rem;
    
    .component-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }` : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

.${selector.replace('cx-', '')} {
  min-height: 100vh;
  background-color: var(--cx-color-background);
  
  .component-grid {
    display: grid;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }${responsiveStyles}
}
`;
  }

  private generateHomepageModuleTs(name: string, route: string, components: string[]): string {
    const componentImports = components.map(comp => 
      `import { ${comp}Component } from '../shared/components/${this.toKebabCase(comp)}/${this.toKebabCase(comp)}.component';`
    ).join('\n');

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { ${name}Component } from './${this.toKebabCase(name)}.component';
${componentImports}

@NgModule({
  declarations: [${name}Component],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule.forChild([
      {
        path: '${route === '/' ? '' : route}',
        component: ${name}Component,
        data: {
          pageLabel: 'homepage',
          cxRoute: 'home',
        },
      },
    ]),
    ConfigModule,
  ],
  exports: [${name}Component],
})
export class ${name}Module {}
`;
  }

  private generateHomepageServiceTs(name: string, dependencies: string[], seo: boolean): string {
    const dependencyImports = dependencies.length > 0 
      ? dependencies.map(dep => `import { ${dep} } from '@spartacus/core';`).join('\n') + '\n'
      : '';

    const seoMethods = seo ? `
  
  setPageMeta(title: string, description: string): void {
    // TODO: Implement page meta data setting
  }
  
  updateSeoData(data: any): void {
    // TODO: Implement SEO data updates
  }` : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
${dependencyImports}
@Injectable({
  providedIn: 'root',
})
export class ${name}Service {
  constructor() {
    // TODO: Inject dependencies
  }

  // TODO: Add service methods${seoMethods}
}
`;
  }

  private adjustColor(color: string, percent: number): string {
    // Simple color adjustment - in a real implementation, you'd use a proper color library
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Spartacus MCP server running on stdio');
  }
}

const server = new SpartacusMCPServer();
server.run().catch(console.error); 