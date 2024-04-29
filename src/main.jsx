import './index.css';
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import PlantContextProvider from "./context/PlantContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PlantContextProvider>
            <Router>
                <App/>
            </Router>
        </PlantContextProvider>
    </React.StrictMode>
)
