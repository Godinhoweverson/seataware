import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
//CSS
import './index.css'
import './components/Header/header.css';
import './pages/pages-css/Home.css';
import './pages/pages-css/Awareness.css';
import './pages/pages-css/Reports.css';
import './pages/pages-css/Form.css';
import './pages/pages-css/Map.css';

import App from './App.jsx'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

//Leaflet
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
