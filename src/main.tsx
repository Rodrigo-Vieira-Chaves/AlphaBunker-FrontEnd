import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserLoggedDataProvider } from './providers/UserLoggedDataProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <UserLoggedDataProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserLoggedDataProvider>
    </React.StrictMode>
);
