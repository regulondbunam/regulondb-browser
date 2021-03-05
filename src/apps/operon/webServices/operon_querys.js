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
        }
      }
    }
    }`
}