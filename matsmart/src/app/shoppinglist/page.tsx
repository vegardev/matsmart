import { SearchBar } from "@/src/app/ui/recipes/search";
import GroceryTable from "../ui/shoppinglist/GroceryTable";
import MyButton from "../ui/shoppinglist/button";
import MeasurementDropdown from "../ui/shoppinglist/MeasurementDropdown";

export default function ShoppingList() {
  return (
    <div className="flex flex-col padd">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Shopping list</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-3xl ">
        <SearchBar placeholder="Add to shopping list..." />
        <MeasurementDropdown />
        <MyButton />
      </div>
      <GroceryTable
        data={[
          {
            groceries: "Apples",
            amount: 10,
          },
          {
            groceries: "Bananas",
            amount: 5,
          },
          {
            groceries: "Oranges",
            amount: 8,
          },
        ]}
      />
    </div>
  );
}
