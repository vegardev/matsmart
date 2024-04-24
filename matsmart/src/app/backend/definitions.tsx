/* eslint-disable no-unused-vars */

/**
 * Represents an item that is close to its expiration date.
 */
export type CloseToExpire = {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
};

/**
 * Represents an item in the database.
 */
export type Item_database = {
  item_id: number;
  item_name: string;
  item_quantity_type: string;
};

/**
 * Represents a tag that can be associated with a recipe.
 */
export type Tags = {
  tag_id: number;
  tag_name: string;
};

/**
 * Represents a preview of a recipe. This is used when listing multiple recipes.
 */
export type Recipe_Preview = {
  recipe_id: number;
  title: string;
  recipe_time: number;
  recipe_image: string;
  recipe_tags: string[];
};

/**
 * Represents a full recipe. This is used when viewing the details of a single recipe.
 */
export type Recipe = {
  recipe_id: number;
  title: string;
  recipe_method: string;
  recipe_nutritions: string;
  image: string;
  recipe_time: string;
};

/**
 * Represents a recipe without its content.
 */
export type Recipes_no_content = {
  recipe_id: number;
  title: string;
  content: string;
  image: string;
};

/**
 * Represents an item that is part of a recipe.
 */
export type Recipe_items = {
  item_id: number;
  recipe_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
};

/**
 * Represents an item in the inventory.
 */
export type Inventory_items = {
  inventory_id?: number;
  item_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
  item_location: string;
  expiration_date: Date;
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
  quantity: number;
  setQuantity: (quantity: number) => void;
  quantityType: string;
  setQuantityType: (quantityType: string) => void;
};

/**
 * Represents an item in the shopping list.
 */
export type Shopping_items = {
  item_id: number;
  item_name: string;
  item_quantity: number;
  item_quantity_type: string;
  expiration_date: Date;
};

/**
 * Represents an ingredient to be added to a recipe.
 */
export type Add_Recipe_Ingredient = {
  item_name: string;
  item_quantity: number;
  item_quantity_type: string;
};

/**
 * Represents the data needed to create a new recipe.
 */
export type Recipe_CreateType = {
  title: string;
  recipe_time: string;
  recipe_image: string;
  recipe_tags: string[];
  recipe_method: string;
  recipe_ingredients: Add_Recipe_Ingredient[];
  recipe_nutritions: string;
};

/**
 * Represents the data of a recipe page.
 */
export type Recipe_Page = {
  recipe_id: number;
  title: string;
  recipe_time: number;
  recipe_image: string;
  recipe_tags: string[];
  recipe_method: string;
  recipe_ingredients: Add_Recipe_Ingredient[];
  recipe_nutritions: string;
};

/**
 * Represents the different types of ingredients that can be used in a recipe.
 */
export const ingredientTypes = [
  { name: "stk", abbreviation: "stk." },
  { name: "liter", abbreviation: "L" },
  { name: "desiliter", abbreviation: "dL" },
  { name: "milliliter", abbreviation: "mL" },
  { name: "kilogram", abbreviation: "kg" },
  { name: "gram", abbreviation: "g" },
  { name: "teskje", abbreviation: "ts" },
  { name: "spiseskje", abbreviation: "ss" },
  { name: "kopp", abbreviation: "kopp" },
];
