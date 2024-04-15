"use client";
export default function MyButton() {
  return (
    <button
      className="rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-2 text-center"
      onClick={() => alert("Added to shopping list!")}
    >
      Add to shopping list
    </button>
  );
}
