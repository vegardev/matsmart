"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUturnLeftIcon, LinkIcon } from "@heroicons/react/20/solid";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInventoryPage = pathname === "/inventory";
  const BackIcon = ArrowUturnLeftIcon;
  return (
    <>
      {!isInventoryPage && (
        <Link href="/inventory">
          <BackIcon>
            <p className="w-1"></p>
          </BackIcon>
        </Link>
      )}
      <div>{children}</div>
    </>
  );
}
