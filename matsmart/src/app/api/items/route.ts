import {
  fetchGroceryItems,
  submitGroceryItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Item_database } from "@/src/app/backend/definitions";

/**
 * Handles GET requests to fetch all grocery items.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with all grocery items if the request was successful, or an error message if the request failed.
 */
export async function GET() {
  const items = await fetchGroceryItems();
  return new NextResponse(JSON.stringify(items));
}

/**
 * Handles POST requests to submit a new grocery item.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON string that represents the new grocery item.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with the submitted grocery item and its ID if the request was successful, or an error message if the request failed.
 */
export async function POST(request: Request) {
  const item: Item_database = await request.json();

  const itemId = await submitGroceryItem(
    item.item_name,
    item.item_quantity_type
  );

  return new NextResponse(JSON.stringify({ item, item_id: itemId }));
}
