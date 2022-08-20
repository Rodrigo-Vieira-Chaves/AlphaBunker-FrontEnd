import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserDataProvider } from './providers/UserDataProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <UserDataProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserDataProvider>
    </React.StrictMode>
);
