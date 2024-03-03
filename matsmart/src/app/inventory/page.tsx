import Link from "next/link";
import { fetchDatabaseTest } from "@/src/app/backend/databaseCalls";

export default async function Page() {
  const databaseTests = await fetchDatabaseTest();
  return (
    <>
      <Link href="inventory/pantry">Pantry</Link>
      <br />
      <Link href="inventory/fridge">Fridge</Link>
      <br />
      <Link href="inventory/freezer">Freezer</Link>
      <br />
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Add to inventory</a>

      {/* Usikker på hvordan man får vekk den error-markeringen, for det fungerer som det skal */}
      <div>
        {databaseTests.map((item) => (
          <div key={item.item_id}>{item.item_name}</div>
        ))}
      </div>
    </>
  );
}
