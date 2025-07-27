import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  Trash2,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { api } from "../services/api";
import { createCustomIcon } from "../utils/leafletIcons";

// Map Controls Component
const MapControls = ({
  onZoomIn,
  onZoomOut,
  onToggleDrawing,
  onClearPolygons,
  drawingMode,
}) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      <button
        onClick={onZoomIn}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <button
        onClick={onToggleDrawing}
        className={`p-2 rounded-lg shadow-lg transition-colors duration-200 ${
          drawingMode ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-50"
        }`}
        title="Toggle Drawing Mode"
      >
        <Layers className="w-4 h-4" />
      </button>
      <button
        onClick={onClearPolygons}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200"
        title="Clear Drawn Areas"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// Drawing Mode Component
const DrawingMode = ({ onPolygonComplete }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create a simple drawing tool
    let isDrawing = false;
    let currentPolygon = null;
    let points = [];

    const handleMapClick = (e) => {
      if (!isDrawing) {
        isDrawing = true;
        points = [e.latlng];
        currentPolygon = Polygon.polygon(points, {
          color: "#9333EA",
          fillColor: "#9333EA",
          fillOpacity: 0.3,
          weight: 2,
        }).addTo(map);
      } else {
        points.push(e.latlng);
        currentPolygon.setLatLngs(points);
      }
    };

    const handleMapDoubleClick = (e) => {
      if (isDrawing && points.length >= 3) {
        isDrawing = false;
        onPolygonComplete(points);
        map.off("click", handleMapClick);
        map.off("dblclick", handleMapDoubleClick);
        map.getContainer().style.cursor = "";
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isDrawing) {
        isDrawing = false;
        if (currentPolygon) {
          map.removeLayer(currentPolygon);
        }
        map.off("click", handleMapClick);
        map.off("dblclick", handleMapDoubleClick);
        map.getContainer().style.cursor = "";
      }
    };

    map.on("click", handleMapClick);
    map.on("dblclick", handleMapDoubleClick);
    document.addEventListener("keydown", handleKeyPress);
    map.getContainer().style.cursor = "crosshair";

    return () => {
      map.off("click", handleMapClick);
      map.off("dblclick", handleMapDoubleClick);
      document.removeEventListener("keydown", handleKeyPress);
      map.getContainer().style.cursor = "";
    };
  }, [map, onPolygonComplete]);

  return null;
};

const InteractiveMap = ({ pins = [] }) => {
  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });
  const [selectedPin, setSelectedPin] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawnPolygons, setDrawnPolygons] = useState([]);
  const [mapCenter] = useState([39.8283, -98.5795]);
  const [mapZoom] = useState(5);
  const mapRef = useRef(null);

  const {
    data: mapData,
  } = useQuery({
    queryKey: ["mapData", filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);
      return api.map.getMapData(params);
    },
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
  };

  const clearDrawnPolygons = () => {
    setDrawnPolygons([]);
  };

  const handlePolygonComplete = (coordinates) => {
    const newPolygon = {
      id: Date.now(),
      coordinates: coordinates,
      color: "#9333EA",
      opacity: 0.3,
    };
    setDrawnPolygons((prev) => [...prev, newPolygon]);
    setDrawingMode(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const mapPins = mapData?.pins || pins;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Interactive Map</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDrawingMode}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              drawingMode
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Toggle Drawing Mode"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={clearDrawnPolygons}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            title="Clear Drawn Areas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center space-x-4">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="mixed">Mixed</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Property Markers */}
          {mapPins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={createCustomIcon(pin.type)}
              eventHandlers={{
                click: () => handlePinClick(pin),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {pin.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{pin.price}</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white`}
                    >
                      {pin.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pin.status
                      )} text-white`}
                    >
                      {pin.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Drawn Polygons */}
          {drawnPolygons.map((polygon) => (
            <Polygon
              key={polygon.id}
              positions={polygon.coordinates}
              pathOptions={{
                color: polygon.color,
                fillColor: polygon.color,
                fillOpacity: polygon.opacity,
                weight: 2,
              }}
            />
          ))}

          {/* Drawing Mode */}
          {drawingMode && (
            <DrawingMode onPolygonComplete={handlePolygonComplete} />
          )}

          {/* Map Controls */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onToggleDrawing={toggleDrawingMode}
            onClearPolygons={clearDrawnPolygons}
            drawingMode={drawingMode}
          />
        </MapContainer>

        {/* Drawing Mode Indicator */}
        {drawingMode && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium z-[1000]">
            Drawing Mode Active - Click to draw, Double-click to finish
          </div>
        )}

        {/* Pin Details Modal */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {selectedPin.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedPin.price}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white`}
                  >
                    {selectedPin.type}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedPin.status
                    )} text-white`}
                  >
                    {selectedPin.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Residential</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Commercial</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Mixed</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
