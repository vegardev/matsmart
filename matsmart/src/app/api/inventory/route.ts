import { submitInventoryItem } from "@/src/app/backend/databaseCalls";
import { Inventory_items } from "@/src/app/backend/definitions";
import { NextResponse } from "next/server";

export async function POST(response: Response) {
  const item: Inventory_items = await response.json();
  console.log(item);
  await submitInventoryItem(
    item.item_id,
    item.item_quantity,
    item.item_quantity_type,
    item.item_location,
  );

  return new NextResponse(JSON.stringify({ item }));
}
