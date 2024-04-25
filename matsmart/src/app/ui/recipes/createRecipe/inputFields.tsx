import React, { useState, useImperativeHandle, forwardRef } from "react";
import { DisplayRecipeTags } from "@/src/app/ui/recipes/sharedComponents";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Add_Recipe_Ingredient,
  ingredientTypes,
} from "@/src/app/backend/definitions";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

/**
 * TextInputFields component.
 * This component renders input fields for creating a recipe.
 * It renders the input fields conditionally based on the category prop.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.catagory - The category of the input fields.
 * @param {React.Ref} ref - The ref object used to access the component's methods.
 * @returns {JSX.Element} The rendered component.
 */
const TextInputFields = forwardRef(
  ({ catagory }: { catagory: string }, ref) => {
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [quantityType, setQuantityType] = useState("stk");
    const [ingredients, setIngredients] = useState<Add_Recipe_Ingredient[]>([]);

    // Using the useImperativeHandle hook to expose component methods to the parent
    useImperativeHandle(ref, () => ({
      /**
       * Get the current value of the input field.
       *
       * @returns {string} The current value of the input field.
       */
      getValue: () => value,
      /**
       * Get the list of ingredients.
       *
       * @returns {Add_Recipe_Ingredient[]} The list of ingredients.
       */
      getIngredients: () => ingredients,
    }));

    /**
     * Handle the add button click event.
     * Adds the current input values to the list of ingredients.
     */
    const handleAdd = () => {
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().trimEnd();

      const fullIngredient = {
        item_name: formattedValue,
        item_quantity: quantity,
        item_quantity_type: quantityType,
      };

      setIngredients((prevIngredients) => [...prevIngredients, fullIngredient]);
      setValue("");
    };

    return (
      <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
        <h2 className="py-4 mx-3 text-2xl font-bold">{catagory + ":"}</h2>
        {catagory === "Ingredients" ? (
          <div>
            <div className="mb-2 flex">
              <div className="w-full mr-2 grid grid-cols-5 space-x-1">
                <input
                  className="bg-white px-4 rounded-2xl h-full col-span-3"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <input
                  className="bg-white px-2 rounded-2xl col-span-1 text-center"
                  type="number"
                  placeholder="Insert ingredient..."
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <select
                  className="rounded-2xl bg-white col-span-1 pl-2 px-1"
                  value={quantityType}
                  onChange={(e) => setQuantityType(e.target.value)}
                >
                  {ingredientTypes.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.abbreviation}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="text-center bg-blue-600 px-3 py-2 rounded-lg text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl">
              <ul className="text-black">
                {ingredients.map((ingredient, index) => (
                  <li className="list-disc ml-2" key={index}>
                    <div className="flex justify-between">
                      {ingredient.item_name}
                      <div className="flex space-x-1 ">
                        <div>{ingredient.item_quantity}</div>
                        <div>{ingredient.item_quantity_type}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // If the category is not 'Ingredients', render a ReactQuill component for rich text editing
          <div className="bg-white px-6 py-3 rounded-2xl">
            <ReactQuill value={value} onChange={setValue} />
          </div>
        )}
      </div>
    );
  },
);

/**
 * Component for adding an image with an input field for the image URL.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.Ref} ref - The ref object used to access the component's methods.
 * @returns {JSX.Element} The rendered AddImage component.
 */
const AddImage = forwardRef((props, ref) => {
  // The state variable is initialized with a placeholder image URL as the render for recipe page breaks without an image.
  const [inputImageUrl, setImageUrl] = useState(
    "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg",
  );

  // This hook is used to expose the getImage function to the parent component.
  useImperativeHandle(ref, () => ({
    /**
     * Gets the current image URL.
     *
     * @returns {string} The current image URL.
     */
    getImage: () => inputImageUrl,
  }));

  return (
    <div className="flex flex-col">
      <Image
        className="lg:w-full max-h-64 object-cover mb-5"
        width={320}
        height={208}
        src={inputImageUrl}
        alt={"Image placeholder"}
      />
      <input
        className="bg-white px-6 rounded-2xl w-full py-2 mb-4"
        type="text"
        placeholder="Insert image URL..."
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </div>
  );
});

/**
 * AddTags component.
 *
 * This component allows users to add tags to a recipe.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.Ref} ref - The ref object used to expose a getTags function.
 * @returns {JSX.Element} The rendered AddTags component.
 */
const AddTags = forwardRef((props, ref) => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState("");

  // This hook allows the parent component to get the current tags.
  useImperativeHandle(ref, () => ({
    /**
     * Get the current tags.
     *
     * @returns {string[]} The current tags.
     */
    getTags: () => tags,
  }));

  /**
   * Handle the add button click event.
   *
   * This function adds the current value to the tags array and clears the input field.
   */
  const handleAdd = () => {
    // Format the value: first letter uppercase, the rest lowercase, and trim the end.
    const formattedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().trimEnd();
    setTags((prevTags) => [...prevTags, formattedValue]);
    setValue("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex mb-2 ps-4">
        <input
          className="bg-white px-4 rounded-2xl mr-2 ml-auto"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="text-center bg-blue-600 px-3 py-1 rounded-lg text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <DisplayRecipeTags tags={tags} />
    </div>
  );
});

// Lint failed if we didn't add displayName
TextInputFields.displayName = "TextInputFields";
AddImage.displayName = "AddImage";
AddTags.displayName = "AddTags";

export { TextInputFields, AddImage, AddTags };
