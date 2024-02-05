import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeContext, useTheme } from './contextAll/theme.tsx'
import { ContContenido } from './contextAll/context.tsx'
import { BrowserRouter } from 'react-router-dom'

function Main() {
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
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main/>)
