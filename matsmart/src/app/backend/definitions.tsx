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

export type Groceries = {
  item_id: number;
  item_name: string;
};

export type Recommended = {
  item_id: number;
  item_name: string;
};
