export const  RegulatorBindigSites = `
regulatorBindingSites {
    regulator {
      _id
      name
      function
    }
    regulatoryInteractions {
      _id
      centerPosition
      citations {
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
      function
      note
      regulatorySite {
        _id
        absolutePosition
        citations {
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
        leftEndPosition
        length
        note
        rightEndPosition
        sequence
      }
      mechanism
    }
    function
  }
`