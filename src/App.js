import React from 'react';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
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
import Coexpression from "./apps/coexpression"
import { TestComponents } from './apps/testinComponents';
import DocumentationDatamarts from './apps/docs_dt';
import Overviews from './apps/overviews'
import SummaryHistory from './apps/summaryHistory'
import ReleaseNotes from './apps/releasesNotes';
import GensorUnit from "./apps/gensorUnit"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <>site no found</>
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "doc_datamarts",
        element: <DocumentationDatamarts />,
        children: [{ path: ":service" }]
      },
      {
        path: "testComponents",
        element: <TestComponents />,
      },
      {
        path: "summaryHistory",
        element: <SummaryHistory />,
      },
      {
        path: "releasesNote",
        element: <ReleaseNotes />,
        children: [{ path: ":releaseInfo" }]
      },
      {
        path: "dtt",
        element: <DrawingTracesInterface />,
        children: [{ path: ":parameters" }]
      },
      {
        path: "search",
        element: <Search />,
        children: [
          { path: ":keyword" }
        ]
      },
      {
        path: "gu",
        element: <GensorUnit />,
        children: [
          { path: ":guId" }
        ]
      },
      {
        path: "gene",
        element: <Gene />,
        children: [
          { path: ":geneId" }
        ]
      },
      {
        path: "operon",
        element: <Operon />,
        children: [
          { path: ":operonId" }
        ]
      },
      {
        path: "tu",
        element: <Operon />,
        children: [
          { path: ":tuId" }
        ]
      },
      {
        path: "sigmulon",
        element: <Sigmulon />,
        children: [
          { path: ":sigmulonId" }
        ]
      },
      {
        path: "promoter",
        element: <Sigmulon />,
        children: [
          { path: ":promoterId" }
        ]
      },
      {
        path: "regulon",
        element: <Regulon />,
        children: [
          { path: ":regulonId" }
        ]
      },
      {
        path: "overviews",
        element: <Overviews />,
        children: [
          { path: ":overviewsId" }
        ]
      },
      {
        path: "ht",
        element: <HT />,
        children: [
          {
            path: ":site",
            children: [
              {
                path: ":datasetType",
                children: [
                  {
                    path: ":info"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "/coexpression",
        element: <Coexpression />,
        children:[
          {path: ":genesId"}
        ]
      }
    ]
  },
  {
    path: "/embed",
    element: <Embed />,
    children: [
      {
        path: ":application",
        children: [
          { path: ":parameters" }
        ]
      }
    ]
  },
]);

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
    grey: {
      main: '#d5d5d7',
      contrastText: '#000000',
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
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
