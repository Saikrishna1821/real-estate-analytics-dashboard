import React from "react";
import { ChevronDown } from "lucide-react";

const PropertyFilters = ({
  filters = {},
  onFilterChange = () => {},
  filterOptions = {},
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="relative">
          <select
            value={value}
            onChange={(e) =>
              onFilterChange({ ...filters, [key]: e.target.value })
            }
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[120px]"
          >
            {filterOptions[key]?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )) || []}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default PropertyFilters;
