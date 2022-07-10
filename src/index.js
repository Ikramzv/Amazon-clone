import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppStateLayer from './AppState/AppState';
import { reducer } from './AppState/reducer';
import { initialState } from './AppState/initialState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppStateLayer reducer={reducer} initialState={initialState} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppStateLayer>
  </React.StrictMode>
);


