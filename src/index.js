import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/react-hooks';
import Client from './webServices/apollo_client';
import './regulondbGlobalStyle.css';

const main = document.getElementById('root');
const renderOrHydrate = main.innerHTML.trim().length ? 'hydrate' : 'render';

ReactDOM[renderOrHydrate](
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ApolloProvider client={Client}>
          <App />
        </ApolloProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  main
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
