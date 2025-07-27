import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const URLs = () => {
  const {
    data: companiesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: api.companies.getCompanies,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const companies = companiesData?.companies || [
    {
      name: "kb HOME",
      logo: "kb HOME",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      name: "NVR",
      logo: "NVR",
      bgColor: "bg-red-800",
      textColor: "text-white",
    },
    {
      name: "LENNAR",
      logo: "LENNAR",
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    {
      name: "RICHMOND AMERICAN HOMES",
      logo: "RICHMOND AMERICAN HOMES",
      bgColor: "bg-red-600",
      textColor: "text-white",
    },
    {
      name: "tri pointe HOMES",
      logo: "tri pointe HOMES",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      name: "SMITH DOUGLAS HOMES",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-2">
            <span className="text-white font-bold text-sm">SD</span>
          </div>
          <span className="text-green-600 font-semibold">
            SMITH DOUGLAS HOMES
          </span>
        </div>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-dark-800 to-dark-900 rounded-xl p-8 text-white overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            Revolutionising Real Estate with Data Insights
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Harness actionable intelligence to simplify, optimise, and transform
            your real estate strategies.
          </p>
          <div className="flex space-x-4">
            <button className="btn-primary">Discover now</button>
            <button className="btn-secondary">Watch video</button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Section Title */}
      <div className="text-gray-600">Lorem ipsum</div>

      {/* Company Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className={`${company.bgColor} ${company.textColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer border border-gray-200`}
          >
            <div className="flex items-center justify-center h-24">
              {typeof company.logo === "string" ? (
                <span className="text-xl font-bold">{company.logo}</span>
              ) : (
                company.logo
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLs;
