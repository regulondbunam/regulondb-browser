import { useQuery, gql } from '@apollo/client'

export default class Gene {
  constructor(id) {
    this.id = id
  }
  consoleInfo() {
    console.log("C: ", this.id)
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