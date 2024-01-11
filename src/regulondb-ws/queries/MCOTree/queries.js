import { gql } from "@apollo/client";

export const query_GetGoTerms = gql`query GetGoTerms {
    getGoTerms {
      _id
      description
      genes {
        _id
        name
        productName
      }
      name
      ontologyId
      subclassOf
      subclasses
    }
  }`