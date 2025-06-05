# DevOps & Deployment Tools Examples

This directory contains examples for all DevOps and deployment tools in the Spartacus MCP framework.

## 🛠️ Available Tools

1. **optimize-build** - Build optimization and analysis
2. **generate-cicd-pipeline** - CI/CD pipeline generation
3. **create-docker-config** - Docker configuration creation
4. **setup-performance-monitoring** - Performance monitoring setup
5. **create-deployment-config** - Deployment configuration
6. **setup-environment-config** - Environment configuration
7. **generate-kubernetes-config** - Kubernetes deployment configuration
8. **create-monitoring-dashboard** - Monitoring dashboard creation
9. **setup-security-scanning** - Security scanning configuration
10. **create-backup-strategy** - Backup and recovery strategy

## 📋 Basic Examples

### 1. Build Optimization

```json
{
  "tool": "optimize-build",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./dist",
    "optimizations": [
      "tree-shaking",
      "code-splitting",
      "minification",
      "compression"
    ],
    "target": "production",
    "generateReport": true
  }
}
```

### 2. CI/CD Pipeline Generation

```json
{
  "tool": "generate-cicd-pipeline",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./.github/workflows",
    "platform": "github-actions",
    "stages": ["build", "test", "deploy"],
    "deploymentTargets": ["staging", "production"],
    "notifications": {
      "slack": true,
      "email": true
    }
  }
}
```

### 3. Docker Configuration

```json
{
  "tool": "create-docker-config",
  "arguments": {
    "baseImage": "node:18-alpine",
    "nodeVersion": "18",
    "includeNginx": true,
    "multiStage": true,
    "optimizeSize": true
  }
}
```

### 4. Performance Monitoring Setup

```json
{
  "tool": "setup-performance-monitoring",
  "arguments": {
    "tools": ["lighthouse", "web-vitals", "bundle-analyzer"],
    "thresholds": {
      "performance": 90,
      "accessibility": 95,
      "bestPractices": 90,
      "seo": 90
    }
  }
}
```

## 🚀 Advanced DevOps Examples

### Complete CI/CD Pipeline with Multi-Environment Deployment

```json
{
  "tool": "generate-cicd-pipeline",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./.github/workflows",
    "platform": "github-actions",
    "pipelineConfig": {
      "name": "Spartacus E-commerce Pipeline",
      "triggers": ["push", "pull_request"],
      "branches": ["main", "develop", "release/*"]
    },
    "stages": [
      {
        "name": "build",
        "steps": [
          "checkout",
          "setup-node",
          "install-dependencies",
          "lint",
          "build",
          "cache-artifacts"
        ]
      },
      {
        "name": "test",
        "steps": [
          "unit-tests",
          "integration-tests",
          "e2e-tests",
          "coverage-report"
        ],
        "parallel": true
      },
      {
        "name": "security",
        "steps": [
          "dependency-scan",
          "code-scan",
          "container-scan"
        ]
      },
      {
        "name": "deploy-staging",
        "condition": "branch == 'develop'",
        "steps": [
          "deploy-to-staging",
          "smoke-tests",
          "performance-tests"
        ]
      },
      {
        "name": "deploy-production",
        "condition": "branch == 'main'",
        "steps": [
          "deploy-to-production",
          "health-checks",
          "rollback-on-failure"
        ],
        "requiresApproval": true
      }
    ],
    "environments": {
      "staging": {
        "url": "https://staging.example.com",
        "secrets": ["STAGING_API_KEY", "STAGING_DB_URL"],
        "variables": {
          "NODE_ENV": "staging",
          "API_BASE_URL": "https://api-staging.example.com"
        }
      },
      "production": {
        "url": "https://example.com",
        "secrets": ["PROD_API_KEY", "PROD_DB_URL"],
        "variables": {
          "NODE_ENV": "production",
          "API_BASE_URL": "https://api.example.com"
        },
        "protectionRules": {
          "requiredReviewers": 2,
          "dismissStaleReviews": true
        }
      }
    },
    "notifications": {
      "slack": {
        "webhook": "${{ secrets.SLACK_WEBHOOK }}",
        "channels": ["#deployments", "#alerts"],
        "onSuccess": true,
        "onFailure": true
      },
      "email": {
        "recipients": ["devops@example.com"],
        "onFailure": true
      }
    },
    "caching": {
      "nodeModules": true,
      "buildArtifacts": true,
      "testResults": true
    }
  }
}
```

### Advanced Docker Configuration with Multi-Stage Build

