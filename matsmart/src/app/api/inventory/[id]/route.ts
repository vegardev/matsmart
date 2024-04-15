import { fetchInventoryItems } from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const location = context.params.id;
  const items = await fetchInventoryItems(location);
  return new NextResponse(JSON.stringify(items));
}
