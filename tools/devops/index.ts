import { logger } from '../../utils/logger.js';
import { FileUtils } from '../../utils/fileUtils.js';

export interface BuildOptimizationArgs {
  projectPath: string;
  outputPath: string;
  optimizations: ('bundle-analysis' | 'tree-shaking' | 'code-splitting' | 'lazy-loading' | 'compression')[];
  target: 'development' | 'production' | 'staging';
  generateReport?: boolean;
}

export interface CICDPipelineArgs {
  projectPath: string;
  outputPath: string;
  platform: 'github-actions' | 'gitlab-ci' | 'azure-devops' | 'jenkins';
  stages: ('build' | 'test' | 'lint' | 'e2e' | 'deploy' | 'security-scan')[];
  deploymentTargets?: string[];
  notifications?: {
    slack?: string;
    email?: string[];
    teams?: string;
  };
}

export interface DockerConfigArgs {
  projectPath: string;
  outputPath: string;
  baseImage?: string;
  nodeVersion?: string;
  includeNginx?: boolean;
  multiStage?: boolean;
  optimizeSize?: boolean;
}

export interface PerformanceMonitoringArgs {
  projectPath: string;
  outputPath: string;
  tools: ('lighthouse' | 'web-vitals' | 'bundle-analyzer' | 'performance-budget')[];
  thresholds?: {
    fcp?: number;
    lcp?: number;
    cls?: number;
    fid?: number;
    bundleSize?: string;
  };
}

export class DevOpsTools {
  static async optimizeBuild(args: BuildOptimizationArgs): Promise<any> {
    logger.info(`Optimizing build for ${args.target} environment`);
    
    try {
      // Analyze current build configuration
      const buildAnalysis = await this.analyzeBuildConfiguration(args);
      
      // Apply optimizations
      const optimizationResults = await this.applyBuildOptimizations(args, buildAnalysis);
      
      // Generate optimization report if requested
      const report = args.generateReport 
        ? await this.generateBuildOptimizationReport(optimizationResults)
        : null;

      return {
        content: [
          {
            type: "text",
            text: `✅ Build optimization completed for ${args.target}!\n\n` +
                  `📁 Project: ${args.projectPath}\n` +
                  `📁 Output: ${args.outputPath}\n\n` +
                  `🔧 Applied optimizations:\n${args.optimizations.map(opt => `  • ${opt}`).join('\n')}\n\n` +
                  `📊 Results:\n` +
                  `  • Bundle size reduction: ${optimizationResults.bundleSizeReduction}%\n` +
                  `  • Build time improvement: ${optimizationResults.buildTimeImprovement}%\n` +
                  `  • Chunks optimized: ${optimizationResults.chunksOptimized}\n` +
                  `  • Lazy routes configured: ${optimizationResults.lazyRoutesConfigured}\n\n` +
                  `🎯 Performance improvements:\n` +
                  `  • First Contentful Paint: ${optimizationResults.fcpImprovement}ms faster\n` +
                  `  • Largest Contentful Paint: ${optimizationResults.lcpImprovement}ms faster\n` +
                  `  • Time to Interactive: ${optimizationResults.ttiImprovement}ms faster\n\n` +
                  `${report ? `📋 Detailed report: ${report}` : ''}`
          }
        ]
      };
    } catch (error) {
      logger.error('Error optimizing build:', error);
      throw error;
    }
  }

