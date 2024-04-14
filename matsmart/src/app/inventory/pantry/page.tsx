import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { pantryInventoryDummyData } from "../../backend/dummyData";

export default function Pantry() {
  return (
    <>
      <h1>Pantry</h1>
      <InventoryTable data={pantryInventoryDummyData} />
    </>
  );
}
