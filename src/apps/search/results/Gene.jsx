
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components"
import ListResult from "./listResult";
import { geneFormatResults } from "./dataProcess";


function Gene({ keyword, error, loading, geneData }) {

  let results = geneFormatResults(geneData, keyword)

  return (
    <div>
      <h2>{`Genes (${geneData.length})`}</h2>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      <div style={{ marginLeft: "3%" }} >
        {DataVerifier.isValidArray(results) && (
          <ListResult results={results} />
        )}
      </div>

    </div>
  )
}


export default Gene;
