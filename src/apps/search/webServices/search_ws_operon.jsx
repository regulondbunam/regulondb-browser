import React, { useEffect} from 'react';
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import {searchOperon} from './querys'
import { useQuery } from '@apollo/react-hooks';


const Search = ({
    search = '',
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
}) => {
    const { data, loading, error } = useQuery(searchOperon(search, limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }else{
            if (data !== undefined) {
                //console.log(data)
                const nResults = data.getOperonBy.pagination.totalResults
                resoultsFound(nResults)
                resoultsData(data.getOperonBy.data)
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
        //console.log(data.getOperonBy.data)
        const searchData = data.getOperonBy.data
        const genes = searchData.map((item) => {
            return { 
                '@type': 'Operon', 
                'name': item.operon.name, 
                'id': item.id }
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