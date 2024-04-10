import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default function Pantry() {
  return (
    <>
      <h1>Pantry</h1>
      <InventoryTable
        data={[
          {
            name: "Apples",
            quantity: 10,
            quantityType: " pieces",
            expirationDate: "24.12.2024",
          },
          {
            name: "Pasta",
            quantity: 500,
            quantityType: "g",
            expirationDate: "01.01.2030",
          },
          {
            name: "Rice",
            quantity: 1.5,
            quantityType: "kg",
            expirationDate: "Never",
          },
        ]}
      />
    </>
  );
}
