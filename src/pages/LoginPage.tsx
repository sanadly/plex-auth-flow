
import AuthForm from '../components/AuthForm';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have a return path from the location state
  const from = location.state?.from || '/';

  useEffect(() => {
    // If user is already authenticated, redirect based on role
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'Super Admin':
          navigate('/admin');
          break;
        case 'Business Owner':
          navigate('/business');
          break;
        case 'Store Staff':
          navigate('/store');
          break;
        default:
          navigate(from);
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-custom-primary">نظام الولاء</h1>
          <p className="text-muted-foreground mt-2">تسجيل الدخول إلى حسابك</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
