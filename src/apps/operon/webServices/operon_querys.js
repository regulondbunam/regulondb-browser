import { gql } from "apollo-boost";

export function validateID(id) {
  return gql`{
        getOperonBy(search: "${id}"){
          data{
            id
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
        id
        transcriptionUnits{
          id
          name
          statistics{
            regulators
            regulatoryInteractions
            promoters
            genes
            sites
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
        id
        transcriptionUnits{
          id
          name
        }
      }
    }
    }`
}