import Link from "next/link";
import NavLinks from "@/src/app/ui/home/nav-links";
import Image from "next/image";

/**
 * SideNav component.
 * @returns The rendered SideNav component.
 */
export default function SideNav() {
  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 justify-start rounded-md p-4 md:h-40 items-center"
        href="/home"
      >
        <Image
          src="/matsmart_logo.png"
          width={300}
          height={300}
          alt="Matsmart logo"
          priority
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