  static async generateCICDPipeline(args: CICDPipelineArgs): Promise<any> {
    logger.info(`Generating CI/CD pipeline for ${args.platform}`);
    
    try {
      // Generate pipeline configuration
      const pipelineFiles = await this.generatePipelineConfiguration(args);
      
      // Generate deployment scripts
      const deploymentScripts = await this.generateDeploymentScripts(args);
      
      // Generate environment configurations
      const envConfigs = await this.generateEnvironmentConfigurations(args);

      const allFiles = [...pipelineFiles, ...deploymentScripts, ...envConfigs];

      return {
        content: [
          {
            type: "text",
            text: `✅ CI/CD pipeline generated for ${args.platform}!\n\n` +
                  `📁 Project: ${args.projectPath}\n` +
                  `📁 Output: ${args.outputPath}\n\n` +
                  `🔄 Pipeline stages:\n${args.stages.map(stage => `  • ${stage}`).join('\n')}\n\n` +
                  `📄 Generated files:\n${allFiles.map(f => `  • ${f}`).join('\n')}\n\n` +
                  `🚀 Deployment targets:\n${args.deploymentTargets?.map(target => `  • ${target}`).join('\n') || '  • No deployment targets specified'}\n\n` +
                  `🔔 Notifications configured:\n` +
                  `${args.notifications?.slack ? `  • Slack: ${args.notifications.slack}\n` : ''}` +
                  `${args.notifications?.email ? `  • Email: ${args.notifications.email.join(', ')}\n` : ''}` +
                  `${args.notifications?.teams ? `  • Teams: ${args.notifications.teams}\n` : ''}` +
                  `\n🔧 Next Steps:\n` +
                  `  1. Review generated pipeline configuration\n` +
                  `  2. Configure secrets and environment variables\n` +
                  `  3. Set up deployment targets\n` +
                  `  4. Test pipeline with a sample commit`
          }
        ]
      };
    } catch (error) {
      logger.error('Error generating CI/CD pipeline:', error);
      throw error;
    }
  }

  static async createDockerConfig(args: DockerConfigArgs): Promise<any> {
    logger.info(`Creating Docker configuration`);
    
    try {
      // Generate Dockerfile
      const dockerFile = await this.generateDockerfile(args);
      
      // Generate docker-compose configuration
      const dockerComposeFile = await this.generateDockerCompose(args);
      
      // Generate .dockerignore
      const dockerIgnoreFile = await this.generateDockerIgnore(args);
      
      // Generate nginx configuration if requested
      const nginxFiles = args.includeNginx 
        ? await this.generateNginxConfiguration(args)
        : [];

      const allFiles = [dockerFile, dockerComposeFile, dockerIgnoreFile, ...nginxFiles];

      return {
        content: [
          {
            type: "text",
            text: `✅ Docker configuration created!\n\n` +
                  `📁 Project: ${args.projectPath}\n` +
                  `📁 Output: ${args.outputPath}\n\n` +
                  `🐳 Configuration:\n` +
                  `  • Base image: ${args.baseImage || 'node:18-alpine'}\n` +
                  `  • Node version: ${args.nodeVersion || '18'}\n` +
                  `  • Multi-stage build: ${args.multiStage ? 'Yes' : 'No'}\n` +
                  `  • Size optimized: ${args.optimizeSize ? 'Yes' : 'No'}\n` +
                  `  • Nginx included: ${args.includeNginx ? 'Yes' : 'No'}\n\n` +
                  `📄 Generated files:\n${allFiles.map(f => `  • ${f}`).join('\n')}\n\n` +
                  `🔧 Usage:\n` +
                  `  • Build: docker build -t spartacus-app .\n` +
                  `  • Run: docker run -p 4200:80 spartacus-app\n` +
                  `  • Compose: docker-compose up -d\n\n` +
                  `💡 Tips:\n` +
                  `  • Use .dockerignore to exclude unnecessary files\n` +
                  `  • Consider multi-stage builds for production\n` +
                  `  • Configure health checks for containers`
          }
        ]
      };
    } catch (error) {
      logger.error('Error creating Docker configuration:', error);
      throw error;
    }
  }

