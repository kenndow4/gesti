import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { ContContenido } from './contextAll/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContContenido>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
    </ContContenido>
  </React.StrictMode>
);


