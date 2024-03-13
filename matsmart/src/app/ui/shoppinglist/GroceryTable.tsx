"use client";
import React, { useState } from "react";

type GroceryItem = {
  groceries: string;
  amount: number;
};

type TableProps = {
  data: GroceryItem[];
};

const GroceryTable: React.FC<TableProps> = ({ data }) => {
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
              Bought?
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.groceries}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
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
          onClick={() => alert("Added bought items to inventory!")}
        >
          Add bought items to inventory
        </button>
      )}
    </>
  );
};

export default GroceryTable;
