"use client";
import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newGroceryItems";
import RecommendedItems from "@/src/app/ui/home/recipesRecommended";
import {
  CloseToExpire,
  Inventory_items_proper_location,
  Recipe,
} from "@/src/app/backend/definitions";
import { useState, useEffect } from "react";

interface Data {
  closeToExpireItems: CloseToExpire[];
  recentlyAddedItems: Inventory_items_proper_location[];
  recommendedRecipes: Recipe[];
}

export default function Page() {
  const [items, setItems] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  if (!items) {
    return <div>Loading...</div>;
  }

  console.log("All home data: ", items);
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
