import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

export function query() {
    return gql`
    {
        getAllSigmulon{
            data{
                _id
                sigmaFactor{
                gene{
                    name
                }
                name
                }
            }
        }
      }`
}

const GetAllSigmulon = ({
    resoultsData = () => { },
    status = () => { }
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query())
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data && !_res) {
                set_res(true)
                    try {
                        //console.log(data.getAllSigmulon.data)
                        resoultsData(data.getAllSigmulon.data)
                        status('done')
                    } catch (error) {
                        status('error')
                        console.error(error)
                    }
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }
    }, [loading, error, status, data, _res, resoultsData])
    if (data) {
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

export default GetAllSigmulon;