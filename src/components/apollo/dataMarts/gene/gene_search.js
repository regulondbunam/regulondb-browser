import React, { useEffect} from 'react';
//import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import GeneQuerys from '../../querys/GeneQuerys'
import { useQuery } from '@apollo/react-hooks';

export const ValidateId = ({
    id = '',
    status = () => { },
    isValidate = () => { },
    resoultsData = () => { },
}) => {
    const geneQuery = new GeneQuerys()
    const { data, loading, error } = useQuery(geneQuery.queryGetGeneById(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data !== undefined) {
                //console.log(data.getGenesBy.pagination.totalResults)
                const resoults = data.getGenesBy.pagination.totalResults
                if (resoults === 1) {
                    isValidate(true)
                    resoultsData(data.getGenesBy.data)
                    status('done')
                } else {
                    isValidate(false)
                    resoultsData({})
                    status('not found')
                }

            }
        }
        if (error) {
            status('error')
            console.log(error)
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
        if (data.getGenesBy.pagination.totalResults === 1) {
            const searchData = data.getGenesBy.data
            const gene = searchData.map((item) => {
                return { 
                    '@type': 'Gene', 
                    'name': item.gene.name, 
                    'id': item.gene.id }
            })
            return (
                <Helmet
                    script={[
                        helmetJsonLdProp({
                            "@context": {
                                "scheme": "http://schema.org/",
                                "bs": "http://bioschema.org/"
                            },
                            "@type": "Gene",
                            "agent": {
                                "@type": "Organization",
                                "name": "RegulonDB-GeneInformation"
                            },
                            "object": gene
                        }),
                    ]}
                />
            );
        }
    } catch (error) {
    }
    return (<></>);
}

const Search = ({
    search = '',
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
}) => {
    const geneQuery = new GeneQuerys()
    const { data, loading, error } = useQuery(geneQuery.querySearch(search, limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }else{
            if (data !== undefined) {
                //console.log(search)
                //console.log(data.getGenesBy.pagination.totalResults)
                //console.log(data.getGenesBy.data)
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

export default Search;