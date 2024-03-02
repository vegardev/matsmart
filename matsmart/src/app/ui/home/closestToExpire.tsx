import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { CloseToExpire } from "@/src/app/backend/definitions";

export default async function CloseToExpire({
  CloseToExpire,
}: {
  CloseToExpire: CloseToExpire[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl`}>Expiry overview</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="grid grid-cols-3 py-4 mx-3 ">
          <p className="text-sm font-bold md:text-base">Item</p>
          <p className="text-sm font-bold md:text-base text-center">Quantity</p>
          <p className="text-sm font-bold md:text-base text-right">
            Expiry date
          </p>
        </div>
        <div className="bg-white px-6">
          {CloseToExpire.map((expire, i) => {
            return (
              <div
                key={expire.item_id}
                className={clsx("grid grid-cols-3 items-center py-4", {
                  "border-t": i !== 0,
                })}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {expire.item_name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {expire.item_type}
                  </p>
                </div>
                <p className="text-center text-sm text-gray-500 md:text-base">
                  {expire.quantity}
                </p>
                <p
                  className={clsx(
                    "truncate text-sm md:text-base font-semibold text-right",
                    {
                      "text-yellow-400":
                        expire.expiration_date >= new Date() &&
                        expire.expiration_date <
                          new Date(
                            new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
                          ),
                      "text-red-500": expire.expiration_date < new Date(),
                    },
                  )}
                >
                  {expire.expiration_date.toLocaleDateString()}
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
