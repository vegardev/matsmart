import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function SearchButton() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <MagnifyingGlassIcon className="h-5" />
    </Link>
  );
}
