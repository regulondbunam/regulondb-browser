import { gql } from "@apollo/client";

export const query_GetGoTerms = gql`
  query GetGoTerms {
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
  }
`;

export const query_GetSubclassesOfTermId = gql`
  query GetSubclassesOfTermId($id: String) {
    getSubclassesOfTermId(_id: $id) {
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
  }
`;

export const query_GetTermBy = gql`query GetTermBy($search: String) {
  getTermBy(search: $search) {
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
