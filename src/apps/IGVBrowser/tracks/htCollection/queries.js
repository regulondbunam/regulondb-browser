import { gql } from "@apollo/client";

export const QUERY_getDatasetsFromSearch = gql`
  query GetDatasetsFromSearch($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      datasetType
      objectsTested {
        name
        _id
        genes {
          _id
          name
        }
      }
      sample {
        title
      }
      sourceSerie {
        strategy
        title
      }
    }
  }
`;

export const QUERY_getAllTipsDataset = gql`
  query GetAllTipsDataset($limit: Int, $datasetId: String) {
    getAllPeaksOfDataset(limit: $limit, datasetId: $datasetId) {
      _id
    }
    getAllTFBindingOfDataset(datasetId: $datasetId, limit: $limit) {
      _id
    }
  }
`;