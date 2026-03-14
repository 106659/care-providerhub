import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute check:', {
    isAuthenticated,
    loading,
    userId: user?.id,
    userRole: user?.role,
    pathname: location.pathname
  });

  // While we are still resolving the session, show a lightweight loader
  if (loading) {
    console.log('ProtectedRoute: showing loader');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 rounded-full border-b-2 border-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // After loading is complete, if not authenticated, redirect to login preserving the intended route
  if (!isAuthenticated) {
    console.log('ProtectedRoute: not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute: authenticated, showing content');
  return <>{children}</>;
}