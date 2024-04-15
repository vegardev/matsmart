import { fetchGrocerySuggestions } from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const partialQuery = context.params.slug;

    if (typeof partialQuery !== "string" || !partialQuery.trim()) {
      return new NextResponse("Invalid search query.", { status: 400 });
    }

    const queryResult = await fetchGrocerySuggestions(partialQuery);
    const suggestions = queryResult;
    console.log(suggestions);
    return new NextResponse(JSON.stringify(suggestions));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
