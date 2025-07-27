import React from 'react';
import { DollarSign } from 'lucide-react';

const MetricsGrid = ({ metrics = [] }) => {
  return (
    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {metric.value}
          </div>
          <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
          {metric.change && (
            <div className={`text-xs font-medium ${metric.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
              {metric.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;