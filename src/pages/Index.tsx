
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'super_admin':
          navigate('/admin');
          break;
        case 'business_owner':
          navigate('/business');
          break;
        case 'store_staff':
          navigate('/store');
          break;
        default:
          navigate('/login');
      }
    } else {
      // If not authenticated, redirect to login
      navigate('/login');
    }
  }, [navigate, isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-custom-primary">نظام الولاء</h1>
        <p className="text-xl text-text">جاري التحويل...</p>
      </div>
    </div>
  );
};

export default Index;
