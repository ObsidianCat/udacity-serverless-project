import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from "aws-lambda";
import { createLogger } from "../../utils/logger";
// @ts-ignore
import { getUserId } from "../utils";
// @ts-ignore
import { getTodos } from "../../businessLogic/todos";
const logger = createLogger("getTodos Handler");

// @ts-ignore
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("GetTodos handler start");
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);

  logger.info("GetTodos handler userId", userId );

  const items = await getTodos(userId);
  logger.info("GetTodos handler items", event);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      items
    })
  };
};
