import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";

import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createTodo } from "../../businessLogic/todos";
import { getUserId } from "../utils";
import { createLogger } from "../../utils/logger";
const logger = createLogger("CreateTodo Handler");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("CreateTodo handler");

  const newTodo: CreateTodoRequest = JSON.parse(event.body);

  if (!newTodo.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "name is empty"
      })
    };
  }
  const userId = getUserId(event);
  const todoItem = await createTodo(userId, newTodo);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      item: todoItem
    })
  };
};
