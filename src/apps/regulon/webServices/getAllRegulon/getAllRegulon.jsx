import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

export function query(limit, page) {
    return gql`
    {
        getAllRegulon(limit: ${limit}, page: ${page}) {
            data {
                _id
                transcriptionFactor{
                    name
                    synonyms
                    conformations{
                        id
                        name
                    }
                }
            }
            pagination{
                totalResults
            }
        }
    }`
}

const GetAllRegulon = ({
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data && !_res) {
                set_res(true)
                if (data.getAllRegulon.pagination.totalResults >= 1) {
                    try {
                        //console.log(data.getAllRegulon.data)
                        resoultsData(data.getAllRegulon.data)
                        resoultsFound(data.getAllRegulon.pagination.totalResults)
                        status('done')
                    } catch (error) {
                        status('error')
                        console.error(error)
                    }
                } else {
                    resoultsData({})
                    resoultsFound(data.getAllRegulon.pagination.totalResults)
                    status('not found')
                }
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }
    },[loading, error, status, data, _res, resoultsData, resoultsFound])
    if(data){
        return <></>
    }
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    return (<></>);
}

export default GetAllRegulon;