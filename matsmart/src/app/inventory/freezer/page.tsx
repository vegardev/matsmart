import InventoryTable from "@/src/app/ui/inventory/InventoryTable";
import { freezerInventoryDummyData } from "../../backend/dummyData";

export default function Freezer() {
  return (
    <>
      <h1>Freezer</h1>
      <InventoryTable data={freezerInventoryDummyData} />
    </>
  );
}
