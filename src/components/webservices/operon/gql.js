import { gql } from "@apollo/client";

export const fragment_CITATIONS = gql`fragment CITATIONS on Citations {
    publication {
      _id
      authors
      pmid
      citation
      url
      title
      year
    }
    evidence {
      _id
      name
      code
      type
    }
  }`

export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    limit
    totalResults
  }`

export const fragment_RegulatorBS = gql`fragment RegulatorBS on RegulatorBindingSites {
    regulator {
      _id
      name
      function
    }
    regulatoryInteractions {
      _id
      centerPosition
      function
      note
      mechanism
      regulatorySite {
        _id
        absolutePosition
        citations {
          ...CITATIONS
        }
        leftEndPosition
        length
        note
        rightEndPosition
        sequence
      }
      citations {
        ...CITATIONS
      }
    }
    function
  }`

export const fragment_OPERON = gql`fragment OPERON on Operon {
    _id
    name
    regulationPositions {
      leftEndPosition
      rightEndPosition
    }
    strand
    statistics{
      genes
      promoters
      transcriptionUnits
    }
    citations {
      ...CITATIONS
    }
  }`

export const fragment_TRANSCRIPTIONUNIT = gql`fragment TRANSCRIPTIONUNITS on TranscriptionUnits {
    _id
    name
    note
    synonyms
    firstGene {
      _id
      distanceToPromoter
      name
    }
    genes {
      _id
      name
      regulatorBindingSites {
        ...RegulatorBS
      }
    }
    promoter {
      _id
      name
      bindsSigmaFactor {
        _id
        citations {
          ...CITATIONS
        }
        name
      }
      citations {
        ...CITATIONS
      }
      note
      boxes {
        leftEndPosition
        rightEndPosition
        sequence
        type
      }
      score
      sequence
      synonyms
      regulatorBindingSites {
        ...RegulatorBS
      }
      transcriptionStartSite {
        leftEndPosition
        rightEndPosition
        range
        type
      }
    }
    terminators {
      _id
      class
      citations {
        ...CITATIONS
      }
      sequence
      transcriptionTerminationSite {
        leftEndPosition
        rightEndPosition
        type
      }
    }
    regulatorBindingSites {
      ...RegulatorBS
    }
    statistics {
      genes
      sites
      transcriptionFactors
    }
    citations {
      ...CITATIONS
    }
  }`



export const query_GET_OPERON_BY = gql`
${fragment_CITATIONS}
${fragment_RegulatorBS}
${fragment_OPERON}
${fragment_TRANSCRIPTIONUNIT}
${fragment_PAGINATION}
query GetOperonInfo(
    $advancedSearch: String
    $search: String
  ) {
    getOperonBy(
      advancedSearch: $advancedSearch
      search: $search
    ) {
      data {
        _id
        schemaVersion
        organism {
          _id
          name
        }
        allCitations {
          ...CITATIONS
        }
        operon {
          ...OPERON
        }
  
        transcriptionUnits {
          ...TRANSCRIPTIONUNITS
        }
      }
      pagination {
        ...PAGINATION
      }
    }
  }`;
