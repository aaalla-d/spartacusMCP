# Spartacus MCP Server

A Model Context Protocol (MCP) server that provides tools for generating SAP Commerce Cloud Spartacus storefront components, themes, and complete e-commerce implementations.

## ⚠️ **Important: Example Files**

The `example-usage/` directory contains **template files** that demonstrate the MCP server's capabilities. These files:

- **Are not meant to be compiled directly** - they're examples and templates
- **Have commented-out imports** to prevent compile-time errors
- **Require proper Angular/Spartacus setup** to use in real projects
- **Should be copied and adapted** to your specific project needs

See `example-usage/README.md` for detailed usage instructions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- An MCP-compatible client (Claude Desktop, Cline, etc.)

### Installation

1. **Clone and setup:**
```bash
git clone <repository-url>
cd spartacus-mcp-server
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Configure your MCP client** (see IDE-specific instructions below)

## 🔧 IDE Integration & Setup

### Cursor IDE (Recommended)

Cursor has excellent built-in MCP support. Here's how to set it up:

1. **Open Cursor Settings:**
   - Press `Cmd/Ctrl + ,` to open settings
   - Search for "MCP" or go to Extensions → MCP

2. **Add MCP Server Configuration:**
   ```json
   {
     "mcp.servers": {
       "spartacus": {
         "command": "node",
         "args": ["/absolute/path/to/spartacus-mcp-server/dist/index.js"],
         "cwd": "/absolute/path/to/spartacus-mcp-server"
       }
     }
   }
   ```

3. **Restart Cursor** and the MCP server will be available in your AI chat

4. **Usage in Cursor:**
   - Open any project or create a new one
   - Start a chat with Claude
   - Use prompts like: "Create a Spartacus product grid component"
   - The MCP tools will be automatically available

### Claude Desktop

1. **Locate your config file:**
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add the server configuration:**
   ```json
   {
     "mcpServers": {
       "spartacus": {
         "command": "node",
         "args": ["/absolute/path/to/spartacus-mcp-server/dist/index.js"]
       }
     }
   }
   ```

3. **Restart Claude Desktop**

### VS Code with Cline Extension

1. **Install the Cline extension** from the VS Code marketplace

2. **Configure Cline:**
   - Open VS Code settings (`Cmd/Ctrl + ,`)
   - Search for "Cline"
   - Add MCP server configuration:

   ```json
   {
     "cline.mcp.servers": [
       {
         "name": "spartacus",
         "command": "node",
         "args": ["/absolute/path/to/spartacus-mcp-server/dist/index.js"]
       }
     ]
   }
   ```

3. **Usage:**
   - Open the Cline panel in VS Code
   - Start a conversation
   - The Spartacus MCP tools will be available

### VS Code with GitHub Copilot Chat

While GitHub Copilot doesn't natively support MCP, you can use it alongside:

1. **Use Cline for MCP functionality** (as above)
2. **Use GitHub Copilot for general coding assistance**
3. **Workflow:**
   - Generate Spartacus components with Cline + MCP
   - Use GitHub Copilot for code completion and refinement
   - Combine both for maximum productivity

### Continue.dev Extension

1. **Install Continue.dev** in VS Code

2. **Configure in `~/.continue/config.json`:**
   ```json
   {
     "models": [...],
     "mcpServers": {
       "spartacus": {
         "command": "node",
         "args": ["/absolute/path/to/spartacus-mcp-server/dist/index.js"]
       }
     }
   }
   ```

### JetBrains IDEs (IntelliJ, WebStorm)

Currently, JetBrains IDEs don't have native MCP support, but you can:

1. **Use external terminal** to run MCP commands
2. **Use Claude Desktop** alongside your JetBrains IDE
3. **Wait for future MCP plugin development**

### Terminal/Command Line Usage

For any environment, you can interact with the MCP server directly:

```bash
# Start the server
npm start

