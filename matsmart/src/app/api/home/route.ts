import {
  fetchRecentlyAddedItems,
  fetchRecommendedRecipes,
  fetchCloseToExpireItems,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to fetch data for the home page.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object. The response body contains a JSON string with the recently added items, recommended recipes, and items close to expiration if the request was successful, or an error message if the request failed.
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
