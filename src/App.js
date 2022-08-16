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
import DTT from './apps/dtt/dtt';
import HT from './apps/ht/HighThroughput';
import Operon from './apps/operon/operon';
import Regulon from './apps/regulon/regulon';

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
          <Route path="home" element={<Home />} />
          <Route path="dtt" element={<DTT />} />
          <Route path="ht" element={<HT />} >
            <Route path=":site" element={<HT />} >
              <Route path=":datasetType" element={<HT />} >
                <Route path=":info" element={<HT />} >
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="search" element={<Search />} >
            <Route path=":keyword" element={<Search />} />
          </Route>
          <Route path="gene" element={<Gene />} >
            <Route path=":geneId" element={<Gene />} />
          </Route>
          <Route path="operon" element={<Operon />} >
          <Route path=":id" element={<Operon />} />
          </Route>
          <Route path="regulon" element={<Regulon />} >
          <Route path=":id" element={<Regulon />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Layout>
  );
}


export default App;




