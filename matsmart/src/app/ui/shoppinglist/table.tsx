import React from "react";

type GroceryItem = {
  groceries: string;
  amount: number;
};

type TableProps = {
  data: GroceryItem[];
};

const Table: React.FC<TableProps> = ({ data }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Groceries
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
          <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
