"use client";

// Importing necessary components and types
import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newGroceryItems";
import RecommendedItems from "@/src/app/ui/home/recipesRecommended";
import {
  Inventory_items_proper_location,
  Recipe,
} from "@/src/app/backend/definitions";
import { useState, useEffect } from "react";

/**
 * Interface for the data fetched from the home API.
 */
interface Data {
  closeToExpireItems: Inventory_items_proper_location[];
  recentlyAddedItems: Inventory_items_proper_location[];
  recommendedRecipes: Recipe[];
}

/**
 * Home page component that fetches and displays items from the home API.
 *
 * Fetches necessary data when the home page first renders.
 * The fetched data includes inventory items that are close to their expiration date, recently added inventory items, and recommended recipes.
 * @returns The rendered home page component
 */
export default function Page() {
  // State for storing the fetched items
  const [items, setItems] = useState<Data | null>(null);

  // Fetch items from the home API when the page first renders
  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  // Show a loading message if the items haven't been fetched yet
  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="light-background">
        <h1>‎</h1>
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <div className="transparent">
          <div className="flex grow flex-row rounded-xl color-sec">
            <div className="home-container">
              <NewGroceriesItems NewGroceriesItems={items.recentlyAddedItems} />
            </div>
            <div className="home-container">
              <RecommendedItems RecommendedItems={items.recommendedRecipes} />
            </div>
            <div className="home-container">
              <CloseToExpireItems
                CloseToExpireItems={items.closeToExpireItems}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
