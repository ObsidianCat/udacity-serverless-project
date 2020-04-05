import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { parseUserId } from "../../auth/utils";
import { getS3BucketUploadUrl } from "../../businessLogic/todos";

import { createLogger } from "../../utils/logger";
const logger = createLogger("GenerateUploadUrl Handler");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  logger.info("Generate TODO image upload url");
  const todoId = event.pathParameters.todoId;
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const userId = parseUserId(split[1]);

  const uploadUrl: string = getS3BucketUploadUrl(todoId, userId);

  logger.info("Generate TODO image upload url: success");
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      todoId: todoId,
      uploadUrl: uploadUrl
    })
  };
};
