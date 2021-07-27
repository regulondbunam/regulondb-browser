import React, { useEffect} from 'react';
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import {gql} from "apollo-boost";

export const query = (search, limit = 10, page = 0)=>{
    return gql`
    {
        getRegulonBy(limit: ${limit}, page: ${page}, search: "${search}") {
            data {
                _id
                transcriptionFactor{
                    name
                    synonyms
                    conformations{
                        id
                        name
                    }
                }
            }
            pagination {
                totalResults
            }
        }
    }
    `
}


const Search = ({
                    search = '',
                    limit = 50,
                    page = 0,
                    resoultsFound = () => { },
                    resoultsData = () => { },
                    status = () => { }
                }) => {
    const { data, loading, error } = useQuery(query(search, limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }else{
            if (data !== undefined) {
                //console.log(data)
                const nResults = data.getRegulonBy.pagination.totalResults
                resoultsFound(nResults)
                resoultsData(data.getRegulonBy.data)
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
        const searchData = data.getRegulonBy.data
        const regulon = searchData.map((item) => {
            return {
                '@type': 'Regulon',
                'name': item.transcriptionFactor.name,
                'id': item._id }
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
                        "object": regulon
                    }),
                ]}
            />
        );
    } catch (error) {
        return <></>
    }

}

export default Search