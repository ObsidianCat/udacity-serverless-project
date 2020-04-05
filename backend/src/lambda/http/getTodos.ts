import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";
import { getTodos } from "../../businessLogic/todos";
const logger = createLogger("getTodos Handler");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("GetTodos handler start");

  const userId = getUserId(event);

  logger.info("GetTodos handler userId", userId);

  const items = await getTodos(userId);
  logger.info("GetTodos handler items", event);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      items
    })
  };
};
