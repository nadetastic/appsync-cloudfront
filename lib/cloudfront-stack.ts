import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { GraphqlApi } from "aws-cdk-lib/aws-appsync";
import {
  Distribution,
  AllowedMethods,
  ViewerProtocolPolicy,
  CachedMethods,
  CachePolicy,
  CacheHeaderBehavior,
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";

interface CloudFrontStackProps extends cdk.StackProps {
  api: GraphqlApi;
}

export class CloudfrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CloudFrontStackProps) {
    super(scope, id, props);

    this.createDistribution(props.api);
  }

  private createDistribution(api: GraphqlApi) {
    // console.log("the api", api);

    // let url = api.graphqlUrl.replace("/graphql", "");
    const urlArray = cdk.Fn.split("://", api.graphqlUrl);
    // url = ("https://", "");
    const urlWPath = cdk.Fn.select(1, urlArray); // withouth http://

    const urlPArr = cdk.Fn.split("/gra", urlWPath);

    const url = cdk.Fn.select(0, urlPArr); // withouth /graphql

    const distro = new Distribution(this, "AppSyncDistro", {
      comment: url,
      defaultBehavior: {
        origin: new HttpOrigin(url),

        // origin: new HttpOrigin(api.graphqlUrl),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        // cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
        cachePolicy: new CachePolicy(this, "appsyncPolicy", {
          headerBehavior: CacheHeaderBehavior.allowList("x-api-key"),
        }),
      },
      // defaultRootObject: 'index.htl'
    });
  }
}
