import { fetchGrocerySuggestions } from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

type Params = {
  term: string;
};

/**
 * Handles GET requests to fetch grocery suggestions based on a search term.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} context - An object containing the request context.
 * @param {Params} context.params - An object containing the request parameters.
 * @param {string} context.params.term - The search term to fetch grocery suggestions for.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON string with grocery suggestions.
 * On a failed request, the response body contains an error message.
 */
export async function GET(request: Request, context: { params: Params }) {
  try {
    const partialQuery = context.params.term;

    if (typeof partialQuery !== "string" || !partialQuery.trim()) {
      return new NextResponse("Invalid search query.", { status: 400 });
    }

    const queryResult = await fetchGrocerySuggestions(partialQuery);
    const suggestions = queryResult;
    return new NextResponse(JSON.stringify(suggestions));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
