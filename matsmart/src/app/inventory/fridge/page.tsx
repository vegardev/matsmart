import React from "react";
import { fetchInventoryItems } from "../../backend/databaseCalls";
import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default async function Fridge() {
  const result = await fetchInventoryItems("kjøleskap");
  return (
    <>
      <h1>Fridge</h1>
      <InventoryTable data={result} />
    </>
  );
}
