import React, { useEffect, useState } from 'react';
import { query_GET_OPERON_BY } from './gql'
import { useQuery } from '@apollo/react-hooks';


export const GetOperonBy = ({
    advancedSearch,
    fullMatchOnly = false,
    limit = 10,
    page = 0,
    properties = ["operon.id", "operon.name"],
    search,
    status = () => { },
    resoultsData = () => { },
}) => {
    const { loading, error, data } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch, fullMatchOnly, limit, page, properties, search },
    });
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data ) {
            try {
                resoultsData(data.getOperonBy)
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

    }, [loading, error, status, data, resoultsData])
    return (<></>);
}