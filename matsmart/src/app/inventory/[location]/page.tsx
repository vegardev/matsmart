// app/inventory/[location]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { Inventory_items } from "@/src/app/backend/definitions";

/**
 * Page component for the inventory page.
 * @param {Object} props - The props for the component.
 * @param {Object} props.params - The parameters for the page.
 * @param {string} props.params.location - The location of the inventory.
 * @returns The rendered InventoryPage component.
 */
export default function InventoryPage({
  params,
}: {
  params: { location: string };
}) {
  const [items, setItems] = useState<Inventory_items[]>([]);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);

  // Fetch data based on location
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inventory/${params.location}`);
      const items: Inventory_items[] = await response.json();
      setItems(items);
    };
    fetchData();
  }, [params.location]);

  /**
   * Handle the change of a checkbox.
   * @param {number} index - The index of the checkbox.
   */
  const handleCheckboxChange = (index: number) => {
    setCheckedStates((prevCheckedStates) => {
      const newCheckedStates = [...prevCheckedStates];
      newCheckedStates[index] = !newCheckedStates[index];
      return newCheckedStates;
    });
  };

  /**
   * Handle the deletion of items.
   */
  const handleDelete = async () => {
    // Create an array of checked items
    const checkedItems = items.filter((_, index) => checkedStates[index]);

    // Delete each checked item
    for (const item of checkedItems) {
      await fetch(`/api/inventory/${item.item_id}`, {
        method: "DELETE",
        body: JSON.stringify({
          item_id: item.item_id,
        }),
      });
    }

    // Update items and checkedStates to remove the deleted items
    setItems(items.filter((_, index) => !checkedStates[index]));
    setCheckedStates(checkedStates.filter((_, index) => !checkedStates[index]));
  };

  const location = decodeURIComponent(params.location);

  // translate location to English
  const locationTitle =
    location === "kjøleskap"
      ? "Fridge"
      : location === "fryser"
        ? "Freezer"
        : location === "skuff"
          ? "Pantry"
          : "Unknown location";
  return (
    <>
      <h1>{locationTitle}</h1>
      <InventoryTable data={items} onCheckboxChange={handleCheckboxChange} />
      {checkedStates.some((checked) => checked) && (
        <div className="flex flex-row m-4 self-end">
          <button
            className="rounded-md border border-gray-200 bg-red-200 p-2 text-sm outline-2 text-center"
            onClick={handleDelete}
          >
            Remove selected items
          </button>
        </div>
      )}
    </>
  );
}
