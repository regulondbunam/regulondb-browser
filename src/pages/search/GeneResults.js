import React, { useEffect } from 'react';
import {SearchGene} from '../components/apollo/GeneCollection'
import { useQuery } from '@apollo/react-hooks';

const GeneResults = ({
    search,
    resoultsFound = ()=>{}
}) => {
    let searchGene = new SearchGene(search)
    const { data, loading, error } = useQuery(searchGene.query, {
        variables: { search }
    })
    useEffect(()=>{
        if(data!==undefined){
            console.log(data.getGenesBy.pagination.totalResults)
            const nResults = data.getGenesBy.pagination.totalResults
            resoultsFound(nResults)
        }
    })
    if(loading){
        return <>Loding...</>
    }
    if(error){
        console.log(error)
        return <>Server error</>
    }
    try {
        const nResults = data.getGenesBy.pagination.totalResults
        if(nResults>0){
            return(
                <>
                </>
            )
        }else{
            return <>no results</>
        }
    } catch (error) {
        
    }

    return ( 
        <></>
     );
}

 
export default GeneResults;