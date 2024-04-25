import {
  deleteShoppingListItem,
  updateShoppingListItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Shopping_items } from "@/src/app/backend/definitions";

/**
 * Handles PUT requests to update a specific item in the shopping list.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON object that represents the shopping list item to update.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with the updated shopping list item.
 * On a failed request, the response body contains an error message.
 */
export async function PUT(request: Request) {
  const item: Shopping_items = await request.json();

  // Turns item_quantity into a number again
  const itemQuantity = item.item_quantity;
  await updateShoppingListItem(item.item_id, itemQuantity);

  return new NextResponse(JSON.stringify({ item }));
}

/**
 * Handles DELETE requests to delete a specific item from the shopping list.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON object that represents the shopping list item to delete.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with the deleted shopping list item.
 * On a failed request, the response body contains an error message.
 */
export async function DELETE(request: Request) {
  const item: Shopping_items = await request.json();

  await deleteShoppingListItem(item.item_id);

  return new NextResponse(JSON.stringify({ item }));
}
