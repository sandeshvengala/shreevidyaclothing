import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import './styles.css';
import { ProductProvider } from './data/ProductStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>,
);
