import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default function Freezer() {
  return (
    <>
      <h1>Freezer</h1>
      <InventoryTable
        data={[
          {
            name: "Peas",
            quantity: 1.2,
            quantityType: "kg",
            expirationDate: "24.12.2024",
          },
          {
            name: "Ice cream",
            quantity: 3,
            quantityType: "L",
            expirationDate: "11.11.2024",
          },
          {
            name: "Baguette",
            quantity: 4,
            quantityType: " pieces",
            expirationDate: "08.08.2025",
          },
        ]}
      />
    </>
  );
}
