import React, { useEffect } from 'react';
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { getTU_description } from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const DataTUdescription = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_description(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0].transcriptionUnits)
                const resoults = data.getOperonBy.data[0].transcriptionUnits
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
        //console.log("loading",id)
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