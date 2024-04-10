import InventoryTable from "@/src/app/ui/inventory/InventoryTable";

export default function Fridge() {
  return (
    <>
      <h1>Fridge</h1>
      <InventoryTable
        data={[
          {
            name: "Chicken",
            quantity: 650,
            quantityType: "g",
            expirationDate: "24.12.2024",
          },
          {
            name: "Milk",
            quantity: 2,
            quantityType: "L",
            expirationDate: "01.01.2030",
          },
          {
            name: "Cheese",
            quantity: 1,
            quantityType: "kg",
            expirationDate: "Expired",
          },
        ]}
      />
    </>
  );
}
