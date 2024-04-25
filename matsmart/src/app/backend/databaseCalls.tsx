/**
 * Note: In this system, items from the 'item_database' table serve multiple purposes:
 * - When an item is in the shopping list, it is referred to as a "grocery item".
 * - When an item is in the inventory, it is referred to as an "inventory item".
 * - When an item is used in a recipe, it is referred to as an "ingredient".
 */

import { query } from "@/src/app/backend/db";
import mysql, { RowDataPacket } from "mysql2/promise";
import {
  Item_database,
  Recipe,
  Recipes_no_content,
  Recipe_items,
  Inventory_items,
  Shopping_items,
  Tags,
  CloseToExpire,
} from "@/src/app/backend/definitions";

/**
 * Fetches all recipes from the 'recipes' table in the database.
 * @returns {Promise<Recipes_no_content[]>} A promise that resolves to an array of recipe previews. Each preview includes the 'recipe_id', 'title', and 'image' from the 'recipes' table, but does not include the full recipe content. This is used for displaying a list of recipes that can be clicked on for further details.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchRecipes(): Promise<Recipes_no_content[]> {
  try {
    const dbquery = await query({
      query: "SELECT recipe_id, title, image FROM recipes",
      values: [],
    });
    return dbquery as Recipes_no_content[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches a single recipe from the 'recipes' table in the database.
 * @param {number} recipe_id - The ID of the recipe to fetch.
 * @returns {Promise<Recipe[]>} A promise that resolves to an array containing the fetched recipe.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchSingleRecipe(recipe_id: number): Promise<Recipe[]> {
  try {
    const dbquery = await query({
      query: "SELECT * FROM recipes WHERE recipe_id = ?",
      values: [recipe_id],
    });
    return dbquery as Recipe[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches all items, in this context ingredients, required for a specific recipe from the 'recipe_items' table in the database.
 * Joins the 'recipe_items' and 'item_database' tables to get 'item_name'.
 * @param {number} recipe_id - The ID of the recipe to fetch items for.
 * @returns {Promise<Recipe_items[]>} A promise that resolves to an array of required ingredients for the specified recipe.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchRecipeItems(
  recipe_id: number,
): Promise<Recipe_items[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT ri.*, id.item_name FROM recipe_items ri RIGHT JOIN item_database id ON (ri.item_id = id.item_id) WHERE ri.recipe_id = ?",
      values: [recipe_id],
    });
    return dbquery as Recipe_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches all inventory items in a specific location from the 'inventory' table in the database.
 * Joins the 'inventory' and 'item_database' tables to get 'item_name'.
 * @param {string} location - The location to fetch inventory items for.
 * @returns {Promise<Inventory_items[]>} A promise that resolves to an array of inventory items in the specified location.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchInventoryItems(
  location: string,
): Promise<Inventory_items[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT inventory.*, item_database.item_name FROM inventory, item_database WHERE inventory.item_id = item_database.item_id AND location = ?",
      values: [location],
    });
    return dbquery as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Submits a new inventory item to the 'inventory' table in the database.
 * @param {number} item_id - The ID of the item.
 * @param {number} item_quantity - The quantity of the item.
 * @param {string} item_quantity_type - The unit of the item quantity (e.g., "kilogram", "gram", "stk").
 * @param {string} location - The location of the item.
 * @param {Date} expiration_date - The expiry date of the item.
 * @returns {Promise<void>} A promise that resolves when the item has been successfully submitted.
 * @throws {Error} When there is an error executing the database query.
 */
