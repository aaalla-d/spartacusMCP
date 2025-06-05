# Project Analysis Examples

This directory contains examples for all project analysis tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **analyze-project-structure** - Project structure analysis
2. **analyze-dependencies** - Dependency analysis and optimization
3. **analyze-performance** - Performance analysis and recommendations
4. **analyze-code-quality** - Code quality assessment
5. **analyze-security** - Security vulnerability analysis
6. **analyze-bundle-size** - Bundle size analysis
7. **generate-migration-plan** - Migration planning
8. **audit-accessibility** - Accessibility compliance audit

## 📋 Examples

### 1. Project Structure Analysis

```json
{
  "tool": "analyze-project-structure",
  "arguments": {
    "projectPath": "./",
    "includeMetrics": true,
    "analyzeComplexity": true,
    "checkConventions": true,
    "generateReport": true,
    "outputPath": "./reports/structure-analysis.html"
  }
}
```

### 2. Dependency Analysis

```json
{
  "tool": "analyze-dependencies",
  "arguments": {
    "projectPath": "./",
    "checkOutdated": true,
    "checkVulnerabilities": true,
    "checkUnused": true,
    "checkDuplicates": true,
    "includeDevDependencies": true,
    "generateReport": true,
    "outputPath": "./reports/dependency-analysis.json"
  }
}
```

### 3. Performance Analysis

```json
{
  "tool": "analyze-performance",
  "arguments": {
    "projectPath": "./",
    "analyzeBundle": true,
    "analyzeLazyLoading": true,
    "analyzeChangeDetection": true,
    "analyzeMemoryUsage": true,
    "includeRecommendations": true,
    "generateReport": true,
    "outputPath": "./reports/performance-analysis.html"
  }
}
```

### 4. Code Quality Analysis

```json
{
  "tool": "analyze-code-quality",
  "arguments": {
    "projectPath": "./src",
    "metrics": ["complexity", "maintainability", "duplication", "coverage"],
    "lintingRules": ["angular", "typescript", "rxjs"],
    "includeTests": true,
    "generateReport": true,
    "outputPath": "./reports/code-quality.html"
  }
}
```

### 5. Security Analysis

```json
{
  "tool": "analyze-security",
  "arguments": {
    "projectPath": "./",
    "scanDependencies": true,
    "scanCode": true,
    "checkCSP": true,
    "checkHTTPS": true,
    "checkAuthentication": true,
    "generateReport": true,
    "outputPath": "./reports/security-analysis.json"
  }
}
```

### 6. Bundle Size Analysis

```json
{
  "tool": "analyze-bundle-size",
  "arguments": {
    "projectPath": "./",
    "buildPath": "./dist",
    "analyzeChunks": true,
    "analyzeDependencies": true,
    "compareBaseline": true,
    "baselinePath": "./reports/baseline-bundle.json",
    "generateReport": true,
    "outputPath": "./reports/bundle-analysis.html"
  }
}
```

### 7. Migration Plan Generation

```json
{
  "tool": "generate-migration-plan",
  "arguments": {
    "projectPath": "./",
    "currentVersion": "4.3.0",
    "targetVersion": "5.0.0",
    "includeBreakingChanges": true,
    "includeTimeline": true,
    "includeRisks": true,
    "generateReport": true,
    "outputPath": "./reports/migration-plan.md"
  }
}
```

### 8. Accessibility Audit

```json
{
  "tool": "audit-accessibility",
  "arguments": {
    "projectPath": "./src",
    "standards": ["WCAG2.1", "Section508"],
    "level": "AA",
    "includeComponents": true,
    "includeTemplates": true,
    "generateReport": true,
    "outputPath": "./reports/accessibility-audit.html"
  }
}
```

## 🎯 Advanced Analysis Examples

### Comprehensive Project Health Check

```json
{
  "tool": "analyze-project-structure",
  "arguments": {
    "projectPath": "./",
    "analysisType": "comprehensive",
    "includeMetrics": true,
    "analyzeComplexity": true,
    "checkConventions": true,
    "analyzeArchitecture": true,
    "checkBestPractices": true,
    "includeRecommendations": true,
    "generateReport": true,
    "reportFormat": "html",
    "outputPath": "./reports/project-health-check.html",
    "includeCharts": true,
    "includeTrends": true
  }
}
```

### Performance Deep Dive

```json
{
  "tool": "analyze-performance",
  "arguments": {
    "projectPath": "./",
    "analysisDepth": "deep",
    "analyzeBundle": true,
    "analyzeLazyLoading": true,
    "analyzeChangeDetection": true,
    "analyzeMemoryUsage": true,
    "analyzeRenderingPerformance": true,
    "analyzeNetworkRequests": true,
    "includeMetrics": {
      "fcp": true,
      "lcp": true,
      "cls": true,
      "fid": true,
      "ttfb": true
    },
    "includeRecommendations": true,
    "generateReport": true,
    "outputPath": "./reports/performance-deep-dive.html"
  }
}
```

### Security Comprehensive Scan

