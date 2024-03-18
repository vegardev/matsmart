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

interface Recipe {
  recipe_id: number;
  title: string;
  content: string;
  image: string;
}

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
    item_name: "Kebab",
  },
  {
    item_id: 5,
    item_name: "Pizza",
  },
  { item_id: 6, item_name: "Bunnprisburger" },
];

const dummyRecommended: Recommended[] = [
  {
    item_id: 7,
    item_name: "Pizza med croissant",
  },
  {
    item_id: 8,
    item_name: "Bunnprisburger",
  },
];

export default function Page() {
  return (
    <main className="light-background">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      <div className="light-blue flex">
        <NewGroceriesItems NewGroceriesItems={dummyGroceries} />
        <RecommendedItems RecommendedItems={dummyRecommended} />
        <CloseToExpireItems CloseToExpireItems={dummyDates} />
      </div>
    </main>
  );
}
