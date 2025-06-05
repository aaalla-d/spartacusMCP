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
  hasModule: boolean;
  hasService: boolean;
  hasModel: boolean;
  cmsComponent?: string;
  dependencies?: string[];
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
              },
              required: ['name', 'selector', 'category', 'outputPath'],
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
          return this.createSpartacusComponent(request.params.arguments as ComponentConfig & { outputPath: string });
        case 'analyze_spartacus_structure':
          return this.analyzeSpartacusStructure(request.params.arguments as { projectPath: string });
        case 'generate_spartacus_service':
          return this.generateSpartacusService(request.params.arguments as { name: string; outputPath: string; injectable?: boolean; dependencies?: string[] });
        case 'create_spartacus_model':
          return this.createSpartacusModel(request.params.arguments as { name: string; outputPath: string; properties?: Record<string, string>; extends?: string });
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  private async createSpartacusComponent(args: ComponentConfig & { outputPath: string }) {
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
      } = args;

      const kebabName = this.toKebabCase(name);
      const componentDir = path.join(outputPath, kebabName);

      // Create directory
      await fs.mkdir(componentDir, { recursive: true });

      // Generate component files
      const files: string[] = [];

      // Component TypeScript file
      const componentTs = this.generateComponentTs(name, selector, dependencies);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.ts`), componentTs);
      files.push(`${kebabName}.component.ts`);

      // Component HTML template
      const componentHtml = this.generateComponentHtml(name, selector);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.html`), componentHtml);
      files.push(`${kebabName}.component.html`);

      // Component SCSS styles
      const componentScss = this.generateComponentScss(selector);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.scss`), componentScss);
      files.push(`${kebabName}.component.scss`);

      // Component spec file
      const componentSpec = this.generateComponentSpec(name);
      await fs.writeFile(path.join(componentDir, `${kebabName}.component.spec.ts`), componentSpec);
      files.push(`${kebabName}.component.spec.ts`);

      // Module file
      if (hasModule) {
        const moduleTs = this.generateModuleTs(name, cmsComponent);
        await fs.writeFile(path.join(componentDir, `${kebabName}.module.ts`), moduleTs);
        files.push(`${kebabName}.module.ts`);
      }

      // Service file
      if (hasService) {
        const serviceTs = this.generateServiceTs(name);
        await fs.writeFile(path.join(componentDir, `${kebabName}.service.ts`), serviceTs);
        files.push(`${kebabName}.service.ts`);

        const serviceSpec = this.generateServiceSpec(name);
        await fs.writeFile(path.join(componentDir, `${kebabName}.service.spec.ts`), serviceSpec);
        files.push(`${kebabName}.service.spec.ts`);
      }

      // Model file
      if (hasModel) {
        const modelTs = this.generateModelTs(name);
        await fs.writeFile(path.join(componentDir, `${kebabName}.model.ts`), modelTs);
        files.push(`${kebabName}.model.ts`);
      }

      // Index file
      const indexTs = this.generateIndexTs(name, hasModule, hasService, hasModel);
      await fs.writeFile(path.join(componentDir, 'index.ts'), indexTs);
      files.push('index.ts');

      return {
        content: [
          {
            type: 'text',
            text: `Successfully created Spartacus component '${name}' in ${componentDir}\n\nGenerated files:\n${files.map(f => `- ${f}`).join('\n')}\n\nNext steps:\n1. Add the component to your feature module\n2. Configure CMS component mapping if needed\n3. Add routing configuration if required\n4. Implement component logic and styling`,
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

  private async analyzeSpartacusStructure(args: { projectPath: string }) {
    try {
      const { projectPath } = args;
      
      const analysis = {
        projectStructure: {} as Record<string, boolean>,
        components: [] as string[],
        services: [] as string[],
        modules: [] as string[],
        recommendations: [] as string[],
      };

      // Analyze project structure
      const projectsPath = path.join(projectPath, 'projects');
      const featureLibsPath = path.join(projectPath, 'feature-libs');
      const integrationLibsPath = path.join(projectPath, 'integration-libs');

      try {
        const projectsExists = await fs.access(projectsPath).then(() => true).catch(() => false);
        const featureLibsExists = await fs.access(featureLibsPath).then(() => true).catch(() => false);
        const integrationLibsExists = await fs.access(integrationLibsPath).then(() => true).catch(() => false);

        analysis.projectStructure = {
          hasProjects: projectsExists,
          hasFeatureLibs: featureLibsExists,
          hasIntegrationLibs: integrationLibsExists,
        };

        if (projectsExists) {
          const projects = await fs.readdir(projectsPath);
          analysis.recommendations.push(`Found ${projects.length} projects: ${projects.join(', ')}`);
        }

        if (featureLibsExists) {
          const featureLibs = await fs.readdir(featureLibsPath);
          analysis.recommendations.push(`Found ${featureLibs.length} feature libraries: ${featureLibs.join(', ')}`);
        }

      } catch (error) {
        analysis.recommendations.push(`Error analyzing structure: ${error instanceof Error ? error.message : String(error)}`);
      }

      analysis.recommendations.push(
        'Recommended component structure:',
        '- Place custom components in feature-libs for reusability',
        '- Follow the established naming conventions (kebab-case for files, PascalCase for classes)',
        '- Include proper CMS component configuration',
        '- Add comprehensive unit tests',
        '- Use Spartacus design tokens for styling'
      );

      return {
        content: [
          {
            type: 'text',
            text: `Spartacus Project Analysis:\n\n${JSON.stringify(analysis, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to analyze structure: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async generateSpartacusService(args: { name: string; outputPath: string; injectable?: boolean; dependencies?: string[] }) {
    try {
      const { name, outputPath, injectable = true, dependencies = [] } = args;
      const kebabName = this.toKebabCase(name);

      const serviceTs = this.generateServiceTs(name, injectable, dependencies);
      const serviceSpec = this.generateServiceSpec(name);

      await fs.writeFile(path.join(outputPath, `${kebabName}.service.ts`), serviceTs);
      await fs.writeFile(path.join(outputPath, `${kebabName}.service.spec.ts`), serviceSpec);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully generated Spartacus service '${name}' in ${outputPath}\n\nGenerated files:\n- ${kebabName}.service.ts\n- ${kebabName}.service.spec.ts`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to generate service: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async createSpartacusModel(args: { name: string; outputPath: string; properties?: Record<string, string>; extends?: string }) {
    try {
      const { name, outputPath, properties = {}, extends: extendsInterface } = args;
      const kebabName = this.toKebabCase(name);

      const modelTs = this.generateModelTs(name, properties, extendsInterface);
      await fs.writeFile(path.join(outputPath, `${kebabName}.model.ts`), modelTs);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully generated Spartacus model '${name}' in ${outputPath}\n\nGenerated file:\n- ${kebabName}.model.ts`,
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
  standalone: false,
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

@import '@spartacus/styles/scss/theme';

.${selector.replace('cx-', '')} {
  // TODO: Add component styles using Spartacus design tokens
  
  h2 {
    @include type-style('heading', 2);
    margin-bottom: var(--cx-margin, 1rem);
  }

  p {
    @include type-style('body');
    color: var(--cx-color-text);
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
import { I18nTestingModule } from '@spartacus/core';
import { ${name}Component } from './${this.toKebabCase(name)}.component';

describe('${name}Component', () => {
  let component: ${name}Component;
  let fixture: ComponentFixture<${name}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${name}Component],
      imports: [I18nTestingModule],
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
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ${cmsComponent}: {
          component: ${name}Component,
        },
      },
    }),` : '';

    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ${name}Component } from './${this.toKebabCase(name)}.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [${cmsConfig}
  ],
  declarations: [${name}Component],
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
    // TODO: Implement service logic
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

// TODO: Add additional types and interfaces as needed
`;
  }

  private generateIndexTs(name: string, hasModule: boolean, hasService: boolean, hasModel: boolean): string {
    const exports = [];
    
    exports.push(`export * from './${this.toKebabCase(name)}.component';`);
    
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

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Spartacus MCP server running on stdio');
  }
}

const server = new SpartacusMCPServer();
server.run().catch(console.error); 