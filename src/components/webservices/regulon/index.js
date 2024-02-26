//import regulonData from "./dataTest.json"
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  query_GET_REGULON_BY,
  query_GET_REGULON_BYSearch,
} from "./query";

export function useGetRegulonBySearch({ search }) {
  const { data, error, loading } = useQuery(query_GET_REGULON_BYSearch, {
    variables: {
      search: search,
    },
  });
  let regulonsData;
  if (data) {
    try {
      regulonsData = data.getRegulonBy.data;
    } catch (error) {
      console.error("assign regulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_GET_REGULON_BY Error:", error);
    console.log("query: ", query_GET_REGULON_BY);
  }
  return { regulonsData, error, loading };
}
