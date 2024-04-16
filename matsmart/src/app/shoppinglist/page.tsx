"use client";
import { SearchBar } from "@/src/app/ui/shoppinglist/GrocerySearchBar";
import GroceryTable from "@/src/app/ui/shoppinglist/GroceryTable";
import { Item_database, Shopping_items } from "@/src/app/backend/definitions";

import { useState, useEffect } from "react";
import QuantityDropdown from "@/src/app/ui/shoppinglist/MeasurementDropdown";

export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState<Shopping_items[]>([]);
  const [groceryItems, setGroceryItems] = useState<Item_database[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityType, setQuantityType] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ item_id: number } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/shoppinglist")
      .then((response) => response.json()) // Extract JSON data from the response
      .then((data) => setShoppingItems(data)); // Pass the data to setItems
  }, []);
  console.log("Shopping items: ", shoppingItems);

  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setGroceryItems(data));
  }, []);
  console.log("Grocery items: ", groceryItems);

  const handleAddToShoppingList = () => {
    console.log("Clicked add to shopping list...");
    const item = groceryItems.find((item) => item.item_name === searchTerm);
    console.log("Item found: ", item);
    console.log("Search term: ", searchTerm);
    fetch("/api/shoppinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: item?.item_id,
        item_quantity: quantity,
        item_quantity_type: quantityType,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
          });
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((data): void => {
        alert("Added " + data.item_name + " to shopping list!");
      })
      .catch((error) => {
        alert("Error adding item to shopping list:" + error);
      });
  };

  return (
    <div className="flex flex-col">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Shopping list</h1>
      <div className="mt-4 flex flex-row items-baseline justify-items-center gap-2 md:mt-8 max-w-3xl">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedItem={setSelectedItem}
        />
        <QuantityDropdown
          quantity={quantity}
          setQuantity={setQuantity}
          quantityType={quantityType}
          setQuantityType={setQuantityType}
        />
        <button
          className="rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-2 text-center"
          onClick={handleAddToShoppingList}
        >
          Add to shopping list
        </button>
      </div>
      <GroceryTable data={shoppingItems} className="mt-4" />
    </div>
  );
}
