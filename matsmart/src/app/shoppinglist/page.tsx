import { SearchBar, SearchSort } from "@/src/app/ui/recipes/search";
import Table from "../ui/shoppinglist/table";
import MyButton from "../ui/shoppinglist/button";

export default function ShoppingList() {
  return (
    <div className="flex flex-col">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Shopping list</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 max-w-3xl ">
        <SearchBar placeholder="Add to shopping list..." />
        <SearchSort />
        <MyButton />
      </div>
      <Table
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
