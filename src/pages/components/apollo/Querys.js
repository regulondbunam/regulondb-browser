import {gql} from '@apollo/client'

const ADV_SEARCH = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:10 page: 0 advancedSearch:$advancedSearch)
    {
      geneInfo{
        name
        id
        note
      }
    }
  
  }
`

const SIM_SEARCH = gql`
query countGenes($search: String!){
    getGenesBy(limit:10 page:0 search:$search)
    {
      geneInfo{
        name
        id
        note
      }
    }

  
  }
`

export{ SIM_SEARCH, ADV_SEARCH}