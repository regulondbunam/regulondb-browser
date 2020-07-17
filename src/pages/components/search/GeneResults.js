import React, { useEffect, useState } from 'react';
import Gene from './tabs/Genes'
import {SearchGene} from '../apollo/GeneCollection'
import { useQuery } from '@apollo/react-hooks';

const GeneResults = ({
    search,
    resoultsFound = ()=>{}
}) => {
    const [limit] = useState(50)
    const [page] = useState(0)
    let searchGene = new SearchGene(search, limit, page)
    const { data, loading, error } = useQuery(searchGene.query, {
        variables: { search }
    })
    useEffect(()=>{
        if(data!==undefined){
            //console.log(data.getGenesBy.pagination.totalResults)
            const nResults = data.getGenesBy.pagination.totalResults
            resoultsFound(nResults)
        }
    })
    if(loading){
        return <>Loading...</>
    }
    if(error){
        console.log(error)
        return <>Server error</>
    }
    try {
        const nResults = data.getGenesBy.pagination.totalResults
        if(nResults>0){
            return(
                <Gene data={data.getGenesBy.data} search={search} />
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