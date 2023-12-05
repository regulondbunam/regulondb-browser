import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { DataVerifier } from "../../../../components/ui-components";

import { QUERY_getAllTipsDataset, QUERY_getDatasetsFromSearch } from "./queries";

export function useLazyGetPeaksAndSitesBy(_id){
    const [getFeatures] = useLazyQuery(QUERY_getAllTipsDataset);
    const getPeaksAndSites = (datasetId)=>{
        getFeatures({
            variables:{
                limit: 1,
                datasetId: datasetId
            },
           // onCompleted
        })
    }
}

export function useGetAllHTDatasetsTFBINDING() {
    const {
      data,
      loading: loadingDatasets,
      error,
    } = useQuery(QUERY_getDatasetsFromSearch, {
      variables: {
        advancedSearch: "'TFBINDING'[datasetType]",
      },
    });
    if (error) {
      console.error("Error Loading dataset list", QUERY_getDatasetsFromSearch);
    }
    let datasetList

    if (data && !error) {
        if (DataVerifier.isValidArray(data.getDatasetsFromSearch)) {
            datasetList = data.getDatasetsFromSearch
          }
    }
    const loading = loadingDatasets;
  
    return { datasetList, loading, error };
  }