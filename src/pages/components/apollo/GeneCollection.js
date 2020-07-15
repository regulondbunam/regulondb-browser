import { gql } from 'apollo-boost';

// Gene Info

export default class Gene {
  constructor(id) {
    this.advancedSearch = `${id}[geneInfo.id]`
    this.query = GENE_INFO
  }
}

const GENE_INFO = gql`
query getGeneInfo($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        geneInfo{
          id
          name
          synonyms
          leftEndPosition
          rightEndPosition
          centisomePosition
          strand
          sequence
          gcContent
          note
          type
        }
        products{
          name
        }
      }
    }
  
  }
`

// Gene Operon Info

export class OperonInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_OPERON
  }
}

const GENE_OPERON = gql`
query getGeneOperon($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        regulation{
        operon{
          id
          name
          arrangement{
            regulator{
              id
              name
              type
            }
            promoter{
              id
              name
            }
            transcriptionUnit{
              id
              name
            }
          }
        }
      }
      }
    }
  
  }
`


//Gene Regulators Info

export class RegulatorInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_REGULATOR
  }
}
const GENE_REGULATOR = gql`
query getGeneRegulator($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        regulation{
          regulators{
          id
          name
          type
        }
      }
      }
    }
  
  }
`

//Gene ContextInfo

export class ContextInfo {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_CONTEXT
  }
}
const GENE_CONTEXT = gql`
query getGeneContext($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      regulation {
        context {
          type
          name
          leftEndPosition
          rightEndPosition
          strand
          note
          evidenceReferences {
            evidenceName
            evidenceCode
            evidenceType
            referenceId
            referenceURL
            referenceCitation
          }
        }
      }
    }
  }
}
`

// Gene ShineDalgarno Info

export class ShineDalgarno {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_SHINEDALGARNO
  }
}
const GENE_SHINEDALGARNO = gql`
query getGeneShineDalgarno($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      shineDalgarno{
          distanceToGene
          leftEndPosition
          rightEndPosition
          sequence
          note
        }
    }
  }
}
`

// Search Gene

export class SearchGene {
  constructor(searchTerm,limit=50,page=0) {
    this.searchTerm = searchTerm
    this.query = gql`
query SearchGenes($search: String!){
    getGenesBy(limit:${limit} page:${page} search:$search)
    {
      data {
      geneInfo {
          id
          name
          synonyms
          note   
        }
        products{
          name
          regulatorId
        }
    }
    pagination{
      totalResults
    }
    }
  }
`
  }
}

//Gene Products Info

export class GeneProducts {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_PRODUCTS
  }
}
const GENE_PRODUCTS = gql`
query getGeneProducts($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      products {
        name
        synonyms
        regulatorId
        sequence
        isoelectricPoint
        molecularWeight
        cellularLocation
        anticodon
        note
        type
        motifs {
          leftEndPosition
          rightEndPosition
          sequence
          description
          type
          note
        }
        externalCrossReferences {
          id
          name
          url
        }
        evidenceReferences {
          evidenceName
          evidenceCode
          evidenceType
          referenceId
          referenceURL
          referenceCitation
        }
      }
    }
  }
}
`

//GEne Esternal Data Bases

export class ExternalDataBases {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_EXTERNAL
  }
}
const GENE_EXTERNAL = gql`
query getGeneExternal($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      geneInfo{
        id
        externalCrossReferences{
          name
          url
        }
      }
    }
  }
}
`

export class GrowthConditions {
  constructor(idGene) {
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_GROWTHCONDITIONS
  }
}
const GENE_GROWTHCONDITIONS = gql`
query getGrowthConditions($advancedSearch: String!) {
  getGenesBy(limit: 1, page: 0, advancedSearch: $advancedSearch) {
    data {
      growthConditions {
        controlCondition
        experimentalCondition
        effect
      }
    }
  }
}
`
