import {
  fetchGroceryItems,
  submitGroceryItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Item_database } from "@/src/app/backend/definitions";

/**
 * Handles GET requests to fetch all grocery items.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with all grocery items.
 * On a failed request, the response body contains an error message.
 */
export async function GET() {
  const items = await fetchGroceryItems();
  return new NextResponse(JSON.stringify(items));
}

/**
 * Handles POST requests to submit a new grocery item.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON object that represents the new grocery item.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with the submitted grocery item and its ID.
 * On a failed request, the response body contains an error message.
 */
export async function POST(request: Request) {
  const item: Item_database = await request.json();

  const itemId = await submitGroceryItem(
    item.item_name,
    item.item_quantity_type,
  );

  return new NextResponse(JSON.stringify({ item, item_id: itemId }));
}
