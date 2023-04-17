import React from 'react';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './apps/home';
import Search from './apps/search';
import Gene from './apps/gene';
import DrawingTracesInterface from './apps/dtt';
import Operon from './apps/operon';
import Embed from "./apps/embed";
import HT from './apps/ht/HighThroughput';
import Regulon from './apps/regulon';
import Sigmulon from './apps/sigmulon';
import SRNA from './apps/srna';
import { TestComponents } from './apps/testinComponents';
import DocumentationDatamarts from './apps/docs_dt';
import Overviews from './apps/overviews'

const THEME = createTheme({
  palette: {
    primary: {
      main: '#1F3D4E',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#D2A769',
      main: '#C98528',
      contrastText: '#ffffff',
    },
    error: {
      main: '#C93A1D',
      contrastText: '#ffffff',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
    <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="embed" element={<Embed />} >
            <Route path=":application" >
              <Route path=':parameters' >
                <Route path=":parameterA"  >
                  <Route path=":parameterB"  >
                    <Route path=":parameterC"  >
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="doc_datamarts" element={<DocumentationDatamarts />} >
            <Route path=":service" />
          </Route>
          <Route path="testComponents" element={<TestComponents />} />
          <Route path="home" element={<Home />} />
          <Route path="dtt" element={<DrawingTracesInterface />} >
            <Route path=":parameters" />
          </Route>
          <Route path="search" element={<Search />} >
            <Route path=":keyword" />
          </Route>
          <Route path="gene" element={<Gene />} >
            <Route path=":geneId" />
          </Route>
          <Route path="operon" element={<Operon />} >
            <Route path=":operonId" />
          </Route>
          <Route path="tu" element={<Operon />} >
            <Route path=":tuId" />
          </Route>
          <Route path="sigmulon" element={<Sigmulon />} >
            <Route path=":sigmulonId" />
          </Route>
          <Route path="promoter" element={<Sigmulon />} >
            <Route path=":promoterId" />
          </Route>
          <Route path="regulon" element={<Regulon />} >
            <Route path=":regulonId" />
          </Route>
          <Route path="srna" element={<SRNA />} >
            <Route path=":srnaId" />
          </Route>
          <Route path="/overviews" element={<Overviews />}>
            <Route path=":overviewsId" element={<Overviews />} />
          </Route>
          <Route path="ht" element={<HT />} >
            <Route path=":site"  >
              <Route path=":datasetType"  >
                <Route path=":info"  >
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
    </Layout>
    </ThemeProvider>
  );
}

export default App;
