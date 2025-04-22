import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // --- ADD LOGGING ---
  console.log("ProtectedRoute Check:", {
      pathname: location.pathname,
      loading,
      isAuthenticated,
      userRole: user?.role, // Log the role name from the user object
      allowedRoles
  });
  // --- END LOGGING ---

  if (loading) {
    console.log("ProtectedRoute: Rendering Loader because loading=true");
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-background">
        <Loader2 className="h-8 w-8 animate-spin text-custom-primary" />
        <span className="mr-2 text-text">جاري التحميل...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // --- ADD LOGGING ---
    console.log(`ProtectedRoute: Redirecting to /login because isAuthenticated=${isAuthenticated}`);
    // --- END LOGGING ---
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check for role-based access if roles are specified
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
     // --- ADD LOGGING ---
    console.log(`ProtectedRoute: Role check failed! User role '<span class="math-inline">\\{user\\.role\\}' is not in allowed roles \\[</span>{allowedRoles.join(', ')}]. Redirecting based on actual role.`);
     // --- END LOGGING ---
    // Redirect based on user role
    switch (user.role) {
      case 'Super Admin':
        return <Navigate to="/admin" replace />;
      case 'Business Owner':
        return <Navigate to="/business" replace />;
      case 'Store Staff':
        return <Navigate to="/store" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

   // --- ADD LOGGING ---
   console.log("ProtectedRoute: All checks passed. Rendering children.");
   // --- END LOGGING ---
  return <>{children}</>;
};

export default ProtectedRoute;