import {
  fetchShoppingList,
  submitShoppingListItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Shopping_items } from "@/src/app/backend/definitions";

export async function GET() {
  const items = await fetchShoppingList();
  return new NextResponse(JSON.stringify(items));
}

export async function POST(response: Response, item: Shopping_items) {
  console.log("POST request: ", item.item_id, item.item_quantity);
  await submitShoppingListItem(
    item.item_id,
    item.item_quantity,
    item.item_quantity_type
  );
  return new NextResponse(JSON.stringify(item));
}
