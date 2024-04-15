"use client";
import React, { useState, useEffect } from "react";
import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { Inventory_items } from "@/src/app/backend/definitions";

export default function Freezer() {
  const [items, setItems] = useState<Inventory_items[]>([]);

  useEffect(() => {
    fetch("/api/inventory/fryser")
      .then((response) => response.json()) // Extract JSON data from the response
      .then((data) => setItems(data)); // Pass the data to setItems
  }, []);

  return (
    <>
      <h1>Freezer</h1>
      <InventoryTable data={items} />
    </>
  );
}
