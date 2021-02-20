import {
  Switch,
  Route,
  BrowserRouter 
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Layout from './layout/layout'
import Home from './apps/home/home'
import Search from './apps/search/search'
import Gene from './apps/gene/gene'
import Error from './apps/error/e404/error'
import Overviews from './apps/overviews/overviews'


function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
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
        <Route exact path={"/overviews"}>
          <Overviews />
        </Route>
        <Route path={"/overviews/:id"}>
          <Overviews />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Layout>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
