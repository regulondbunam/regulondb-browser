import React, { useEffect} from 'react';
//import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import {validateID} from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const ValidateId = ({
    id = '',
    status = () => { },
    isValidate = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(validateID(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            //console.log(data.getOperonBy.pagination.totalResults)
            
            if (data !== undefined) {
                const resoults = data.getOperonBy.pagination.totalResults
                if (resoults === 1) {
                    isValidate(true)
                    resoultsData(data.getOperonBy.data)
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
        if (data.getOperonBy.pagination.totalResults === 1) {
            const searchData = data.getOperonBy.data
            const operon = searchData.map((item) => {
                return { 
                    '@type': 'Operon', 
                    'name': item.operon.name, 
                    'id': item.id }
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
                                "name": "RegulonDB - Operon Information"
                            },
                            "object": operon
                        }),
                    ]}
                />
            );
        }
    } catch (error) {
    }
    return (<></>);
}