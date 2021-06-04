import React, { useEffect } from 'react';
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { getOperonInfo } from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const GetInfoByOperon = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getOperonInfo(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
               // console.log(data?.getOperonBy.data[0].transcriptionUnits)
               //console.log(data)
                const resoults = data?.getOperonBy.data[0].operon
                resoultsData(resoults)
                status('done')
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
        // Structed data
    } catch (error) {
    }
    return (<></>);
}