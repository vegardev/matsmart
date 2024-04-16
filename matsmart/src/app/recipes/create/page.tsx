"use client";
import { SearchByTags } from "@/src/app/ui/recipes/search";
import { tagsDummyData } from "@/src/app/backend/dummyData";
import {
  TextInputFields,
  AddImage,
} from "@/src/app/ui/recipes/createRecipe/inputFields";
import { useRef } from "react";
/* import { createRecipe } from "@/src/app/backend/uploadData";
import Router from "next/router";
*/
interface InputFieldsHandle {
  getValue: () => string;
}

interface IngredientsFieldsHandle {
  getIngredients: () => string[];
}

interface ImageFieldsHandle {
  getImage: () => string;
}

export default function Page() {
  /* All ref greiene ble anbefalt av AI(CoPilot) for å hente data fra alle komponentene*/
  const methodRef = useRef<InputFieldsHandle | null>(null);
  const ingredientsRef = useRef<IngredientsFieldsHandle | null>(null);
  const nutritionsRef = useRef<InputFieldsHandle | null>(null);
  const imageRef = useRef<ImageFieldsHandle | null>(null);

  const handleUpload = () => {
    const method = methodRef.current?.getValue();
    const ingredients = ingredientsRef.current?.getIngredients();
    const nutritions = nutritionsRef.current?.getValue();
    const image = imageRef.current?.getImage();
    // Here you can send the data to your database
    alert(
      `Method: ${method}\n\n Ingredients: ${ingredients}\n\n Nutritions: ${nutritions}\n\n Image: ${image}`,
    );
  };
  return (
    <>
      <div className="flex justify-between mb-10">
        <div className="mb-4 text-xl md:text-4xl">
          <input type="text" placeholder="Write recipe title..." />
          <button
            onClick={handleUpload}
            className="text-center bg-gray-50 px-3 rounded-lg ml-2"
          >
            Upload recipe
          </button>
        </div>
        <div className="flex justify-end">
          {/* husk å endre her senere */}
          <SearchByTags tags={tagsDummyData} displayText="Add tags" />
        </div>
      </div>
      <div className="grid grid-cols-11">
        <div className="col-span-5 mr-4">
          <TextInputFields ref={methodRef} catagory="Method" />
        </div>
        <div className="col-span-3 mr-4">
          <TextInputFields ref={ingredientsRef} catagory="Ingredients" />
        </div>
        <div className="col-span-3 mr-4">
          <AddImage ref={imageRef} />
          <TextInputFields ref={nutritionsRef} catagory="Nutritions" />
        </div>
      </div>
    </>
  );
}
