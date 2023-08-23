import { gql } from "@apollo/client";

export const query_getAllGenes = gql`
  query GetGeneList {
    getObjectList(datamartType: "gene") {
      _id
      name
      synonyms
      productsName
    }
  }
`;
