import React from 'react';
import Home from './pages/Home';
import Layout from './pages/components/layout/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Layout/>
      <Switch>
        <Route path="/">
            <Home />
          </Route>
          <Route>
            <Home />
          </Route>
      </Switch>
    </Router>
      
  );
}

export default App;
