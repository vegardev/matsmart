import clsx from "clsx";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export function RecipeTextFields({
  type,
  content,
}: {
  type: string;
  content: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
      <h2 className="py-4 mx-3 text-2xl font-bold">{type + ":"}</h2>
      <div
        className={clsx("bg-white px-6 py-3 rounded-2xl", {
          "grid grid-cols-6": type === "Ingredients",
        })}
      >
        <div
          className="col-span-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {type === "Ingredients" ? (
          <div className="col-span-1 flex flex-col">
            <ShoppingCartIcon className=" size-5" />
            <ShoppingCartIcon className=" size-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
