import { gql } from "apollo-boost";

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
          statistics{
            sites
            genes
            transcriptionFactors
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
          promoter{
            id
            name
            note
            synonyms
            bindsSigmaFactor{
              sigmaFactor_id
              sigmaFactor_name
            }
            transcriptionStartSite{
              leftEndPosition
              rightEndPosition
              range
              type
            }
            sequence
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
    getOperonBy(advancedSearch: "RDBECOLITUC01986[transcriptionUnits.id]") {
      data {
        _id
        transcriptionUnits {
          terminators {
            _id
            sequence
          }
        }
      }
    }
  }
  `
}