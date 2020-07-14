import React from 'react';
import Search from './pages/Search'
import Gene from './pages/gene/GeneHome'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'
import Error from './pages/error/Error'
import UiComponents from './pages/UiComponents'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Layout >
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
        <Route path={["/gene/:id/:site/:section","/gene/:id/:site","/gene/:id","/gene",]}>
          <Gene />
        </Route>
        <Route path="/uiComponents">
          <UiComponents />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      </Layout >
    </Router>

  );
}

export default App;
