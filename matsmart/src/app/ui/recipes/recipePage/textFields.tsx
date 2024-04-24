import clsx from "clsx";
import { ShoppingCartIcon as ShoppingCartIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Add_Recipe_Ingredient,
  ingredientTypes,
  Inventory_items,
} from "@/src/app/backend/definitions";
import {
  getInventory,
  addItemToShoppingList,
} from "@/src/app/backend/uploadData";

/**
 * Renders the RecipeTextFields component.
 *
 * @param type - The type of the text field.
 * @param content - The content of the text field.
 */
export function RecipeTextFields({
  type,
  content,
}: {
  type: string;
  content: string | Add_Recipe_Ingredient[];
}) {
  const [clickedIngredients, setClickedIngredients] = useState<
    Add_Recipe_Ingredient[]
  >([]);
  const router = useRouter();
  const [allIngredients, setAllIngredients] = useState<Inventory_items[]>([]);

  /**
   * Handles the "Buy All" action for the recipe page.
   * If the content is an array, it maps the content array to an array of promises.
   * It checks if each ingredient is already in the inventory.
   * If the ingredient is in the inventory and has the same quantity type, it calculates the missing quantity and adds it to the shopping list.
   * If the ingredient is not in the inventory, it adds it to the shopping list.
   * After all promises are resolved, it asks the user if they want to be redirected to the shopping list.
   * If the user confirms, it redirects them to the shopping list page.
   */
  const handleBuyAll = async () => {
    if (Array.isArray(content)) {
      /**
       * Adds ingredients to the shopping list based on the provided content.
       * @param {Add_Recipe_Ingredient[]} content - The list of ingredients to add.
       * @param {InventoryItem[]} allIngredients - The list of all available ingredients.
       * @returns {Promise[]} - An array of promises representing the asynchronous operations.
       */
      const promises = content.map((ingredient: Add_Recipe_Ingredient) => {
        const inventoryItem = allIngredients.find(
          (inventory) => inventory.item_name === ingredient.item_name,
        );

        if (
          inventoryItem &&
          inventoryItem.item_quantity_type === ingredient.item_quantity_type
        ) {
          const missingQuantity =
            ingredient.item_quantity - inventoryItem.item_quantity;

          return addItemToShoppingList({
            item_id: inventoryItem.item_id,
            item_quantity: missingQuantity,
            item_quantity_type: ingredient.item_quantity_type,
          });
        } else {
          return addItemToShoppingList({
            item_quantity: ingredient.item_quantity,
            item_quantity_type: ingredient.item_quantity_type,
            item_name: ingredient.item_name,
          });
        }
      });

      // Wait for all promises to resolve
      await Promise.all(promises);
    }

    if (window.confirm("Do you want to be redirected to the shopping list?")) {
      router.push("/shoppinglist");
    }
  };

  /**
   * Handles the click event on an ingredient icon.
   * Adds the clicked ingredient to the clickedIngredients state.
   * Checks if the ingredient is already in the inventory.
   * If it is, checks if the quantities match.
   * If the quantities don't match, adds the missing quantity to the shopping list.
   * If the ingredient is not in the inventory, adds it to the shopping list.
   *
   * @param ingredient - The ingredient object that was clicked.
   */
  const handleIconClick = (ingredient: Add_Recipe_Ingredient) => {
    setClickedIngredients((prevState) => [...prevState, ingredient]);

    const inventoryItem = allIngredients.find(
      (inventory) => inventory.item_name === ingredient.item_name,
    );

    if (
      inventoryItem &&
      inventoryItem.item_quantity_type === ingredient.item_quantity_type
    ) {
      const missingQuantity =
        ingredient.item_quantity - inventoryItem.item_quantity;

      if (missingQuantity > 0) {
        addItemToShoppingList({
          item_id: inventoryItem.item_id,
          item_quantity: missingQuantity,
          item_quantity_type: ingredient.item_quantity_type,
        });
      }
    } else {
      addItemToShoppingList({
        item_quantity: ingredient.item_quantity,
        item_quantity_type: ingredient.item_quantity_type,
        item_name: ingredient.item_name,
      });
    }
  };

  /**
   * Retrieves the abbreviation for a given quantity type.
   * @param quantityType - The quantity type for which to retrieve the abbreviation.
   * @returns The abbreviation for the given quantity type, or the quantity type itself if no abbreviation is found.
   */
  function getAbbreviation(quantityType: string) {
    const type = ingredientTypes.find((type) => type.name === quantityType);
    return type ? type.abbreviation : quantityType;
  }

  useEffect(() => {
    const fetchInventory = async () => {
      const inventory = await getInventory();
      setAllIngredients(inventory);
    };

    fetchInventory();
  }, []);

  return (
    <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
      <h2 className="py-4 mx-3 text-2xl font-bold">{type + ":"}</h2>
      <div className={"bg-white px-6 py-3 rounded-2xl"}>
        {type === "Ingredients" && Array.isArray(content) ? (
          <div className="flex flex-col">
            <ul>
              {content.map((ingredient, index) => (
                <li key={index} className="list-disc mb-2">
                  <div
                    className={clsx("flex justify-between border-b", {
                      "text-red-600": !allIngredients.some(
                        (inventory) =>
                          inventory.item_name === ingredient.item_name &&
                          inventory.item_quantity >= ingredient.item_quantity,
                      ),
                    })}
                  >
                    {ingredient.item_name} {ingredient.item_quantity}{" "}
                    {getAbbreviation(ingredient.item_quantity_type)}
                    {!allIngredients.some(
                      (inventory) =>
                        inventory.item_name === ingredient.item_name &&
                        inventory.item_quantity >= ingredient.item_quantity,
                    ) &&
                    !clickedIngredients.some(
                      (clickedIngredient) =>
                        clickedIngredient.item_name === ingredient.item_name,
                    ) ? (
                      <div>
                        <ShoppingCartIconSolid
                          className="size-5 text-black hover:cursor-pointer hover:text-blue-400 mt-[2px]"
                          onClick={() => handleIconClick(ingredient)}
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="col-span-5"
            dangerouslySetInnerHTML={{ __html: content as string }}
          />
        )}
      </div>
      {type === "Ingredients" && (
        <button
          className="mt-4 bg-white mx-auto w-4/6 p-2 hover:text-blue-500 rounded-full border-2"
          onClick={handleBuyAll}
        >
          Add All Missing Ingredients to Shopping List
        </button>
      )}
    </div>
  );
}
