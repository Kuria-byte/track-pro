import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserData, ScopeItem, Feature, Milestone, Document, Note, Currency, DemoStatus } from '../types';
import { getUserData, saveUserData, convertPrice } from '../utils/storage';

interface UserContextType {
  userData: UserData;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  login: (accessCode: string) => boolean;
  logout: () => void;
  toggleDarkMode: () => void;
  updateScopeItems: (items: ScopeItem[]) => void;
  updateFeatures: (features: Feature[]) => void;
  updateMilestones: (milestones: Milestone[]) => void;
  updateDocuments: (documents: Document[]) => void;
  updateNotes: (notes: Note[]) => void;
  addScopeItem: (item: Omit<ScopeItem, 'id'>) => void;
  removeScopeItem: (id: string) => void;
  toggleScopeItemCompletion: (id: string) => void;
  toggleFeatureSelection: (id: string) => void;
  calculateTotalInvestment: () => number;
  addNote: (note: Omit<Note, 'id'>) => void;
  removeNote: (id: string) => void;
  setCurrency: (currency: Currency) => void;
  toggleDemoStatus: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(getUserData());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const login = (accessCode: string): boolean => {
    if (accessCode === userData.accessCode) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateScopeItems = (items: ScopeItem[]) => {
    setUserData(prev => ({ ...prev, scopeItems: items }));
  };

  const updateFeatures = (features: Feature[]) => {
    setUserData(prev => ({ ...prev, features }));
  };

  const updateMilestones = (milestones: Milestone[]) => {
    setUserData(prev => ({ ...prev, milestones }));
  };

  const updateDocuments = (documents: Document[]) => {
    setUserData(prev => ({ ...prev, documents }));
  };

  const updateNotes = (notes: Note[]) => {
    setUserData(prev => ({ ...prev, notes }));
  };

  const addScopeItem = (item: Omit<ScopeItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setUserData(prev => ({
      ...prev,
      scopeItems: [...prev.scopeItems, newItem]
    }));
  };

  const removeScopeItem = (id: string) => {
    setUserData(prev => ({
      ...prev,
      scopeItems: prev.scopeItems.filter(item => item.id !== id)
    }));
  };

  const toggleScopeItemCompletion = (id: string) => {
    setUserData(prev => ({
      ...prev,
      scopeItems: prev.scopeItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const toggleFeatureSelection = (id: string) => {
    setUserData(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === id && !feature.mandatory 
          ? { ...feature, selected: !feature.selected } 
          : feature
      )
    }));
  };

  const calculateTotalInvestment = (): number => {
    return userData.features
      .filter(feature => feature.selected)
      .reduce((total, feature) => total + feature.price, 0);
  };

  const addNote = (note: Omit<Note, 'id'>) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
    };
    setUserData(prev => ({
      ...prev,
      notes: [...prev.notes, newNote]
    }));
  };

  const removeNote = (id: string) => {
    setUserData(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== id)
    }));
  };

  const setCurrency = (currency: Currency) => {
    setUserData(prev => ({
      ...prev,
      selectedCurrency: currency
    }));
  };

  const toggleDemoStatus = () => {
    setUserData(prev => ({
      ...prev,
      demoStatus: prev.demoStatus === 'online' ? 'offline' : 'online'
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isAuthenticated,
        isDarkMode,
        login,
        logout,
        toggleDarkMode,
        updateScopeItems,
        updateFeatures,
        updateMilestones,
        updateDocuments,
        updateNotes,
        addScopeItem,
        removeScopeItem,
        toggleScopeItemCompletion,
        toggleFeatureSelection,
        calculateTotalInvestment,
        addNote,
        removeNote,
        setCurrency,
        toggleDemoStatus
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};