# The server runs on stdio and accepts MCP protocol messages
# You can build custom clients or use existing MCP tools
```

## 🎯 IDE-Specific Workflows

### Cursor Workflow (Recommended)
```
1. Open your Spartacus project in Cursor
2. Start AI chat: "Create a modern product showcase theme"
3. MCP tools automatically generate components
4. Review and customize the generated code
5. Use Cursor's built-in Git integration to commit
```

### VS Code + Cline Workflow
```
1. Open project in VS Code
2. Open Cline panel
3. Request: "Generate a shopping cart component with Spartacus MCP"
4. Use GitHub Copilot for additional code suggestions
5. Leverage VS Code's debugging and testing tools
```

### Claude Desktop Workflow
```
1. Work in any IDE/editor
2. Use Claude Desktop for component generation
3. Copy generated code to your project
4. Continue development in your preferred environment
```

## 🛠️ Available Tools

### Component Generation
- **`create_spartacus_component`** - Generate complete Angular components with TypeScript, HTML, and SCSS
- **`create_spartacus_service`** - Create Angular services with dependency injection
- **`create_spartacus_model`** - Generate TypeScript interfaces and models
- **`create_spartacus_theme`** - Create complete theme implementations with custom styling

### Project Analysis
- **`analyze_spartacus_project`** - Analyze existing Spartacus project structure
- **`get_spartacus_info`** - Get information about Spartacus features and best practices

## 📁 Project Structure

```
spartacus-mcp-server/
├── src/
│   └── spartacus-mcp-server.ts     # Main MCP server implementation
├── example-usage/                   # Complete example implementation
│   ├── README.md                   # Detailed example documentation
│   ├── EXAMPLE_PROMPTS.md          # Sample prompts and usage
│   └── src/
│       ├── app/
│       │   ├── components/         # Main application components
│       │   │   ├── hero-banner/    # Hero banner component
│       │   │   ├── product-grid/   # Product grid component
│       │   │   └── recommendations/ # Recommendations component
│       │   └── shared/             # Shared utilities and form components
│       │       └── shared-components.module.ts
│       ├── styles/
│       │   └── themes/
│       │       └── midnight-green/ # Complete Spartacus theme
│       └── test-theme-demo/        # Visual demo files
├── dist/                           # Compiled TypeScript
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🎨 Example Usage

### Generate a Complete Theme
```
Create a modern e-commerce theme called "Midnight Green" with:
- Dark green (#1a4d3a) primary color
- Modern card-based product grid
- Hero banner with call-to-action
- Responsive design for mobile and desktop
```

### Create Custom Components
```
Generate a product showcase component with:
- Image carousel
- Product details panel
- Add to cart functionality
- Related products section
```

### Build Complete Pages
```
Create a homepage with:
- Hero banner
- Featured products grid
- Category navigation
- Newsletter signup
- Footer with links
```

## 📖 Documentation

- **[Example Usage](./example-usage/README.md)** - Complete theme implementation guide
- **[Example Prompts](./example-usage/EXAMPLE_PROMPTS.md)** - Comprehensive prompt examples
- **[Setup Guide](./setup.sh)** - Automated setup script

## 🔧 Development

### Building the Project
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Code Quality
The generated components follow modern TypeScript and Angular best practices:

- **Type Safety**: All components use proper TypeScript interfaces and types
- **Performance**: OnPush change detection and optimized rendering
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes
- **Maintainability**: Clean code structure with separation of concerns
- **Documentation**: Comprehensive JSDoc comments and usage examples

### Example Component Features
The example components in `example-usage/` demonstrate:

- **Hero Banner Component**:
  - Responsive design with mobile-first approach
  - Configurable themes and layouts
  - Analytics tracking integration
  - Accessibility features (ARIA labels, keyboard navigation)
  - Image optimization and lazy loading

- **Product Grid Component**:
  - Advanced filtering and sorting capabilities
  - Pagination with customizable page sizes
  - Product search and category filtering
  - Shopping cart integration
  - Price formatting and currency support
  - Stock status indicators

- **Shared Components Module**:
  - Reusable form elements and utilities
  - Consistent styling and behavior
  - Proper dependency injection setup

## 🛠️ Troubleshooting IDE Integration

### Common Issues

#### MCP Server Not Found
```bash
# Ensure the server is built
npm run build

# Check the file exists
ls -la dist/index.js

# Use absolute paths in configuration
pwd  # Get current directory
```

#### Permission Issues (macOS/Linux)
```bash
# Make the script executable
chmod +x dist/index.js

# Check Node.js permissions
which node
node --version
```

#### Windows Path Issues
```json
// Use forward slashes or escaped backslashes
{
  "command": "node",
  "args": ["C:/path/to/spartacus-mcp-server/dist/index.js"]
}
```

