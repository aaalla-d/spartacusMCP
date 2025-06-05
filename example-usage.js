#!/usr/bin/env node

/**
 * Example usage of the Spartacus MCP Server
 * 
 * This script demonstrates how to use the MCP server to generate
 * Spartacus components, services, and models.
 */

import { promises as fs } from 'fs';
import * as path from 'path';

// Simulate the MCP server functionality for demonstration
class SpartacusComponentGenerator {
  
  async createComponent(config) {
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
    } = config;

    const kebabName = this.toKebabCase(name);
    const componentDir = path.join(outputPath, kebabName);

    console.log(`Creating Spartacus component: ${name}`);
    console.log(`Output directory: ${componentDir}`);

    // Create directory
    await fs.mkdir(componentDir, { recursive: true });

    // Generate component files
    const files = [];

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

    console.log(`✅ Successfully created component '${name}'`);
    console.log(`📁 Generated files:`);
    files.forEach(file => console.log(`   - ${file}`));
    
    return { componentDir, files };
  }

  generateComponentTs(name, selector, dependencies = []) {
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

  generateComponentHtml(name, selector) {
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

  generateComponentScss(selector) {
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

  generateComponentSpec(name) {
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

  generateModuleTs(name, cmsComponent) {
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

  generateServiceTs(name) {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ${name}Service {
  constructor() {
    // TODO: Implement service logic
  }

  // TODO: Add service methods
}
`;
  }

  generateServiceSpec(name) {
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

  generateModelTs(name) {
    return `/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ${name} {
  // TODO: Add interface properties
}

// TODO: Add additional types and interfaces as needed
`;
  }

  generateIndexTs(name, hasModule, hasService, hasModel) {
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

  toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }
}

// Example usage
async function runExamples() {
  const generator = new SpartacusComponentGenerator();

  console.log('🚀 Spartacus MCP Server - Example Usage\n');

  // Example 1: Create a simple product component
  console.log('📦 Example 1: Creating a Product Rating Component');
  await generator.createComponent({
    name: 'ProductRating',
    selector: 'cx-product-rating',
    category: 'product',
    outputPath: './examples/components',
    hasModule: true,
    hasService: false,
    hasModel: false,
    cmsComponent: 'ProductRatingComponent',
    dependencies: ['Product']
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 2: Create a complex component with service and model
  console.log('📦 Example 2: Creating a Custom Cart Component with Service');
  await generator.createComponent({
    name: 'CustomCart',
    selector: 'cx-custom-cart',
    category: 'cart',
    outputPath: './examples/components',
    hasModule: true,
    hasService: true,
    hasModel: true,
    cmsComponent: 'CustomCartComponent',
    dependencies: ['Cart', 'ActiveCartService']
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 3: Create a user profile component
  console.log('📦 Example 3: Creating a User Profile Component');
  await generator.createComponent({
    name: 'UserProfile',
    selector: 'cx-user-profile',
    category: 'user',
    outputPath: './examples/components',
    hasModule: true,
    hasService: true,
    hasModel: false,
    cmsComponent: 'UserProfileComponent',
    dependencies: ['User', 'UserService']
  });

  console.log('\n✨ All examples completed successfully!');
  console.log('\n📁 Check the ./examples/components directory for generated files.');
  console.log('\n🔧 Next steps:');
  console.log('   1. Review the generated components');
  console.log('   2. Customize the templates and styles');
  console.log('   3. Implement the component logic');
  console.log('   4. Add the components to your Spartacus application');
}

// Run the examples
runExamples().catch(console.error); 