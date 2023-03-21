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

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#32617d',
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff"
    },
    secondary: {
      light: '#c93a1d',
      main: '#c93a1d',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    info: {
      main: '#999999'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="embed" element={<Embed />} >
            <Route path=":application" >
              <Route path=':parameters' />
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
          <Route path="ht" element={<HT />} >
            <Route path=":site"  >
              <Route path=":datasetType"  >
                <Route path=":info"  >
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Layout>
  );
}

export default App;
