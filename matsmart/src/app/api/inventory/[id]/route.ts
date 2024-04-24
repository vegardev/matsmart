import {
  fetchInventoryItems,
  deleteInventoryItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

/**
 * Handles GET requests to fetch all inventory items for a specific location.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} context - An object containing the request context.
 * @param {Params} context.params - An object containing the request parameters.
 * @param {string} context.params.id - The ID of the location to fetch inventory items for.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with all inventory items for the specified location if the request was successful, or an error message if the request failed.
 */
export async function GET(request: Request, context: { params: Params }) {
  const location = context.params.id;
  const items = await fetchInventoryItems(location);
  return new NextResponse(JSON.stringify(items));
}

/**
 * Handles DELETE requests to delete a specific inventory item.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON string that represents the inventory item to delete.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with the deleted inventory item if the request was successful, or an error message if the request failed.
 */
export async function DELETE(request: Request) {
  const item = await request.json();
  await deleteInventoryItem(item.item_id);
  return new NextResponse(JSON.stringify({ item }));
}
