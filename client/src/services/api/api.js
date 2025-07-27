const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? `${window.location.origin}/api`
    : "http://localhost:5000/api");

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const api = {
  auth: {
    login: async (credentials) => {
      return apiCall("/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
  },

  market: {
    getMarketData: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/data/market-data?${queryString}`);
    },
  },

  acquisition: {
    getAcquisitionData: async () => {
      return apiCall("/data/acquisition-data");
    },
  },

  companies: {
    getCompanies: async () => {
      return apiCall("/data/companies");
    },
  },

  table: {
    getTableData: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/data/table?${queryString}`);
    },
  },

  map: {
    getMapData: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiCall(`/data/map?${queryString}`);
    },
  },

  chatbot: {
    getMessages: async () => {
      return apiCall("/data/chatbot");
    },
  },
};