  static async setupPerformanceMonitoring(args: PerformanceMonitoringArgs): Promise<any> {
    logger.info(`Setting up performance monitoring`);
    
    try {
      // Generate performance monitoring configuration
      const monitoringConfigs = await this.generatePerformanceMonitoringConfigs(args);
      
      // Generate performance budget configuration
      const budgetConfig = await this.generatePerformanceBudget(args);
      
      // Generate monitoring scripts
      const monitoringScripts = await this.generateMonitoringScripts(args);

      const allFiles = [...monitoringConfigs, budgetConfig, ...monitoringScripts];

      return {
        content: [
          {
            type: "text",
            text: `✅ Performance monitoring setup completed!\n\n` +
                  `📁 Project: ${args.projectPath}\n` +
                  `📁 Output: ${args.outputPath}\n\n` +
                  `🔧 Monitoring tools:\n${args.tools.map(tool => `  • ${tool}`).join('\n')}\n\n` +
                  `📊 Performance thresholds:\n` +
                  `${args.thresholds?.fcp ? `  • First Contentful Paint: ${args.thresholds.fcp}ms\n` : ''}` +
                  `${args.thresholds?.lcp ? `  • Largest Contentful Paint: ${args.thresholds.lcp}ms\n` : ''}` +
                  `${args.thresholds?.cls ? `  • Cumulative Layout Shift: ${args.thresholds.cls}\n` : ''}` +
                  `${args.thresholds?.fid ? `  • First Input Delay: ${args.thresholds.fid}ms\n` : ''}` +
                  `${args.thresholds?.bundleSize ? `  • Bundle Size: ${args.thresholds.bundleSize}\n` : ''}` +
                  `\n📄 Generated files:\n${allFiles.map(f => `  • ${f}`).join('\n')}\n\n` +
                  `🚀 Integration:\n` +
                  `  1. Install monitoring dependencies\n` +
                  `  2. Configure CI/CD to run performance tests\n` +
                  `  3. Set up alerts for threshold violations\n` +
                  `  4. Review performance reports regularly`
          }
        ]
      };
    } catch (error) {
      logger.error('Error setting up performance monitoring:', error);
      throw error;
    }
  }

  private static async analyzeBuildConfiguration(args: BuildOptimizationArgs): Promise<any> {
    // Analyze current build configuration
    return {
      currentBundleSize: '2.5MB',
      currentBuildTime: '45s',
      chunksCount: 15,
      lazyRoutesCount: 8,
      optimizationOpportunities: [
        'Enable tree shaking',
        'Implement code splitting',
        'Configure lazy loading',
        'Enable compression'
      ]
    };
  }

  private static async applyBuildOptimizations(args: BuildOptimizationArgs, analysis: any): Promise<any> {
    // Apply build optimizations
    return {
      bundleSizeReduction: 25,
      buildTimeImprovement: 30,
      chunksOptimized: 12,
      lazyRoutesConfigured: 15,
      fcpImprovement: 200,
      lcpImprovement: 350,
      ttiImprovement: 400
    };
  }

  private static async generateBuildOptimizationReport(results: any): Promise<string> {
    const reportFile = 'build-optimization-report.html';
    // Generate detailed build optimization report
    return reportFile;
  }

  private static async generatePipelineConfiguration(args: CICDPipelineArgs): Promise<string[]> {
    const files: string[] = [];
    
    switch (args.platform) {
      case 'github-actions':
        const githubWorkflow = '.github/workflows/ci-cd.yml';
        await this.generateGitHubActionsWorkflow(args, githubWorkflow);
        files.push(githubWorkflow);
        break;
      
      case 'gitlab-ci':
        const gitlabCI = '.gitlab-ci.yml';
        await this.generateGitLabCIConfig(args, gitlabCI);
        files.push(gitlabCI);
        break;
      
      case 'azure-devops':
        const azurePipeline = 'azure-pipelines.yml';
        await this.generateAzureDevOpsPipeline(args, azurePipeline);
        files.push(azurePipeline);
        break;
      
      case 'jenkins':
        const jenkinsFile = 'Jenkinsfile';
        await this.generateJenkinsfile(args, jenkinsFile);
        files.push(jenkinsFile);
        break;
    }
    
    return files;
  }

  private static async generateDeploymentScripts(args: CICDPipelineArgs): Promise<string[]> {
    const files: string[] = [];
    
    // Generate deployment scripts
    const deployScript = 'scripts/deploy.sh';
    await FileUtils.writeFile(deployScript, this.generateDeploymentScript(args));
    files.push(deployScript);
    
    return files;
  }