```json
{
  "tool": "analyze-security",
  "arguments": {
    "projectPath": "./",
    "scanType": "comprehensive",
    "scanDependencies": true,
    "scanCode": true,
    "scanConfiguration": true,
    "checkCSP": true,
    "checkHTTPS": true,
    "checkAuthentication": true,
    "checkAuthorization": true,
    "checkDataValidation": true,
    "checkXSS": true,
    "checkCSRF": true,
    "includeCompliance": ["OWASP", "GDPR", "PCI-DSS"],
    "generateReport": true,
    "outputPath": "./reports/security-comprehensive.json"
  }
}
```

### Dependency Health Analysis

```json
{
  "tool": "analyze-dependencies",
  "arguments": {
    "projectPath": "./",
    "analysisType": "health",
    "checkOutdated": true,
    "checkVulnerabilities": true,
    "checkUnused": true,
    "checkDuplicates": true,
    "checkLicenses": true,
    "checkSize": true,
    "includeDevDependencies": true,
    "includeTransitive": true,
    "riskAssessment": true,
    "updateRecommendations": true,
    "generateReport": true,
    "outputPath": "./reports/dependency-health.json"
  }
}
```

## 🔧 Batch Analysis Examples

### Complete Project Audit

```json
{
  "tool": "analyze-project-structure",
  "arguments": {
    "projectPath": "./",
    "batchAnalysis": true,
    "analyses": [
      {
        "type": "structure",
        "includeMetrics": true,
        "checkConventions": true
      },
      {
        "type": "dependencies",
        "checkOutdated": true,
        "checkVulnerabilities": true
      },
      {
        "type": "performance",
        "analyzeBundle": true,
        "analyzeLazyLoading": true
      },
      {
        "type": "code-quality",
        "metrics": ["complexity", "maintainability"]
      },
      {
        "type": "security",
        "scanDependencies": true,
        "scanCode": true
      }
    ],
    "generateCombinedReport": true,
    "outputPath": "./reports/complete-audit.html"
  }
}
```

### CI/CD Integration Analysis

```json
{
  "tool": "analyze-performance",
  "arguments": {
    "projectPath": "./",
    "ciMode": true,
    "thresholds": {
      "bundleSize": "2MB",
      "buildTime": "5min",
      "testCoverage": "80%",
      "complexity": "10"
    },
    "failOnThreshold": true,
    "generateReport": true,
    "reportFormat": "json",
    "outputPath": "./reports/ci-analysis.json"
  }
}
```

## 📊 Report Configuration Examples

### Custom HTML Report

```json
{
  "tool": "analyze-code-quality",
  "arguments": {
    "projectPath": "./src",
    "generateReport": true,
    "reportConfig": {
      "format": "html",
      "template": "custom",
      "includeCharts": true,
      "includeMetrics": true,
      "includeRecommendations": true,
      "includeTrends": true,
      "theme": "dark",
      "branding": {
        "logo": "./assets/company-logo.png",
        "title": "Spartacus Project Analysis",
        "subtitle": "Code Quality Report"
      }
    },
    "outputPath": "./reports/custom-quality-report.html"
  }
}
```

### JSON API Report

```json
{
  "tool": "analyze-bundle-size",
  "arguments": {
    "projectPath": "./",
    "generateReport": true,
    "reportConfig": {
      "format": "json",
      "includeMetadata": true,
      "includeTimestamp": true,
      "includeEnvironment": true,
      "compression": "gzip",
      "apiCompatible": true
    },
    "outputPath": "./reports/bundle-analysis-api.json"
  }
}
```

## 💡 Best Practices

### Analysis Strategy
1. **Start with structure analysis** to understand the project layout
2. **Run dependency analysis** to identify security and maintenance issues
3. **Perform performance analysis** to identify bottlenecks
4. **Conduct code quality analysis** for maintainability
5. **Regular security scans** for vulnerability management

### Report Management
1. **Version control reports** for trend analysis
2. **Automate analysis** in CI/CD pipelines
3. **Set thresholds** for quality gates
4. **Share reports** with team members
5. **Track improvements** over time

### Continuous Monitoring
1. **Schedule regular analysis** runs
2. **Monitor key metrics** trends
3. **Set up alerts** for threshold violations
4. **Review recommendations** regularly
5. **Update baselines** periodically

## 🔧 Integration Examples

### GitHub Actions Integration

```yaml
name: Project Analysis
on: [push, pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Analysis
        run: |
          mcp-tool analyze-performance --ci-mode --fail-on-threshold
          mcp-tool analyze-security --scan-dependencies
```

### Pre-commit Hook

```bash
#!/bin/sh
# Run quick analysis before commit
mcp-tool analyze-code-quality --quick --fail-on-threshold
mcp-tool analyze-security --scan-code --quick
```

## 🔧 Next Steps

After running analysis:
1. **Review generated reports** thoroughly
2. **Prioritize recommendations** by impact
3. **Create action items** for improvements
4. **Set up monitoring** for key metrics
5. **Schedule regular analysis** runs
6. **Share findings** with the team 