import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { deleteTodoById } from "../../businessLogic/todos";

// @ts-ignore
// @ts-ignore
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.info("DeleteTodo handler called", event);

  const todoId = event.pathParameters.todoId;
  const authorization = event.headers.Authorization;
  const jwtToken = authorization.split(" ")[1];

  await deleteTodoById(todoId, jwtToken);

  console.info("DeleteTodo: todo was deleted", todoId);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: "{}"
  };
};
