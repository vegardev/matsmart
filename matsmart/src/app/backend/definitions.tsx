/* eslint-disable no-unused-vars */

/**
 * Note: Most of the type definitions in this file directly reflect the tables and columns in the database.
 * For example, the 'Item_database' type represents a record from the 'item_database' table, with each property corresponding to a column in the table.
 * This pattern is followed for most types in this file, making it easier to understand the structure of the database and the data it contains.
 */

/**
 * Represents an inventory item that is close to its expiry date.
 */
export type CloseToExpire = {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
};

/**
 * Represents an item, a record from the 'item_database' table.
 * Each property corresponds to a column in the table.
 * Useful for fetching existing items from the database with search queries.
 */
export type Item_database = {
  item_id: number;
  item_name: string;
  item_quantity_type: string;
};

/**
 * Represents a record from the 'tags' table.
 * Each property corresponds to a column in the table.
 */
export type Tags = {
  tag_id: number;
  tag_name: string;
};

/**
 * Represents a preview of a recipe.
 * This is used when listing multiple recipes.
 */
export type Recipe_Preview = {
  recipe_id: number;
  title: string;
  recipe_time: number;
  recipe_image: string;
  recipe_tags: string[];
};

/**
 * Represents a record from the 'recipes' table.
 * Each property corresponds to a column in the table.
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
 * Represents an ingredient, a record from the 'recipe_items' table.
 * Each property corresponds to a column in the table.
 * This type includes item_name, expecting a query to join the 'recipe_items' and 'item_database' tables.
 */
export type Recipe_items = {
  item_id: number;
  recipe_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
};

/**
 * Represents an inventory item.
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

/**
 * Represents an inventory item, a record from the 'inventory' table.
 * Each property corresponds to a column in the table.
 * This type includes item_name, expecting a query to join the 'inventory' and 'item_database' tables.
 */
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
 * Represents the properties of the QuantityDropdown component.
 *
 * @property {Object} props - The props for the component.
 * @property {number} props.quantity - The current quantity.
 * @property {(value: number) => void} props.setQuantity - Function to set the quantity.
 * @property {string} props.quantityType - The current quantity type.
 * @property {(value: string) => void} props.setQuantityType - Function to set the quantity type.
 * @returns The rendered QuantityDropdown component.
 */
export type QuantityDropdownProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  quantityType: string;
  setQuantityType: (quantityType: string) => void;
};

/**
 * Represents the properties of the GroceryTable component.
 * @property {Shopping_items[]} data - The data to be displayed in the table.
 * @property {string} [className] - Optional CSS classes to be applied to the table.
 * @property {(index: number, newQuantity: number) => void} onQuantityChange - Function to handle changes in quantity.
 * @property {(index: number) => void} onDelete - Function to handle deletion of items.
 * @property {boolean[]} checkedStates - Array representing the checked state of each item.
 * @property {(event: React.ChangeEvent<HTMLInputElement>, index: number) => void} onCheckboxChange - Function to handle checkbox changes.
 * @property {string[]} locations - Array representing the location of each item.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} setLocations - Function to set the locations of the items.
 * @property {(index: number, newLocation: string) => void} onLocationChange - Function to handle changes in location.
 * @property {(Date | null)[]} expiryDates - Array representing the expiry dates of each item.
 * @property {(index: number, newDate: Date) => void} onExpiryDateChange - Function to handle changes in expiry date.
 * @property {boolean} anyCheckboxChecked - Boolean indicating if any checkbox is checked.
 */
export type TableProps = {
  /** The data to be displayed in the table. */
  data: Shopping_items[];
  /** Optional CSS classes to be applied to the table. */
  className?: string;
  onQuantityChange: (index: number, newQuantity: number) => void;
  onDelete: (index: number) => void;
  checkedStates: boolean[];
  onCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
  onLocationChange: (index: number, newLocation: string) => void;
  expiryDates: (Date | null)[];
  onExpiryDateChange: (index: number, newDate: Date) => void;
  anyCheckboxChecked: boolean;
};

/**
 * Represents a grocery item, a record from the 'shopping_list' table.
 * Each property corresponds to a column in the table.
 * This type includes item_id and item_name, expecting a query to join the 'shopping_list' and 'item_database' tables.
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
 * Represents the data needed to show a specific recipe page.
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
 * Represents the different types of measurement units an item or ingredient may have.
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
