import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { fridgeInventoryDummyData } from "../../backend/dummyData";

export default function Fridge() {
  return (
    <>
      <h1>Fridge</h1>
      <InventoryTable data={fridgeInventoryDummyData} />
    </>
  );
}
