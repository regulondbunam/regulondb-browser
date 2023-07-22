
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DataVerifier } from "../../../components/ui-components"
import ListResult from "./listResult";
import {operonFormatResults} from "./dataProcess";


function Operon({ keyword, error, loading, operonsData }) {

  let results = operonFormatResults(operonsData,  keyword)

  return (
    <div>
      <h2>{`Operon (${operonsData.length})`}</h2>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {DataVerifier.isValidArray(results) && (
        <ListResult results={results} />
      )}
    </div>
  )
}


export default Operon;
