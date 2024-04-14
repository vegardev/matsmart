import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { fetchInventoryItems } from "../../backend/databaseCalls";

export default async function Pantry() {
  return (
    <>
      <h1>Pantry</h1>
      <InventoryTable data={await fetchInventoryItems("skuff")} />
    </>
  );
}
