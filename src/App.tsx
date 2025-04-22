
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import StorePanel from "./pages/StorePanel";
import CustomerSignup from "./pages/CustomerSignup";
import NotificationsPage from "./pages/NotificationsPage";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationsProvider } from "./hooks/use-notifications";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['Super Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/business" element={
                <ProtectedRoute allowedRoles={['Business Owner']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/store" element={
                <ProtectedRoute allowedRoles={['Store Staff']}>
                  <StorePanel />
                </ProtectedRoute>
              } />
              
              <Route path="/notifications" element={
                <ProtectedRoute allowedRoles={['Super Admin', 'Business Owner', 'Store Staff']}>
                  <NotificationsPage />
                </ProtectedRoute>
              } />
              
              {/* Public customer signup route */}
              <Route path="/signup/:businessSlug" element={<CustomerSignup />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
