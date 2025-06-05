# Spartacus MCP Server - Example Usage

This guide shows practical examples of using the Spartacus MCP Server tools.

## 🎯 Real-World Scenarios

### Scenario 1: Building a Product Comparison Feature

Let's create a complete product comparison component:

#### Step 1: Create the Component

```json
{
  "name": "ProductComparison",
  "selector": "cx-product-comparison",
  "category": "product",
  "outputPath": "./src/app/features/product",
  "hasModule": true,
  "hasService": true,
  "hasModel": true,
  "cmsComponent": "ProductComparisonComponent",
  "dependencies": ["ProductService", "ComparisonService"]
}
```

**Result:** Creates a complete component structure with:
- Component class with proper Spartacus imports
- HTML template with i18n support
- SCSS with design tokens
- Angular module with CMS configuration
- Service for comparison logic
- TypeScript models for type safety
- Comprehensive unit tests

#### Step 2: Create the Data Model

```json
{
  "name": "ComparisonData",
  "outputPath": "./src/app/features/product/models",
  "properties": {
    "products": "Product[]",
    "criteria": "ComparisonCriteria[]",
    "maxProducts": "number",
    "isVisible": "boolean"
  },
  "extends": "BaseComparison"
}
```

#### Step 3: Create Additional Service

```json
{
  "name": "ComparisonStorageService",
  "outputPath": "./src/app/features/product/services",
  "injectable": true,
  "dependencies": ["LocalStorageService", "ConfigService"]
}
```

### Scenario 2: Building a User Profile Feature

#### Step 1: Analyze Project Structure

```json
{
  "projectPath": "./my-spartacus-storefront"
}
```

**Expected Output:**
```
📊 Spartacus Project Analysis

📍 Project Path: ./my-spartacus-storefront
🏷️  Spartacus Version: 6.0.0
🅰️  Angular Version: 17.0.0

📁 Project Structure:
{
  "hasPackageJson": true,
  "dependencies": ["@spartacus/core", "@spartacus/storefront", ...],
  "src_app": true,
  "src_assets": true,
  "src_styles": true
}

💡 Recommendations:
  ✅ No issues found

🔍 Analysis completed successfully!
```

#### Step 2: Create User Profile Component

```json
{
  "name": "UserProfile",
  "selector": "cx-user-profile",
  "category": "user",
  "outputPath": "./src/app/features/user",
  "hasModule": true,
  "hasService": true,
  "hasModel": true,
  "cmsComponent": "UserProfileComponent",
  "dependencies": ["UserService", "AuthService", "FormBuilder"]
}
```

#### Step 3: Create Profile Models

```json
{
  "name": "UserProfile",
  "outputPath": "./src/app/features/user/models",
  "properties": {
    "userId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "preferences": "UserPreferences",
    "addresses": "Address[]",
    "paymentMethods": "PaymentMethod[]"
  },
  "extends": "BaseUser"
}
```

### Scenario 3: Building a Custom CMS Component

#### Step 1: Create Banner Component

```json
{
  "name": "PromoBanner",
  "selector": "cx-promo-banner",
  "category": "content",
  "outputPath": "./src/app/cms-components",
  "hasModule": true,
  "hasService": false,
  "hasModel": true,
  "cmsComponent": "PromoBannerComponent",
  "dependencies": ["CmsService", "MediaService"]
}
```

#### Step 2: Create Banner Model

```json
{
  "name": "PromoBannerData",
  "outputPath": "./src/app/cms-components/models",
  "properties": {
    "title": "string",
    "subtitle": "string",
    "backgroundImage": "Media",
    "ctaText": "string",
    "ctaLink": "string",
    "isActive": "boolean",
    "displayOrder": "number"
  },
  "extends": "CmsComponent"
}
```

## 🔧 Generated Code Examples

### Component Example (ProductComparison)

**product-comparison.component.ts:**
```typescript
/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { ComparisonService } from '@spartacus/core';

@Component({
  selector: 'cx-product-comparison',
  templateUrl: './product-comparison.component.html',
  styleUrls: ['./product-comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComparisonComponent {
  constructor() {
    // TODO: Implement component logic
  }

  // TODO: Add component methods
}
```

**product-comparison.component.html:**
```html
<!--
  SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
  SPDX-License-Identifier: Apache-2.0
-->

<div class="product-comparison">
  <h2>{{ 'productcomparison.title' | cxTranslate }}</h2>
  
  <!-- TODO: Add component template -->
  <p>{{ 'productcomparison.description' | cxTranslate }}</p>
</div>
```

