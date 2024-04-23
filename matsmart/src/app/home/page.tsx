"use client";

// Importing necessary components and types
import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newGroceryItems";
import RecommendedItems from "@/src/app/ui/home/recipesRecommended";
import {
  CloseToExpire,
  Inventory_items,
  Recipe,
} from "@/src/app/backend/definitions";
import { useState, useEffect } from "react";

/**
 * Interface for the data fetched from the home API.
 */
interface Data {
  /**
   * Items that are close to their expiration date.
   */
  closeToExpireItems: CloseToExpire[];

  /**
   * Items that were recently added to the inventory.
   */
  recentlyAddedItems: Inventory_items[];

  /**
   * Recipes that are recommended to the user.
   */
  recommendedRecipes: Recipe[];
}

/**
 * Page component that fetches and displays items from the home API.
 * @returns The rendered Page component
 */
export default function Page() {
  // State for storing the fetched items
  const [items, setItems] = useState<Data | null>(null);

  // Fetch items from the home API when the component mounts
  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  // Show a loading message if the items haven't been fetched yet
  if (!items) {
    return <div>Loading...</div>;
  }

  console.log("All home data: ", items);

  // Render the fetched items
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
