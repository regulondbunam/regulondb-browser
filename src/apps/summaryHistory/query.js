import { gql } from "@apollo/client"

export const query_getSumaryHistoryData = gql`query GetDatabaseInfo {
  getDatabaseInfo {
    regulonDBVersion
    ecocycVersion
    lcVersion
    releaseDate
    note
    genomeVersion
    localData {
      type
      sourceName
      version
      note
      responsible
    }
    statistics {
      regulons {
        regulatoryContinuant {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withConfidenceLevel
          withPublications
          withEvidences
        }
        srna {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withConfidenceLevel
          withPublications
          withEvidences
        }
        transcriptionFactor {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withConfidenceLevel
          withPublications
          withEvidences
        }
      }
      operon {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      regulatoryInteractions {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      srnaInteractions {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      functConfTF {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      effectors {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      transcriptionFactors {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      regulatorBindingSites {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      promoters {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      genes {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      transcriptionUnits {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      terminators {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      shineDalgarnos {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      attenuators {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      riboswitches {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      functionalClasses {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      gensorUnits {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      synonyms {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withConfidenceLevel
        withPublications
        withEvidences
      }
      product {
        rnas {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withConfidenceLevel
          withPublications
          withEvidences
        }
        polypeptides {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withConfidenceLevel
          withPublications
          withEvidences
        }
      }
      externalReferences {
        total
        origin {
          medline
          genbank
          swissprot
          expasy
          geneprotec
          ouMicroArray
          pdb
          pir
        }
      }
    }
    route
    regulondbPMID
  }
}
`