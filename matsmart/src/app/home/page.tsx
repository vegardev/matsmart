import CloseToExpireItems from "@/src/app/ui/home/closestToExpire";
import NewGroceriesItems from "@/src/app/ui/home/newgroceriesItems";

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
    item_name: "Kebab",
  },
  {
    item_id: 5,
    item_name: "Pizza",
  },
  { item_id: 6, item_name: "Bunnprisburger" },
];
/* gammel Page
export default function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <CloseToExpireItems CloseToExpireItems={dummyData} />
      </div>
    </main>
  );
}
*/

//ny page
export default function Page() {
  return (
    <main className="light-background">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <CloseToExpireItems CloseToExpireItems={dummyDates} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <NewGroceriesItems NewGroceriesItems={dummyGroceries} />
      </div>
    </main>
  );
}