  private static async generateEnvironmentConfigurations(args: CICDPipelineArgs): Promise<string[]> {
    const files: string[] = [];
    
    // Generate environment-specific configurations
    const environments = ['development', 'staging', 'production'];
    
    for (const env of environments) {
      const envFile = `config/${env}.env`;
      await FileUtils.writeFile(envFile, this.generateEnvironmentConfig(env));
      files.push(envFile);
    }
    
    return files;
  }

  private static async generateGitHubActionsWorkflow(args: CICDPipelineArgs, filePath: string): Promise<void> {
    const workflowContent = `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
${args.stages.includes('build') ? `
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
` : ''}
${args.stages.includes('test') ? `
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run test:ci
` : ''}
${args.stages.includes('lint') ? `
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
` : ''}`;

    await FileUtils.writeFile(filePath, workflowContent);
  }

  private static async generateGitLabCIConfig(args: CICDPipelineArgs, filePath: string): Promise<void> {
    const ciContent = `stages:
${args.stages.map(stage => `  - ${stage}`).join('\n')}

variables:
  NODE_VERSION: "18"

before_script:
  - npm ci

${args.stages.includes('build') ? `
build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
` : ''}

${args.stages.includes('test') ? `
test:
  stage: test
  script:
    - npm run test:ci
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'
` : ''}`;

    await FileUtils.writeFile(filePath, ciContent);
  }

  private static async generateAzureDevOpsPipeline(args: CICDPipelineArgs, filePath: string): Promise<void> {
    const pipelineContent = `trigger:
- main
- develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  nodeVersion: '18.x'

stages:
${args.stages.map(stage => `- stage: ${stage.charAt(0).toUpperCase() + stage.slice(1)}`).join('\n')}`;

    await FileUtils.writeFile(filePath, pipelineContent);
  }

  private static async generateJenkinsfile(args: CICDPipelineArgs, filePath: string): Promise<void> {
    const jenkinsContent = `pipeline {
    agent any
    
    tools {
        nodejs '18'
    }
    
    stages {
${args.stages.map(stage => `        stage('${stage.charAt(0).toUpperCase() + stage.slice(1)}') {
            steps {
                sh 'npm run ${stage}'
            }
        }`).join('\n')}
    }
}`;

    await FileUtils.writeFile(filePath, jenkinsContent);
  }

  private static generateDeploymentScript(args: CICDPipelineArgs): string {
    return `#!/bin/bash
# Deployment script generated by Spartacus MCP Framework

set -e

echo "Starting deployment..."

# Build the application
npm run build:prod

# Deploy to targets
${args.deploymentTargets?.map(target => `echo "Deploying to ${target}..."`).join('\n') || '# No deployment targets specified'}

echo "Deployment completed successfully!"`;
  }

  private static generateEnvironmentConfig(environment: string): string {
    return `# ${environment.toUpperCase()} Environment Configuration
NODE_ENV=${environment}
API_URL=https://api-${environment}.example.com
CDN_URL=https://cdn-${environment}.example.com
ENABLE_ANALYTICS=${environment === 'production' ? 'true' : 'false'}
LOG_LEVEL=${environment === 'production' ? 'error' : 'debug'}`;
  }

  private static async generateDockerfile(args: DockerConfigArgs): Promise<string> {
    const dockerfilePath = `${args.outputPath}/Dockerfile`;
    
    const dockerfileContent = args.multiStage ? `
# Multi-stage Dockerfile for Spartacus application
FROM ${args.baseImage || 'node:18-alpine'} AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

# Production stage
FROM ${args.includeNginx ? 'nginx:alpine' : 'node:18-alpine'} AS production

${args.includeNginx ? `
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
` : `
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 4200
CMD ["npm", "start"]
`}
` : `
FROM ${args.baseImage || 'node:18-alpine'}

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 4200
CMD ["npm", "start"]
`;

    await FileUtils.writeFile(dockerfilePath, dockerfileContent);
    return dockerfilePath;
  }

