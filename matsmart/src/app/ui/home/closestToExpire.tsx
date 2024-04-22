"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CloseToExpire } from "@/src/app/backend/definitions";

export default function CloseToExpireItems({
  CloseToExpireItems,
}: {
  CloseToExpireItems: CloseToExpire[];
}) {
  console.log(CloseToExpireItems);
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="h1-font">Expiry overview</h2>
      <div className="light-blue">
        <div className="grid grid-cols-3 py-4 mx-3 "></div>
        <div className="light-background">
          {CloseToExpireItems.map((item, i) => {
            const expirationDate = new Date(item.expiration_date);
            return (
              <div
                key={item.item_id}
                className={clsx("grid grid-cols-3 items-center py-4", {
                  "border-t": i !== 0,
                })}
              >
                <div className="min-w-0">
                  <p className="normal-font">{item.item_name}</p>
                  <p className="normal-font">{item.item_type}</p>
                </div>
                <p className="normal-font">{item.quantity}</p>
                <p
                  className={clsx(
                    "truncate text-sm md:text-base font-semibold text-right",
                    {
                      "text-yellow-700":
                        expirationDate >= new Date() &&
                        expirationDate <
                          new Date(
                            new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
                          ),
                      "text-red-600": expirationDate < new Date(),
                    },
                  )}
                >
                  {expirationDate.toLocaleDateString()}
                </p>
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