export async function submitInventoryItem(
  item_id: number,
  item_quantity: number,
  item_quantity_type: string,
  location: string,
  expiration_date: Date,
): Promise<void> {
  try {
    await query({
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

/**
 * Deletes an inventory item from the 'inventory' table in the database.
 * @param {number} item_id - The ID of the item to delete.
 * @returns {Promise<void>} A promise that resolves when the item has been successfully deleted.
 * @throws {Error} When there is an error executing the database query.
 */
export async function deleteInventoryItem(item_id: number): Promise<void> {
  try {
    await query({
      query: "DELETE FROM inventory WHERE item_id = ?",
      values: [item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches recipe suggestions based on a full-text search query on the 'title' column from the 'recipes' table in the database.
 * @param {string} searchQuery - The search query that fetches approximately matching recipe suggestions.
 * @returns {Promise<Recipes_no_content[]>} A promise that resolves to an array of recipe suggestions.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchRecipeSuggestions(
  searchQuery: string,
): Promise<Recipes_no_content[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT recipe_id, title, image FROM recipes WHERE title LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Recipes_no_content[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches grocery item suggestions based on a full-text search query on the 'item_name' column from the 'item_database' table in the database.
 * @param {string} searchQuery - The search query that fetches approximately matching grocery item suggestions.
 * @returns {Promise<Item_database[]>} A promise that resolves to an array of grocery item suggestions.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchGrocerySuggestions(
  searchQuery: string,
): Promise<Item_database[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT * FROM item_database WHERE item_name LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches tag suggestions based on a full-text search query on the 'tag_name' column from the 'tags' table in the database.
 * @param {string} searchQuery - The search query that fetches approximately matching tag suggestions.
 * @returns {Promise<Tags[]>} A promise that resolves to an array of tags.
 * @throws {Error} When there is an error executing the database query.
 */
export async function sortByTag(searchQuery: string): Promise<Tags[]> {
  try {
    const dbquery = await query({
      query: "SELECT * FROM tags WHERE tag_name LIKE CONCAT('%', ?, '%')",
      values: [searchQuery],
    });
    return dbquery as Tags[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches all items registered in the 'shopping_list' table in the database.
 * Joins the 'shopping_list' and 'item_database' tables to get 'item_name'.
 * @returns {Promise<Shopping_items[]>} A promise that resolves to an array of items registered in the shopping list.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchShoppingList(): Promise<Shopping_items[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT sl.item_id, idb.item_name, sl.item_quantity, sl.item_quantity_type FROM item_database idb, shopping_list sl WHERE idb.item_id = sl.item_id",
      values: [],
    });
    return dbquery as Shopping_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Submits a new item to the 'item_database' table in the database.
 * @param {string} item_name - The name of the item.
 * @param {string} item_quantity_type - The unit of the item quantity (e.g., "kilogram", "gram", "stk").
 * @returns {Promise<number>} A promise that resolves to the ID of the newly inserted item.
 * @throws {Error} When there is an error executing the database query.
 */
export async function submitGroceryItem(
  item_name: string,
  item_quantity_type: string,
): Promise<number> {
  const dbconnection = await mysql.createConnection({
    host: "mysql.stud.ntnu.no",
    database: "fs_idatt1005_1_bdigsec4_datab",
    user: "fs_idatt1005_1_group_bdigsec4",
    password: "Password",
  });

  try {
    await dbconnection.beginTransaction();

    await dbconnection.query(
      "INSERT INTO item_database (item_name, item_quantity_type) VALUES (?, ?)",
      [item_name, item_quantity_type],
    );

    const [rows] = (await dbconnection.query(
      "SELECT LAST_INSERT_ID() as item_id",
    )) as RowDataPacket[];

    await dbconnection.commit();

    return rows[0].item_id;
  } catch (error) {
    await dbconnection.rollback();
    throw Error((error as Error).message);
  } finally {
    dbconnection.end();
  }
}

/**
 * Submits a new grocery item to the 'shopping_list' table in the database.
 * @param {number} item_id - The ID of the item.
 * @param {number} item_quantity - The quantity of the item.
 * @param {string} item_quantity_type - The unit of the item quantity (e.g., "kilogram", "gram", "stk").
 * @returns {Promise<void>} A promise that resolves when the item has been successfully submitted.
 * @throws {Error} When there is an error executing the database query.
 */
export async function submitShoppingListItem(
  item_id: number,
  item_quantity: number,
  item_quantity_type: string,
): Promise<void> {
  try {
    await query({
      query:
        "INSERT INTO shopping_list (item_id, item_quantity, item_quantity_type) VALUES (?, ?, ?)",
      values: [item_id, item_quantity, item_quantity_type],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Updates the quantity of a grocery item in the 'shopping_list' table in the database.
 * @param {number} item_id - The ID of the item to update.
 * @param {number} itemQuantity - The new quantity of the item.
 * @returns {Promise<void>} A promise that resolves when the item quantity has been successfully updated.
 * @throws {Error} When there is an error executing the database query.
 */
export async function updateShoppingListItem(
  item_id: number,
  itemQuantity: number,
): Promise<void> {
  try {
    await query({
      query: "UPDATE shopping_list SET item_quantity = ? WHERE item_id = ?",
      values: [itemQuantity, item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Deletes a grocery item from the 'shopping_list' table in the database.
 * @param {number} item_id - The ID of the item to delete.
 * @returns {Promise<void>} A promise that resolves when the item has been successfully deleted.
 * @throws {Error} When there is an error executing the database query.
 */
export async function deleteShoppingListItem(item_id: number): Promise<void> {
  try {
    await query({
      query: "DELETE FROM shopping_list WHERE item_id = ?",
      values: [item_id],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches all registered grocery items from the 'item_database' table in the database.
 * @returns {Promise<Item_database[]>} A promise that resolves to an array of registered grocery items.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchGroceryItems(): Promise<Item_database[]> {
  try {
    const dbquery = await query({
      query: "SELECT * FROM item_database",
      values: [],
    });
    return dbquery as Item_database[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches recommended recipes from the 'recipes' table in the database.
 * A recipe is recommended if all its items, in this context ingredients, are available in the inventory.
 * @returns {Promise<Recipe[]>} A promise that resolves to an array of recommended recipes.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchRecommendedRecipes(): Promise<Recipe[]> {
  try {
    const dbquery = await query({
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

/**
 * Fetches inventory items from the 'inventory' table in the database that are close to their expiry date.
 * An item is considered close to expiry if its expiry date is within the next 5 days.
 * The query returns the 5 items closest to expiry.
 * @returns {Promise<CloseToExpire[]>} A promise that resolves to an array of items close to expiry.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchCloseToExpireItems(): Promise<CloseToExpire[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT i.*, id.item_name FROM inventory i INNER JOIN item_database id ON i.item_id = id.item_id WHERE i.expiration_date IN ( SELECT MIN(expiration_date) FROM inventory GROUP BY item_id ) AND i.expiration_date < DATE_ADD(CURDATE(), INTERVAL 5 DAY) ORDER BY i.expiration_date ASC LIMIT 5",
      values: [],
    });
    return dbquery as CloseToExpire[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

/**
 * Fetches the 5 most recently added inventory items from the 'inventory' table in the database.
 * Sorts the items by 'inventory_id' in descending order, thus resulting in the 5 most recent entries.
 * @returns {Promise<Inventory_items[]>} A promise that resolves to an array of recently added items.
 * @throws {Error} When there is an error executing the database query.
 */
export async function fetchRecentlyAddedItems(): Promise<Inventory_items[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT inventory.*, item_database.item_name FROM inventory, item_database WHERE inventory.item_id = item_database.item_id ORDER BY inventory.inventory_id DESC LIMIT 5",
      values: [],
    });
    return dbquery as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
