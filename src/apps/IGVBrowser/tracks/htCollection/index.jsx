import { useQuery } from "@apollo/client";
import { DataVerifier } from "../../../../components/ui-components";

import { QUERY_getDatasetsFromSearch } from "./queries";


export function useGetAllHTDatasetsTFBINDING() {
    const {
      data,
      loading: loadingDatasets,
      error,
    } = useQuery(QUERY_getDatasetsFromSearch, {
      variables: {
        advancedSearch: "'TFBINDING'[datasetType] AND 'ChIP-seq'[sourceSerie.strategy]",
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

  export function useGetAllHTDatasetsTUS() {
    const {
      data,
      loading: loadingDatasets,
      error,
    } = useQuery(QUERY_getDatasetsFromSearch, {
      variables: {
        advancedSearch: "'TU'[datasetType]",
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

  export function useGetAllHTDatasetsTTS() {
    const {
      data,
      loading: loadingDatasets,
      error,
    } = useQuery(QUERY_getDatasetsFromSearch, {
      variables: {
        advancedSearch: "'TTS'[datasetType]",
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

  export function useGetAllHTDatasetsTSS() {
    const {
      data,
      loading: loadingDatasets,
      error,
    } = useQuery(QUERY_getDatasetsFromSearch, {
      variables: {
        advancedSearch: "'TSS'[datasetType]",
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

  