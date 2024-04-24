import { submitInventoryItem } from "@/src/app/backend/databaseCalls";
import { Inventory_items } from "@/src/app/backend/definitions";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to submit a new inventory item.
 *
 * @param {Request} request - The incoming request object. The body of the request should be a JSON string that represents the new inventory item.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with the submitted inventory item if the request was successful, or an error message if the request failed.
 */
export async function POST(request: Request) {
  const item: Inventory_items = await request.json();
  console.log(item);
  await submitInventoryItem(
    item.item_id,
    item.item_quantity,
    item.item_quantity_type,
    item.item_location,
    item.expiration_date
  );

  return new NextResponse(JSON.stringify({ item }));
}
