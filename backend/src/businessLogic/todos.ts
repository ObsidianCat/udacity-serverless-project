import { TodoItem } from "../models/TodoItem";
import { TodosAccess } from "../dataLayer/todos";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import * as uuid from "uuid";
import { parseUserId } from "../auth/utils";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";

const todoBucket = process.env.TODOS_S3_BUCKET;
const todosAccess = new TodosAccess();

export async function getTodos(userId: string): Promise<TodoItem[]> {
  const items = await todosAccess.getUserTodos(userId);
  return items;
}

export async function createTodo(
  userId: string,
  createTodoRequest: CreateTodoRequest
): Promise<TodoItem> {
  const todoId = uuid.v4();

  const todoItem = {
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: `https://${todoBucket}.s3.amazonaws.com/${todoId}`,
    ...createTodoRequest
  };

  return await todosAccess.createTodo(todoItem);
}

export async function deleteTodoById(id: string, jwtToken: string) {
  await todosAccess.deleteTodo(id, parseUserId(jwtToken));
}

export async function updateTodo(
  updateTodoRequest: UpdateTodoRequest,
  todoId: string,
  jwtToken: string
) {
  await todosAccess.updateTodo(
    updateTodoRequest,
    todoId,
    parseUserId(jwtToken)
  );
}

export function getS3BucketUploadUrl(todoId: string, userId: string): string {
  const bucketName = process.env.TODO_S3_BUCKET;
  const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
  const AWSXray = AWSXRay.captureAWS(AWS);
  const S3 = new AWSXray.S3({ signatureVersion: "v4" });

  // Updating todo item with the expected attachment url
  todosAccess.updateTodoAttachment(
    `https://${bucketName}.s3.amazonaws.com/${todoId}`,
    todoId,
    userId
  );

  // Retrieving signed URL of S3 bucket and returning it
  return S3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: todoId,
    Expires: urlExpiration
  });
}
