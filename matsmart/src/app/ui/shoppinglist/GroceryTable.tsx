/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import { Shopping_items } from "@/src/app/backend/definitions";

type TableProps = {
  data: Shopping_items[];
  className?: string;
};

const GroceryTable: React.FC<
  TableProps & {
    onQuantityChange: (index: number, newQuantity: number) => void;
    onDelete: (index: number) => void;
    checkedStates: boolean[];
    onCheckboxChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => void;
    locations: string[];
    setLocations: React.Dispatch<React.SetStateAction<string[]>>;
    onLocationChange: (index: number, newLocation: string) => void;
    anyCheckboxChecked: boolean;
  }
> = ({
  data,
  className,
  onQuantityChange,
  onDelete,
  checkedStates,
  onCheckboxChange,
  locations,
  onLocationChange,
  anyCheckboxChecked,
}) => {
  return (
    <>
      <table
        className={`min-w-full divide-y rounded-md divide-gray-200 ${className}`}
      >
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Groceries
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bought?
            </th>
            {checkedStates.includes(true) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remove?
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.item_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  step={0.5}
                  min={0.5}
                  value={item.item_quantity}
                  className="rounded-md border p-1 w-16 border-gray-200 bg-gray-50 text-sm outline-2"
                  onChange={async (e) => {
                    const newQuantity: number = parseFloat(e.target.value);
                    if (newQuantity < 0) {
                      alert("Quantity cannot be negative");
                      return;
                    }
                    onQuantityChange(index, newQuantity);
                    await fetch(`/api/shoppinglist/${item.item_id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        item_id: item.item_id,
                        item_quantity: newQuantity,
                      }),
                    });
                  }}
                />
                {" " + item.item_quantity_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={(e) => onCheckboxChange(e, index)}
                />
              </td>
              {anyCheckboxChecked ? (
                checkedStates[index] ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={locations[index]}
                      onChange={(e) => onLocationChange(index, e.target.value)}
                      className="rounded-md border p-1 border-gray-200 bg-gray-50 text-sm outline-2"
                    >
                      <option value="">Select location</option>
                      <option value="fryser">Freezer</option>
                      <option value="kjøleskap">Fridge</option>
                      <option value="skuff">Pantry</option>
                    </select>
                  </td>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                )
              ) : null}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="p-1 border border-gray-200 bg-red-400 rounded-md"
                  onClick={async () => {
                    await fetch(`/api/shoppinglist/${item.item_id}`, {
                      method: "DELETE",
                      body: JSON.stringify({
                        item_id: item.item_id,
                      }),
                    });
                    onDelete(index);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GroceryTable;
