import React, { useEffect } from 'react';
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { getTUs } from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const GetTUs = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTUs(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                const resoults = {}
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