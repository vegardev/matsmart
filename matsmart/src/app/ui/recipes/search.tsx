"use client";

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

export function SearchSort() {
  return (
    <div className="flex ml-auto">
      <label htmlFor="sort" className="sr-only">
        Sort
      </label>
      <select
        id="sort"
        name="sort"
        className="block rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
