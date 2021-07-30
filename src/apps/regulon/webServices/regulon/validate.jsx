import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

export function query(id) {
    return gql`
    {
        getRegulonBy(search: "${id}") {
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
            pagination {
                totalResults
            }
        }
      }
    `
}

const ValidateID = ({
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
            //if (data.getRegulonBy.pagination.totalResults === 1) {
            if (true) {
                try {
                    //resoultsData(data.getRegulonBy.data[0])
                    resoultsData(DTA)
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

export default ValidateID;

const DTA  = 
{
    "_id": "RDBECOLITFC00039",
    "transcriptionFactor": {
      "name": "AraC",
      "synonyms": [
        "AraC"
      ],
      "conformations": [
        {
          "id": "RDBECOLIPDC03929",
          "name": "AraC"
        },
        {
          "id": "RDBECOLIRCC00160",
          "name": "DNA-binding transcriptional dual regulator AraC"
        },
        {
          "id": "RDBECOLIRCC00006",
          "name": "AraC-L-arabinose DNA-binding transcriptional activator"
        }
      ]
    }
  }