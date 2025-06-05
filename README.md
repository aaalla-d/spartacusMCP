# Spartacus MCP Server

A Model Context Protocol (MCP) server for creating custom components in SAP Spartacus following established patterns and conventions.

## Overview

This MCP server provides tools to help developers create Spartacus components, services, and models that follow the SAP Spartacus coding standards and architectural patterns. It analyzes the existing Spartacus codebase structure and generates new components with proper file organization, naming conventions, and boilerplate code.

## Features

- **Component Generation**: Create complete Spartacus components with TypeScript, HTML, SCSS, and test files
- **Service Generation**: Generate Angular services following Spartacus patterns
- **Model Creation**: Create TypeScript interfaces and models
- **Project Analysis**: Analyze existing Spartacus project structure
- **CMS Integration**: Automatic CMS component configuration
- **Testing Support**: Generate unit test files with proper setup

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd spartacus-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

## Usage

### Starting the Server

```bash
npm start
```

### Available Tools

#### 1. create_spartacus_component

Creates a new Spartacus component with all necessary files.

**Parameters:**
- `name` (required): Component name in PascalCase (e.g., "ProductIntro")
- `selector` (required): Component selector (e.g., "cx-product-intro")
- `category` (required): Component category (product, user, content, navigation, etc.)
- `outputPath` (required): Output directory path
- `hasModule` (optional): Whether to create a module file (default: true)
- `hasService` (optional): Whether to create a service file (default: false)
- `hasModel` (optional): Whether to create a model file (default: false)
- `cmsComponent` (optional): CMS component name for configuration
- `dependencies` (optional): Additional dependencies to import

**Example:**
```json
{
  "name": "CustomProductCard",
  "selector": "cx-custom-product-card",
  "category": "product",
  "outputPath": "./src/app/components",
  "hasModule": true,
  "hasService": true,
  "cmsComponent": "CustomProductCardComponent",
  "dependencies": ["Product", "CurrentProductService"]
}
```

#### 2. analyze_spartacus_structure

Analyzes the Spartacus project structure and provides insights.

**Parameters:**
- `projectPath` (required): Path to the Spartacus project

**Example:**
```json
{
  "projectPath": "./spartacus"
}
```

#### 3. generate_spartacus_service

Generates a Spartacus service following established patterns.

**Parameters:**
- `name` (required): Service name in PascalCase
- `outputPath` (required): Output directory path
- `injectable` (optional): Whether the service should be injectable (default: true)
- `dependencies` (optional): Service dependencies

**Example:**
```json
{
  "name": "CustomProductService",
  "outputPath": "./src/app/services",
  "injectable": true,
  "dependencies": ["HttpClient", "OccEndpointsService"]
}
```

#### 4. create_spartacus_model

Creates TypeScript interfaces and models for Spartacus.

**Parameters:**
- `name` (required): Model name in PascalCase
- `outputPath` (required): Output directory path
- `properties` (optional): Model properties with their types
- `extends` (optional): Interface to extend from

**Example:**
```json
{
  "name": "CustomProduct",
  "outputPath": "./src/app/models",
  "properties": {
    "customField": "string",
    "additionalData": "any"
  },
  "extends": "Product"
}
```

## Generated File Structure

When creating a component, the following files are generated:

```
custom-component/
├── custom-component.component.ts      # Component class
├── custom-component.component.html    # Template
├── custom-component.component.scss    # Styles
├── custom-component.component.spec.ts # Unit tests
├── custom-component.module.ts         # Angular module (if hasModule: true)
├── custom-component.service.ts        # Service (if hasService: true)
├── custom-component.service.spec.ts   # Service tests (if hasService: true)
├── custom-component.model.ts          # Models (if hasModel: true)
└── index.ts                          # Barrel export
```

## Spartacus Conventions

The generated code follows these Spartacus conventions:

### File Naming
- Components: `kebab-case.component.ts`
- Services: `kebab-case.service.ts`
- Models: `kebab-case.model.ts`
- Modules: `kebab-case.module.ts`

### Class Naming
- Components: `PascalCaseComponent`
- Services: `PascalCaseService`
- Interfaces: `PascalCase`

### Component Structure
- Uses OnPush change detection strategy
- Includes proper SPDX license headers
- Follows Spartacus import patterns
- Uses Spartacus design tokens in SCSS
- Includes i18n support with `cxTranslate` pipe

### Module Configuration
- Includes CMS component configuration when specified
- Imports necessary Spartacus modules
- Provides proper default configuration

## Integration with Spartacus

### Adding to Feature Libraries

Place generated components in feature libraries for better organization:

```
feature-libs/
└── my-feature/
    ├── components/
    │   └── custom-component/
    ├── services/
    └── models/
```

### CMS Component Registration

When using the `cmsComponent` parameter, the generated module includes:

```typescript
provideDefaultConfig(<CmsConfig>{
  cmsComponents: {
    CustomComponentName: {
      component: CustomComponent,
    },
  },
})
```

### Styling with Design Tokens

Generated SCSS files use Spartacus design tokens:

```scss
@import '@spartacus/styles/scss/theme';

.component-class {
  h2 {
    @include type-style('heading', 2);
    margin-bottom: var(--cx-margin, 1rem);
  }
  
  p {
    @include type-style('body');
    color: var(--cx-color-text);
  }
}
```

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Project Structure

```
├── spartacus-mcp-server.ts    # Main MCP server implementation
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # This file
└── spartacus/                # Cloned Spartacus repository
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.

## Related Resources

- [SAP Spartacus Documentation](https://sap.github.io/spartacus-docs/)
- [Spartacus GitHub Repository](https://github.com/SAP/spartacus)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Angular Style Guide](https://angular.io/guide/styleguide)

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed with `npm install`
2. **Permission errors**: Check file permissions in the output directory
3. **Invalid component names**: Use PascalCase for component names and kebab-case for selectors

### Getting Help

- Check the [Spartacus documentation](https://sap.github.io/spartacus-docs/)
- Review existing components in the Spartacus codebase for patterns
- Open an issue in this repository for bugs or feature requests 