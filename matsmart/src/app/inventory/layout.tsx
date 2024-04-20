import Link from "next/link";

const links: any[] = [
  { name: "Pantry", href: "skuff" },
  { name: "Fridge", href: "kjøleskap" },
  { name: "Freezer", href: "fryser" },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Inventory</h1>
      <div className="flex flex-row">
        <div className="flex flex-col px-1.5 space-y-1.5">
          {links.map((link) => {
            return (
              <div
                key={link.name}
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <Link href={`/inventory/${link.href}`}>{link.name}</Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap rounded-md bg-gray-50 p-4 flex-auto">
          {children}
        </div>
      </div>
    </>
  );
}
