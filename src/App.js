import React from 'react';
import Search from './pages/search/Search'
import Home from './pages/Home';
import Layout from './pages/components/layout/Layout'
import Error404 from './pages/error404'
import UiComponents from './pages/UiComponents'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Layout />
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/uiComponents">
          <UiComponents />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
