import React, { useEffect } from 'react';
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { getStatisticsTU } from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const GetSumaryByTU = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getStatisticsTU(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
               // console.log(data?.getOperonBy.data[0].transcriptionUnits)
                const resoults = data?.getOperonBy.data[0].transcriptionUnits
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

//Exapmle Stadistics
const Statistics = [
    {
        id: "0123",
        name: "tu_name",
        statistics: {
            regulators: 1,
            regulatoryInteractions: 1,
            promoters: 1,
            genes: 1,
            sites: 1,
            transcriptionFactors: 1,
        }
    },
    {
        id: "012334",
        name: "tu_name2",
        statistics: {
            regulators: 1,
            regulatoryInteractions: 1,
            promoters: 1,
            genes: 1,
            sites: 1,
            transcriptionFactors: 1,
        }
    },
    {
        id: "01233F4",
        name: "tu_name3",
        statistics: {
            regulators: 1,
            regulatoryInteractions: 1,
            promoters: 1,
            genes: 1,
            sites: 1,
            transcriptionFactors: 1,
        }
    }
]