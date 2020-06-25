import React from 'react';
import {useQuery,gql} from '@apollo/client'
import TableGeneInfo from './descriptionTab/TableGeneInfo'

const GetGeneInfo = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:10 page: 0 advancedSearch:$advancedSearch)
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

const GeneDescription = ({
    geneID
}) => {
    const advancedSearch = geneID+'[geneInfo.id]'
    const { data, loading, error } = useQuery(GetGeneInfo, {
        variables: { advancedSearch }
    })
    // console.log("data: ",data)
    // console.log("loading",loading)
    // console.log("error",error)

    if (loading) {
        //const state = "Loading"
        return (
            <>
            </>
        );
    } else {
        if(data === undefined ){
            //Sorry for the inconvenience, we have a problem with our service, we are already working to solve it, try again later
            console.log(error)
            //error en sistema
            return(
                <>
                </>
            )
        }else{
            try {
                return ( 
                    <>
                    <TableGeneInfo data={data.getGenesBy.data[0].geneInfo} />
                    </>
                 );
            } catch (error) {
                //const state = "Sorry we couldn't find the identifier"
                return(
                    <>
                    </>
                )
            }
        }
        
    }
}
 
export default GeneDescription;