import { fetchInventoryItems } from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";
import { deleteInventoryItem } from "@/src/app/backend/databaseCalls";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const location = context.params.id;
  const items = await fetchInventoryItems(location);
  return new NextResponse(JSON.stringify(items));
}

export async function DELETE(request: Request) {
  const item = await request.json();
  await deleteInventoryItem(item.item_id);
  return new NextResponse(JSON.stringify({ item }));
}
