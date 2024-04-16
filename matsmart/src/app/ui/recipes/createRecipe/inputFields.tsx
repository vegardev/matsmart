import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function TextInputFields({ catagory }: { catagory: string }) {
  const [value, setValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

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
              className="text-center bg-blue-400  px-3 py-2 rounded-lg text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl">
            <ul className="text-black">
              {ingredients.map((ingredient, index) => (
                <li className=" list-disc" key={index}>
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
}
