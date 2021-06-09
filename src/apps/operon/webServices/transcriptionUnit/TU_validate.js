import React, { useEffect, useState } from 'react';
import { gql } from "@apollo/client";
import { useQuery } from '@apollo/react-hooks';

export function query(id_tu) {
    return gql`
    {
        getOperonBy(advancedSearch: "${id_tu}[transcriptionUnits.id]") {
            data {
                _id
                operon {
                    name
                }
                transcriptionUnits {
                    id
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
    id_tu = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_tu))

    useEffect(() => {
        if (loading) {
            status('loading')
        } else {
            if (data && !_res) {
                set_res(true)
                if (data.getOperonBy.pagination.totalResults === 1) {
                    try {
                        resoultsData(data.getOperonBy.data[0]._id)
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