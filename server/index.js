const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development-specific middleware
if (NODE_ENV === "development") {
  console.log("🚀 Development mode enabled");
  console.log("📁 Auto-restart enabled with nodemon");
  console.log("🔧 Debug mode available with npm run dev:debug");
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Sample data for the dashboard
const marketData = {
  msaData: [
    "Orlando-Kissimmee-Sanford",
    "Houston-Pasadena-The Woodlands",
    "Austin-Round Rock-San Marcos",
    "Tampa-St.Petersburg-Clearwater",
    "Chicago-Naperville-Elgin",
    "Indianapolis-Carmel-Greenwood",
    "Atlanta-Sandy Springs-Roswell",
    "Las Vegas-Henderson-North Las Vegas",
    "Dallas-Fort Worth-Arlington",
    "San Antonio-New Braunfels",
  ],
  metrics: [
    { label: "Community", value: "$1,781", change: null },
    { label: "Total Homes", value: "$1,781", change: null },
    { label: "Average Price Per Sq. Ft", value: "$207", change: null },
    { label: "Total No. of Homes Sold", value: "$169,580", change: null },
    { label: "Sales Pace", value: "$9,999", change: "-99% since last month" },
    { label: "Price Increase", value: "$9,999", change: "-31% since last month" },
  ],
  tableData: [
    {
      id: 1,
      builder: "Blue Velvet Group | 3 Roots",
      lots: "3 Roots",
      price: "$999,988",
      sqft: "4232",
      avgPrice: "699",
      status: "Active",
      region: "West",
    },
    {
      id: 2,
      builder: "Mulholland drive",
      lots: "3 Roots",
      price: "$999,988",
      sqft: "4232",
      avgPrice: "699",
      status: "Pending",
      region: "South",
    },
    {
      id: 3,
      builder: "Eraser head",
      lots: "3 Roots",
      price: "$999,988",
      sqft: "4232",
      avgPrice: "699",
      status: "Active",
      region: "North",
    },
    {
      id: 4,
      builder: "Lost Highway",
      lots: "3 Roots",
      price: "$999,988",
      sqft: "4232",
      avgPrice: "699",
      status: "Completed",
      region: "East",
    },
    {
      id: 5,
      builder: "Twin Peaks",
      lots: "3 Roots",
      price: "$999,988",
      sqft: "4232",
      avgPrice: "699",
      status: "Active",
      region: "West",
    },
    {
      id: 6,
      builder: "Blue Velvet Group | 4 Roots",
      lots: "4 Roots",
      price: "$1,199,988",
      sqft: "5232",
      avgPrice: "799",
      status: "Active",
      region: "West",
    },
    {
      id: 7,
      builder: "Mulholland drive II",
      lots: "4 Roots",
      price: "$1,199,988",
      sqft: "5232",
      avgPrice: "799",
      status: "Pending",
      region: "South",
    },
    {
      id: 8,
      builder: "Eraser head II",
      lots: "4 Roots",
      price: "$1,199,988",
      sqft: "5232",
      avgPrice: "799",
      status: "Active",
      region: "North",
    },
  ],
  companies: [
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
      logo: "SMITH DOUGLAS HOMES",
      bgColor: "bg-white",
      textColor: "text-green-600",
    },
  ],
  mapPins: [
    {
      id: 1,
      name: "Orlando Development",
      lat: 28.5383,
      lng: -81.3792,
      type: "residential",
      price: "$450,000",
      status: "active",
    },
    {
      id: 2,
      name: "Houston Complex",
      lat: 29.7604,
      lng: -95.3698,
      type: "commercial",
      price: "$1,200,000",
      status: "pending",
    },
    {
      id: 3,
      name: "Austin Heights",
      lat: 30.2672,
      lng: -97.7431,
      type: "residential",
      price: "$650,000",
      status: "active",
    },
    {
      id: 4,
      name: "Tampa Bay Project",
      lat: 27.9506,
      lng: -82.4572,
      type: "mixed",
      price: "$850,000",
      status: "completed",
    },
    {
      id: 5,
      name: "Chicago Downtown",
      lat: 41.8781,
      lng: -87.6298,
      type: "commercial",
      price: "$2,500,000",
      status: "active",
    },
    {
      id: 6,
      name: "Indianapolis Center",
      lat: 39.7684,
      lng: -86.1581,
      type: "residential",
      price: "$380,000",
      status: "pending",
    },
    {
      id: 7,
      name: "Atlanta Metro",
      lat: 33.749,
      lng: -84.388,
      type: "mixed",
      price: "$720,000",
      status: "active",
    },
    {
      id: 8,
      name: "Las Vegas Strip",
      lat: 36.1699,
      lng: -115.1398,
      type: "commercial",
      price: "$3,100,000",
      status: "active",
    },
  ],
  mapPolygons: [
    {
      id: 1,
      name: "Downtown District",
      coordinates: [
        { lat: 28.5383, lng: -81.3792 },
        { lat: 28.5483, lng: -81.3792 },
        { lat: 28.5483, lng: -81.3692 },
        { lat: 28.5383, lng: -81.3692 },
      ],
      color: "#3B82F6",
      opacity: 0.3,
    },
    {
      id: 2,
      name: "Suburban Area",
      coordinates: [
        { lat: 29.7604, lng: -95.3698 },
        { lat: 29.7704, lng: -95.3698 },
        { lat: 29.7704, lng: -95.3598 },
        { lat: 29.7604, lng: -95.3598 },
      ],
      color: "#10B981",
      opacity: 0.3,
    },
  ],
};

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Login route with hardcoded authentication
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials (in production, use database)
  const validCredentials = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" },
    { username: "demo", password: "demo123", role: "viewer" },
  ];

  const user = validCredentials.find(
    (cred) => cred.username === username && cred.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      username: user.username,
      role: user.role,
    },
  });
});

