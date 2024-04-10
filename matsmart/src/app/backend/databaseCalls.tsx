import { query } from "@/src/app/backend/db";
import {
  Item_database,
  Recipe,
  Recipes_no_content,
  Recipe_items,
  Inventory_items,
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

//Fetches all items in a inventory based on a location value
export async function fetchInventoryItems(
  location: string,
): Promise<Inventory_items[]> {
  try {
    const dbquery = await query({
      query: "SELECT * FROM inventory WHERE location = ?",
      values: [location],
    });
    return dbquery as Inventory_items[];
  } catch (error) {
    throw Error((error as Error).message);
  }
}
