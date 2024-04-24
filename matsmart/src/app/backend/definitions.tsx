/* eslint-disable no-unused-vars */

/**
 * Represents an item that is close to its expiration date.
 */
export type CloseToExpire = {
  item_id: number; // The ID of the item.
  item_name: string; // The name of the item.
  expiration_date: Date; // The expiration date of the item.
  quantity: number; // The quantity of the item.
  item_type: string; // The type of the item.
};

/**
 * Represents an item in the database.
 */
export type Item_database = {
  item_id: number; // The ID of the item.
  item_name: string; // The name of the item.
  item_quantity_type: string; // The quantity type of the item.
};

/**
 * Represents a tag that can be associated with a recipe.
 */
export type Tags = {
  tag_id: number; // The ID of the tag.
  tag_name: string; // The name of the tag.
};

/**
 * Represents a preview of a recipe. This is used when listing multiple recipes.
 */
export type Recipe_Preview = {
  recipe_id: number; // The ID of the recipe.
  title: string; // The title of the recipe.
  recipe_time: number; // The time it takes to prepare the recipe, in minutes.
  recipe_image: string; // The URL of the image of the recipe.
  recipe_tags: string[]; // An array of tags associated with the recipe.
};

/**
 * Represents a full recipe. This is used when viewing the details of a single recipe.
 */
export type Recipe = {
  recipe_id: number; // The ID of the recipe.
  title: string; // The title of the recipe.
  recipe_method: string; // The method of preparing the recipe.
  recipe_nutritions: string; // The nutritional information of the recipe.
  image: string; // The URL of the image of the recipe.
  recipe_time: string; // The time it takes to prepare the recipe, in minutes.
};

/**
 * Represents a recipe without its content.
 */
export type Recipes_no_content = {
  recipe_id: number; // The ID of the recipe.
  title: string; // The title of the recipe.
  content: string; // The content of the recipe.
  image: string; // The URL of the image of the recipe.
};

/**
 * Represents an item that is part of a recipe.
 */
export type Recipe_items = {
  item_id: number; // The ID of the item.
  recipe_id: number; // The ID of the recipe the item is part of.
  item_quantity: number; // The quantity of the item needed for the recipe.
  item_quantity_type: string; // The type of the quantity (e.g., grams, cups).
  item_name: string; // The name of the item.
};

/**
 * Represents an item in the inventory.
 */
export type Inventory_items = {
  inventory_id?: number; // The ID of the inventory entry. This is optional because it might not be known when adding a new item to the inventory.
  item_id: number; // The ID of the item.
  item_quantity: number; // The quantity of the item in the inventory.
  item_quantity_type: string; // The type of the quantity (e.g., grams, cups).
  item_name: string; // The name of the item.
  item_location: string; // The location of the item in the inventory.
  expiration_date: Date; // The expiration date of the item.
};

export type Inventory_items_proper_location = {
  inventory_id: number;
  item_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
  location: string;
  expiration_date: Date;
};

/**
 * Represents the properties of a quantity dropdown component.
 */
export type QuantityDropdownProps = {
  quantity: number; // The current quantity.
  setQuantity: (quantity: number) => void; // A function to set the quantity.
  quantityType: string; // The current quantity type.
  setQuantityType: (quantityType: string) => void; // A function to set the quantity type.
};

/**
 * Represents an item in the shopping list.
 */
export type Shopping_items = {
  item_id: number; // The ID of the item.
  item_name: string; // The name of the item.
  item_quantity: number; // The quantity of the item.
  item_quantity_type: string; // The type of the quantity (e.g., grams, cups).
  expiration_date: Date; // The expiration date of the item.
};

/**
 * Represents an ingredient to be added to a recipe.
 */
export type Add_Recipe_Ingredient = {
  item_name: string; // The name of the ingredient.
  item_quantity: number; // The quantity of the ingredient.
  item_quantity_type: string; // The type of the quantity (e.g., grams, cups).
};

/**
 * Represents the data needed to create a new recipe.
 */
export type Recipe_CreateType = {
  title: string; // The title of the recipe.
  recipe_time: string; // The time it takes to prepare the recipe, in minutes.
  recipe_image: string; // The URL of the image of the recipe.
  recipe_tags: string[]; // An array of tags associated with the recipe.
  recipe_method: string; // The method of preparing the recipe.
  recipe_ingredients: Add_Recipe_Ingredient[]; // An array of ingredients needed for the recipe.
  recipe_nutritions: string; // The nutritional information of the recipe.
};

/**
 * Represents the data of a recipe page.
 */
export type Recipe_Page = {
  recipe_id: number; // The ID of the recipe.
  title: string; // The title of the recipe.
  recipe_time: number; // The time it takes to prepare the recipe, in minutes.
  recipe_image: string; // The URL of the image of the recipe.
  recipe_tags: string[]; // An array of tags associated with the recipe.
  recipe_method: string; // The method of preparing the recipe.
  recipe_ingredients: Add_Recipe_Ingredient[]; // An array of ingredients needed for the recipe.
  recipe_nutritions: string; // The nutritional information of the recipe.
};

/**
 * Represents the different types of ingredients that can be used in a recipe.
 */
export const ingredientTypes = [
  { name: "stk", abbreviation: "stk." }, // Stykk, stk.
  { name: "liter", abbreviation: "L" }, // Liter
  { name: "desiliter", abbreviation: "dL" }, // Desiliter
  { name: "milliliter", abbreviation: "mL" }, // Milliliter
  { name: "kilogram", abbreviation: "kg" }, // Kilogram
  { name: "gram", abbreviation: "g" }, // Gram
  { name: "teskje", abbreviation: "ts" }, // Teskje
  { name: "spiseskje", abbreviation: "ss" }, // Spiseskje
  { name: "kopp", abbreviation: "kopp" }, // Kopp
];
