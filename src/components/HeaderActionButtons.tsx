import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import { Button } from './ui/button';
import { Search, Plus } from 'lucide-react';

export function HeaderActionButtons() {
  const navigate = useNavigate();
  const { performSearch } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
      <Button onClick={() => {
        searchInputRef.current?.blur();
        performSearch();
      }}>
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
      <Button onClick={() => {
        searchInputRef.current?.blur();
        navigate('/post-project');
      }}>
        <Plus className="mr-2 h-4 w-4" /> Post a Project
      </Button>
    </div>
  );
}
