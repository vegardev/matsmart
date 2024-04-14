import { SearchBar } from "@/src/app/ui/recipes/search";
import GroceryTable from "../ui/shoppinglist/GroceryTable";
import MyButton from "../ui/shoppinglist/button";
import MeasurementDropdown from "../ui/shoppinglist/MeasurementDropdown";
import { shoppingListDummyData } from "../backend/dummyData";

export default function ShoppingList() {
  return (
    <div className="flex flex-col">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Shopping list</h1>
      <div className="mt-4 flex flex-row items-center justify-items-center gap-2 md:mt-8 max-w-3xl">
        <SearchBar placeholder="Add to shopping list..." />
        <MeasurementDropdown />
        <MyButton />
      </div>
      <GroceryTable data={shoppingListDummyData} className="mt-4" />
    </div>
  );
}
