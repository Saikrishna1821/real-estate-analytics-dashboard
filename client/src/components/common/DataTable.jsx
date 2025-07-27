import React from "react";
import { MoreHorizontal } from "lucide-react";

const DataTable = ({
  title,
  columns = [],
  data = [],
  showOptions = false,
  onRowClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showOptions && (
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, colIndex) => (
                <th
                  key={colIndex}
                  className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => onRowClick?.(row)}
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-4 px-4 text-sm text-gray-700"
                  >
                    {cellIndex === 1 &&
                    typeof cell === "string" &&
                    cell.includes("%") ? (
                      <span className="text-green-600 font-medium">{cell}</span>
                    ) : cellIndex === 1 &&
                      typeof cell === "string" &&
                      cell.includes(",") ? (
                      <span className="text-blue-600 font-medium">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