// Protected routes (require authentication)
app.use("/api/data", authenticateToken);

// Market View Data
app.get("/api/data/market-data", (req, res) => {
  const { filter, date } = req.query;
  
  // Generate different data based on filter and date
  let dataMultiplier = 1;
  let percentageMultiplier = 1;
  
  // Adjust data based on selected date
  if (date) {
    const dateIndex = marketData.msaData.length % 12; // Use date to vary data
    dataMultiplier = 0.8 + (dateIndex * 0.1);
    percentageMultiplier = 0.9 + (dateIndex * 0.05);
  }
  
  // Adjust data based on filter
  if (filter === "Builders with available Site Plan") {
    dataMultiplier *= 1.2; // 20% increase for site plan builders
    percentageMultiplier *= 1.1; // 10% increase for site plan builders
  }
  
  const tableData = [
    {
      title: "Top 10 MSA by Homes Closed",
      columns: ["MSA", "Homes Closed"],
      data: marketData.msaData.map((msa, index) => ({ 
        msa, 
        value: Math.floor(8000 * dataMultiplier * (1 + index * 0.05)).toLocaleString() 
      })),
    },
    {
      title: "Top 10 MSA by Average Price Increase",
      columns: ["MSA", "Price Increase"],
      data: marketData.msaData.map((msa, index) => ({ 
        msa, 
        value: `${(16 * percentageMultiplier * (1 + index * 0.02)).toFixed(1)}%` 
      })),
    },
    {
      title: "Top 10 MSA by Sales Pace",
      columns: ["MSA", "Homes Closed"],
      data: marketData.msaData.map((msa, index) => ({ 
        msa, 
        value: Math.floor(8000 * dataMultiplier * (1 + index * 0.03)).toLocaleString() 
      })),
    },
    {
      title: "Top 10 MSA by New Homes Added",
      columns: ["MSA", "Price Increase"],
      data: marketData.msaData.map((msa, index) => ({ 
        msa, 
        value: `${(16 * percentageMultiplier * (1 + index * 0.015)).toFixed(1)}%` 
      })),
    },
  ];

  res.json({ tableData });
});

// Acquisition View Data
app.get("/api/data/acquisition-data", (req, res) => {
  res.json({
    metrics: marketData.metrics,
    tableData: marketData.tableData,
  });
});

// URLs Data
app.get("/api/data/companies", (req, res) => {
  res.json({ companies: marketData.companies });
});

// Enhanced table data with sorting and filtering
app.get("/api/data/table", (req, res) => {
  const {
    sortBy,
    sortOrder,
    filterBy,
    filterValue,
    page = 1,
    limit = 10,
  } = req.query;

  let filteredData = [...marketData.tableData];

  // Apply filtering
  if (filterBy && filterValue) {
    filteredData = filteredData.filter((item) =>
      item[filterBy].toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  // Apply sorting
  if (sortBy) {
    filteredData.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // Handle numeric values
      if (sortBy === "price" || sortBy === "sqft" || sortBy === "avgPrice") {
        aVal = parseFloat(aVal.replace(/[^0-9.]/g, ""));
        bVal = parseFloat(bVal.replace(/[^0-9.]/g, ""));
      }

      if (sortOrder === "desc") {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    total: filteredData.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(filteredData.length / limit),
  });
});

// Map data with pins and polygons
app.get("/api/data/map", (req, res) => {
  const { type, status } = req.query;

  let filteredPins = [...marketData.mapPins];

  // Apply filters
  if (type) {
    filteredPins = filteredPins.filter((pin) => pin.type === type);
  }

  if (status) {
    filteredPins = filteredPins.filter((pin) => pin.status === status);
  }

  res.json({
    pins: filteredPins,
    polygons: marketData.mapPolygons,
  });
});

// Chatbot messages (static data)
app.get("/api/data/chatbot", (req, res) => {
  const messages = [
    {
      id: 1,
      type: "bot",
      message:
        "Hello! I'm your real estate analytics assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "bot",
      message:
        "I can help you with market analysis, property data, and investment insights.",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      type: "bot",
      message:
        "Try asking me about market trends, property prices, or specific locations.",
      timestamp: new Date().toISOString(),
    },
  ];

  res.json({ messages });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
