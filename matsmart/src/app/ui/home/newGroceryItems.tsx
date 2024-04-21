"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Inventory_items } from "@/src/app/backend/definitions";
import Link from "next/link";

export default function NewGroceriesItems({
  NewGroceriesItems,
}: {
  NewGroceriesItems: Inventory_items[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="h1-font">Newly Added Groceries</h2>
      <div className="flex grow flex-col justify-between rounded-xl light-blue">
        <div className="grid grid-cols-3 py-4 mx-3 "></div>
        <div className="light-background">
          {NewGroceriesItems.map((item, i) => {
            return (
              <div
                key={i}
                className={clsx("grid grid-cols-3 items-center py-4", {
                  "border-t": i !== 0,
                })}
              >
                <div className="min-w-0">
                  <Link href={"/inventory/" + item.item_location}>
                    {" "}
                    <p className="normal-font">{item.item_name}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