**product-comparison.module.ts:**
```typescript
/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule } from '@spartacus/core';
import { ProductComparisonComponent } from './product-comparison.component';

import { CmsConfig } from '@spartacus/core';

const cmsComponents: CmsConfig = {
  cmsComponents: {
    ProductComparisonComponent: {
      component: ProductComparisonComponent,
    },
  },
};

@NgModule({
  declarations: [ProductComparisonComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(cmsComponents),
  ],
  exports: [ProductComparisonComponent],
})
export class ProductComparisonModule {}
```

### Service Example (ComparisonStorageService)

**comparison-storage-service.service.ts:**
```typescript
/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LocalStorageService } from '@spartacus/core';
import { ConfigService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ComparisonStorageServiceService {
  constructor() {
    // TODO: Inject dependencies
  }

  // TODO: Add service methods
}
```

### Model Example (ComparisonData)

**comparison-data.model.ts:**
```typescript
/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComparisonData extends BaseComparison {
  products: Product[];
  criteria: ComparisonCriteria[];
  maxProducts: number;
  isVisible: boolean;
}
```

## 🎨 Customization Examples

### Adding Custom Styling

After generating a component, you can enhance the SCSS:

```scss
.product-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--cx-spacing-4);
  padding: var(--cx-spacing-4);

  &__header {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: var(--cx-spacing-6);
  }

  &__product {
    border: 1px solid var(--cx-color-border);
    border-radius: var(--cx-border-radius);
    padding: var(--cx-spacing-4);
    background: var(--cx-color-background);

    &:hover {
      box-shadow: var(--cx-box-shadow-hover);
    }
  }
}
```

### Adding Component Logic

Enhance the generated component with real functionality:

```typescript
export class ProductComparisonComponent implements OnInit {
  products$ = this.comparisonService.getComparisonProducts();
  maxProducts = 4;

  constructor(
    private comparisonService: ComparisonService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadComparisonData();
  }

  addProduct(productCode: string): void {
    this.comparisonService.addProduct(productCode);
  }

  removeProduct(productCode: string): void {
    this.comparisonService.removeProduct(productCode);
  }

  clearComparison(): void {
    this.comparisonService.clearAll();
  }

  private loadComparisonData(): void {
    // Implementation
  }
}
```

## 🧪 Testing Examples

### Component Testing

The generated test files provide a starting point:

```typescript
describe('ProductComparisonComponent', () => {
  let component: ProductComparisonComponent;
  let fixture: ComponentFixture<ProductComparisonComponent>;
  let comparisonService: jasmine.SpyObj<ComparisonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ComparisonService', ['getComparisonProducts', 'addProduct']);

    await TestBed.configureTestingModule({
      declarations: [ProductComparisonComponent],
      providers: [
        { provide: ComparisonService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComparisonComponent);
    component = fixture.componentInstance;
    comparisonService = TestBed.inject(ComparisonService) as jasmine.SpyObj<ComparisonService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comparison products on init', () => {
    comparisonService.getComparisonProducts.and.returnValue(of([]));
    component.ngOnInit();
    expect(comparisonService.getComparisonProducts).toHaveBeenCalled();
  });
});
```

## 🚀 Integration Examples

### Adding to App Module

```typescript
import { ProductComparisonModule } from './features/product/product-comparison';

@NgModule({
  imports: [
    // ... other imports
    ProductComparisonModule,
  ],
})
export class AppModule {}
```

### CMS Configuration

```typescript
export const cmsConfig: CmsConfig = {
  cmsComponents: {
    ProductComparisonComponent: {
      component: ProductComparisonComponent,
      data: {
        maxProducts: 4,
        enableFiltering: true,
      },
    },
  },
};
```

### Routing Configuration

```typescript
const routes: Routes = [
  {
    path: 'compare',
    component: ProductComparisonComponent,
    data: {
      cxRoute: 'compare',
    },
  },
];
```

## 📱 Mobile-First Examples

### Responsive Component

```scss
.product-comparison {
  // Mobile first
  display: flex;
  flex-direction: column;
  gap: var(--cx-spacing-2);

  // Tablet
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--cx-spacing-4);
  }

  // Desktop
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🌐 Internationalization Examples

### Adding Translations

After generating components, add translations:

**en/product.json:**
```json
{
  "productcomparison": {
    "title": "Product Comparison",
    "description": "Compare up to 4 products side by side",
    "addProduct": "Add to Compare",
    "removeProduct": "Remove from Compare",
    "clearAll": "Clear All"
  }
}
```

### Using in Templates

```html
<h2>{{ 'productcomparison.title' | cxTranslate }}</h2>
<button (click)="addProduct(product.code)">
  {{ 'productcomparison.addProduct' | cxTranslate }}
</button>
```

---

These examples show how to use the Spartacus MCP Server to quickly scaffold and build production-ready Spartacus components following best practices and conventions. 