import clsx from "clsx";
import { ShoppingCartIcon as ShoppingCartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { pantryInventoryDummyData } from "@/src/app/backend/dummyData";

export function RecipeTextFields({
  type,
  content,
}: {
  type: string;
  content: string | string[];
}) {
  const [clickedIngredients, setClickedIngredients] = useState<string[]>([]);
  const router = useRouter();

  const handleBuyAll = () => {
    if (window.confirm("Do you want to be redirected to the shopping list?")) {
      router.push("/shoppinglist");
    }
  };

  const handleIconClick = (ingredient: string) => {
    console.log(`Push ${ingredient} to shoppingcart`);
    setClickedIngredients((prevState) => [...prevState, ingredient]);
  };

  return (
    <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
      <h2 className="py-4 mx-3 text-2xl font-bold">{type + ":"}</h2>
      <div className={"bg-white px-6 py-3 rounded-2xl"}>
        {type === "Ingredients" && Array.isArray(content) ? (
          <div className="flex flex-col">
            {content.map((ingredient, index) => (
              <div
                key={index}
                className={clsx("flex justify-between ", {
                  "text-red-600": !pantryInventoryDummyData.some(
                    (item) => item.item_name === ingredient,
                  ),
                })}
              >
                {ingredient}
                {!pantryInventoryDummyData.some(
                  (item) => item.item_name === ingredient,
                ) && !clickedIngredients.includes(ingredient) ? (
                  <ShoppingCartIconSolid
                    className="size-5 text-black hover:cursor-pointer hover:text-blue-400"
                    onClick={() => handleIconClick(ingredient)}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="col-span-5"
            dangerouslySetInnerHTML={{ __html: content as string }}
          />
        )}
      </div>
      {type === "Ingredients" && (
        <button
          className="mt-4 bg-white mx-auto w-4/6 p-2 hover:text-blue-500 rounded-full border-2"
          onClick={handleBuyAll}
        >
          Add All Missing Ingredients to Shopping List
        </button>
      )}
    </div>
  );
}

/*
{type === "Ingredients" && (
        <div className="flex mt-4">
          <button
            className=" w-3/5 p-1 bg-blue-600 px-4  text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-lg"
            onClick={handleBuyAll}
          >
            Add All Missing Ingredients to Cart
          </button>
          <Link
            href="/shoppinglist"
            className="ml-auto w-1/5 rounded-lg bg-blue-600 px-4 text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ShoppingCartIconOutline className="size-10 w-full" />
          </Link>
        </div>
      )}
    */
