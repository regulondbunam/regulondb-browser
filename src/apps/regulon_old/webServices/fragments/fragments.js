import { gql } from '@apollo/client';

export const CITATIONS_FIELDS = gql`
fragment CitationsFields on Citations {
    publication {
      id
      authors
      pmid
      citation
      url
      title
      year
    }
    evidence {
      id
      name
      code
      type
    }
  }
`