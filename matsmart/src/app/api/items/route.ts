import {
  fetchGroceryItems,
  submitGroceryItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Item_database } from "@/src/app/backend/definitions";

export async function GET() {
  const items = await fetchGroceryItems();
  return new NextResponse(JSON.stringify(items));
}

export async function POST(response: Response) {
  const item: Item_database = await response.json();

  const itemId = await submitGroceryItem(
    item.item_name,
    item.item_quantity_type
  );

  return new NextResponse(JSON.stringify({ item, item_id: itemId }));
}
