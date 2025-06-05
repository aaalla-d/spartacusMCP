# Migration Tools Examples

This directory contains examples for all migration tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **migrate-spartacus-version** - Spartacus version migration
2. **migrate-angular-version** - Angular version migration
3. **detect-breaking-changes** - Breaking changes detection
4. **generate-migration-plan** - Migration plan generation
5. **migrate-dependencies** - Dependency migration
6. **migrate-configuration** - Configuration migration

## 📋 Examples

### 1. Spartacus Version Migration

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "dryRun": false,
    "backupProject": true,
    "updateDependencies": true
  }
}
```

### 2. Angular Version Migration

```json
{
  "tool": "migrate-angular-version",
  "arguments": {
    "projectPath": "./",
    "targetVersion": "15.0.0",
    "updateDependencies": true,
    "runSchematicUpdates": true
  }
}
```

### 3. Breaking Changes Detection

```json
{
  "tool": "detect-breaking-changes",
  "arguments": {
    "projectPath": "./",
    "targetVersion": "5.0.0",
    "includeRecommendations": true
  }
}
```

### 4. Migration Plan Generation

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

### 5. Dependency Migration

```json
{
  "tool": "migrate-dependencies",
  "arguments": {
    "projectPath": "./",
    "targetFramework": "spartacus-5.0",
    "updatePeerDependencies": true,
    "resolveConflicts": true,
    "generateReport": true
  }
}
```

### 6. Configuration Migration

```json
{
  "tool": "migrate-configuration",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "configFiles": ["app.module.ts", "spartacus-configuration.module.ts"],
    "backupConfigs": true
  }
}
```

## 🎯 Advanced Migration Examples

### Complete Spartacus 4.x to 5.x Migration

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.6",
    "toVersion": "5.2.0",
    "migrationStrategy": "comprehensive",
    "dryRun": false,
    "backupProject": true,
    "updateDependencies": true,
    "migrateConfiguration": true,
    "updateImports": true,
    "updateTemplates": true,
    "updateStyles": true,
    "runTests": true,
    "generateReport": true,
    "outputPath": "./reports/spartacus-migration.html"
  }
}
```

### Angular 14 to 15 Migration

```json
{
  "tool": "migrate-angular-version",
  "arguments": {
    "projectPath": "./",
    "currentVersion": "14.2.0",
    "targetVersion": "15.2.0",
    "updateDependencies": true,
    "runSchematicUpdates": true,
    "updateAngularCLI": true,
    "updateTypeScript": true,
    "updateRxJS": true,
    "migrateToStandalone": false,
    "updateMaterial": true,
    "generateReport": true,
    "outputPath": "./reports/angular-migration.json"
  }
}
```

### Multi-Version Migration Plan

```json
{
  "tool": "generate-migration-plan",
  "arguments": {
    "projectPath": "./",
    "currentVersion": "3.4.0",
    "targetVersion": "5.0.0",
    "migrationPath": [
      {
        "version": "4.0.0",
        "estimatedTime": "2-3 days",
        "complexity": "medium",
        "breakingChanges": 15
      },
      {
        "version": "4.3.0",
        "estimatedTime": "1 day",
        "complexity": "low",
        "breakingChanges": 3
      },
      {
        "version": "5.0.0",
        "estimatedTime": "3-4 days",
        "complexity": "high",
        "breakingChanges": 25
      }
    ],
    "includeBreakingChanges": true,
    "includeTimeline": true,
    "includeRisks": true,
    "includeTestingStrategy": true,
    "includeRollbackPlan": true,
    "generateReport": true,
    "outputPath": "./reports/multi-version-migration-plan.md"
  }
}
```

### B2B Feature Migration

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "features": ["b2b", "organization", "checkout", "cart"],
    "migrateB2BFeatures": true,
    "updateOrganizationModule": true,
    "updateCheckoutB2B": true,
    "updateCartB2B": true,
    "preserveCustomizations": true,
    "dryRun": false,
    "backupProject": true,
    "generateReport": true
  }
}
```

## 🔧 Dry Run Examples

### Dry Run Migration Assessment

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "dryRun": true,
    "assessmentOnly": true,
    "analyzeImpact": true,
    "estimateTime": true,
    "identifyRisks": true,
    "generateReport": true,
    "outputPath": "./reports/migration-assessment.html"
  }
}
```

### Breaking Changes Preview

