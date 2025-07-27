import React from "react";
import { ChevronDown } from "lucide-react";

const FilterTabs = ({
  selectedFilter,
  onFilterChange,
  selectedDate,
  onDateChange,
  filters = [],
  dateOptions = [],
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="text-gray-500 font-medium">Filter Options</div>
      <div className="flex items-center space-x-4">
        <div className="flex bg-gray-50 rounded-lg border border-gray-200 p-1">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                selectedFilter === filter
                  ? "bg-white text-purple-700 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          >
            {dateOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
