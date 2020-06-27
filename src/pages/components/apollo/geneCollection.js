import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export default class Gene {
  constructor(id) {
    this.advancedSearch = `${id}[geneInfo.id]`
    this.query = GENE_INFO
  }
}

export class OperonInfo{
  constructor(idGene){
    this.advancedSearch = `${idGene}[geneInfo.id]`
    this.query = GENE_OPERON
  }
}

export class RegulatorInfo {
  constructor(idGene) {
    this.advancedSearch=`${idGene}[geneInfo.id]`
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

export class ContextInfo {
  constructor(idGene) {
    this.id = idGene
    this.contextInfo(`${idGene}[geneInfo.id]`)
  }
  contextInfo(advancedSearch) {
    const { data, loading, error } = useQuery(GENE_CONTEXT, {
      variables: { advancedSearch }
    })
    if (!loading) {
      this.data = data.getGenesBy.data[0].regulation.context
    } else {
      this.data = data
    }
    this.loading = loading
    this.error = error
  }
}

export class ShineDalgarno {
  constructor(idGene) {
    this.id = idGene
    this.ShineDalgarnoInfo(`${idGene}[geneInfo.id]`)
  }
  ShineDalgarnoInfo(advancedSearch) {
    const { data, loading, error } = useQuery(GENE_SHINEDALGARNO, {
      variables: { advancedSearch }
    })
    if (!loading) {
      this.data = data.getGenesBy.data[0].shineDalgarno
    } else {
      this.data = data
    }
    this.loading = loading
    this.error = error
  }
}

export class SearchGene {
  constructor(searchTerm) {
    this.searchTerm = searchTerm
    this.query = GENE_SEARCH
  }
}
const GENE_SEARCH = gql`
query countGenes($search: String!){
    getGenesBy(limit:50 page:0 search:$search)
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
    }
  }
`

//advancedSearch

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
      }
    }
  
  }
`

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