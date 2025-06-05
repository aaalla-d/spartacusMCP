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
          return this.createSpartacusComponent(request.params.arguments as unknown as ComponentConfig);
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
        const modelTs = this.generateModelTs(name, {}, undefined);
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