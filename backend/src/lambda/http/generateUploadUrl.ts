import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { createLogger } from "../../utils/logger";
import { parseUserId } from "../../auth/utils";
import { getS3BucketUploadUrl } from "../../businessLogic/todos";

const logger = createLogger("Generate Upload urls Handler");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //const todoId = event.pathParameters.todoId
  logger.info("GetTodos handler start");

  // extract the TODO ID from the path
  logger.info("Generate TODO image upload url");
  const todoId = event.pathParameters.todoId;
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const userId = parseUserId(split[1]);

  const uploadUrl: string = getS3BucketUploadUrl(todoId, userId);

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
