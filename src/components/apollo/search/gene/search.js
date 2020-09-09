import React, {useEffect} from 'react';
//import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from "react-helmet";
import GeneQuerys from '../../querys/GeneQuerys'
import { useQuery } from '@apollo/react-hooks';

const Search = ({
    search = '',
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { }
}) => {
    const geneQuery = new GeneQuerys()
    const { data, loading, error } = useQuery(geneQuery.querySearch(search,limit,page))
    useEffect(()=>{
        if(data!==undefined){
            //console.log(data.getGenesBy.pagination.totalResults)
            const nResults = data.getGenesBy.pagination.totalResults
            resoultsFound(nResults)
            resoultsData(data.getGenesBy.data)
        }
    })

    if(loading){
        return <>Loading...</>
    }
    if(error){
        console.log(error)
        return <>Server error</>
    }
    return (
        <Helmet
            script={[
                helmetJsonLdProp({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    url: "http://35.175.246.117:3000/search/",
                    potentialAction: {
                        "@type": "SearchAction",
                        "target": "http://35.175.246.117:3000/search/{search_term_string}",
                        "query-input": "required name=search_term_string"
                      }
                }),
            ]}
        />
    );
}

export default Search;