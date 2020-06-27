import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter
} from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import client from './config/apollo'
import './regulondbGlobalStyle.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
