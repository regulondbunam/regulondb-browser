import React, { useEffect, useState } from 'react';
import { gql } from "@apollo/client";

import { useQuery } from '@apollo/react-hooks';

export function query(id_operon) {
    return gql`{
            getOperonBy(search: "${id_operon}"){
                data{
                    _id
                    operon{
                        name
                        regulationPositions {
                            leftEndPosition
                            rightEndPosition
                          }
                    }
                    transcriptionUnits{
                        id
                    }
                    allCitations {
                        publication {
                          id
                          authors
                          pmid
                          citation
                          url
                          title
                          year
                        }
                        evidence {
                          id
                          name
                          code
                          type
                        }
                      }
                }
                pagination{
                    totalResults
                }
            }
        }`
}

const ValidateId = ({
    id_operon = '',
    status = () => { },
    isValidate = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_operon))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data && !_res) {
                set_res(true)

                if (data.getOperonBy.pagination.totalResults === 1) {
                    try {
                        //console.log(data.getOperonBy.data)
                        resoultsData(data.getOperonBy.data)
                        status('done')
                        isValidate(true)
                    } catch (error) {
                        status('error')
                        console.error(error)
                    }
                } else {
                    resoultsData()
                    isValidate(false)
                    status('not found')
                }
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }
    }, [loading, error, status, data, _res, resoultsData, isValidate])

    if (loading) {
        return <></>
    }
    if (error) {
        console.log("operon_ws_validate", error)
        return <></>
    }
    return (<></>);
}

export default ValidateId