import { gql } from "@apollo/client";

export const fragment_CITATIONS = gql`fragment CITATIONS on Citations {
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
  }`

export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    lastPage
    limit
    totalResults
  }`

export const query_getAllSigmulon = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
query getAllSigmulon {
    getAllSigmulon {
      pagination {
        ...PAGINATION
      }
      data {
        _id
        allCitations {
          ...CITATIONS
        }
        sigmaFactor {
          _id
          gene {
            _id
            name
          }
          name
          sigmulonGenes {
            name
            _id
          }
          sigmulonRegulators {
            _id
            name
          }
          synonyms
        }
        statistics {
          cotranscriptionFactors
          genes
          promoters
          sigmaFactors
          transcriptionFactors
          transcriptionUnits
        }
        transcribedPromoters {
          _id
          boxes {
            leftEndPosition
            rightEndPosition
            sequence
            type
          }
          name
          operon_id
          sequence
          transcribedGenes {
            _id
            distanceFromTSS
            name
          }
          citations {
            evidence {
              code
              id
              name
              type
            }
            publication {
              authors
              citation
              id
              pmid
              title
              url
              year
            }
          }
        }
      }
    }
  }`