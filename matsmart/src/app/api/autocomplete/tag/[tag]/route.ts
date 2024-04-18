import { sortByTag } from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

type Params = {
  tag: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const partialQuery = context.params.tag;

    if (typeof partialQuery !== "string" || !partialQuery.trim()) {
      return new NextResponse("Invalid search query.", { status: 400 });
    }

    const queryResult = await sortByTag(partialQuery);
    const suggestions = queryResult;
    console.log(suggestions);
    return new NextResponse(JSON.stringify(suggestions));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
