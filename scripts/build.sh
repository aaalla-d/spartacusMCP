#!/bin/bash

# Spartacus MCP Framework Build Script
set -e

echo "🚀 Building Spartacus MCP Framework..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
mkdir -p dist/

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npx tsc

# Copy package.json to dist
echo "📋 Copying package.json..."
cp package.json dist/

# Make the built file executable
echo "🔧 Making executable..."
chmod +x dist/index.js

echo "✅ Build completed successfully!"
echo "📁 Output directory: dist/"
echo "🎯 Entry point: dist/index.js"
echo ""
echo "To run the MCP server:"
echo "  node dist/index.js"
echo ""
echo "To install globally:"
echo "  npm link" 