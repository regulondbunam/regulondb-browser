import React from 'react';
import CoverSearch from './CoverSearch'
import {SearchGene} from '../apollo/geneCollection'
import { useQuery } from '@apollo/react-hooks';
import Button from '../ui-components/basicInput/Buttons'

const colecciones = ["Genes", "Gensor Unit", "Operon", "Regulon", "Sigmulon", "sRNA", "Grow Conditions"]


const ResultSearch = ({
    search
}) => {
    let searchGene = new SearchGene(search)
    const { data, loading, error } = useQuery(searchGene.query, {
        variables: { search }
    })
    if(loading){
        return (
            <>
            {CoverSearch("Loading Search Results ...","loading")}
            </>
        )
    }
    if(error){
        return (
            <>
            {CoverSearch("We have a problem with the server. Try again later.","error")}
            </>
        )
    }
    try {
        console.log(data.getGenesBy)
        let totalResults = data.getGenesBy.pagination.totalResults
        return (
            <>
                {
                    CoverSearch("("+totalResults+")Results for: "+search,'search')
                }
                <div className="bodyDiv">
                    {
                        colecciones.map((item)=>{
                            return(
                                <div key={item} style={{paddingRight: "2%", float: "left"}}>
                                {
                                item !== "Genes"
                                ? <Button className="aButton aDisabled" active={false} style={bbtnStyle} label={item} />
                                : <Button className="aButton" style={bbtnStyle} label={"("+totalResults+") "+item} />
                                }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    } catch (error) {
        console.log(error)
        return (
            <>
            {CoverSearch("We have a problem with the server[Query error]. Try again later.","error")}
            </>
        )
    }
}

const bbtnStyle = {
    fontSize: "14px",
}

export default ResultSearch;
