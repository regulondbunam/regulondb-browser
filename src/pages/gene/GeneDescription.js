import React from 'react';
import {useQuery,gql} from '@apollo/client'
import TabData from '../components/search/TabData'

const GetGeneInfo = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:10 page: 0 advancedSearch:$advancedSearch)
    {
      geneInfo{
        id
        name
        leftEndPosition
        rightEndPosition
        strand
        sequence
        gcContent
        centisomePosition
        note
        type
        synonyms
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
        const state = "Loading"
        return (
            <>
            </>
        );
    } else {
        if(data === undefined ){
            const state = "Sorry we have a problem with the server, please try again later, or contact us at xxx_xxx@ccg.unam.mx with the error ####"
            console.log(error)
            //error en sistema
            return(
                <>
                </>
            )
        }else{
            let geneName = ""
            try {
                geneName = data.getGenesBy[0].geneInfo.name
            } catch (error) {
                const state = "Sorry we couldn't find the identifier"
                return(
                    <>
                    </>
                )
            }
            return ( 
                <>
                <TabData data={data.getGenesBy[0].geneInfo} />
                </>
             );
        }
        
    }
}
 
export default GeneDescription;