```json
{
  "tool": "create-docker-config",
  "arguments": {
    "baseImage": "node:18-alpine",
    "nodeVersion": "18",
    "multiStage": true,
    "stages": [
      {
        "name": "dependencies",
        "purpose": "Install dependencies",
        "optimizations": ["npm-ci", "cache-node-modules"]
      },
      {
        "name": "build",
        "purpose": "Build application",
        "optimizations": ["tree-shaking", "minification"]
      },
      {
        "name": "runtime",
        "purpose": "Runtime environment",
        "baseImage": "nginx:alpine",
        "optimizations": ["minimal-image", "security-hardening"]
      }
    ],
    "includeNginx": true,
    "nginxConfig": {
      "gzip": true,
      "caching": true,
      "security": true,
      "spa": true
    },
    "optimizeSize": true,
    "securityFeatures": {
      "nonRootUser": true,
      "readOnlyFileSystem": true,
      "dropCapabilities": true
    },
    "healthCheck": {
      "enabled": true,
      "endpoint": "/health",
      "interval": "30s",
      "timeout": "10s",
      "retries": 3
    },
    "labels": {
      "maintainer": "devops@example.com",
      "version": "1.0.0",
      "description": "Spartacus E-commerce Application"
    }
  }
}
```

### Kubernetes Deployment Configuration

```json
{
  "tool": "generate-kubernetes-config",
  "arguments": {
    "appName": "spartacus-ecommerce",
    "namespace": "ecommerce",
    "outputPath": "./k8s",
    "deployment": {
      "replicas": 3,
      "image": "spartacus-app:latest",
      "resources": {
        "requests": {
          "cpu": "100m",
          "memory": "128Mi"
        },
        "limits": {
          "cpu": "500m",
          "memory": "512Mi"
        }
      },
      "strategy": {
        "type": "RollingUpdate",
        "maxUnavailable": 1,
        "maxSurge": 1
      }
    },
    "service": {
      "type": "ClusterIP",
      "port": 80,
      "targetPort": 4200
    },
    "ingress": {
      "enabled": true,
      "host": "spartacus.example.com",
      "tls": true,
      "annotations": {
        "kubernetes.io/ingress.class": "nginx",
        "cert-manager.io/cluster-issuer": "letsencrypt-prod"
      }
    },
    "configMap": {
      "data": {
        "API_BASE_URL": "https://api.example.com",
        "FEATURE_FLAGS": "true"
      }
    },
    "secrets": {
      "data": ["API_KEY", "DATABASE_URL"]
    },
    "autoscaling": {
      "enabled": true,
      "minReplicas": 2,
      "maxReplicas": 10,
      "targetCPUUtilization": 70
    },
    "monitoring": {
      "enabled": true,
      "serviceMonitor": true,
      "prometheusRule": true
    }
  }
}
```

## 📊 Monitoring & Performance Examples

### Comprehensive Performance Monitoring

```json
{
  "tool": "setup-performance-monitoring",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./monitoring",
    "tools": [
      {
        "name": "lighthouse",
        "config": {
          "urls": [
            "https://example.com",
            "https://example.com/products",
            "https://example.com/checkout"
          ],
          "categories": ["performance", "accessibility", "best-practices", "seo"],
          "schedule": "0 2 * * *",
          "budget": {
            "performance": 90,
            "accessibility": 95,
            "bestPractices": 90,
            "seo": 90
          }
        }
      },
      {
        "name": "web-vitals",
        "config": {
          "metrics": ["LCP", "FID", "CLS", "FCP", "TTFB"],
          "thresholds": {
            "LCP": 2500,
            "FID": 100,
            "CLS": 0.1
          },
          "realUserMonitoring": true
        }
      },
      {
        "name": "bundle-analyzer",
        "config": {
          "generateReport": true,
          "openAnalyzer": false,
          "analyzerMode": "static",
          "reportFilename": "bundle-report.html"
        }
      }
    ],
    "alerting": {
      "enabled": true,
      "channels": ["slack", "email"],
      "thresholds": {
        "performance": 85,
        "availability": 99.5,
        "errorRate": 1
      }
    },
    "dashboards": {
      "grafana": true,
      "datadog": false,
      "newrelic": false
    }
  }
}
```

### Monitoring Dashboard Creation

