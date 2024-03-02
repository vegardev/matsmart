import { Card } from "@/src/app/ui/home/cards";
import CloseToExpire from "@/src/app/ui/home/closestToExpire";

interface CloseToExpire {
  item_id: number;
  item_name: string;
  expiration_date: Date;
  quantity: number;
  item_type: string;
}
const dummyData: CloseToExpire[] = [
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

export default function Page() {
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={1} type="collected" />
        <Card title="Pending" value={2} type="pending" />
        <Card title="Total Invoices" value={3} type="invoices" />
        <Card title="Total Customers" value={4} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <CloseToExpire CloseToExpire={dummyData} />
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
