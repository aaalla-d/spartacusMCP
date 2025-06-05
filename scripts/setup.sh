#!/bin/bash

# Spartacus MCP Framework Setup Script
set -e

echo "🎯 Setting up Spartacus MCP Framework..."
echo ""

# Check Node.js version
echo "🔍 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

# Create example configuration
echo ""
echo "📝 Creating example configuration..."
mkdir -p examples/configs

cat > examples/configs/mcp-settings.json << 'EOF'
{
  "mcpServers": {
    "spartacus-mcp": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "./",
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
EOF

# Create example usage
cat > examples/example-component.json << 'EOF'
{
  "tool": "generate_component",
  "arguments": {
    "name": "ProductCard",
    "outputPath": "./src/app/components",
    "componentType": "smart",
    "includeTests": true,
    "includeStorybook": true,
    "spartacusFeatures": ["cms", "product"]
  }
}
EOF

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🚀 Next steps:"
echo "  1. Configure your MCP client with the settings in examples/configs/mcp-settings.json"
echo "  2. Start the MCP server: npm start"
echo "  3. Check examples/ directory for usage examples"
echo ""
echo "📚 Documentation: README.md"
echo "🔧 Build script: scripts/build.sh"
echo "🎯 Main entry: dist/index.js" 