```json
{
  "tool": "create-monitoring-dashboard",
  "arguments": {
    "dashboardName": "Spartacus E-commerce Metrics",
    "platform": "grafana",
    "outputPath": "./monitoring/dashboards",
    "panels": [
      {
        "title": "Application Performance",
        "type": "graph",
        "metrics": [
          "response_time_avg",
          "response_time_p95",
          "response_time_p99"
        ],
        "timeRange": "1h"
      },
      {
        "title": "Error Rates",
        "type": "stat",
        "metrics": [
          "error_rate_4xx",
          "error_rate_5xx"
        ],
        "thresholds": [
          {"value": 1, "color": "yellow"},
          {"value": 5, "color": "red"}
        ]
      },
      {
        "title": "Business Metrics",
        "type": "table",
        "metrics": [
          "orders_per_minute",
          "conversion_rate",
          "cart_abandonment_rate"
        ]
      },
      {
        "title": "Infrastructure",
        "type": "heatmap",
        "metrics": [
          "cpu_usage",
          "memory_usage",
          "disk_usage"
        ]
      }
    ],
    "alerts": [
      {
        "name": "High Error Rate",
        "condition": "error_rate > 5%",
        "severity": "critical",
        "notifications": ["slack", "pagerduty"]
      },
      {
        "name": "Slow Response Time",
        "condition": "response_time_p95 > 2000ms",
        "severity": "warning",
        "notifications": ["slack"]
      }
    ],
    "variables": [
      {
        "name": "environment",
        "type": "custom",
        "options": ["staging", "production"]
      },
      {
        "name": "region",
        "type": "query",
        "query": "label_values(region)"
      }
    ]
  }
}
```

## 🔒 Security & Compliance Examples

### Security Scanning Configuration

```json
{
  "tool": "setup-security-scanning",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./security",
    "scanTypes": [
      {
        "type": "dependency-scan",
        "tool": "npm-audit",
        "config": {
          "auditLevel": "moderate",
          "excludeDevDependencies": false,
          "generateReport": true
        }
      },
      {
        "type": "code-scan",
        "tool": "sonarqube",
        "config": {
          "qualityGate": "strict",
          "coverage": 80,
          "duplicatedLines": 3,
          "maintainabilityRating": "A"
        }
      },
      {
        "type": "container-scan",
        "tool": "trivy",
        "config": {
          "severity": ["HIGH", "CRITICAL"],
          "ignoreUnfixed": false,
          "format": "json"
        }
      },
      {
        "type": "secrets-scan",
        "tool": "gitleaks",
        "config": {
          "configPath": ".gitleaks.toml",
          "verbose": true,
          "redact": true
        }
      }
    ],
    "compliance": {
      "standards": ["OWASP", "PCI-DSS", "GDPR"],
      "generateReport": true,
      "autoRemediation": false
    },
    "integration": {
      "cicd": true,
      "preCommitHooks": true,
      "ide": true
    }
  }
}
```

### Environment Configuration Management

```json
{
  "tool": "setup-environment-config",
  "arguments": {
    "environments": [
      {
        "name": "development",
        "config": {
          "NODE_ENV": "development",
          "API_BASE_URL": "http://localhost:3000",
          "DEBUG": "true",
          "LOG_LEVEL": "debug",
          "CACHE_TTL": "60"
        },
        "secrets": {
          "DATABASE_URL": "postgresql://localhost:5432/dev_db",
          "JWT_SECRET": "dev-secret-key"
        }
      },
      {
        "name": "staging",
        "config": {
          "NODE_ENV": "staging",
          "API_BASE_URL": "https://api-staging.example.com",
          "DEBUG": "false",
          "LOG_LEVEL": "info",
          "CACHE_TTL": "300"
        },
        "secrets": {
          "DATABASE_URL": "${{ secrets.STAGING_DATABASE_URL }}",
          "JWT_SECRET": "${{ secrets.STAGING_JWT_SECRET }}"
        }
      },
      {
        "name": "production",
        "config": {
          "NODE_ENV": "production",
          "API_BASE_URL": "https://api.example.com",
          "DEBUG": "false",
          "LOG_LEVEL": "error",
          "CACHE_TTL": "3600"
        },
        "secrets": {
          "DATABASE_URL": "${{ secrets.PROD_DATABASE_URL }}",
          "JWT_SECRET": "${{ secrets.PROD_JWT_SECRET }}"
        }
      }
    ],
    "validation": {
      "required": ["NODE_ENV", "API_BASE_URL"],
      "types": {
        "DEBUG": "boolean",
        "CACHE_TTL": "number"
      }
    },
    "encryption": {
      "enabled": true,
      "algorithm": "AES-256-GCM",
      "keyRotation": true
    },
    "outputFormats": [".env", "docker-compose.yml", "k8s-configmap.yml"]
  }
}
```

## 🔄 Backup & Recovery Examples

### Comprehensive Backup Strategy

