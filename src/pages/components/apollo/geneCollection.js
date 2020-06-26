import { useQuery, gql } from '@apollo/client'

export default class Gene {
  constructor(id) {
    this.id = id
    this.getGeneInfo(`${id}[geneInfo.id]`)
  }
  getGeneInfo(advancedSearch) {
    const { data, loading, error } = useQuery(GENE_INFO, {
      variables: { advancedSearch }
    })
    //console.log(data)
    if(!loading){
      this.data = data.getGenesBy.data[0].geneInfo
    }else{
      this.data = data
    }
    this.loading = loading
    this.error = error
  }
}

export class OperonInfo {
  constructor(idGene){
    this.id = idGene
    this.OperonInfo(`${idGene}[geneInfo.id]`)
  }
  OperonInfo(advancedSearch) {
    const { data, loading, error } = useQuery(GENE_OPERON, {
      variables: { advancedSearch }
    })
    //console.log(error)
    if(!loading){
      this.data = data.getGenesBy.data[0].regulation.operon
    }else{
      this.data = data
    }
    this.loading = loading
    this.error = error
  }
}

export class RegulatorInfo {
  constructor(idGene){
    this.id = idGene
    this.regulatorInfo(`${idGene}[geneInfo.id]`)
  }
  regulatorInfo(advancedSearch) {
    const { data, loading, error } = useQuery(GENE_REGULATOR, {
      variables: { advancedSearch }
    })
    //console.log(error)
    if(!loading){
      this.data = data.getGenesBy.data[0].regulation.regulators
    }else{
      this.data = data
    }
    this.loading = loading
    this.error = error
  }
}


export class SearchGene {

  constructor(searchTerm) {
    this.searchTerm = searchTerm
    this.search(searchTerm)
  }

  search(search) {
    const { data, loading, error } = useQuery(GENE_SEARCH, {
      variables: { search }
    })
    //console.log(error)
    this.data = data
    this.loading = loading
    this.error = error
  }

}


/////QUERYS/////

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
query countGenes($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
      data{
        geneInfo{
          id
          name
          synonyms
          leftEndPosition
          rightEndPosition
          strand
          sequence
          gcContent
          centisomePosition
          note
          type
        }
      }
    }
  
  }
`

const GENE_OPERON = gql`
query countGenes($advancedSearch: String!){
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

const GENE_REGULATOR = gql`
query countGenes($advancedSearch: String!){
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