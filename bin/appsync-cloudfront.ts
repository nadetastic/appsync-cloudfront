#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppsyncCloudfrontStack } from "../lib/appsync-cloudfront-stack";
import { CloudfrontStack } from "../lib/cloudfront-stack";
const app = new cdk.App();

const REGION = "us-west-2";
const appsyncStack = new AppsyncCloudfrontStack(app, "AppsyncCloudfrontStack", {
  env: { region: REGION },
});

new CloudfrontStack(app, "CloudFrontAppSyncStack", {
  env: {
    region: REGION,
  },
  api: appsyncStack.api,
});
