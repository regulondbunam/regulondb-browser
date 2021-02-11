import {
  Switch,
  Route
} from "react-router-dom";
import Layout from './layout/layout'
import Home from './apps/home/home'
import Search from './apps/search/search'
import Gene from './apps/gene/gene'
//import Error from './error/e404/error'


function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/search"}>
          <Search />
        </Route>
        <Route path={["/gene/:id/:site/:section","/gene/:id/:site","/gene/:id","/gene",]}>
          <Gene />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

/**

        
        
        <Route path="*">
          <Error />
        </Route>
      </Switch>
 */