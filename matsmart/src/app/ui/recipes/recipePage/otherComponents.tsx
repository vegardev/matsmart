import { Inventory_items } from "@/src/app/backend/definitions";
import { pantryInventoryDummyData } from "@/src/app/backend/dummyData";

/*
export function DisplayRecipeTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap space-x-1 ps-4 pb-2">
      Tags:
      {tags.map((tag) => (
        <p
          key={tag}
          className="bg-gray-100 rounded-full px-2 py-1 text-xs ms-2"
        >
          {tag}
        </p>
      ))}
    </div>
  );
}
*/
export function IngredientsCheck({
  ingredientsNeeded,
}: {
  ingredientsNeeded: string[];
}) {
  const ingredients: Inventory_items[] = pantryInventoryDummyData.map(
    (item) => ({
      ...item,
      expiration_date: new Date(item.expiration_date),
    }),
  );

  function findClosestExpirationDate() {
    let closestExpirationDate = new Date(8640000000000000);
    ingredientsNeeded.map((ingredientNeeded) => {
      ingredients.map((ingredient) => {
        const ingredientExpirationDate = new Date(ingredient.expiration_date);
        if (
          ingredient.item_name === ingredientNeeded &&
          ingredientExpirationDate < closestExpirationDate
        ) {
          closestExpirationDate = ingredientExpirationDate;
        }
      });
    });
    return closestExpirationDate;
  }

  const missingIngredients = ingredientsNeeded.filter(
    (ingredientNeeded) =>
      !ingredients.some(
        (ingredient) => ingredient.item_name === ingredientNeeded,
      ),
  );

  const closestExpirationDate = findClosestExpirationDate();
  const isExpired = closestExpirationDate < new Date();

  return (
    <div className="ps-4">
      Can be made until:{" "}
      {missingIngredients.length > 0 ? (
        <span className="text-red-500">Missing ingredients</span>
      ) : (
        <span className={isExpired ? "text-red-500" : ""}>
          {closestExpirationDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      )}
    </div>
  );
}
