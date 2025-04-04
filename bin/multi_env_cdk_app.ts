#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MultiEnvCdkAppStack } from '../lib/multi_env_cdk_app-stack';

const app = new cdk.App();

// Get environment from context or use default
const envType = app.node.tryGetContext('env') || 'dev';

// Environment configurations
const envConfig = {
  dev: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
    suffix: '-dev'
  },
  prod: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
    suffix: ''
  }
};

const config = envConfig[envType as keyof typeof envConfig];

// UNIQUE STACK NAME per environment
new MultiEnvCdkAppStack(app, `MultiEnvCdkAppStack-${envType}`, {
  env: {
    account: config.account,
    region: config.region
  },
  tags: {
    Environment: envType
  }
  
});