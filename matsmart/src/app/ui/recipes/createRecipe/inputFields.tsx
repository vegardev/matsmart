import React, { useState, useImperativeHandle, forwardRef } from "react";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const TextInputFields = forwardRef(
  ({ catagory }: { catagory: string }, ref) => {
    const [value, setValue] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      getIngredients: () => ingredients,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const handleAdd = () => {
      setIngredients((prevIngredients) => [...prevIngredients, value]);
      setValue("");
    };

    return (
      <div className="flex flex-col justify-between rounded-xl bg-gray-50 p-4">
        <h2 className="py-4 mx-3 text-2xl font-bold">{catagory + ":"}</h2>
        {catagory === "Ingredients" ? (
          <div>
            <div className="mb-2 flex">
              <input
                className="bg-white px-6 rounded-2xl w-full mr-3"
                type="text"
                value={value}
                onChange={handleChange}
              />
              <button
                className="text-center bg-blue-400 px-3 py-2 rounded-lg text-white"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl">
              <ul className="text-black">
                {ingredients.map((ingredient, index) => (
                  <li className="list-disc ml-2" key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white px-6 py-3 rounded-2xl">
            <ReactQuill value={value} onChange={setValue} />
          </div>
        )}
      </div>
    );
  },
);

const AddImage = forwardRef((props, ref) => {
  const [inputImageUrl, setImageUrl] = useState(
    "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg",
  );

  useImperativeHandle(ref, () => ({
    getImage: () => inputImageUrl,
    // other methods...
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

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
        onChange={handleInputChange}
      />
    </div>
  );
});

// Lint failed if we didn't add displayName
TextInputFields.displayName = "TextInputFields";
AddImage.displayName = "AddImage";

export { TextInputFields, AddImage };
