import {
  fetchShoppingList,
  submitShoppingListItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Shopping_items } from "@/src/app/backend/definitions";

/**
 * Handles GET requests to fetch all items in the shopping list.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with all items in the shopping list.
 * On a failed request, the response body contains an error message.
 */
export async function GET() {
  const items = await fetchShoppingList();
  return new NextResponse(JSON.stringify(items));
}

/**
 * Handles POST requests to submit a new item to the shopping list.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON string that represents the new shopping list item.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with the submitted shopping list item.
 * On a failed request, the response body contains an error message.
 */
export async function POST(request: Request) {
  const item: Shopping_items = await request.json();

  await submitShoppingListItem(
    item.item_id,
    item.item_quantity,
    item.item_quantity_type,
  );

  return new NextResponse(JSON.stringify({ item }));
}
