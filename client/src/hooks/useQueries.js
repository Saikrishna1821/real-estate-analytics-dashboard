import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

// Market data queries
export const useMarketData = () => {
  return useQuery({
    queryKey: ["marketData"],
    queryFn: api.market.getMarketData,
  });
};

export const useAcquisitionData = () => {
  return useQuery({
    queryKey: ["acquisitionData"],
    queryFn: api.acquisition.getAcquisitionData,
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: api.companies.getCompanies,
  });
};

// Table data queries
export const useTableData = (params = {}) => {
  return useQuery({
    queryKey: ["tableData", params],
    queryFn: () => api.table.getTableData(params),
    keepPreviousData: true,
  });
};

// Map data queries
export const useMapData = (params = {}) => {
  return useQuery({
    queryKey: ["mapData", params],
    queryFn: () => api.map.getMapData(params),
  });
};

// Chatbot queries
export const useChatbotMessages = () => {
  return useQuery({
    queryKey: ["chatbotMessages"],
    queryFn: api.chatbot.getMessages,
  });
};
