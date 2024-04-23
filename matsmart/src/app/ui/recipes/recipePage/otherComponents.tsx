import {
  Inventory_items,
  Add_Recipe_Ingredient,
} from "@/src/app/backend/definitions";
import { getInventory, makeDish } from "@/src/app/backend/uploadData";
import { useEffect, useState } from "react";

/**
 * Renders a component that checks the availability of ingredients needed for a recipe.
 * @param ingredientsNeeded - An array of ingredients needed for the recipe.
 * @returns A React component that displays the closest expiration date of the available ingredients.
 */
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

  /**
   * Finds the closest expiration date among the ingredients needed.
   * @returns {Date} The closest expiration date.
   */
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

  /**
   * Filters out the missing ingredients from the list of ingredients needed for a recipe.
   * @param ingredientsNeeded - The list of ingredients needed for the recipe.
   * @param ingredients - The list of available ingredients.
   * @returns The missing ingredients that are not present in the available ingredients list.
   */
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

/**
 * Renders a button to make a recipe if all the required ingredients are available in the inventory.
 * @param recipe_id - The ID of the recipe.
 * @param ingredientsNeeded - An array of ingredients needed to make the recipe.
 * @returns The MakeRecipeButton component.
 */
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
    /**
     * Fetches the inventory and sets the ingredients state with the fetched data.
     */
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
