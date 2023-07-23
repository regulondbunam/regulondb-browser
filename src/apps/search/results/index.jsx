import { Cover, AnchorNav } from "../../../components/ui-components"
import { useGetGenesBySearch, useGetOperonBySearch, useGetRegulonBySearch } from "../../../components/webservices";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components"
import ListResult from "./listResult";
import { operonFormatResults, geneFormatResults, regulonFormatResults } from "./dataProcess";


export default function Results({ keyword }) {

  const { genesData, loading: geneLoading, error: geneError } = useGetGenesBySearch({ search: keyword })
  const { operonsData, loading: operonsLoading, error: operonsError } = useGetOperonBySearch({ search: keyword })
  const { regulonsData, loading: regulonsLoading, error: regulonsError } = useGetRegulonBySearch({ search: keyword })

  let lists = [
    {
      type: "gene",
      data: genesData,
      loading: geneLoading,
      error: geneError,
    },
    {
      type: "operon",
      data: operonsData,
      loading: operonsLoading,
      error: operonsError,
    },
    {
      type: "regulon",
      data: regulonsData,
      loading: regulonsLoading,
      error: regulonsError,
    }
  ]

  let section = lists.map((list) => {
    let title = list.type + " (0)"
    if (list.data) {
      title = list.type + " (" + list.data.length + ") "
    }
    return {
      id: "result_" + list.type,
      label: title,
      title: title,
      component: <Result {...list} keyword={keyword} />
    }
  })

  let title = `Search results for ${keyword}`

  console.log(regulonsData);


  return (
    <div>
      <Cover>
        <h1>{title}</h1>
      </Cover>
      <AnchorNav title="Results" sections={section} />
    </div>
  )
}

function Result({ keyword, error, loading, data, type }) {

  let results = []

  if (data) {
    switch (type) {
      case "gene":
        results = geneFormatResults(data, keyword)
        break;
      case "operon":
        results = operonFormatResults(data, keyword)
        break;
      case "regulon":
        results = regulonFormatResults(data, keyword)
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {data && (
        <div style={{ marginLeft: "3%" }} >
          {DataVerifier.isValidArray(results) && (
            <ListResult results={results} />
          )}
        </div>
      )}
    </div>
  )
}



/**
 * 
{regulonsData && (
          <regulon regulonsData={regulonsData} loading={regulonsLoading} error={regulonsError} keyword={keyword} />
        )}
 */