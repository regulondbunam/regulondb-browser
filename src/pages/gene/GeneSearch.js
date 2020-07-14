import React from 'react';
import Cover from './ownComponents/Cover'
import Title from './ownComponents/TitleGene'
import GeneTabs from './GeneTabs'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const GetGeneName = gql`
query countGenes($advancedSearch: String!){
  getGenesBy(limit:1 page: 0 advancedSearch:$advancedSearch)
    {
        data{
            geneInfo{
                name
            }
            products{
                name
            }
            growthConditions{
                effect
            }
        }
    }
  
  }
`

const GeneSearch = ({
    idGene,
    site,
    section
}) => {
    const advancedSearch = idGene + "[geneInfo.id]"
    let state = `please wait we are querying the id ${idGene}`
    const { data, loading, error } = useQuery(GetGeneName, {
        variables: { advancedSearch }
    })
    // console.log("data: ", data)
    // console.log("loading", loading)
    // console.log("error", error)
    if(loading){
    return <>{Cover(state,'loading')}</>
    }
    if(error){
        state = 'Sorry for the inconvenience, we have a problem with our service, we are already working to solve it, try again later'
        console.log(error)
        return <>{Cover(state,'error')}</>
    }
    try {
        const geneData = data.getGenesBy.data
        if(geneData.length < 1){
            state = `Sorry we couldn't find the identifier: ${idGene}`
            return <>{Cover(state,'error')}</>
        }
        const gwc = geneData[0].growthConditions
        const geneName = geneData[0].geneInfo.name
        const products= geneData[0].products
        return (
            <>
                {Title(geneName, idGene,products)}
                <div>
                    <GeneTabs idGene={idGene} prodCount={products.length} gwcCount={gwc.length}/>
                </div>
            </>
        );
    } catch (error) {
        console.log(error)
        state = `Sorry we have a problem with the identifier: ${idGene}, try again later`
        return <>{Cover(state,'error')}</>
    }

    
}
 
export default GeneSearch;