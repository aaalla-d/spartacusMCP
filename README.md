# Spartacus MCP Server

A Model Context Protocol (MCP) server that provides tools for creating custom components in SAP Spartacus following established patterns and conventions.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MCP-compatible client** such as:
  - [Claude Desktop](https://claude.ai/desktop)
  - [Cline VS Code Extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd spartacus-mcp-server

# Install dependencies and build
npm run setup

# Start the server
npm start
```

## 🔧 MCP Client Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "spartacus-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/spartacus-mcp-server/dist/spartacus-mcp-server.js"],
      "env": {}
    }
  }
}
```

### Cline VS Code Extension

Add to your Cline settings:

```json
{
  "cline.mcp.servers": [
    {
      "name": "spartacus-mcp",
      "command": "node",
      "args": ["/absolute/path/to/spartacus-mcp-server/dist/spartacus-mcp-server.js"]
    }
  ]
}
```

## 🛠️ Available Tools

### 1. Create Spartacus Component

**Tool:** `create_spartacus_component`

Creates a complete Spartacus component with all necessary files.

```json
{
  "name": "ProductIntro",
  "selector": "cx-product-intro",
  "category": "product",
  "outputPath": "./src/app/components",
  "hasModule": true,
  "hasService": false,
  "hasModel": false,
  "cmsComponent": "ProductIntroComponent",
  "dependencies": ["ProductService"]
}
```

**Generated Files:**
- Component TypeScript, HTML, SCSS, and spec files
- Angular module (optional)
- Service and spec files (optional)
- TypeScript model (optional)
- Index file with exports

### 2. Analyze Spartacus Structure

**Tool:** `analyze_spartacus_structure`

Analyzes your Spartacus project structure and provides insights.

```json
{
  "projectPath": "./my-spartacus-project"
}
```

### 3. Generate Spartacus Service

**Tool:** `generate_spartacus_service`

Creates a Spartacus service following established patterns.

```json
{
  "name": "ProductDataService",
  "outputPath": "./src/app/services",
  "injectable": true,
  "dependencies": ["HttpClient", "ConfigService"]
}
```

### 4. Create Spartacus Model

**Tool:** `create_spartacus_model`

Creates TypeScript interfaces and models.

```json
{
  "name": "ProductData",
  "outputPath": "./src/app/models",
  "properties": {
    "id": "string",
    "name": "string",
    "price": "number"
  },
  "extends": "BaseProduct"
}
```

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete setup and configuration instructions
- **[Example Usage](example-usage.md)** - Real-world scenarios and code examples
- **[Examples Directory](examples/)** - Comprehensive tool examples and patterns

## 🏗️ Generated Code Features

- ✅ Follows Spartacus conventions and best practices
- ✅ TypeScript strict mode compliance
- ✅ OnPush change detection strategy
- ✅ Internationalization (i18n) ready
- ✅ SCSS with Spartacus design tokens
- ✅ Comprehensive unit tests
- ✅ CMS component configuration
- ✅ Proper dependency injection

## 🔍 Project Structure

```
spartacus-mcp-server/
├── spartacus-mcp-server.ts     # Main MCP server
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── DEPLOYMENT_GUIDE.md        # Detailed setup guide
├── example-usage.md           # Usage examples
├── examples/                  # Tool examples
│   ├── component-generation/  # Component tools
│   ├── service-management/    # Service tools
│   ├── project-analysis/      # Analysis tools
│   └── ...                   # Other categories
└── dist/                     # Compiled JavaScript
```

## 🚀 Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev  # Watch mode
```

### Testing the Server

```bash
# Start the server
npm start

# The server will log: "Spartacus MCP server running on stdio"
```

## 🎯 Use Cases

### Component Development
- Scaffold new Spartacus components
- Generate services and models
- Create CMS component configurations
- Set up proper testing structure

### Project Analysis
- Analyze existing Spartacus projects
- Get version compatibility information
- Receive recommendations for improvements

### Code Generation
- Generate TypeScript interfaces
- Create Angular services
- Build component modules
- Set up proper file structure

## 🔧 Troubleshooting

### Common Issues

1. **Server won't start**: Check Node.js version (18+)
2. **Build errors**: Run `npm run clean && npm run build`
3. **MCP client can't connect**: Verify absolute path in configuration

### Debug Mode

```bash
DEBUG=* npm start
```

## 📄 License

Apache 2.0 License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

**Happy Spartacus Development! 🛍️** 