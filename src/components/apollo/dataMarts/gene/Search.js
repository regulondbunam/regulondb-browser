import React, {useEffect} from 'react';
//import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
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
        return <></>
    }
    if(error){
        console.log(error)
        return <></>
    }
    try {
        const searchData = data.getGenesBy.data
        const genes = searchData.map((item)=>{
            return {'@type':'Gene','name':item.gene.name,'id':item.gene.id}
        })
        //console.log(genes)
        return (
            <Helmet
            script={[
                helmetJsonLdProp({
                    "@context": {
                        "scheme": "http://schema.org/",
                        "bs": "http://bioschema.org/"
                      },
                    "@type": "FindAction",
                    "agent": {
                      "@type": "Organization",
                      "name": "RegulonDB-SearchTool"
                    },
                    "object": genes
                }),
              ]}
            />
        );
    } catch (error) {
        return <></>
    }
    
}

export default Search;