import React from 'react';
import App from './App'; // Импортируйте компонент App из соответствующего пути
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)