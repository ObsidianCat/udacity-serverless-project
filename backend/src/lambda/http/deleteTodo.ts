import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";

// @ts-ignore
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //const todoId = event.pathParameters.todoId
  console.info("DeleteTodoRequest handler called");

  // TODO: Remove a TODO item by id
  return undefined;
};
