import { gql } from 'apollo-boost'
import React, { useState, useEffect } from 'react'
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

function query(limit = 10, page = 0) {
    return gql`
    {
        getAllGenes(limit: ${limit}, page: ${page}) {
            data {
                _id
                gene {
                    name
                    synonyms
                }
                products {
                    name
                    id
                }
            }
            pagination {
                limit
                currentPage
                firstPage
                lastPage
                totalResults
                hasNextPage
            }
        }
      }      
    `
}

export default function GetAllGenes({
    limit = 10,
    page = 0,
    status = () => { },
    resultsData = () => { },
    pagination = () => { }
}) {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_res) {
            set_res(true)
            try {
                resultsData(data.getAllGenes.data)
                pagination(data.getAllGenes.pagination)
                status('done')
            } catch (error) {
                status('error')
                console.log(error)
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    }, [loading, error, status, data, _res, resultsData, pagination])
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