```json
{
  "tool": "detect-breaking-changes",
  "arguments": {
    "projectPath": "./",
    "targetVersion": "5.0.0",
    "analysisDepth": "deep",
    "includeRecommendations": true,
    "includeCodeExamples": true,
    "includeAlternatives": true,
    "categorizeByImpact": true,
    "estimateEffort": true,
    "generateReport": true,
    "outputPath": "./reports/breaking-changes-analysis.html"
  }
}
```

## 📊 Migration Monitoring Examples

### Migration Progress Tracking

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "trackProgress": true,
    "progressReporting": {
      "interval": "step",
      "includeMetrics": true,
      "includeTimestamps": true,
      "outputPath": "./reports/migration-progress.json"
    },
    "rollbackOnFailure": true,
    "continueOnWarnings": false,
    "generateReport": true
  }
}
```

### Post-Migration Validation

```json
{
  "tool": "validate-migration",
  "arguments": {
    "projectPath": "./",
    "migrationVersion": "5.0.0",
    "validationChecks": [
      "compilation",
      "unit-tests",
      "e2e-tests",
      "build-success",
      "runtime-validation"
    ],
    "performanceBaseline": "./reports/pre-migration-performance.json",
    "generateReport": true,
    "outputPath": "./reports/migration-validation.html"
  }
}
```

## 🎯 Specialized Migration Scenarios

### Custom Library Migration

```json
{
  "tool": "migrate-dependencies",
  "arguments": {
    "projectPath": "./",
    "customLibraries": [
      {
        "name": "@company/custom-spartacus-lib",
        "fromVersion": "1.2.0",
        "toVersion": "2.0.0",
        "migrationGuide": "./docs/custom-lib-migration.md"
      }
    ],
    "updateImports": true,
    "updateUsages": true,
    "generateReport": true
  }
}
```

### Multi-Site Migration

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "multiSiteConfiguration": true,
    "sites": ["us", "eu", "asia"],
    "preserveSiteConfigurations": true,
    "updateSiteContexts": true,
    "migrateI18n": true,
    "generateReport": true
  }
}
```

### PWA Migration

```json
{
  "tool": "migrate-spartacus-version",
  "arguments": {
    "projectPath": "./",
    "fromVersion": "4.3.0",
    "toVersion": "5.0.0",
    "pwaFeatures": true,
    "updateServiceWorker": true,
    "updateManifest": true,
    "updatePWAConfiguration": true,
    "preserveOfflineCapabilities": true,
    "generateReport": true
  }
}
```

## 💡 Best Practices

### Pre-Migration Preparation
1. **Create a complete backup** of your project
2. **Run comprehensive tests** before migration
3. **Document current customizations** and configurations
4. **Review migration guides** and breaking changes
5. **Plan for rollback** scenarios

### Migration Execution
1. **Start with a dry run** to assess impact
2. **Migrate incrementally** when possible
3. **Test thoroughly** at each step
4. **Monitor performance** during migration
5. **Keep detailed logs** of changes

### Post-Migration Validation
1. **Run all tests** (unit, integration, e2e)
2. **Verify functionality** in all environments
3. **Check performance** against baselines
4. **Validate accessibility** compliance
5. **Update documentation** and guides

### Risk Mitigation
1. **Use feature flags** for gradual rollout
2. **Maintain rollback capability** throughout
3. **Monitor error rates** closely
4. **Have support team** ready
5. **Plan for hotfixes** if needed

## 🔧 Troubleshooting Examples

### Migration Failure Recovery

```json
{
  "tool": "rollback-migration",
  "arguments": {
    "projectPath": "./",
    "backupPath": "./backups/pre-migration-backup",
    "preserveLogs": true,
    "analyzeFailure": true,
    "generateReport": true,
    "outputPath": "./reports/migration-failure-analysis.html"
  }
}
```

### Conflict Resolution

```json
{
  "tool": "resolve-migration-conflicts",
  "arguments": {
    "projectPath": "./",
    "conflictType": "dependency",
    "autoResolve": false,
    "interactiveMode": true,
    "preserveCustomizations": true,
    "generateReport": true
  }
}
```

## 🔧 Next Steps

After migration:
1. **Validate all functionality** thoroughly
2. **Update team documentation** and processes
3. **Monitor application** performance and errors
4. **Plan for next migration** cycle
5. **Share lessons learned** with the team
6. **Update CI/CD pipelines** if needed 