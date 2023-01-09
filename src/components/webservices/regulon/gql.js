import { gql } from "@apollo/client";

export const fragment_CITATIONS = gql`fragment CITATIONS on Citations {
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
  }`

export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    lastPage
    limit
    totalResults
  }`

export const fragment_ALIGMENTMATRIX = gql`fragment ALIGMENTMATRIX on AligmentMatrix {
    aligment
    consensus
    matrix
    urlMatrixQualityResult
    urlPWMLogo
  }`

export const fragment_EVOLUTIONARYCONSERVATION = gql`fragment EVOLUTIONARYCONSERVATION on EvolutionaryConservation {
    urlPromoterTargetGene
    urlRegulatorTargetGene
  }`

export const fragment_GeneTerms = gql`fragment GeneTerms on GeneTermsObject {
    gene_id
    gene_name
  }`

export const fragment_GO = gql`fragment GENEONTOLOGY on RegulonGeneOntology {
    biologicalProcess {
      genes {
        ...GeneTerms
      }
      name
      term_id
    }
    cellularComponent {
      genes {
        ...GeneTerms
      }
      name
      term_id
    }
    molecularFunction {
      genes {
        ...GeneTerms
      }
      name
      term_id
    }
  }`

export const fragment_REGULATES = gql`fragment REGULATES on Regulates {
    genes {
      function
      id
      name
      terms {
        geneOntology {
          ...GENEONTOLOGY
        }
        multifun {
          id
          name
          genes {
            ...GeneTerms
          }
        }
      }
    }
    operons {
      firstGene {
        id
        name
      }
      function
      id
      name
    }
    sigmaFactors {
      function
      id
      name
    }
    transcriptionFactors {
      function
      id
      name
    }
    transcriptionUnits {
      firstGene {
        id
        name
      }
      function
      id
      name
    }
  }`

export const fragment_RI = gql`fragment RI on RegulonRegulatoryInteractions {
    citations {
      ...CITATIONS
    }
    distanceToFirstGene
    distanceToPromoter
    function
    regulatedEntity {
      _id
      name
      type
    }
    regulatedGenes {
      id
      name
    }
    regulator {
      _id
      continuants {
        _id
        name
        type
      }
      name
      type
    }
    regulatoryBindingSites {
      absolutePosition
      citations {
        ...CITATIONS
      }
      function
      id
      leftEndPosition
      rightEndPosition
      sequence
      strand
    }
  }`

export const fragment_TERMS = gql`fragment TERMS on Terms {
    geneOntology {
      ...GENEONTOLOGY
    }
    multifun {
      id
      name
      genes {
        ...GeneTerms
      }
    }
  }`

export const fragment_ENCODEFROM = gql`fragment ENCODEFROM on EncodedFrom {
    genes {
      gene_id
      gene_name
      genomePosition
      length
    }
    operon {
      name
      operon_id
      tusEncodingRegulator {
        promoterName
        transcriptionUnitName
      }
    }
  }`

export const fragment_TF = gql`fragment TF on TranscriptionFactor {
    _id
    citations {
      ...CITATIONS
    }
    conformations {
      citations {
        ...CITATIONS
      }
      effectorInteractionType
      functionalType
      id
      name
      type
    }
    connectivityClass
    encodedFrom {
      ...ENCODEFROM
    }
    name
    note
    products {
      _id
      name
    }
    sensingClass
    synonyms
  }`

export const query_GET_REGULON_BY = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ALIGMENTMATRIX}
${fragment_EVOLUTIONARYCONSERVATION}
${fragment_GeneTerms}
${fragment_GO}
${fragment_REGULATES}
${fragment_RI}
${fragment_TERMS}
${fragment_ENCODEFROM}
${fragment_TF}
query GetRegulonInfo(
    $advancedSearch: String
    $fullMatchOnly: Boolean = false
    $limit: Int = 10
    $organismName: String
    $page: Int = 0
    $search: String
  ) {
    getRegulonBy(
      advancedSearch: $advancedSearch
      fullMatchOnly: $fullMatchOnly
      limit: $limit
      organismName: $organismName
      page: $page
      search: $search
    ) {
      data {
        _id
        allCitations {
          ...CITATIONS
        }
        aligmentMatrix {
          ...ALIGMENTMATRIX
        }
        evolutionaryConservation {
          ...EVOLUTIONARYCONSERVATION
        }
        regulates {
          ...REGULATES
        }
        regulatoryInteractions {
          ...RI
        }
        terms {
          ...TERMS
        }
        transcriptionFactor {
          ...TF
        }
      }
      pagination {
        ...PAGINATION
      }
    }
  }`

export const query_GET_ALL_REGULON = gql`
${fragment_TF}
${fragment_CITATIONS}
${fragment_ENCODEFROM}
  query GetAllRegulon{
    getAllRegulon(limit: 0){
      data{
        _id
        transcriptionFactor {
          ...TF
        }
      }
      pagination{
        totalResults
      }
    }
  }`