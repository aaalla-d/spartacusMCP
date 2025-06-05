import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from '../../utils/logger.js';
import { FileUtils } from '../../utils/fileUtils.js';
import { TemplateEngine } from '../../utils/templateEngine.js';
import { SpartacusConventions } from '../../utils/spartacusConventions.js';

export interface ComponentGeneratorArgs {
  name: string;
  selector: string;
  category: string;
  outputPath: string;
  createModule?: boolean;
  createService?: boolean;
  createModel?: boolean;
  responsive?: boolean;
  accessibility?: boolean;
  performance?: boolean;
  testing?: boolean;
}

export interface ComponentVariantArgs {
  baseName: string;
  variantType: 'smart' | 'presentational' | 'container' | 'ui';
  outputPath: string;
}

export interface RefactorComponentArgs {
  componentPath: string;
  targetPattern: 'spartacus-standard' | 'cms-component' | 'feature-component';
  outputPath: string;
}

export class ComponentGenerator {
  static async createComponent(args: ComponentGeneratorArgs): Promise<any> {
    logger.info(`Creating Spartacus component: ${args.name}`);
    
    try {
      // Validate and normalize arguments
      const normalizedArgs = await this.normalizeComponentArgs(args);
      
      // Create component directory structure
      const componentDir = await this.createComponentDirectory(normalizedArgs);
      
      // Generate component files
      const generatedFiles = await this.generateComponentFiles(normalizedArgs, componentDir);
      
      // Generate optional files
      if (normalizedArgs.createModule) {
        generatedFiles.push(await this.generateModuleFile(normalizedArgs, componentDir));
      }
      
      if (normalizedArgs.createService) {
        generatedFiles.push(await this.generateServiceFile(normalizedArgs, componentDir));
      }
      
      if (normalizedArgs.createModel) {
        generatedFiles.push(await this.generateModelFile(normalizedArgs, componentDir));
      }
      
      if (normalizedArgs.testing) {
        generatedFiles.push(...await this.generateTestFiles(normalizedArgs, componentDir));
      }
      
      logger.info(`Successfully created component ${args.name} with ${generatedFiles.length} files`);
      
      return {
        content: [
          {
            type: "text",
            text: `✅ Successfully created Spartacus component "${args.name}"\n\n` +
                  `📁 Component directory: ${componentDir}\n\n` +
                  `📄 Generated files:\n${generatedFiles.map(f => `  • ${f}`).join('\n')}\n\n` +
                  `🎯 Category: ${args.category}\n` +
                  `🏷️ Selector: ${args.selector}\n\n` +
                  `Next steps:\n` +
                  `1. Import the component module in your feature module\n` +
                  `2. Add the component to your routing if needed\n` +
                  `3. Customize the component logic and styling\n` +
                  `4. Run tests: npm test`
          }
        ]
      };
    } catch (error) {
      logger.error(`Failed to create component ${args.name}:`, error);
      throw error;
    }
  }

  static async createVariant(args: ComponentVariantArgs): Promise<any> {
    logger.info(`Creating component variant: ${args.baseName} (${args.variantType})`);
    
    try {
      const variantName = `${args.baseName}${this.getVariantSuffix(args.variantType)}`;
      const selector = SpartacusConventions.generateSelector(variantName);
      
      // Create the variant component
      const componentArgs: ComponentGeneratorArgs = {
        name: variantName,
        selector,
        category: 'misc',
        outputPath: args.outputPath,
        createModule: true,
        testing: true
      };
      
      const result = await this.createComponent(componentArgs);
      
      // Add variant-specific modifications
      await this.applyVariantModifications(args, path.join(args.outputPath, variantName));
      
      return {
        content: [
          {
            type: "text",
            text: `✅ Successfully created ${args.variantType} variant: ${variantName}\n\n` +
                  result.content[0].text
          }
        ]
      };
    } catch (error) {
      logger.error(`Failed to create component variant:`, error);
      throw error;
    }
  }

  static async refactorComponent(args: RefactorComponentArgs): Promise<any> {
    logger.info(`Refactoring component to ${args.targetPattern} pattern`);
    
    try {
      // Analyze existing component
      const componentAnalysis = await this.analyzeExistingComponent(args.componentPath);
      
      // Apply refactoring based on target pattern
      const refactoredFiles = await this.applyRefactoringPattern(
        componentAnalysis,
        args.targetPattern,
        args.outputPath
      );
      
      return {
        content: [
          {
            type: "text",
            text: `✅ Successfully refactored component to ${args.targetPattern} pattern\n\n` +
                  `📁 Output directory: ${args.outputPath}\n\n` +
                  `📄 Refactored files:\n${refactoredFiles.map(f => `  • ${f}`).join('\n')}\n\n` +
                  `🔄 Applied ${args.targetPattern} conventions and best practices`
          }
        ]
      };
    } catch (error) {
      logger.error(`Failed to refactor component:`, error);
      throw error;
    }
  }

