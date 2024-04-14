"use client";
import React, { useState } from "react";
import { Inventory_items } from "@/src/app/backend/definitions";

type TableProps = {
  data: Inventory_items[];
};

const InventoryTable: React.FC<TableProps> = ({ data }) => {
  const [checkedStates, setCheckedStates] = useState(
    new Array(data.length).fill(false)
  );
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // Update the specific checkbox's checked state in the array
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = event.target.checked;
    setCheckedStates(newCheckedStates);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Groceries
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiration Date
            </th>
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
                {item.item_quantity + item.item_quantity_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.expiration_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {checkedStates.some((checked) => checked) && (
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
          onClick={() => alert("Removed items to inventory!")}
        >
          Remove from inventory
        </button>
      )}
    </>
  );
};

export default InventoryTable;
