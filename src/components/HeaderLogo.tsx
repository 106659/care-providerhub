import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';

export function HeaderLogo() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <button
        onClick={() => navigate(`/home/${user?.id || '123'}`)}
        className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
      >
        Providers Hub
      </button>
    </div>
  );
}
