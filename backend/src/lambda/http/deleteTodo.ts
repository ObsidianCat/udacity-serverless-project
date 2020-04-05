import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { deleteTodoById } from "../../businessLogic/todos";

import { createLogger } from "../../utils/logger";
const logger = createLogger("DeleteTodo Handler");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("DeleteTodo handler called", event);

  const todoId = event.pathParameters.todoId;
  const authorization = event.headers.Authorization;
  const jwtToken = authorization.split(" ")[1];

  await deleteTodoById(todoId, jwtToken);

  logger.info("DeleteTodo: todo was deleted", todoId);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: "{}"
  };
};
