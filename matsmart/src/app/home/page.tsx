import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newgroceriesItems";
import RecommendedItems from "@/src/app/ui/home/recipesRecommended";

// Test data

interface CloseToExpire {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
}

interface Item_database {
  item_id: number;
  item_name: string;
  item_quantity_type: string;
}

export type Recipe = {
  recipe_id: number;
  title: string;
  recipe_method: string;
  recipe_nutritions: string;
  image: string;
  recipe_time: string;
};

const dummyDates: CloseToExpire[] = [
  {
    item_id: 1,
    item_name: "Milk",
    expiration_date: new Date(2022, 1, 20),
    quantity: 2,
    item_type: "Dairy",
  },
  {
    item_id: 2,
    item_name: "Bread",
    expiration_date: new Date(2024, 2, 3),
    quantity: 1,
    item_type: "Bakery",
  },
  {
    item_id: 3,
    item_name: "Apples",
    expiration_date: new Date(2025, 2, 1),
    quantity: 10,
    item_type: "Fruit",
  },
];

const dummyGroceries: Item_database[] = [
  {
    item_id: 4,
    item_name: "Egg",
    item_quantity_type: "stk",
  },
  {
    item_id: 5,
    item_name: "Tomato",
    item_quantity_type: "stk",
  },
  { item_id: 6, item_name: "Protein Nut", item_quantity_type: "stk" },
];

const dummyRecommended: Recipe[] = [
  {
    recipe_id: 7,
    title: "Pizza med croissant",
    recipe_method: "lalal",
    recipe_nutritions: "string",
    image: "lolol",
    recipe_time: "string",
  },
  {
    recipe_id: 8,
    title: "Bunnprisburger",
    recipe_method: "lalal",
    recipe_nutritions: "string",
    image: "nfer",
    recipe_time: "string",
  },
];

export default function Page() {
  return (
    <main className="light-background">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      <div className="light-blue flex">
        <div className="flex grow flex-row rounded-xl light-blue">
          <div className="home-container">
            <NewGroceriesItems NewGroceriesItems={dummyGroceries} />
          </div>
          <div className="home-container">
            <RecommendedItems RecommendedItems={dummyRecommended} />
          </div>
          <div className="home-container">
            <CloseToExpireItems CloseToExpireItems={dummyDates} />
          </div>
        </div>
      </div>
    </main>
  );
}
