import { SpartacusConventions } from './spartacusConventions.js';
import type { ComponentGeneratorArgs } from '../tools/component/index.js';

export class TemplateEngine {
  /**
   * Generate component TypeScript file
   */
  static generateComponent(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.normalizeComponentName(args.name);
    const imports = SpartacusConventions.getRecommendedImports(args.category);
    const translationKey = SpartacusConventions.getTranslationKeyPrefix(args.name);
    
    return `import { ${imports.join(', ')} } from '@angular/core';
${args.category === 'cms' ? "import { CmsComponentData } from '@spartacus/storefront';" : ''}
${args.accessibility ? "import { ICON_TYPE } from '@spartacus/storefront';" : ''}

@Component({
  selector: '${args.selector}',
  templateUrl: './${SpartacusConventions.getComponentFileName(args.name)}.component.html',
  styleUrls: ['./${SpartacusConventions.getComponentFileName(args.name)}.component.scss']
})
export class ${className}Component implements OnInit${args.performance ? ', OnDestroy' : ''} {
${args.category === 'cms' ? `
  constructor(
    protected componentData: CmsComponentData<any>
  ) {}
` : ''}
${args.accessibility ? `
  iconTypes = ICON_TYPE;
` : ''}
${args.performance ? `
  private subscription = new Subscription();
` : ''}

  ngOnInit(): void {
    // TODO: Implement component initialization logic
    console.log('${className}Component initialized');
  }
${args.performance ? `
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
` : ''}
}`;
  }

  /**
   * Generate component HTML template
   */
  static generateTemplate(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.getSCSSClassPrefix(args.name);
    const translationKey = SpartacusConventions.getTranslationKeyPrefix(args.name);
    
    return `<div class="${className}"${args.accessibility ? ' role="region" [attr.aria-label]="\'${translationKey}.title\' | cxTranslate"' : ''}>
  <div class="${className}__header">
    <h2 class="${className}__title"${args.accessibility ? ' id="' + args.name.toLowerCase() + '-title"' : ''}>
      {{ '${translationKey}.title' | cxTranslate }}
    </h2>
  </div>
  
  <div class="${className}__content"${args.accessibility ? ' [attr.aria-labelledby]="' + args.name.toLowerCase() + '-title"' : ''}>
    <p class="${className}__description">
      {{ '${translationKey}.description' | cxTranslate }}
    </p>
    
    <!-- TODO: Add your component content here -->
    <div class="${className}__body">
      <p>{{ '${translationKey}.placeholder' | cxTranslate }}</p>
    </div>
  </div>
  
  ${args.accessibility ? `<div class="${className}__actions" role="group" [attr.aria-label]="'${translationKey}.actions' | cxTranslate">
    <!-- TODO: Add action buttons here -->
  </div>` : ''}
</div>`;
  }

  /**
   * Generate component SCSS styles
   */
  static generateStyles(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.getSCSSClassPrefix(args.name);
    
    return `@import '~@spartacus/styles/scss/theme';
@import '~@spartacus/styles/scss/mixins';

.${className} {
  @include media-breakpoint-down(md) {
    padding: var(--cx-padding, 1rem);
  }

  &__header {
    margin-bottom: var(--cx-margin, 1.5rem);
    
    @include media-breakpoint-down(sm) {
      margin-bottom: var(--cx-margin, 1rem);
    }
  }

  &__title {
    @include type-style('heading', 2);
    color: var(--cx-color-text);
    margin: 0;
    
    @include media-breakpoint-down(sm) {
      @include type-style('heading', 3);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--cx-margin, 1rem);
  }

  &__description {
    @include type-style('body');
    color: var(--cx-color-text-secondary);
    margin: 0;
  }

  &__body {
    background: var(--cx-color-background);
    border: 1px solid var(--cx-color-border);
    border-radius: var(--cx-border-radius);
    padding: var(--cx-padding, 1rem);
    
    @include media-breakpoint-down(sm) {
      padding: var(--cx-padding, 0.75rem);
    }
  }
${args.accessibility ? `
  &__actions {
    display: flex;
    gap: var(--cx-margin, 0.5rem);
    margin-top: var(--cx-margin, 1rem);
    
    @include media-breakpoint-down(sm) {
      flex-direction: column;
    }
  }
` : ''}
${args.responsive ? `
  // Responsive breakpoints
  @include media-breakpoint-up(lg) {
    &__content {
      flex-direction: row;
      align-items: flex-start;
    }
    
    &__body {
      flex: 1;
    }
  }
` : ''}
${args.performance ? `
  // Performance optimizations
  &__content {
    contain: layout style;
  }
  
  &__body {
    will-change: transform;
  }
` : ''}
}`;
  }

