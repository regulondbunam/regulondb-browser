import { useQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import { query_getSigmulonBy } from "./query";

export function useGetSigmulonById(sigmulonId) {
  const { data, error, loading } = useQuery(query_getSigmulonBy, {
    variables: {
      advancedSearch: `${sigmulonId}[_id]`,
    },
  });
  let sigmulonData;
  if (data) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulonData = data.getSigmulonBy.data[0];
      } else {
        sigmulonData = null;
      }
    } catch (error) {
      console.error("assign sigmulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_getSigmulonBy Error:", error);
    console.log("query: ", query_getSigmulonBy);
  }
  return {sigmulonData, error, loading}
}
