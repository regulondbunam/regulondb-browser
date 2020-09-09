import React from 'react';
import Layout from './components/layout/Layout'
import Search from './pages/search/SearchHome'
//import Gene from './pages/gene/GeneHome'
import Home from './pages/home/Home'
import Error from './pages/error/Error'
import Testing from './pages/Testing'
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
        
        <Route path="/Testing">
          <Testing />
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


/**
      <Route path={["/gene/:id/:site/:section","/gene/:id/:site","/gene/:id","/gene",]}>
          <Gene />
        </Route>
 */