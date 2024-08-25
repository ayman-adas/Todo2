import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the type for context values
interface NavigationContextType {
  fromProfile: boolean;
}

// Create the context with default values
const NavigationContext = createContext<NavigationContextType>({ fromProfile: false });

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromProfile) {
      // Check localStorage for a refresh flag
      const hasRefreshed = localStorage.getItem('hasRefreshed');
      
      if (!hasRefreshed) {
        // Set the flag in localStorage
        localStorage.setItem('hasRefreshed', 'true');
        // Refresh the page
        window.location.reload();
      } else {
        // Remove the flag after refresh to avoid infinite loop
        localStorage.removeItem('hasRefreshed');
      }
    }
  }, [location]);

  return (
    <NavigationContext.Provider value={{ fromProfile: !!location.state?.fromProfile }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
