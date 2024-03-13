"use client";

import { useState } from "react";

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
}

export function SearchSort({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: string[];
}) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 background-color:grey-100"
        onClick={() => {
          setShowMap(!showMap);
          console.log("hi");
        }}
      >
        Sort by tags
      </button>
      {showMap && (
        <div className="py-2 space-y-2">
          {tags.map((tag) => (
            <ul className="py-2 space-y-2">
              <li>
                <input type="checkbox" className="flex items-center" />
                {tag}
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
