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