import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider, useAuthContext, useAuth } from "./features/Auth";
import DashboardLayout from "./features/Dashboard";
import MarketView from "./features/Market";
import AcquisitionView from "./features/Acquisition";
import URLs from "./features/URLs";
import EnhancedTable from "./features/Table";
import InteractiveMap from "./features/Maps";
import ChatbotWidget from "./features/Chatbot";
import { ROUTES } from "./constants/routes";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppRoutes = () => {
  const { user, loading } = useAuthContext();
  const { logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Initializing..." />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.MARKET_VIEW} replace />}
        />
        <Route path={ROUTES.MARKET_VIEW} element={<MarketView />} />
        <Route path={ROUTES.ACQUISITION_VIEW} element={<AcquisitionView />} />
        <Route path={ROUTES.URLS} element={<URLs />} />
        <Route path={ROUTES.ENHANCED_TABLE} element={<EnhancedTable />} />
        <Route path={ROUTES.INTERACTIVE_MAP} element={<InteractiveMap />} />
      </Routes>
      <ChatbotWidget />
    </DashboardLayout>
  );
};

// Login Page Component (extracted from Auth.jsx)
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-10 blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-2xl">
            <span className="text-3xl font-bold text-white">P</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">Welcome Back</h2>
          <p className="text-gray-300 text-lg">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-xl text-sm shadow-lg border border-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-300 mb-3"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-3"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">
              Demo credentials:
            </p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>
                • Username: <span className="text-purple-400">admin</span>,
                Password: <span className="text-purple-400">admin123</span>
              </p>
              <p>
                • Username: <span className="text-purple-400">user</span>,
                Password: <span className="text-purple-400">user123</span>
              </p>
              <p>
                • Username: <span className="text-purple-400">demo</span>,
                Password: <span className="text-purple-400">demo123</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <AppRoutes />
          </Router>
        </ErrorBoundary>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
