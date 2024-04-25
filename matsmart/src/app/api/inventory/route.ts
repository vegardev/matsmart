import { submitInventoryItem } from "@/src/app/backend/databaseCalls";
import { Inventory_items } from "@/src/app/backend/definitions";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to submit a new inventory item.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON object that represents the new inventory item.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON object with the submitted inventory item.
 * On a failed request, the response body contains an error message.
 */
export async function POST(request: Request) {
  const item: Inventory_items = await request.json();
  await submitInventoryItem(
    item.item_id,
    item.item_quantity,
    item.item_quantity_type,
    item.item_location,
    item.expiration_date,
  );

  return new NextResponse(JSON.stringify({ item }));
}
