//import regulonData from "./dataTest.json"
import { useQuery, useLazyQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import {
  query_GET_REGULON_BY,
  query_GET_ALL_REGULON,
  query_GET_REGULON_BYV2,
  query_GET_REGULON_BYSearch,
} from "./query";
import { useState } from "react";

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

export function useGetRegulonData(id) {
  //console.log(query_GET_REGULON_BY);
  const options = {
    variables: {
      advancedSearch: id + "[_id]",
    },
  };
  const { data, error, loading } = useQuery(query_GET_REGULON_BYV2, options);
  const [getData, { data: data2, error: error2, loading: loading2 }] =
    useLazyQuery(query_GET_REGULON_BY, options);
  const [flag, setFlag] = useState(false);
  let regulonData;
  let err;

  if (error) {
    if (!flag) {
      //console.log("Hola");
      //regulonData = undefined
      setFlag(true);
      setTimeout(() => {
        getData();
      }, 100);
    }
    if (error2) {
      err = error2;
      console.error("useQuery query_GET_REGULON_BY Error:", error);
    console.log("query: ", query_GET_REGULON_BY);
    }
    console.error("useQuery query_GET_REGULON_BY Error:", error);
    console.log("query2: ", query_GET_REGULON_BYV2);
  }
  if (data2) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data2.getRegulonBy.data)) {
        regulonData = data2.getRegulonBy.data[0];
      } else {
        regulonData = null;
      }
    } catch (error) {
      console.error("assign regulonData2 error");
    }
  }
  if (data) {
    try {
      if (DataVerifier.isValidArray(data.getRegulonBy.data)) {
        regulonData = data.getRegulonBy.data[0];
      } else {
        regulonData = null;
      }
    } catch (error) {
      console.error("assign regulonData error");
    }
  }
  return { regulonData, error: err, loading };
}

export function useGetAllRegulon() {
  const { data, error, loading } = useQuery(query_GET_ALL_REGULON);
  let allRegulonData;
  try {
    allRegulonData = data.getAllRegulon.data;
  } catch (error) {
    console.error("assign allRegulonData error");
  }
  if (error) {
    console.error("useQuery query_GET_ALL_REGULON Error:", error);
    console.log("query: ", query_GET_ALL_REGULON);
  }
  return { allRegulonData, error, loading };
}
