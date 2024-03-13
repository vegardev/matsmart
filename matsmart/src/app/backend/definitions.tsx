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

export type Recipe = {
  recipe_id: number;
  title: string;
  content: string;
  image: string;
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
  inventory_id: number;
  item_id: number;
  item_quantity: number;
  item_quantity_type: string;
  item_name: string;
  item_location: string;
  expiration_date: string;
};