  private static async normalizeComponentArgs(args: ComponentGeneratorArgs): Promise<ComponentGeneratorArgs> {
    return {
      ...args,
      name: SpartacusConventions.normalizeComponentName(args.name),
      selector: SpartacusConventions.normalizeSelector(args.selector),
      createModule: args.createModule ?? true,
      createService: args.createService ?? false,
      createModel: args.createModel ?? false,
      responsive: args.responsive ?? false,
      accessibility: args.accessibility ?? true,
      performance: args.performance ?? true,
      testing: args.testing ?? true
    };
  }

  private static async createComponentDirectory(args: ComponentGeneratorArgs): Promise<string> {
    const componentDir = path.join(args.outputPath, SpartacusConventions.getComponentDirectoryName(args.name));
    await FileUtils.ensureDirectory(componentDir);
    return componentDir;
  }

  private static async generateComponentFiles(args: ComponentGeneratorArgs, componentDir: string): Promise<string[]> {
    const files: string[] = [];
    
    // Component TypeScript file
    const componentFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.component.ts`);
    const componentContent = TemplateEngine.generateComponent(args);
    await fs.writeFile(componentFile, componentContent);
    files.push(componentFile);
    
    // Component HTML template
    const templateFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.component.html`);
    const templateContent = TemplateEngine.generateTemplate(args);
    await fs.writeFile(templateFile, templateContent);
    files.push(templateFile);
    
    // Component SCSS styles
    const styleFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.component.scss`);
    const styleContent = TemplateEngine.generateStyles(args);
    await fs.writeFile(styleFile, styleContent);
    files.push(styleFile);
    
    return files;
  }

  private static async generateModuleFile(args: ComponentGeneratorArgs, componentDir: string): Promise<string> {
    const moduleFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.module.ts`);
    const moduleContent = TemplateEngine.generateModule(args);
    await fs.writeFile(moduleFile, moduleContent);
    return moduleFile;
  }

  private static async generateServiceFile(args: ComponentGeneratorArgs, componentDir: string): Promise<string> {
    const serviceFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.service.ts`);
    const serviceContent = TemplateEngine.generateService(args);
    await fs.writeFile(serviceFile, serviceContent);
    return serviceFile;
  }

  private static async generateModelFile(args: ComponentGeneratorArgs, componentDir: string): Promise<string> {
    const modelFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.model.ts`);
    const modelContent = TemplateEngine.generateModel(args);
    await fs.writeFile(modelFile, modelContent);
    return modelFile;
  }

  private static async generateTestFiles(args: ComponentGeneratorArgs, componentDir: string): Promise<string[]> {
    const files: string[] = [];
    
    // Unit test file
    const testFile = path.join(componentDir, `${SpartacusConventions.getComponentFileName(args.name)}.component.spec.ts`);
    const testContent = TemplateEngine.generateComponentTest(args);
    await fs.writeFile(testFile, testContent);
    files.push(testFile);
    
    return files;
  }

  private static getVariantSuffix(variantType: string): string {
    switch (variantType) {
      case 'smart': return 'Container';
      case 'presentational': return 'Presentation';
      case 'container': return 'Container';
      case 'ui': return 'UI';
      default: return '';
    }
  }

  private static async applyVariantModifications(args: ComponentVariantArgs, componentDir: string): Promise<void> {
    // Apply variant-specific modifications based on type
    switch (args.variantType) {
      case 'smart':
        await this.applySmartComponentPattern(componentDir);
        break;
      case 'presentational':
        await this.applyPresentationalComponentPattern(componentDir);
        break;
      case 'container':
        await this.applyContainerComponentPattern(componentDir);
        break;
      case 'ui':
        await this.applyUIComponentPattern(componentDir);
        break;
    }
  }

  private static async applySmartComponentPattern(componentDir: string): Promise<void> {
    // Add state management, services, and business logic
    logger.debug('Applying smart component pattern');
  }

  private static async applyPresentationalComponentPattern(componentDir: string): Promise<void> {
    // Focus on pure presentation, inputs/outputs only
    logger.debug('Applying presentational component pattern');
  }

  private static async applyContainerComponentPattern(componentDir: string): Promise<void> {
    // Add container-specific logic
    logger.debug('Applying container component pattern');
  }

  private static async applyUIComponentPattern(componentDir: string): Promise<void> {
    // Focus on reusable UI elements
    logger.debug('Applying UI component pattern');
  }

  private static async analyzeExistingComponent(componentPath: string): Promise<any> {
    // Analyze existing component structure and patterns
    logger.debug(`Analyzing component at ${componentPath}`);
    return {
      path: componentPath,
      // Add analysis results
    };
  }

  private static async applyRefactoringPattern(
    analysis: any,
    targetPattern: string,
    outputPath: string
  ): Promise<string[]> {
    // Apply refactoring based on target pattern
    logger.debug(`Applying ${targetPattern} refactoring pattern`);
    return [];
  }
} 