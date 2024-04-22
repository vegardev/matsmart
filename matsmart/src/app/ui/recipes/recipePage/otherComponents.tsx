import {
  Inventory_items,
  Add_Recipe_Ingredient,
} from "@/src/app/backend/definitions";
import { getInventory, makeDish } from "@/src/app/backend/uploadData";
import { useEffect, useState } from "react";

export function IngredientsCheck({
  ingredientsNeeded,
}: {
  ingredientsNeeded: Add_Recipe_Ingredient[];
}) {
  const [ingredients, setIngredients] = useState<Inventory_items[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const inventory = await getInventory();
      const inventoryWithDates = inventory.map((item) => ({
        ...item,
        expiration_date: new Date(item.expiration_date),
      }));
      setIngredients(inventoryWithDates);
    };

    fetchInventory();
  }, []);

  function findClosestExpirationDate() {
    let closestExpirationDate = new Date(8640000000000000);
    ingredientsNeeded.map((ingredientNeeded) => {
      ingredients.map((ingredient) => {
        const ingredientExpirationDate = new Date(ingredient.expiration_date);
        if (
          ingredient.item_name === ingredientNeeded.item_name &&
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
        (ingredient) => ingredient.item_name === ingredientNeeded.item_name,
      ),
  );

  const closestExpirationDate = findClosestExpirationDate();
  const isExpired = closestExpirationDate < new Date();

  return (
    <div className="ps-4">
      Can be made until:{" "}
      {missingIngredients.length > 0 ? (
        <span className="text-red-600">Missing ingredients</span>
      ) : (
        <span className={isExpired ? "text-red-600" : ""}>
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

export function MakeRecipeButton({
  recipe_id,
  ingredientsNeeded,
}: {
  recipe_id: number;
  ingredientsNeeded: Add_Recipe_Ingredient[];
}) {
  const [isMaking, setIsMaking] = useState(false);
  const [ingredients, setIngredients] = useState<Inventory_items[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const inventory = await getInventory();
      const inventoryWithDates = inventory.map((item) => ({
        ...item,
        expiration_date: new Date(item.expiration_date),
      }));
      setIngredients(inventoryWithDates);
    };

    fetchInventory();
  }, []);

  const handleMake = async () => {
    setIsMaking(true);
    await makeDish(recipe_id);
    setIsMaking(false);
    window.location.reload();
  };

  const missingIngredients = ingredientsNeeded.filter(
    (ingredientNeeded) =>
      !ingredients.some(
        (ingredient) => ingredient.item_name === ingredientNeeded.item_name,
      ),
  );

  if (missingIngredients.length > 0) {
    return null;
  }

  return (
    <button
      className="bg-blue-600 px-3 rounded-lg text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={handleMake}
      disabled={isMaking}
    >
      {isMaking ? "Making..." : "Make dish"}
    </button>
  );
}