```json
{
  "tool": "create-backup-strategy",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./backup",
    "backupTypes": [
      {
        "type": "database",
        "schedule": "0 2 * * *",
        "retention": "30d",
        "compression": true,
        "encryption": true,
        "destinations": ["s3", "local"]
      },
      {
        "type": "application-data",
        "schedule": "0 */6 * * *",
        "retention": "7d",
        "compression": true,
        "destinations": ["s3"]
      },
      {
        "type": "configuration",
        "schedule": "0 1 * * 0",
        "retention": "90d",
        "versioning": true,
        "destinations": ["git", "s3"]
      }
    ],
    "recovery": {
      "rto": "4h",
      "rpo": "1h",
      "testSchedule": "monthly",
      "automatedTesting": true
    },
    "monitoring": {
      "enabled": true,
      "alerts": {
        "backupFailure": true,
        "recoveryTest": true,
        "storageQuota": true
      }
    },
    "compliance": {
      "gdpr": true,
      "retention": "7y",
      "encryption": "AES-256"
    }
  }
}
```

## 🚀 Advanced Build Optimization

### Production Build Optimization

```json
{
  "tool": "optimize-build",
  "arguments": {
    "projectPath": "./",
    "outputPath": "./dist",
    "target": "production",
    "optimizations": [
      {
        "type": "tree-shaking",
        "aggressive": true,
        "sideEffects": false
      },
      {
        "type": "code-splitting",
        "strategy": "route-based",
        "chunkSize": "244kb",
        "preload": ["critical", "above-fold"]
      },
      {
        "type": "minification",
        "javascript": {
          "mangle": true,
          "compress": true,
          "deadCode": true
        },
        "css": {
          "removeUnused": true,
          "mergeDuplicates": true,
          "optimizeSelectors": true
        },
        "html": {
          "removeComments": true,
          "collapseWhitespace": true,
          "minifyCSS": true,
          "minifyJS": true
        }
      },
      {
        "type": "compression",
        "gzip": true,
        "brotli": true,
        "level": 9
      },
      {
        "type": "image-optimization",
        "formats": ["webp", "avif"],
        "quality": 85,
        "progressive": true
      }
    ],
    "bundleAnalysis": {
      "enabled": true,
      "budgets": {
        "initial": "500kb",
        "maximumWarning": "1mb",
        "maximumError": "2mb"
      },
      "reportPath": "./reports/bundle-analysis.html"
    },
    "performance": {
      "preconnect": ["fonts.googleapis.com", "api.example.com"],
      "prefetch": ["critical-routes"],
      "serviceWorker": true,
      "caching": {
        "static": "1y",
        "dynamic": "1d",
        "api": "5m"
      }
    },
    "generateReport": true,
    "reportPath": "./reports/build-optimization.json"
  }
}
```

## 💡 Best Practices

### CI/CD Pipeline Design
1. **Fail fast** with early validation steps
2. **Parallel execution** for independent tasks
3. **Artifact caching** to speed up builds
4. **Environment parity** across all stages
5. **Automated rollback** on deployment failures

### Docker Best Practices
1. **Multi-stage builds** for smaller images
2. **Non-root user** for security
3. **Health checks** for container monitoring
4. **Layer caching** for faster builds
5. **Minimal base images** for security

### Monitoring Strategy
1. **Four Golden Signals** (latency, traffic, errors, saturation)
2. **Business metrics** alongside technical metrics
3. **Alerting on symptoms** not causes
4. **Runbook automation** for common issues
5. **Regular dashboard reviews** and updates

### Security Implementation
1. **Shift-left security** in the development process
2. **Automated scanning** in CI/CD pipelines
3. **Secrets management** with proper rotation
4. **Least privilege** access controls
5. **Regular security audits** and updates

## 🔧 Troubleshooting Examples

### Build Failure Analysis

```json
{
  "tool": "analyze-build-failure",
  "arguments": {
    "buildLogPath": "./logs/build-failure.log",
    "projectPath": "./",
    "analysisType": "comprehensive",
    "generateReport": true,
    "outputPath": "./reports/build-failure-analysis.html"
  }
}
```

### Deployment Rollback

```json
{
  "tool": "rollback-deployment",
  "arguments": {
    "environment": "production",
    "targetVersion": "v1.2.3",
    "strategy": "blue-green",
    "healthChecks": true,
    "notifyTeam": true
  }
}
```

## 🔧 Next Steps

After setting up DevOps tools:
1. **Monitor pipeline performance** and optimize bottlenecks
2. **Review security scans** regularly and address findings
3. **Test disaster recovery** procedures periodically
4. **Update documentation** and runbooks
5. **Train team members** on new tools and processes
6. **Continuously improve** based on metrics and feedback 