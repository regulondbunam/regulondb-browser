import { gql } from "apollo-boost";

export const allObjects = gql`
  {
    getAllObjectInfo {
      _id
      objectType
      graph {
        title
      }
    }
  }
`;

export default allObjects;
