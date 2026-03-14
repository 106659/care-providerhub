import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function AdminSignup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsRegistering(true);
    console.log('Starting admin signup process...');

    try {
      // Use Supabase signup to create the admin account
      const result = await auth.signup(
        formData.email,
        formData.password,
        formData.name,
        'admin' // Admin role
      );

      console.log('Admin signup result:', result);
      setIsRegistering(false);

      if (result.success) {
        if (result.requiresConfirmation) {
          console.log('Email confirmation required');
          alert('Admin account created! Please check your email to confirm your account before logging in.');
          navigate('/admin/protectedroute/providershub/login');
        } else {
          console.log('No confirmation required, redirecting to admin login');
          alert('Admin account created successfully! You can now login to the admin panel.');
          navigate('/admin/protectedroute/providershub/login');
        }
      }
    } catch (error) {
      console.error('Admin registration failed:', error);
      setIsRegistering(false);
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again or contact support.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-600">⚠️ Admin Registration</CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            This page will be removed after admin account creation
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-1"
                placeholder="Enter admin full name"
                disabled={isRegistering}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mt-1"
                placeholder="admin@example.com"
                disabled={isRegistering}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="mt-1"
                placeholder="Minimum 8 characters"
                disabled={isRegistering}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="mt-1"
                placeholder="Re-enter password"
                disabled={isRegistering}
              />
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <svg className="w-4 h-4 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Creating Admin Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              ⚠️ This page will be permanently removed after admin account creation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