#### Server Won't Start
```bash
# Check for port conflicts
lsof -i :3000

# Run with debug output
DEBUG=* npm start

# Check Node.js version
node --version  # Should be 18+
```

### IDE-Specific Troubleshooting

#### Cursor Issues
- **MCP not appearing:** Restart Cursor completely
- **Tools not working:** Check the Output panel for MCP logs
- **Configuration not loading:** Verify JSON syntax in settings

#### VS Code + Cline Issues
- **Extension not found:** Install from marketplace: `ms-vscode.vscode-cline`
- **MCP not connecting:** Check VS Code Developer Tools console
- **Commands not available:** Restart VS Code and reload window

#### Claude Desktop Issues
- **Config file not found:** Create the directory structure manually
- **Server not starting:** Check the Claude Desktop logs in the app menu
- **JSON syntax errors:** Validate your configuration with a JSON validator

### Performance Tips

#### For Large Projects
```json
{
  "mcp.servers": {
    "spartacus": {
      "command": "node",
      "args": ["--max-old-space-size=4096", "/path/to/dist/index.js"]
    }
  }
}
```

#### For Development
```bash
# Use development mode for faster iteration
npm run dev

# Watch for changes
npm run watch
```

## 💡 Pro Tips for IDE Usage

### Cursor Pro Tips
- **Use project context:** Open your Spartacus project first for better suggestions
- **Combine with Composer:** Use Cursor's Composer feature with MCP tools
- **Keyboard shortcuts:** Set up custom shortcuts for common MCP commands
- **Multi-file editing:** Generate multiple components at once

### VS Code Pro Tips
- **Split terminals:** Run MCP server in one terminal, development server in another
- **Workspace settings:** Save MCP configuration per workspace
- **Extension combinations:** Use with Angular Language Service for better IntelliSense
- **Debugging:** Use VS Code's debugger with generated components

### General Workflow Tips
1. **Start with themes:** Generate a complete theme first, then customize
2. **Use example prompts:** Copy from `example-usage/EXAMPLE_PROMPTS.md`
3. **Iterate quickly:** Generate, test, refine with MCP tools
4. **Version control:** Commit generated code to track changes
5. **Documentation:** Use MCP to generate component documentation

## 🔗 IDE Extensions & Plugins

### Recommended Extensions for Spartacus Development

#### VS Code
- **Angular Language Service** - Enhanced Angular support
- **Cline** - MCP integration
- **GitLens** - Git integration
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **SCSS IntelliSense** - SCSS support

#### Cursor
- **Built-in Claude integration** - No additional setup needed
- **Git integration** - Built-in version control
- **TypeScript support** - Native TypeScript features

### Future IDE Support

We're working on plugins for:
- **JetBrains IDEs** (WebStorm, IntelliJ)
- **Vim/Neovim** with MCP support
- **Emacs** with language server integration
- **Sublime Text** with custom plugins

## 🌟 Features

- **Complete Theme Generation** - Full Spartacus themes with custom styling
- **Component Library** - Reusable Angular components
- **Responsive Design** - Mobile-first, responsive layouts
- **TypeScript Support** - Full type safety and IntelliSense
- **SCSS Styling** - Modern CSS with variables and mixins
- **Accessibility** - WCAG compliant components
- **Performance Optimized** - Lazy loading and efficient rendering
- **Production Ready** - Enterprise-grade code quality

## 🎯 Use Cases

### Component Generation
- **Hero Banners**: Responsive banners with CTAs, background images, and themes
- **Product Grids**: Configurable product displays with filtering and sorting
- **Navigation**: Breadcrumbs, menus, and navigation components
- **Forms**: Contact forms, search bars, and user input components
- **Content**: Carousels, testimonials, and content blocks

### Theme Development
- **Color Schemes**: Generate complete color palettes with accessibility compliance
- **Typography**: Custom font stacks and responsive typography scales
- **Layout**: Grid systems, spacing, and responsive breakpoints
- **Components**: Styled components matching your brand guidelines

### Code Quality Features
- **TypeScript**: Fully typed components with proper interfaces
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Performance**: Optimized images, lazy loading, and efficient rendering
- **Testing**: Component tests and integration examples
- **Documentation**: Comprehensive JSDoc comments and usage examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions and support, please open an issue in the repository. 