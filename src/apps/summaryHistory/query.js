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
          withwithConfidenceLevel
          withPublications
          withEvidences
        }
        srna {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withwithConfidenceLevel
          withPublications
          withEvidences
        }
        transcriptionFactor {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withwithConfidenceLevel
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
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      regulatoryInteractions {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      srnaInteractions {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      functConfTF {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      effectors {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      transcriptionFactors {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      regulatorBindingSites {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      promoters {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      genes {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      transcriptionUnits {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      terminators {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      shineDalgarnos {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      attenuators {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      riboswitches {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      functionalClasses {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      gensorUnits {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
        withPublications
        withEvidences
      }
      synonyms {
        total
        weak
        strong
        confirmed
        withoutEvidences
        withwithConfidenceLevel
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
          withwithConfidenceLevel
          withPublications
          withEvidences
        }
        polypeptides {
          total
          weak
          strong
          confirmed
          withoutEvidences
          withwithConfidenceLevel
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