#!/bin/bash

# Spartacus MCP Server Setup Script
# This script sets up the development environment for the Spartacus MCP server

set -e

echo "🚀 Setting up Spartacus MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the TypeScript files
echo "🔨 Building TypeScript files..."
npm run build

# Create examples directory if it doesn't exist
mkdir -p examples/components

echo "✅ Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "   1. Start the MCP server: npm start"
echo "   2. Run examples: node example-usage.js"
echo "   3. Check the generated components in examples/components/"
echo ""
echo "📚 Documentation:"
echo "   - README.md: Complete usage guide"
echo "   - example-usage.js: Working examples"
echo ""
echo "🔧 Development:"
echo "   - Edit spartacus-mcp-server.ts to customize the server"
echo "   - Run 'npm run build' after making changes"
echo ""
echo "Happy coding with Spartacus! 🎉" 