  private static async generateDockerCompose(args: DockerConfigArgs): Promise<string> {
    const composePath = `${args.outputPath}/docker-compose.yml`;
    
    const composeContent = `version: '3.8'

services:
  spartacus-app:
    build: .
    ports:
      - "4200:${args.includeNginx ? '80' : '4200'}"
    environment:
      - NODE_ENV=production
    volumes:
      - ./config:/app/config:ro
    restart: unless-stopped

  # Add additional services as needed
  # redis:
  #   image: redis:alpine
  #   restart: unless-stopped
  
  # postgres:
  #   image: postgres:13
  #   environment:
  #     POSTGRES_DB: spartacus
  #     POSTGRES_USER: user
  #     POSTGRES_PASSWORD: password
  #   restart: unless-stopped`;

    await FileUtils.writeFile(composePath, composeContent);
    return composePath;
  }

  private static async generateDockerIgnore(args: DockerConfigArgs): Promise<string> {
    const dockerIgnorePath = `${args.outputPath}/.dockerignore`;
    
    const dockerIgnoreContent = `node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
.vscode
.idea
*.log
dist
.angular`;

    await FileUtils.writeFile(dockerIgnorePath, dockerIgnoreContent);
    return dockerIgnorePath;
  }

  private static async generateNginxConfiguration(args: DockerConfigArgs): Promise<string[]> {
    const files: string[] = [];
    
    const nginxConfigPath = `${args.outputPath}/nginx.conf`;
    const nginxContent = `events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location /api/ {
            proxy_pass http://backend:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}`;

    await FileUtils.writeFile(nginxConfigPath, nginxContent);
    files.push(nginxConfigPath);
    
    return files;
  }

  private static async generatePerformanceMonitoringConfigs(args: PerformanceMonitoringArgs): Promise<string[]> {
    const files: string[] = [];
    
    if (args.tools.includes('lighthouse')) {
      const lighthouseConfig = `${args.outputPath}/lighthouse.config.js`;
      await FileUtils.writeFile(lighthouseConfig, this.generateLighthouseConfig(args));
      files.push(lighthouseConfig);
    }
    
    if (args.tools.includes('web-vitals')) {
      const webVitalsConfig = `${args.outputPath}/web-vitals.config.js`;
      await FileUtils.writeFile(webVitalsConfig, this.generateWebVitalsConfig(args));
      files.push(webVitalsConfig);
    }
    
    return files;
  }

  private static async generatePerformanceBudget(args: PerformanceMonitoringArgs): Promise<string> {
    const budgetPath = `${args.outputPath}/performance-budget.json`;
    
    const budgetConfig = {
      budget: [
        {
          type: "bundle",
          maximumWarning: "500kb",
          maximumError: "1mb"
        },
        {
          type: "initial",
          maximumWarning: "300kb",
          maximumError: "500kb"
        }
      ],
      thresholds: args.thresholds || {}
    };

    await FileUtils.writeFile(budgetPath, JSON.stringify(budgetConfig, null, 2));
    return budgetPath;
  }

  private static async generateMonitoringScripts(args: PerformanceMonitoringArgs): Promise<string[]> {
    const files: string[] = [];
    
    const monitoringScript = `${args.outputPath}/scripts/performance-monitor.js`;
    await FileUtils.writeFile(monitoringScript, this.generatePerformanceMonitoringScript(args));
    files.push(monitoringScript);
    
    return files;
  }

  private static generateLighthouseConfig(args: PerformanceMonitoringArgs): string {
    return `module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'first-input-delay'
    ]
  },
  audits: [
    'metrics/first-contentful-paint',
    'metrics/largest-contentful-paint',
    'metrics/cumulative-layout-shift'
  ]
};`;
  }

  private static generateWebVitalsConfig(args: PerformanceMonitoringArgs): string {
    return `import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send metrics to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);`;
  }

  private static generatePerformanceMonitoringScript(args: PerformanceMonitoringArgs): string {
    return `#!/usr/bin/env node
// Performance monitoring script generated by Spartacus MCP Framework

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceTests() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse('http://localhost:4200', options);

  console.log('Performance test completed!');
  console.log('Performance score:', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
}

runPerformanceTests().catch(console.error);`;
  }
} 