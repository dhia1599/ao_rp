import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/font.css';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
