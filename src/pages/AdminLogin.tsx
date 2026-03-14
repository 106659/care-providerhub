import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting admin login...');
      await auth.login(email, password);
      console.log('Admin login API call completed');

      // Don't check auth state immediately - let the auth state change listener handle it
      // The useEffect below will detect when user becomes authenticated and check admin role

    } catch (err) {
      console.error('Admin login failed:', err);
      setError('Invalid admin credentials. Please try again.');
      setLoading(false);
    }
  };

  // Handle redirect after authentication - only when auth state naturally updates
  useEffect(() => {
    if (auth.isAuthenticated && auth.user && !auth.loading) {
      console.log('Admin user authenticated, checking role...', auth.user);

      if (auth.user.role === 'admin') {
        console.log('Admin role confirmed, redirecting to admin panel');
        navigate('/admin/protectedroute/providershub', { replace: true });
      } else {
        console.log('User authenticated but not admin, logging out');
        setError('Access denied. This account does not have admin privileges.');
        auth.logout();
      }
    }
  }, [auth.isAuthenticated, auth.user, auth.loading, navigate, auth]);

  // Add a fallback timeout in case auth state never updates
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        if (loading) {
          console.log('Admin login timeout - auth state never updated');
          setError('Login is taking longer than expected. Please try again.');
          setLoading(false);
        }
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-gray-600 text-sm">Enter admin credentials to access the admin panel</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="admin@providershub.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Enter admin password"
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not an admin?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Go to user login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
