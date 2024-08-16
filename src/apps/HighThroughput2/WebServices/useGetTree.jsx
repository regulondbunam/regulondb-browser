import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";

const query = gql`
  query getListOfTypeDatasets {
    listAllDatasetTypes
    listAllHTSources
  }
`;

  


export default function useGetInitTree() {
    const { data, loading, error } = useQuery(query);
    let items;
    
    return 
}