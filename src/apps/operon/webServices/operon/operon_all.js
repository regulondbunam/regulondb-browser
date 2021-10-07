import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

export function query(limit, page) {
    return gql`{
    getAllOperon(limit: ${limit}, page: ${page}) {
        data {
            _id
            operon {
                name
                statistics{
                    genes
                    promoters
                    transcriptionUnit
                }
            }
            transcriptionUnits{
                id
                name
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
  }`
}

const GetAllOperon = ({
    limit = 50,
    page = 0,
    pagination = () => { },
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
                if (data.getAllOperon.pagination.totalResults >= 1) {
                    try {
                        //console.log(data.getAllOperon.data)
                        resoultsData(data.getAllOperon.data)
                        pagination(data.getAllOperon.pagination)
                        status('done')
                    } catch (error) {
                        status('error')
                        console.error(error)
                    }
                } else {
                    resoultsData({})
                    status('not found')
                }
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }
    },[loading, error, status, data, _res, resoultsData, pagination])
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

export default GetAllOperon;