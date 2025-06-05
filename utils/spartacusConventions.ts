export class SpartacusConventions {
  /**
   * Normalize component name to PascalCase
   */
  static normalizeComponentName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  /**
   * Normalize selector to kebab-case with cx- prefix
   */
  static normalizeSelector(selector: string): string {
    // Remove existing prefixes
    let normalized = selector.replace(/^(cx-|app-|)/, '');
    
    // Convert to kebab-case
    normalized = normalized
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    // Add cx- prefix for Spartacus components
    return `cx-${normalized}`;
  }

  /**
   * Generate selector from component name
   */
  static generateSelector(componentName: string): string {
    const kebabCase = componentName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    return `cx-${kebabCase}`;
  }

  /**
   * Get component directory name (kebab-case)
   */
  static getComponentDirectoryName(componentName: string): string {
    return componentName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
  }

  /**
   * Get component file name (kebab-case)
   */
  static getComponentFileName(componentName: string): string {
    return this.getComponentDirectoryName(componentName);
  }

  /**
   * Get service name with Service suffix
   */
  static getServiceName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Service') ? normalized : `${normalized}Service`;
  }

  /**
   * Get module name with Module suffix
   */
  static getModuleName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Module') ? normalized : `${normalized}Module`;
  }

  /**
   * Get model interface name
   */
  static getModelName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Model') ? normalized : `${normalized}Model`;
  }

  /**
   * Get facade name with Facade suffix
   */
  static getFacadeName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Facade') ? normalized : `${normalized}Facade`;
  }

  /**
   * Get adapter name with Adapter suffix
   */
  static getAdapterName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Adapter') ? normalized : `${normalized}Adapter`;
  }

  /**
   * Get connector name with Connector suffix
   */
  static getConnectorName(baseName: string): string {
    const normalized = this.normalizeComponentName(baseName);
    return normalized.endsWith('Connector') ? normalized : `${normalized}Connector`;
  }

  /**
   * Get feature module path structure
   */
  static getFeatureModulePath(featureName: string): string {
    const kebabCase = featureName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    return `features/${kebabCase}`;
  }

  /**
   * Get shared module path structure
   */
  static getSharedModulePath(moduleName: string): string {
    const kebabCase = moduleName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    return `shared/${kebabCase}`;
  }

  /**
   * Get core module path structure
   */
  static getCoreModulePath(moduleName: string): string {
    const kebabCase = moduleName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    return `core/${kebabCase}`;
  }

  /**
   * Get CMS component type name
   */
  static getCMSComponentType(componentName: string): string {
    const normalized = this.normalizeComponentName(componentName);
    return `${normalized}Component`;
  }

  /**
   * Get translation key prefix
   */
  static getTranslationKeyPrefix(componentName: string): string {
    const kebabCase = this.getComponentDirectoryName(componentName);
    return kebabCase.replace(/-/g, '.');
  }

  /**
   * Get SCSS class prefix
   */
  static getSCSSClassPrefix(componentName: string): string {
    const kebabCase = this.getComponentDirectoryName(componentName);
    return `cx-${kebabCase}`;
  }

  /**
   * Validate component name
   */
  static validateComponentName(name: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!name || name.trim().length === 0) {
      errors.push('Component name cannot be empty');
    }
    
    if (name.length < 2) {
      errors.push('Component name must be at least 2 characters long');
    }
    
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
      errors.push('Component name must start with a letter and contain only letters and numbers');
    }
    
    if (name.toLowerCase().includes('component')) {
      errors.push('Component name should not include "Component" suffix');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate selector
   */
  static validateSelector(selector: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!selector || selector.trim().length === 0) {
      errors.push('Selector cannot be empty');
    }
    
    if (!/^[a-z][a-z0-9-]*$/.test(selector)) {
      errors.push('Selector must be in kebab-case and start with a letter');
    }
    
    if (!selector.startsWith('cx-') && !selector.startsWith('app-')) {
      errors.push('Selector should start with "cx-" for Spartacus components or "app-" for custom components');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get recommended imports for component category
   */
  static getRecommendedImports(category: string): string[] {
    const baseImports = [
      'Component',
      'OnInit',
      'OnDestroy'
    ];

    const categoryImports: Record<string, string[]> = {
      'cms': ['CmsComponentData', 'CmsComponent'],
      'product': ['Product', 'ProductService'],
      'user': ['User', 'UserService'],
      'cart': ['Cart', 'CartService'],
      'checkout': ['CheckoutService', 'PaymentDetails'],
      'navigation': ['NavigationService', 'NavigationNode']
    };

    return [...baseImports, ...(categoryImports[category] || [])];
  }

  /**
   * Get recommended Spartacus dependencies for category
   */
  static getRecommendedDependencies(category: string): string[] {
    const baseDependencies = ['@spartacus/core', '@spartacus/storefront'];
    
    const categoryDependencies: Record<string, string[]> = {
      'cms': ['@spartacus/cms'],
      'product': ['@spartacus/product'],
      'user': ['@spartacus/user'],
      'cart': ['@spartacus/cart'],
      'checkout': ['@spartacus/checkout'],
      'navigation': ['@spartacus/storefront']
    };

    return [...baseDependencies, ...(categoryDependencies[category] || [])];
  }
} 