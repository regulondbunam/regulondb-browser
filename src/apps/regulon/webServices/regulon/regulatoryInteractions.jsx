import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``

export function query(id) {
    return gql`
    ${CITATIONS_FIELDS}
    {
        getRegulonBy(search:"ara"){
            data{
                regulatoryInteractions{
                    regulator{
                        _id
                        type
                        name
                    }
                    function
                    regulatedEntity{
                        _id
                        type
                        name
                    }
                    distanceToPromoter
                    distanceToFirstGene
                    regulatedGenes{
                        id
                        name
                    }
                    regulatoryBindingSites{
                        id
                        function
                        absolutePosition
                        leftEndPosition
                        rightEndPosition
                        sequence
                        strand
                        citations{
                            ...CitationsFields
                        }
                    }
                    citations{
                        ...CitationsFields
                    }
                }
            }
            pagination{
                totalResults
            }
        }
      }
    `
}

const GetRegulatoryInteractions = ({
    id_regulon = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_regulon))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_res) {
            set_res(true)
            if (data.getRegulonBy.pagination.totalResults === 1) {
                try {
                    resoultsData(data.getRegulonBy.data[0].regulatoryInteractions)
                    status('done')
                } catch (error) {
                    status('error')
                    console.log(error)
                }
            } else {
                resoultsData({})
                status('not found')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    },[loading, error, status, data, _res, resoultsData])
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export default GetRegulatoryInteractions;