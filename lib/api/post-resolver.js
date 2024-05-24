// TITLE: Locally publish a message

import { util } from "@aws-appsync/utils";

/**
 * Publishes an event localy
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').NONERequest} the request
 */
export function request(ctx) {
  return {
    payload: {
      id: "1234",
      title: "Some post",
    },
  };
}

/**
 * Forward the payload in the `result` object
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
  return {
    items: [
      {
        id: "123",
        title: "Post Title",
      },
    ],
    foo: "bar",
  };
}
