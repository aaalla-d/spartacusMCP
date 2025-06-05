import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { 
  ListResourcesRequestSchema, 
  ReadResourceRequestSchema, 
  ListToolsRequestSchema, 
  CallToolRequestSchema,
  Tool
} from "@modelcontextprotocol/sdk/types.js";
import { handleToolCall, getProjectAnalysis, getGeneratedFiles } from "./toolHandler.js";

export function setupRequestHandlers(server: Server, tools: Tool[]) {
  // List resources handler
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      {
        uri: "analysis://project",
        mimeType: "application/json",
        name: "Project Analysis Results",
      },
      ...Array.from(getGeneratedFiles().keys()).map(name => ({
        uri: `file://${name}`,
        mimeType: "text/plain",
        name: `Generated File: ${name}`,
      })),
    ],
  }));

  // Read resource handler
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri.toString();

    if (uri === "analysis://project") {
      const analysis = getProjectAnalysis();
      return {
        contents: [{
          uri,
          mimeType: "application/json",
          text: JSON.stringify(analysis, null, 2),
        }],
      };
    }

    if (uri.startsWith("file://")) {
      const name = uri.split("://")[1];
      const fileContent = getGeneratedFiles().get(name);
      if (fileContent) {
        return {
          contents: [{
            uri,
            mimeType: "text/plain",
            text: fileContent,
          }],
        };
      }
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools,
  }));

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    handleToolCall(request.params.name, request.params.arguments ?? {}, server)
  );
} 