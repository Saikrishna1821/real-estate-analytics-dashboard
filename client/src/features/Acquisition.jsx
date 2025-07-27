import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Play,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import { api } from "../services/api";
import HeroBanner from "../components/common/HeroBanner";
import FilterTabs from "../components/common/FilterTabs";
import MetricsGrid from "../components/common/MetricsGrid";
import InteractiveMap from "./Maps";
import PropertyFilters from "../components/common/PropertyFilters";
import DataTable from "../components/common/DataTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const AcquisitionView = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Builders");
  const [selectedDate, setSelectedDate] = useState("Jan 2025");
  const [selectedFilters, setSelectedFilters] = useState({
    "Full Zips": "All",
    State: "All",
    City: "All",
    Builder: "All",
    Lots: "All",
  });

  const {
    data: acquisitionData,
    isLoading: acquisitionLoading,
    error: acquisitionError,
  } = useQuery({
    queryKey: ["acquisitionData"],
    queryFn: api.acquisition.getAcquisitionData,
  });

  const { data: mapData, isLoading: mapLoading } = useQuery({
    queryKey: ["mapData"],
    queryFn: api.map.getMapData,
  });

  if (acquisitionLoading || mapLoading) {
    return <LoadingSpinner />;
  }

  if (acquisitionError) {
    return <ErrorMessage message={acquisitionError.message} />;
  }

  const { metrics, tableData } = acquisitionData || {
    metrics: [],
    tableData: [],
  };
  const mapPins = mapData?.pins || [];

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricsGrid metrics={metrics} />

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Map View</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                <Minus className="w-4 h-4" />
              </button>
              <button className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>
          <InteractiveMap pins={mapPins} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-gray-600">Lorem ipsum</div>

        <PropertyFilters
          filters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterOptions={{
            "Full Zips": [
              "All",
              "10001-19999",
              "20001-29999",
              "30001-39999",
              "40001-49999",
            ],
            State: [
              "All",
              "California",
              "Texas",
              "Florida",
              "New York",
              "Illinois",
              "Pennsylvania",
              "Ohio",
              "Georgia",
              "North Carolina",
              "Michigan",
            ],
            City: [
              "All",
              "New York",
              "Los Angeles",
              "Chicago",
              "Houston",
              "Phoenix",
              "Philadelphia",
              "San Antonio",
              "San Diego",
              "Dallas",
              "San Jose",
            ],
            Builder: [
              "All",
              "Blue Velvet Group",
              "Mulholland Drive",
              "Eraser Head",
              "Lost Highway",
              "Twin Peaks",
              "Lynch Corp",
              "Coppola Builders",
            ],
            Lots: ["All", "1-10", "11-50", "51-100", "101-500", "500+"],
          }}
        />

        <DataTable
          title="Lorem ipsum"
          columns={[
            "Builder",
            "Lots",
            "Price",
            "Sq. ft",
            "Average Price / Sq.ft",
          ]}
          data={tableData}
          showOptions={true}
        />
      </div>
    </div>
  );
};

export default AcquisitionView;
