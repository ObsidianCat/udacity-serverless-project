import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";

import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";

// @ts-ignore
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // @ts-ignore
  const todoId = event.pathParameters.todoId;
  // @ts-ignore
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
  console.info("Update Todo handler called");

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return undefined;
};
