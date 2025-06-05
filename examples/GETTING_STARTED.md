# Getting Started with Spartacus MCP Framework Examples

Welcome to the comprehensive examples collection for the Spartacus MCP (Model Context Protocol) framework! This guide will help you understand and utilize all the powerful tools available for Spartacus development.

## 📁 Examples Directory Structure

```
examples/
├── README.md                    # Main overview and quick start
├── GETTING_STARTED.md          # This file - detailed getting started guide
├── component-generation/       # Component creation tools (15 tools)
├── service-management/         # Service & state management tools (10 tools)
├── project-analysis/          # Project analysis tools (8 tools)
├── migration-tools/           # Migration and upgrade tools (6 tools)
├── styling-theming/           # Styling and theming tools (8 tools)
├── devops-deployment/         # DevOps and deployment tools (10 tools)
├── cms-content/              # CMS and content management tools (6 tools)
└── testing-quality/          # Testing and quality tools (10 tools)
```

## 🚀 Quick Start Workflow

### 1. Project Analysis (Start Here!)
Before using any other tools, analyze your project to understand its current state:

```json
{
  "tool": "analyze-project-structure",
  "arguments": {
    "projectPath": "./",
    "includeMetrics": true,
    "generateReport": true,
    "outputPath": "./reports/project-analysis.html"
  }
}
```

### 2. Component Generation
Create consistent, well-structured components:

```json
{
  "tool": "create-component",
  "arguments": {
    "name": "ProductCard",
    "outputPath": "./src/app/components/product-card",
    "includeTests": true,
    "includeStorybook": true,
    "styling": "scss"
  }
}
```

### 3. Service Management
Set up robust service architecture:

```json
{
  "tool": "create-facade",
  "arguments": {
    "name": "ProductFacade",
    "outputPath": "./src/app/facades/product",
    "includeStateManagement": true,
    "includeErrorHandling": true
  }
}
```

### 4. Testing Setup
Ensure quality with comprehensive testing:

```json
{
  "tool": "setup-test-environment",
  "arguments": {
    "projectPath": "./",
    "testFrameworks": ["jasmine", "cypress"],
    "coverage": {
      "enabled": true,
      "threshold": 80
    }
  }
}
```

## 🎯 Tool Categories Overview

### 🧩 Component Generation (15 Tools)
**Purpose**: Create consistent, feature-rich components
**Key Tools**: 
- `create-component` - Basic component creation
- `create-smart-component` - State-managed components
- `create-b2b-component` - B2B-specific features
- `create-cms-component` - CMS-enabled components

**When to Use**: 
- Starting new features
- Standardizing component structure
- Adding CMS capabilities
- Creating reusable UI elements

### ⚙️ Service & State Management (10 Tools)
**Purpose**: Build robust service architecture and state management
**Key Tools**:
- `create-service` - Basic service creation
- `create-facade` - Business logic facades
- `setup-ngrx-store` - State management
- `create-api-client` - API integration

**When to Use**:
- Setting up data layer
- Implementing business logic
- Managing application state
- Integrating with APIs

### 📊 Project Analysis (8 Tools)
**Purpose**: Understand and optimize your project
**Key Tools**:
- `analyze-project-structure` - Project overview
- `analyze-dependencies` - Dependency health
- `analyze-performance` - Performance insights
- `analyze-security` - Security assessment

**When to Use**:
- Project health checks
- Before major changes
- Performance optimization
- Security audits

### 🔄 Migration Tools (6 Tools)
**Purpose**: Safely upgrade and migrate your project
**Key Tools**:
- `migrate-spartacus-version` - Version upgrades
- `migrate-angular-version` - Angular updates
- `detect-breaking-changes` - Change analysis
- `generate-migration-plan` - Migration strategy

**When to Use**:
- Upgrading Spartacus versions
- Angular framework updates
- Planning major migrations
- Assessing upgrade impact

### 🎨 Styling & Theming (8 Tools)
**Purpose**: Create beautiful, consistent designs
**Key Tools**:
- `generate-theme` - Custom themes
- `create-design-tokens` - Design systems
- `optimize-scss` - Style optimization
- `create-brand-theme` - Brand-specific styling

**When to Use**:
- Creating custom themes
- Implementing design systems
- Brand customization
- Style optimization

### 🚀 DevOps & Deployment (10 Tools)
**Purpose**: Automate deployment and operations
**Key Tools**:
- `generate-cicd-pipeline` - CI/CD automation
- `create-docker-config` - Containerization
- `setup-performance-monitoring` - Monitoring
- `generate-kubernetes-config` - Orchestration

