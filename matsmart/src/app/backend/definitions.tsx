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
