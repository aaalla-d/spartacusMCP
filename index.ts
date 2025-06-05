#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createToolDefinitions } from "./tools.js";
import { setupRequestHandlers } from "./requestHandler.js";
import { initializeLogger } from "./utils/logger.js";

async function runServer() {
  // Initialize logger
  const logger = initializeLogger();
  
  const server = new Server(
    {
      name: "spartacus-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    }
  );

  logger.info("Starting Spartacus MCP Server...");

  // Create tool definitions
  const TOOLS = createToolDefinitions();
  logger.info(`Loaded ${TOOLS.length} tools`);

  // Setup request handlers
  setupRequestHandlers(server, TOOLS);

  // Graceful shutdown logic
  function shutdown() {
    logger.info('Shutdown signal received');
    process.exit(0);
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('exit', shutdown);
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
  });

  // Create transport and connect
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  logger.info("Spartacus MCP Server is running...");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 