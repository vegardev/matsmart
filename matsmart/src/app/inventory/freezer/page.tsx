import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { fetchInventoryItems } from "../../backend/databaseCalls";

export default async function Freezer() {
  return (
    <>
      <h1>Freezer</h1>
      <InventoryTable data={await fetchInventoryItems("fryser")} />
    </>
  );
}
