/* eslint-disable no-unused-vars */
export type CloseToExpire = {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
};

export type Item_database = {
  item_id: number;
  item_name: string;
  item_quantity_type: string;
};

export type Tags = {
  tag_id: number;
  tag_name: string;
};

export type Recipe_Preview = {
  recipe_id: number;
  recipe_name: string;
  recipe_time: number;
  recipe_image: string;
  recipe_tags: string[];
};

export type Recipe = {
  recipe_id: number;
  title: string;
  recipe_method: string;
  recipe_nutritions: string;
  image: string;
  recipe_time: string;
};

export type Recipes_no_content = {
  recipe_id: number;
  title: string;
  content: string;
  image: string;
};

export type Recipe_items = {
  item_id: number;
  recipe_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
};

//expiration date burde nok endres type til Date
export type Inventory_items = {
  inventory_id?: number;
  item_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
  item_location: string;
  expiration_date?: string;
};

/*
-----------
-----------
Husk å fiks opp i type greiene senere
-----------
-----------
*/
export type Inventory_items2 = {
  inventory_id?: number;
  item_id?: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
  item_location?: string;
  expiration_date: string;
};

export type Recipe_Page = {
  recipe_id: number;
  recipe_name: string;
  recipe_time: number;
  recipe_image: string;
  recipe_tags: string[];
  recipe_method: string;
  recipe_ingredients: string[];
  recipe_nutrition: string;
};

export type QuantityDropdownProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  quantityType: string;
  setQuantityType: (quantityType: string) => void;
};

export type Shopping_items = {
  item_id: number;
  item_name: string;
  item_quantity: number;
  item_quantity_type: string;
};
