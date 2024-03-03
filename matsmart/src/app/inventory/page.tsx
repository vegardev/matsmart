import Link from "next/link";
import { query } from "../lib/db"

export default async function Page() {
//Kjører spørring mot databsen
  const dbtest = await query({
    query: "SELECT * FROM item_database",
    values: [],
  });

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
        {dbtest.map(item => (
          <div key={item.item_id}>{item.item_name}</div>
        ))}
      </div>
    </>
  );
}
