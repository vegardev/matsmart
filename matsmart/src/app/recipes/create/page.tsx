"use client";
import {
  TextInputFields,
  AddImage,
  AddTags,
} from "@/src/app/ui/recipes/createRecipe/inputFields";
import { useRef, useState } from "react";
import { createRecipe } from "@/src/app/backend/uploadData";
import { useRouter } from "next/navigation";
import { Add_Recipe_Ingredient } from "@/src/app/backend/definitions";

interface InputFieldsHandle {
  getValue: () => string;
}

interface IngredientsFieldsHandle {
  getIngredients: () => Add_Recipe_Ingredient[];
}

interface ImageFieldsHandle {
  getImage: () => string;
}

interface TagsFieldsHandle {
  getTags: () => string[];
}

/**
 * Renders the page for creating a recipe.
 */
export default function Page() {
  const router = useRouter();
  const [timeRequirement, setTimeRequirement] = useState("");
  const [title, setTitle] = useState("");

  /* All ref greiene ble anbefalt av AI(CoPilot) for å hente data fra alle komponentene*/
  const methodRef = useRef<InputFieldsHandle | null>(null);
  const ingredientsRef = useRef<IngredientsFieldsHandle | null>(null);
  const nutritionsRef = useRef<InputFieldsHandle | null>(null);
  const imageRef = useRef<ImageFieldsHandle | null>(null);
  const tagsRef = useRef<TagsFieldsHandle | null>(null);

  /**
   * Handles the upload of a recipe.
   */
  const handleUpload = () => {
    const method = methodRef.current?.getValue() || "";
    const ingredients = ingredientsRef.current?.getIngredients() || [];
    const nutritions = nutritionsRef.current?.getValue() || "";
    const image = imageRef.current?.getImage() || "";
    const tags = tagsRef.current?.getTags() || [];

    let recipe_id = createRecipe({
      title: title,
      recipe_method: method,
      recipe_nutritions: nutritions,
      recipe_image: image,
      recipe_time: timeRequirement,
      recipe_ingredients: ingredients,
      recipe_tags: tags,
    });

    /**
     * Retrieves the recipe ID and navigates to the recipe page.
     */
    async function getRecipeId() {
      const value = await recipe_id;
      router.push(`/recipes/${value}`);
    }

    getRecipeId();
  };
  return (
    <>
      <div className="flex justify-between mb-10">
        <div className="mb-4 text-xl md:text-4xl">
          <input
            className="bg-white px-4 rounded-2xl py-1"
            type="text"
            placeholder="Write recipe title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleUpload}
            className="text-center bg-blue-600 text-white px-3 rounded-2xl ml-2 py-2 transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Upload recipe
          </button>
        </div>
        <div className="flex justify-end">
          <AddTags ref={tagsRef} />
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
          <input
            className="bg-white px-6 rounded-2xl w-full py-2 mb-4"
            type="text"
            placeholder="Write time requirement"
            value={timeRequirement}
            onChange={(e) => setTimeRequirement(e.target.value)}
          />
          <TextInputFields ref={nutritionsRef} catagory="Nutritions" />
        </div>
      </div>
    </>
  );
}
