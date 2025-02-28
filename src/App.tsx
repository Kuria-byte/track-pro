import React from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { isAuthenticated } = useUser();
  
  return isAuthenticated ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }}
      />
      <UserProvider>
        <AppContent />
      </UserProvider>
    </>
  );
}

export default App;