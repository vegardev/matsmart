import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="inventory/pantry">Pantry</Link>
      <br />
      <Link href="inventory/fridge">Fridge</Link>
      <br />
      <Link href="inventory/freezer">Freezer</Link>
      <br />
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Add to inventory</a>
    </>
  );
}
