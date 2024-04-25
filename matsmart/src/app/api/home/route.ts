import {
  fetchRecentlyAddedItems,
  fetchRecommendedRecipes,
  fetchCloseToExpireItems,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to fetch data for the home page.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * On a successful request, the response body contains a JSON object with the recently added items, recommended recipes, and items close to expiration.
 * On a failed request, the response body contains an error message.
 */
export async function GET() {
  try {
    const recentlyAddedItems = await fetchRecentlyAddedItems();
    const recommendedRecipes = await fetchRecommendedRecipes();
    const closeToExpireItems = await fetchCloseToExpireItems();

    const data = {
      recentlyAddedItems,
      recommendedRecipes,
      closeToExpireItems,
    };
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
