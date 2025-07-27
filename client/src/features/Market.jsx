import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { api } from "../services/api";
import HeroBanner from "../components/common/HeroBanner";
import FilterTabs from "../components/common/FilterTabs";
import DataTable from "../components/common/DataTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const MarketView = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Builders");
  const [selectedDate, setSelectedDate] = useState("Jan 2025");

  const {
    data: marketData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["marketData", selectedFilter, selectedDate],
    queryFn: () =>
      api.market.getMarketData({ filter: selectedFilter, date: selectedDate }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const { tableData } = marketData || { tableData: [] };

  return (
    <div className="space-y-6">
      <HeroBanner
        title="Revolutionising Real Estate with Data Insights"
        description="Harness actionable intelligence to simplify, optimise, and transform your real estate strategies."
        primaryButton="Discover now"
        secondaryButton="Watch video"
        secondaryButtonIcon={<Play className="w-4 h-4 mr-2" />}
      />

      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        filters={["All Builders", "Builders with available Site Plan"]}
        dateOptions={[
          "Jan 2025",
          "Dec 2024",
          "Nov 2024",
          "Oct 2024",
          "Sep 2024",
          "Aug 2024",
          "Jul 2024",
          "Jun 2024",
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tableData.map((table, index) => (
          <DataTable
            key={index}
            title={table.title}
            columns={table.columns}
            data={table.data}
            showOptions={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketView;
