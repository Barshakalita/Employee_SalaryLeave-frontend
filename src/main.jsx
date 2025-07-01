import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/authContext.jsx'; // Corrected import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Corrected component name */}
      <App />
    </AuthProvider>
  </StrictMode>
);