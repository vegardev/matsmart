import {
  deleteShoppingListItem,
  updateShoppingListItem,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { Shopping_items } from "@/src/app/backend/definitions";

export async function PUT(response: Response) {
  const item: Shopping_items = await response.json();

  // Gjør item_quantity til number igjen
  const itemQuantity = item.item_quantity;
  await updateShoppingListItem(item.item_id, itemQuantity);

  console.log(item);
  return new NextResponse(JSON.stringify({ item }));
}

// Sletter spesifikk item fra shopping_list
export async function DELETE(response: Response) {
  const item: Shopping_items = await response.json();

  await deleteShoppingListItem(item.item_id);
  console.log(item);

  return new NextResponse(JSON.stringify({ item }));
}
