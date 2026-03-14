import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectSearchContextType {
  projectQuery: string;
  setProjectQuery: (query: string) => void;
  projectLocation: string;
  setProjectLocation: (location: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  searchProjects: () => void;
  clearProjectSearch: () => void;
}

const ProjectSearchContext = createContext<ProjectSearchContextType | undefined>(undefined);

export function ProjectSearchProvider({ children }: { children: ReactNode }) {
  const [projectQuery, setProjectQuery] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  const searchProjects = () => {
    if (projectQuery.trim() || specialty) {
      const params = new URLSearchParams();
      if (projectQuery.trim()) {
        params.set('query', projectQuery.trim());
      }
      if (projectLocation.trim()) {
        params.set('location', projectLocation.trim());
      }
      if (specialty) {
        params.set('specialty', specialty);
      }
      navigate(`/project-search?${params.toString()}`);
    }
  };

  const clearProjectSearch = () => {
    setProjectQuery('');
    setProjectLocation('');
    setSpecialty('');
  };

  return (
    <ProjectSearchContext.Provider
      value={{
        projectQuery,
        setProjectQuery,
        projectLocation,
        setProjectLocation,
        specialty,
        setSpecialty,
        searchProjects,
        clearProjectSearch,
      }}
    >
      {children}
    </ProjectSearchContext.Provider>
  );
}

export function useProjectSearch() {
  const context = useContext(ProjectSearchContext);
  if (context === undefined) {
    throw new Error('useProjectSearch must be used within a ProjectSearchProvider');
  }
  return context;
}
