import { gql } from "apollo-boost";

export function validateTUID(id) {
  return gql`
  {
    getOperonBy(advancedSearch: "${id}[transcriptionUnits.id]") {
      data {
        _id
        operon {
          name
        }
        transcriptionUnits {
          id
        }
      }
      pagination {
        totalResults
      }
    }
  }
  `
}

export function validateID(id) {
  return gql`{
        getOperonBy(search: "${id}"){
          data{
            _id
            operon{
              name
            }
            transcriptionUnits{
              id
            }
          }
          pagination{
            totalResults
          }
        }
        }`
}

export function getStatisticsTU(id) {
  return gql`{
    getOperonBy(search:"RDBECOLIOPC02543"){
      data{
        _id
        operon{
          name
          statistics{
            genes
            promoters
            transcriptionUnit
          }
        }
      }
    }
  }`
}

export function getTUs(id) {
  return gql`{
    getOperonBy(search: "${id}"){
      data{
        _id
        transcriptionUnits{
          id
          name
          promoter{
            id
            name
          }
        }
      }
    }
    }`
}

export function getTU_description(id) {
  return gql`
  {
    getOperonBy(advancedSearch:"${id}[transcriptionUnits.id]"){
      data{
        _id
        transcriptionUnits{
          id
          name
          note
          synonyms
          firstGene{
            gene_id
            gene_name
          }
          citations{
            publication{
              id
              authors
              pmid
              citation
              url
              title
              year
            }
            evidence{
              id
              name
              code
              type
            }
          }
        }
      }
    }
    }
  `
}

export function getTU_genes(idTU) {
  return gql`
  {
    getOperonBy(advancedSearch:"${idTU}[transcriptionUnits.id]") {
      data {
        _id
        transcriptionUnits {
          id
          genes{
            name
            id
          }
        }
      }
    }
  }
  `
}

export function getTU_promoter(idTU) {
  return gql`
  {
    getOperonBy(advancedSearch:"${idTU}[transcriptionUnits.id]") {
      data {
        _id
        transcriptionUnits {
          id
          promoter {
            id
            name
            bindsSigmaFactor {
              sigmaFactor_id
              sigmaFactor_name
              citations {
                evidence {
                  id
                  name
                  code
                  type
                }
                publication {
                  id
                  authors
                  pmid
                  citation
                  url
                  title
                  year
                }
              }
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
            transcriptionStartSite {
              leftEndPosition
              rightEndPosition
              range
              type
            }
          }
        }
      }
    }
  }
  `
}

export function getTU_terminators(idTU) {
  return gql`
  {
    getOperonBy(advancedSearch: "${idTU}[transcriptionUnits.id]") {
      data {
        _id
        transcriptionUnits {
          id
          terminators {
            _id
            sequence
            transcriptionTerminationSite{
              type
              leftEndPosition
              rightEndPosition
            }
          }
        }
      }
    }
  }
  `
}
export function getTU_rBS(idTU) {
  //console.log(idTU)
  return gql`
  {
    getOperonBy(advancedSearch: "${idTU}[transcriptionUnits.id]") {
    	data {
        _id
        transcriptionUnits {
          id
          genes{
            id
            name
            regulatorBindingSites {
              function
              regulator {
                _id
                name
                function
              }
              regulatoryInteractions {
                _id
                function
                centerPosition
                note
                mechanism
                regulatorySite {
                  _id
                  absolutePosition
                  leftEndPosition
                  length
                  note
                  rightEndPosition
                  sequence
                }
              }
            }
          }
          promoter{
            id
            name
            regulatorBindingSites{
              function
            regulator {
              _id
              name
              function
            }
              regulatoryInteractions {
              _id
              function
              centerPosition
              note
              mechanism
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
              regulatorySite {
                _id
                absolutePosition
                leftEndPosition
                length
                note
                rightEndPosition
                sequence
              }
            }
            }
          }
          regulatorBindingSites {
            function
            regulator {
              _id
              name
              function
            }
            regulatoryInteractions {
              _id
              function
              centerPosition
              note
              mechanism
              regulatorySite {
                _id
                absolutePosition
                leftEndPosition
                length
                note
                rightEndPosition
                sequence
              }
            }
          }
        }
      }
    }
  }
  `
}