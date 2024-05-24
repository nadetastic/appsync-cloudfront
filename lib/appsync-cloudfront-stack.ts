import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  GraphqlApi,
  Definition,
  Code,
  FunctionRuntime,
} from "aws-cdk-lib/aws-appsync";

import * as path from "path";

export class AppsyncCloudfrontStack extends cdk.Stack {
  api: GraphqlApi;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = this.createAppSyncApi();
  }

  private createAppSyncApi(): GraphqlApi {
    const api = new GraphqlApi(this, "AppSyncWithCloudfront", {
      definition: Definition.fromFile(
        path.join(__dirname, "api", "schema.graphql")
      ),
      name: "CloudfrontAPi",
    });

    const NONE_DS = api.addNoneDataSource("None");

    NONE_DS.createResolver("listPosts", {
      fieldName: "listPosts",
      typeName: "Query",
      code: Code.fromAsset(path.join(__dirname, "api", "post-resolver.js")),
      runtime: FunctionRuntime.JS_1_0_0,
    });

    return api;
  }
}
