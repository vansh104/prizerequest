import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ color: "green", fontSize: "24px" }}>
      ✅ Frontend is rendering!
    </div>
  </StrictMode>
);
