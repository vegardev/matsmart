import {
  fetchRecentlyAddedItems,
  fetchRecommendedRecipes,
  fetchCloseToExpireItems,
} from "@/src/app/backend/databaseCalls";
import { NextResponse } from "next/server";

export async function GET() {
  const recentlyAddedItems = await fetchRecentlyAddedItems();
  const recommendedRecipes = await fetchRecommendedRecipes();
  const closeToExpireItems = await fetchCloseToExpireItems();

  const data = {
    recentlyAddedItems,
    recommendedRecipes,
    closeToExpireItems,
  };
  console.log("Home data ", data);
  return new NextResponse(JSON.stringify(data));
}
