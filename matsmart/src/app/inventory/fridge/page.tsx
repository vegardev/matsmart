import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { fetchInventoryItems } from "../../backend/databaseCalls";

export default async function Fridge() {
  return (
    <>
      <h1>Fridge</h1>
      <InventoryTable data={await fetchInventoryItems("kjøleskap")} />
    </>
  );
}
