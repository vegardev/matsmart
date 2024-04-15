import {
  fetchDatabaseTest,
  fetchRecipes,
  fetchSingelRecipe,
  fetchRecipeItems,
  fetchInventoryItems,
} from "@/src/app/backend/databaseCalls";
import {
  Item_database,
  Recipes_no_content,
  Recipe,
  Recipe_items,
  Inventory_items,
} from "@/src/app/backend/definitions";
import { test, describe } from "@jest/globals";

describe("Database GET tests", () => {
  test("Fetch database test", async () => {
    const result: Item_database[] = await fetchDatabaseTest();
    expect(result).toEqual([
      { item_id: 1, item_name: "Egg", item_quantity_type: "stykk" },
      { item_id: 2, item_name: "Melk", item_quantity_type: "liter" },
      { item_id: 3, item_name: "Mel", item_quantity_type: "gram" },
      { item_id: 4, item_name: "Smør", item_quantity_type: "gram" },
      { item_id: 5, item_name: "Baguette", item_quantity_type: "stykk" },
    ]);
    // Add more assertions here based on the expected structure and values of the result
  });

  test("Fetch all recipes", async () => {
    const result: Recipes_no_content[] = await fetchRecipes();
    expect(result).toEqual([
      {
        recipe_id: 1,
        title: "Stekt egg",
        image:
          "https://aichasmat.no/wp-content/uploads/2016/10/Stekt-egg-pa-marokkansk-vis-.jpg",
      },
      {
        recipe_id: 2,
        title: "Glass med melk",
        image:
          "https://media.snl.no/media/278133/standard_compressed_Vaso_con_leche__Madrid__Espa%C3%B1a__2021_03_1_.jpg",
      },
      {
        recipe_id: 3,
        title: "Melkebolle",
        image: null,
      },
    ]);
    // Add more assertions here based on the expected structure and values of the result
  });

  test("Fetch single recipe", async () => {
    const recipeId = 1; // Replace with a valid recipe ID
    const result: Recipe[] = await fetchSingelRecipe(recipeId);
    expect(result).toEqual([
      {
        recipe_id: 1,
        title: "Stekt egg",
        recipe_method: "Stek egget i en panne.",
        recipe_nutritions: "0",
        image:
          "https://aichasmat.no/wp-content/uploads/2016/10/Stekt-egg-pa-marokkansk-vis-.jpg",
        recipe_time: null,
      },
    ]);
    // Add more assertions here based on the expected structure and values of the result
  });

  test("Fetch recipe items", async () => {
    const recipeId = 1; // Replace with a valid recipe ID
    const result: Recipe_items[] = await fetchRecipeItems(recipeId);
    expect(result).toEqual([
      {
        item_id: 1,
        item_name: "Egg",
        item_quantity: 1,
        item_quantity_type: "stykk",
        recipe_id: 1,
      },
      {
        item_id: 4,
        item_name: "Smør",
        item_quantity: 5,
        item_quantity_type: "gram",
        recipe_id: 1,
      },
    ]);
    // Add more assertions here based on the expected structure and values of the result
  });

  test("Fetch inventory items", async () => {
    const location = "kjøleskap"; // Replace with a valid location
    const result: Inventory_items[] = await fetchInventoryItems(location);
    expect(result).toEqual([
      {
        inventory_id: 1,
        item_id: 1,
        item_name: "Egg",
        item_quantity: 6,
        item_quantity_type: "stykk",
        location: "kjøleskap",
        expiration_date: "2024-04-17",
      },
      {
        inventory_id: 2,
        item_id: 2,
        item_name: "Melk",
        item_quantity: 2,
        item_quantity_type: "liter",
        location: "kjøleskap",
        expiration_date: "2024-03-10",
      },
      {
        inventory_id: 4,
        item_id: 1,
        item_name: "Egg",
        item_quantity: 2,
        item_quantity_type: "stykk",
        location: "kjøleskap",
        expiration_date: "2024-02-29",
      },
    ]);
    // Add more assertions here based on the expected structure and values of the result
  });
});
