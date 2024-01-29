import React, { useState, useEffect } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export function useTheme(): ThemeContextProps {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setThemeBasedOnUserPreference = () => setTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    
    setThemeBasedOnUserPreference();
    darkModeMediaQuery.addListener(setThemeBasedOnUserPreference);
    
    return () => {
      darkModeMediaQuery.removeListener(setThemeBasedOnUserPreference);
    };
  }, []);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
}
