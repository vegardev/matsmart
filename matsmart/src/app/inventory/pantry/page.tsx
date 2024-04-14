import React from "react";
import { fetchInventoryItems } from "../../backend/databaseCalls";
import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default async function Pantry() {
  const result = await fetchInventoryItems("skuff");
  return (
    <>
      <h1>Pantry</h1>
      <InventoryTable data={result} />
    </>
  );
}
