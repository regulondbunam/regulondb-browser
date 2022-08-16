import { gql } from  "@apollo/client";

export const RegulatorBS = gql`
fragment RegulatorBS on RegulatorBindingSites {
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
  }
`

export const CITATIONS = gql`
fragment CITATIONS on Citations {
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