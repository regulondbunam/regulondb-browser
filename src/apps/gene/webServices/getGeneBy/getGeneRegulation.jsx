import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
import { CITATIONS_FIELDS } from "./fragments"

const REGULATORS = gql`
fragment Regulators on Regulators {
    id
    name
    type
    function
  }
`

//const RegulonGeneOntologyItem = ``

export function query(id) {
    return gql`
    ${CITATIONS_FIELDS}
    {
        getGenesBy(search: "${id}") {
            data{
                regulation {
                    operon {
                      id
                      name
                      arrangement {
                        regulator {
                          ...Regulators
                        }
                        promoters {
                          id
                          name
                          bindsSigmaFactor {
                            sigmaFactor_id
                            citations {
                              ...CitationsFields
                            }
                            sigmaFactor_name
                          }
                          citations {
                            ...CitationsFields
                          }
                          note
                          boxes {
                            leftEndPosition
                            rightEndPosition
                            sequence
                            type
                          }
                          score
                          sequence
                          synonyms
                          regulatorBindingSites {
                            regulator {
                              _id
                              name
                              function
                            }
                          }
                          transcriptionStartSite {
                            leftEndPosition
                            rightEndPosition
                            range
                            type
                          }
                        }
                        transcriptionUnit {
                          id
                          name
                        }
                      }
                    }
                    regulators {
                      ...Regulators
                    }
                    statistics {
                      regulators
                      regulatoryInteractions
                      promoters
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

const GetGeneInfo = ({
    id_gene = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_gene))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_res) {
            set_res(true)
            if (data.getGenesBy.pagination.totalResults === 1) {
                try {
                    resoultsData(data.getGenesBy.data[0].regulation)
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

    }, [loading, error, status, data, _res, resoultsData])
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

export default GetGeneInfo;