**When to Use**:
- Setting up CI/CD
- Containerizing applications
- Production deployment
- Performance monitoring

### 📝 CMS & Content Management (6 Tools)
**Purpose**: Manage content and CMS functionality
**Key Tools**:
- `create-cms-component` - CMS components
- `setup-personalization` - Content personalization
- `create-page-template` - Page layouts
- `manage-content-catalog` - Content organization

**When to Use**:
- Building CMS features
- Content personalization
- Page template creation
- Content management

### 🧪 Testing & Quality (10 Tools)
**Purpose**: Ensure code quality and reliability
**Key Tools**:
- `generate-unit-tests` - Unit testing
- `generate-e2e-tests` - End-to-end testing
- `run-quality-checks` - Code quality
- `create-accessibility-tests` - Accessibility

**When to Use**:
- Setting up testing
- Quality assurance
- Accessibility compliance
- Performance testing

## 📋 Common Usage Patterns

### 🏗️ New Project Setup
1. **Analyze** existing structure
2. **Generate** core components
3. **Set up** services and state management
4. **Configure** testing environment
5. **Implement** CI/CD pipeline

### 🔧 Feature Development
1. **Create** feature components
2. **Generate** supporting services
3. **Add** unit and E2E tests
4. **Style** with design tokens
5. **Integrate** with CMS if needed

### 📈 Project Optimization
1. **Analyze** performance and dependencies
2. **Optimize** bundle size and styles
3. **Update** testing coverage
4. **Enhance** accessibility
5. **Monitor** production metrics

### 🚀 Production Deployment
1. **Run** quality checks
2. **Generate** deployment configs
3. **Set up** monitoring
4. **Configure** security scanning
5. **Deploy** with CI/CD pipeline

## 💡 Best Practices

### 🎯 Tool Selection
- **Start with analysis** tools to understand current state
- **Use component generators** for consistency
- **Implement testing** early in development
- **Set up CI/CD** before production deployment

### 📝 Configuration Management
- **Use consistent naming** conventions across tools
- **Store configurations** in version control
- **Document tool usage** for team members
- **Review and update** configurations regularly

### 🔄 Workflow Integration
- **Integrate tools** into development workflow
- **Automate repetitive tasks** with scripts
- **Set up quality gates** in CI/CD pipeline
- **Monitor tool effectiveness** and adjust as needed

### 👥 Team Collaboration
- **Share configurations** across team members
- **Document tool decisions** and rationale
- **Train team** on tool usage
- **Establish code review** processes

## 🔧 Tool Configuration Tips

### JSON Structure
All tools use consistent JSON structure:
```json
{
  "tool": "tool-name",
  "arguments": {
    "parameter1": "value1",
    "parameter2": "value2"
  }
}
```

### Common Parameters
- `projectPath`: Usually `"./"` for current directory
- `outputPath`: Where to generate files
- `includeTests`: Boolean for test generation
- `generateReport`: Boolean for report creation

### Parameter Validation
- **Required parameters** must be provided
- **Optional parameters** have sensible defaults
- **Path parameters** support relative and absolute paths
- **Boolean parameters** default to `false` unless specified

## 📚 Learning Path

### Beginner (New to Spartacus)
1. Start with **Project Analysis** examples
2. Learn **Component Generation** basics
3. Understand **Service Management** patterns
4. Set up basic **Testing** environment

### Intermediate (Some Spartacus Experience)
1. Explore **Advanced Component** patterns
2. Implement **State Management** with NgRx
3. Set up **CI/CD Pipeline** automation
4. Create **Custom Themes** and styling

### Advanced (Experienced Developer)
1. Master **Migration Tools** for upgrades
2. Implement **Performance Monitoring**
3. Set up **Comprehensive Testing** suites
4. Build **Custom CMS** solutions

## 🆘 Troubleshooting

### Common Issues
1. **Path Resolution**: Use absolute paths if relative paths fail
2. **Permission Errors**: Ensure write permissions for output directories
3. **Dependency Conflicts**: Run dependency analysis before major changes
4. **Configuration Errors**: Validate JSON syntax and required parameters

### Getting Help
1. Check the specific tool's README for detailed examples
2. Review the JSON schema for parameter validation
3. Use project analysis tools to understand current state
4. Start with basic examples before advanced configurations

## 🎉 Next Steps

1. **Choose your starting point** based on project needs
2. **Review relevant examples** in detail
3. **Start with simple configurations** and gradually add complexity
4. **Integrate tools** into your development workflow
5. **Share knowledge** with your team

Happy coding with Spartacus MCP Framework! 🚀 