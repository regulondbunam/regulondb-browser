import { Cover, AnchorNav } from "../../../components/ui-components";
import {
  useGetGenesBySearch,
  useGetGuBySearch,
  useGetOperonBySearch,
  useGetRegulonBySearch,
  useGetSigmulonBySearch,
} from "../../../components/webservices";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components";
import ListResult from "./listResult";
import {
  operonFormatResults,
  geneFormatResults,
  regulonFormatResults,
  sigmulonFormatResults,
  gusFormatResults,
  goFormatResults,
} from "./dataProcess";
import CircularProgress from "@mui/material/CircularProgress";
//import Paper from "@mui/material/Paper";
//import Button from "@mui/material/Button";
//import InputBase from "@mui/material/InputBase";
//import { useState } from "react";
import { Div } from "../../../components/ui-components/searchKeys/code";
//import SearchIcon from "@mui/icons-material/Search";
import CoexpressionResults from "../coexpression";
import { useGetGOBySearch } from "../../../regulondb-ws/queries/GOTree";

export default function Results({ keyword }) {
  //const [keyword, setKeyword] = useState(inKeyword ? inKeyword : "");
  //const [value, setValue] = useState(inKeyword ? inKeyword : "");
  //const handleSearch = () => {
  //  setKeyword(value);
  //};

  let section = [
    GeneResult(keyword),
    OperonResult(keyword),
    RegulonResult(keyword),
    SigmulonResult(keyword),
    GUsResult(keyword),
    GOResult(keyword)
  ];

  let title = `${keyword}`;

  if(/coexpression/.test(keyword)){
    return <CoexpressionResults keyword={keyword} />
}

  return (
    <div>
      <Cover>
        <br />
        <h1>Search in results {title} </h1>
        <div style={{ display: "grid", gridTemplateColumns: "70% 1% 20%" }}>
          {/* 
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Example "arac OR fimb " "arac OR arabinose"'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              inputProps={{ "aria-label": "regulonDB search" }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </Paper>
          <div></div>
          <Button
            sx={{ width: "100%" }}
            onClick={handleSearch}
            color="error"
            variant="contained"
          >
            Search
          </Button>
          */}
        </div>
      </Cover>
      <Div name={keyword} />
      <AnchorNav title="Results" sections={section} disabledSearchTool />
    </div>
  );
}

function GOResult(keyword) {
  const {goTerms, loading, error} = useGetGOBySearch(keyword)
  let title = "Gene Ontology (0)";
  let results = [];
  if (DataVerifier.isValidArray(goTerms)) {
    results = goFormatResults(goTerms,keyword)
    title = "Gene Ontology (" + goTerms.length + ") ";
  }
  if (loading) {
    title = (
      <>
        GENSOR Unit <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_go",
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function GUsResult(keyword) {
  let title = "GENSOR Unit (0)";
  const { gusData, loading, error } = useGetGuBySearch(keyword);
  let results = [];
  if (DataVerifier.isValidArray(gusData)) {
    results = gusFormatResults(gusData, keyword);
    title = "GENSOR Unit (" + gusData.length + ") ";
  }
  if (loading) {
    title = (
      <>
        GENSOR Unit <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_gu",
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function GeneResult(keyword) {
  let type = "Gene";
  let title = type + " (0)";
  const {
    genesData: data,
    loading,
    error,
  } = useGetGenesBySearch({ search: keyword });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = geneFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function OperonResult(keyword) {
  let type = "Operon";
  let title = type + " (0)";
  const {
    operonsData: data,
    loading,
    error,
  } = useGetOperonBySearch({ search: keyword });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = operonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function RegulonResult(keyword) {
  let type = "Regulon";
  let title = type + " (0)";
  const {
    regulonsData: data,
    loading,
    error,
  } = useGetRegulonBySearch({ search: keyword });
  let results = [];
  if (DataVerifier.isValidArray(data)) {
    results = regulonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function SigmulonResult(keyword) {
  let type = "Sigmulon";
  const {
    sigmulonData: data,
    loading,
    error,
  } = useGetSigmulonBySearch(keyword);
  console.log(keyword);
  let results = [];
  let title = type + " (0)";
  if (DataVerifier.isValidArray(data)) {
    results = sigmulonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if (loading) {
    title = (
      <>
        {type} <CircularProgress size={15} />
      </>
    );
  }
  return {
    id: "result_" + type,
    label: title,
    title: title,
    component: (
      <Result
        loading={loading}
        error={error}
        results={results}
        keyword={keyword}
      />
    ),
  };
}

function Result({ keyword, error, loading, results, type }) {
  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {results.length > 0 && (
        <div style={{ marginLeft: "3%" }}>
          {DataVerifier.isValidArray(results) && (
            <ListResult results={results} />
          )}
        </div>
      )}
    </div>
  );
}
