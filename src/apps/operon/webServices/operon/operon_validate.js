import React, { useEffect, useState} from 'react';
import { gql } from "@apollo/client";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

export function query(id_operon) {
    return gql`{
            getOperonBy(search: "${id_operon}"){
                data{
                    _id
                    operon{
                        name
                    }
                    transcriptionUnits{
                        id
                    }
                }
                pagination{
                    totalResults
                }
            }
        }`
  }

const ValidateId = ({
    id_operon = '',
    status = () => { },
    isValidate = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_operon))

    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data && !_res) {
                set_res(true)
                if (data.getOperonBy.pagination.totalResults === 1) {
                    try {
                        console.log(data.getOperonBy.data)
                        resoultsData(data.getOperonBy.data)
                        status('done')
                        isValidate(true)
                    } catch (error) {
                        status('error')
                        console.error(error)
                    }
                } else {
                    resoultsData({})
                    isValidate(false)
                    status('not found')
                }
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }
    },[loading, error, status, data, _res, resoultsData, isValidate])

    if (loading) {
        return <></>
    }
    if (error) {
        console.log("operon_ws_validate",error)
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
                            "@type": "Operon",
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

export default ValidateId