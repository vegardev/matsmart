import React from "react";
import { fetchInventoryItems } from "../../backend/databaseCalls";
import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default async function Freezer() {
  const result = await fetchInventoryItems("fryser");
  return (
    <>
      <h1>Freezer</h1>
      <InventoryTable data={result} />
    </>
  );
}
