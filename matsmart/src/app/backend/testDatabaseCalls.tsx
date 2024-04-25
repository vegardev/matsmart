/**
 * This file contains functions for making queries to the test database.
 * The structure and functionality of these functions are identical to those in the `databaseCalls.tsx` file.
 * For detailed documentation on how these functions work, please refer to the corresponding functions in [[databaseCalls]].
 */

import { testquery } from "@/src/app/backend/db";
import {
  Item_database,
  Recipe,
  Recipes_no_content,
  Recipe_items,
  Inventory_items,
  CloseToExpire,
  Shopping_items,
  Tags,
} from "@/src/app/backend/definitions";

console.log("MYSQL_HOST:", process.env.MYSQL_HOST);

export async function fetchDatabaseTest(): Promise<Item_database[]> {
  try {
    const dbquery = await testquery({
      query: "SELECT * FROM item_database",
      values: [],
    });
    return dbquery as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function fetchRecipes(): Promise<Recipes_no_content[]> {
  try {
    const dbquery = await testquery({
      query: "SELECT recipe_id, title, image FROM recipes",
      values: [],
    });
    return dbquery as Recipes_no_content[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function fetchSingleRecipe(recipe_id: number): Promise<Recipe[]> {
  try {
    const dbquery = await testquery({
      query: "SELECT * FROM recipes WHERE recipe_id = ?",
      values: [recipe_id],
    });
    return dbquery as Recipe[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function fetchRecipeItems(
  recipe_id: number,
): Promise<Recipe_items[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT ri.*, id.item_name FROM recipe_items ri RIGHT JOIN item_database id ON (ri.item_id = id.item_id) WHERE ri.recipe_id = ?",
      values: [recipe_id],
    });
    return dbquery as Recipe_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function fetchInventoryItems(
  location: string,
): Promise<Inventory_items[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT inventory.*, item_database.item_name FROM inventory, item_database WHERE inventory.item_id = item_database.item_id AND location = ?",
      values: [location],
    });
    return dbquery as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function deleteInventoryItem(item_id: number): Promise<void> {
  try {
    await testquery({
      query: "DELETE FROM inventory WHERE item_id = ?",
      values: [item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function deleteShoppingListItem(item_id: number): Promise<void> {
  try {
    await testquery({
      query: "DELETE FROM shopping_list WHERE item_id = ?",
      values: [item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchCloseToExpireItems(): Promise<CloseToExpire[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT i.*, id.item_name FROM inventory i INNER JOIN item_database id ON i.item_id = id.item_id WHERE i.expiration_date IN ( SELECT MIN(expiration_date) FROM inventory GROUP BY item_id ) AND i.expiration_date < DATE_ADD(CURDATE(), INTERVAL 5 DAY) ORDER BY i.expiration_date ASC LIMIT 5",
      values: [],
    });
    return dbquery as CloseToExpire[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchGroceryItems(): Promise<Item_database[]> {
  try {
    const dbquery = await testquery({
      query: "SELECT * FROM item_database",
      values: [],
    });
    return dbquery as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function fetchGrocerySuggestions(
  searchQuery: string,
): Promise<Item_database[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT * FROM item_database WHERE item_name LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchRecentlyAddedItems(): Promise<Inventory_items[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT inventory.*, item_database.item_name FROM inventory, item_database WHERE inventory.item_id = item_database.item_id ORDER BY inventory.inventory_id DESC LIMIT 5",
      values: [],
    });
    return dbquery as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchRecipeSuggestions(
  searchQuery: string,
): Promise<Recipes_no_content[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT recipe_id, title, image FROM recipes WHERE title LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Recipes_no_content[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchRecommendedRecipes(): Promise<Recipe[]> {
  try {
    const dbquery = await testquery({
      query: `SELECT *
         FROM recipes 
         WHERE NOT EXISTS (
           SELECT 1 FROM recipe_items 
           WHERE recipe_items.recipe_id = recipes.recipe_id 
           AND recipe_items.item_id NOT IN (
             SELECT inventory.item_id FROM inventory
           )
         )`,
    });
    return dbquery as Recipe[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function fetchShoppingList(): Promise<Shopping_items[]> {
  try {
    const dbquery = await testquery({
      query:
        "SELECT sl.item_id, idb.item_name, sl.item_quantity, sl.item_quantity_type FROM item_database idb, shopping_list sl WHERE idb.item_id = sl.item_id",
      values: [],
    });
    return dbquery as Shopping_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function sortByTag(searchQuery: string): Promise<Tags[]> {
  try {
    const dbquery = await testquery({
      query: "SELECT * FROM tags WHERE tag_name LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Tags[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function submitInventoryItem(
  item_id: number,
  item_quantity: number,
  item_quantity_type: string,
  location: string,
  expiration_date: Date,
): Promise<void> {
  try {
    await testquery({
      query:
        "INSERT INTO inventory (item_id, item_quantity, item_quantity_type, location, expiration_date) VALUES (?, ?, ?, ?, ?)",
      values: [
        item_id,
        item_quantity,
        item_quantity_type,
        location,
        expiration_date,
      ],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

export async function submitShoppingListItem(
  item_id: number,
  item_quantity: number,
  item_quantity_type: string,
): Promise<void> {
  try {
    await testquery({
      query:
        "INSERT INTO shopping_list (item_id, item_quantity, item_quantity_type) VALUES (?, ?, ?)",
      values: [item_id, item_quantity, item_quantity_type],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}
export async function updateShoppingListItem(
  item_id: number,
  itemQuantity: number,
): Promise<void> {
  try {
    await testquery({
      query: "UPDATE shopping_list SET item_quantity = ? WHERE item_id = ?",
      values: [itemQuantity, item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}
