/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import { Inventory_items } from "@/src/app/backend/definitions";
import clsx from "clsx";

/**
 * Props for the InventoryTable component.
 */
type TableProps = {
  data: Inventory_items[];
  /** A handler to be called when a checkbox in the table is changed. */
  onCheckboxChange: (index: number) => void;
};

/**
 * InventoryTable component for displaying inventory items and their details.
 * @param {Object} props - The props for the component.
 * @param {Inventory_items[]} props.data - The inventory items to be displayed in the table.
 * @param {(index: number) => void} props.onCheckboxChange - Handler to be called when a checkbox in the table is changed.
 * @returns The rendered InventoryTable component.
 */
const InventoryTable: React.FC<TableProps> = ({ data, onCheckboxChange }) => {
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
          {data.map((item, index) => {
            const expirationDate = new Date(item.expiration_date);
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.item_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.item_quantity + " " + item.item_quantity_type}
                </td>
                <td
                  className={clsx("px-6 py-4 whitespace-nowrap", {
                    " text-red-600": expirationDate < new Date(),
                  })}
                >
                  {item.expiration_date
                    ? typeof item.expiration_date === "string"
                      ? item.expiration_date
                      : item.expiration_date.toDateString()
                    : "No expiration date"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    onChange={() => onCheckboxChange(index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default InventoryTable;