  /**
   * Generate component module
   */
  static generateModule(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.normalizeComponentName(args.name);
    const moduleName = SpartacusConventions.getModuleName(args.name);
    
    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';

import { ${className}Component } from './${SpartacusConventions.getComponentFileName(args.name)}.component';

@NgModule({
  declarations: [
    ${className}Component
  ],
  imports: [
    CommonModule,
    I18nModule,${args.accessibility ? '\n    IconModule,' : ''}
  ],
  exports: [
    ${className}Component
  ]
})
export class ${moduleName} { }`;
  }

  /**
   * Generate component service
   */
  static generateService(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.normalizeComponentName(args.name);
    const serviceName = SpartacusConventions.getServiceName(args.name);
    
    return `import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ${serviceName} {
  
  constructor() { }

  /**
   * Get ${args.name.toLowerCase()} data
   */
  get${className}Data(): Observable<any> {
    // TODO: Implement service logic
    return of({
      id: '${args.name.toLowerCase()}',
      title: '${className} Title',
      description: '${className} Description'
    });
  }

  /**
   * Update ${args.name.toLowerCase()} data
   */
  update${className}Data(data: any): Observable<any> {
    // TODO: Implement update logic
    return of(data);
  }
}`;
  }

  /**
   * Generate component model interfaces
   */
  static generateModel(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.normalizeComponentName(args.name);
    const modelName = SpartacusConventions.getModelName(args.name);
    
    return `export interface ${modelName} {
  id: string;
  title?: string;
  description?: string;
  // TODO: Add your model properties here
}

export interface ${className}Config {
  enabled: boolean;
  // TODO: Add configuration properties
}

export interface ${className}State {
  loading: boolean;
  error?: string;
  data?: ${modelName};
}`;
  }

  /**
   * Generate component unit test
   */
  static generateComponentTest(args: ComponentGeneratorArgs): string {
    const className = SpartacusConventions.normalizeComponentName(args.name);
    
    return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ${className}Component } from './${SpartacusConventions.getComponentFileName(args.name)}.component';

describe('${className}Component', () => {
  let component: ${className}Component;
  let fixture: ComponentFixture<${className}Component>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${className}Component ],
      imports: [ I18nTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${className}Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component title', () => {
    const titleElement = debugElement.query(By.css('.${SpartacusConventions.getSCSSClassPrefix(args.name)}__title'));
    expect(titleElement).toBeTruthy();
  });

  it('should initialize component on ngOnInit', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('${className}Component initialized');
  });
${args.performance ? `
  it('should clean up subscriptions on destroy', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
` : ''}
});`;
  }

  /**
   * Generate i18n translation keys
   */
  static generateTranslationKeys(args: ComponentGeneratorArgs): Record<string, any> {
    const translationKey = SpartacusConventions.getTranslationKeyPrefix(args.name);
    
    return {
      [translationKey]: {
        title: `${args.name} Title`,
        description: `${args.name} Description`,
        placeholder: `${args.name} placeholder content`,
        actions: `${args.name} actions`
      }
    };
  }
} 