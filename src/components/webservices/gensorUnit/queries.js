import { gql } from "@apollo/client";

export const query_getAllGUs = gql`
{
    getAllGUs {
      data {
        _id
        gensorUnit {
          groups
          _id
          name
        }
      }
    }
  }
`;

export const /** object */ query_getGuById = gql`
    query GetGUsBy($advancedSearch: String) {
      getGUsBy(advancedSearch: $advancedSearch) {
        data {
          _id
          gensorUnit {
            components {
              function
              name
              type
            }
            description
            geneOntology {
              biologicalProcess {
                _id
                name
              }
              cellularComponent {
                _id
                name
              }
              molecularFunction {
                _id
                name
              }
            }
            groups
            _id
            name
            note
            signalName
          }
          reactions {
            components {
              function
              name
              type
            }
            description
            name
            number
            order
            pathwayComponents
            type
          }
          totalOfComponents
        }
      }
    }
  `;