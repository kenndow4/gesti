import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { ContContenido } from './contextAll/context';
import { ThemeContext, useTheme } from './contextAll/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Main = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ContContenido>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContContenido>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

root.render(<Main />);


