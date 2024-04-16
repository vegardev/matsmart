import { fetchGroceryItems } from "../../backend/databaseCalls";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await fetchGroceryItems();
  return new NextResponse(JSON.stringify(items));
}
