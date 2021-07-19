import React, { useEffect} from 'react';
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import {querySearch} from './querys'
import { useQuery } from '@apollo/react-hooks';


const Search = ({
    search = '',
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
}) => {
    const { data, loading, error } = useQuery(querySearch(search, limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }else{
            if (data !== undefined) {
                const nResults = data.getGenesBy.pagination.totalResults
                resoultsFound(nResults)
                resoultsData(data.getGenesBy.data)
                status('done')
            }
        }
        if (error) {
            status('error')
        }
    })

    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        const searchData = data.getGenesBy.data
        const genes = searchData.map((item) => {
            return { 
                '@type': 'Gene', 
                'name': item.gene.name, 
                'id': item.gene.id }
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

export default Search