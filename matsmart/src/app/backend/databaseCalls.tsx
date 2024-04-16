import { query } from "@/src/app/backend/db";
import {
  Item_database,
  Recipe,
  Recipes_no_content,
  Recipe_items,
  Inventory_items,
  Shopping_items,
} from "@/src/app/backend/definitions";

//Posts to console if you have connection with the database
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);

//test query to see ifthe datase fetching works
export async function fetchDatabaseTest(): Promise<Item_database[]> {
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
//Fetches all data (excluding content) from all recipes in the database
//  Skal utvidde spørring for å ha tags med
//  Burde legges til en check for om id er større og mindre en noen verdier for å kun vise et bestemt antall per side
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

//Fetches a single recipe based on a recipe_id value
export async function fetchSingelRecipe(recipe_id: number): Promise<Recipe[]> {
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

//Fetces info about items needed for a recipe based on a recipe_id value
export async function fetchRecipeItems(
  recipe_id: number
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

//Fetches all items in a inventory based on a location value
// Gjorde endring slik at navn på item hentes fra item_database
export async function fetchInventoryItems(
  location: string
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

// Gjør full text search på recipe titles i databasen, og returnerer en liste med oppskrifter som matcher
export async function fetchRecipeSuggestions(
  searchQuery: string
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

// Gjør full text search på item names i databasen, og returnerer en liste med items som matcher
export async function fetchGrocerySuggestions(
  searchQuery: string
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

// Fetcher alle items i shopping_list
// Gjorde endring slik at navn på shopping list items hentes fra item_database
export async function fetchShoppingList(): Promise<Shopping_items[]> {
  try {
    const dbquery = await query({
      query:
        "SELECT idb.item_name, sl.item_quantity, sl.item_quantity_type FROM item_database idb, shopping_list sl WHERE idb.item_id = sl.item_id",
      values: [],
    });
    return dbquery as Shopping_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}

// Submitter ny item til item_database
export async function submitGroceryItem(
  item_name: string,
  item_quantity_type: string
): Promise<void> {
  try {
    await query({
      query:
        "INSERT INTO item_database (item_name, item_quantity_type) VALUES (?, ?)",
      values: [item_name, item_quantity_type],
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
}

// Submitter ny item til shopping_list
export async function submitShoppingListItem(
  item_id: number,
  item_quantity: number,
  item_quantity_type: string
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

// Fetcher alle grocery items fra item_database
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
