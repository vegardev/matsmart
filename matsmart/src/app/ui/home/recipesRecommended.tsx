import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
<<<<<<< HEAD
import { Groceries } from "@/src/app/backend/definitions";
=======
import { Recipe } from "@/src/app/backend/definitions";
import Link from "next/link";
>>>>>>> home

export default async function RecommendedItems({
  RecommendedItems,
}: {
<<<<<<< HEAD
  RecommendedItems: Groceries[];
=======
  RecommendedItems: Recipe[];
>>>>>>> home
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`h1-font`}>Recommended Recipes Based on Your Inventory</h2>
      <div className="flex grow flex-col justify-between rounded-xl light-blue">
        <div></div>
        <div className="light-background">
          {RecommendedItems.map((item, i) => {
            return (
              <div
                key={item.title}
                className={clsx("grid grid-cols-3 items-center py-4", {
                  "border-t": i !== 0,
                })}
              >
                <div className="min-w-0">
                  <Link href="/shoppinglist">
                    <p className="normal-font">{item.title}</p>
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
