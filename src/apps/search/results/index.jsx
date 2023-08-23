import { Cover, AnchorNav } from "../../../components/ui-components";
import {
  useGetGenesBySearch,
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
} from "./dataProcess";
import CircularProgress from '@mui/material/CircularProgress';

export default function Results({ keyword }) {
  
  

  let section = [
    GeneResult(keyword),
    OperonResult(keyword),
    RegulonResult(keyword),
    SigmulonResult(keyword)
  ]

  let title = `Search results for ${keyword}`;


  return (
    <div>
      <Cover>
        <h1>{title}</h1>
      </Cover>
      <AnchorNav title="Results" sections={section} />
    </div>
  );
}

function GeneResult(keyword) {
  let type = "Gene"
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
  if(loading){
    title = <>{type} <CircularProgress size={15} /></>
  }
  return {
    id: "result_" + type,
      label: title,
      title: title,
      component:<Result loading={loading} error={error} results={results} keyword={keyword} />
  };
}

function OperonResult(keyword) {
  let type = "Operon"
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
  if(loading){
    title = <>{type} <CircularProgress size={15} /></>
  }
  return {
    id: "result_" + type,
      label: title,
      title: title,
      component:<Result loading={loading} error={error} results={results} keyword={keyword} />
  };
}

function RegulonResult(keyword) {
  let type = "Regulon"
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
  if(loading){
    title = <>{type} <CircularProgress size={15} /></>
  }
  return {
    id: "result_" + type,
      label: title,
      title: title,
      component:<Result loading={loading} error={error} results={results} keyword={keyword} />
  };
}

function SigmulonResult(keyword) {
  let type = "Sigmulon"
  const {
    sigmulonData: data,
    loading,
    error,
  } = useGetSigmulonBySearch(keyword);
  let results = [];
  let title = type + " (0)";
  if (DataVerifier.isValidArray(data)) {
    results = sigmulonFormatResults(data, keyword);
    title = type + " (" + data.length + ") ";
  }
  if(loading){
    title = <>{type} <CircularProgress size={15} /></>
  }
  return {
    id: "result_" + type,
      label: title,
      title: title,
      component:<Result loading={loading} error={error} results={results} keyword={keyword} />
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

