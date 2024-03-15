import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newgroceriesItems";
import RecommendedItems from "@/src/app/ui/home/recipesRecommended";

interface CloseToExpire {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
}

interface Groceries {
  item_id: number;
  item_name: string;
}

interface Recipe {
  recipe_id: number;
  title: string;
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

const dummyGroceries: Groceries[] = [
  {
    item_id: 4,
    item_name: "Egg",
  },
  {
    item_id: 5,
    item_name: "Tomato",
  },
  { item_id: 6, item_name: "Protein Nut" },
];

const dummyRecommended: Recipe[] = [
  {
    recipe_id: 7,
    title: "Pizza med croissant",
  },
  {
    recipe_id: 8,
    title: "Bunnprisburger",
  },
];
/*
export default function Page() {
  return (
    <main className="light-background">
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      <div className="light-blue flex">
        <div className="flex grow flex-col justify-between rounded-xl light-blue">
          <NewGroceriesItems NewGroceriesItems={dummyGroceries} />
          <RecommendedItems RecommendedItems={dummyRecommended} />
          <CloseToExpireItems CloseToExpireItems={dummyDates} />
        </div>
      </div>
    </main>
  );
}
*/
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
