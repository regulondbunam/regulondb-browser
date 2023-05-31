import { gql } from "@apollo/client";

export const query_GetReleasesVersions = gql`
query ReleasesVersion {
    getDatabaseInfo {
      regulonDBVersion
      releaseDate
    }
  }
`