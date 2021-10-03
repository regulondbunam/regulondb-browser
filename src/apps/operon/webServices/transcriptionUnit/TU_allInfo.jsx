import React, { useEffect } from 'react';
import { gql } from "apollo-boost";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import {RegulatorBS, CITATIONS} from "./TU_fragments"

export function query(id_operon) {
    return gql`
    ${CITATIONS}
    ${RegulatorBS}
    {
        getOperonBy(search: "${id_operon}") {
            data {
                _id
                transcriptionUnits {
                  id
                  name
                  note
                  synonyms
                  firstGene {
                    distanceToPromoter
                    gene_id
                    gene_name
                  }
                  genes {
                    id
                    name
                    regulatorBindingSites {
                      ...RegulatorBS
                    }
                  }
                  promoter {
                    id
                    name
                    bindsSigmaFactor {
                      sigmaFactor_id
                      citations {
                        ...CITATIONS
                      }
                      sigmaFactor_name
                    }
                    citations {
                      ...CITATIONS
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
                      ...RegulatorBS
                    }
                    transcriptionStartSite {
                      leftEndPosition
                      rightEndPosition
                      range
                      type
                    }
                  }
                  terminators {
                    _id
                    class
                    citations {
                      ...CITATIONS
                    }
                    sequence
                    transcriptionTerminationSite {
                      leftEndPosition
                      rightEndPosition
                      type
                    }
                  }
                  regulatorBindingSites {
                    ...RegulatorBS
                  }
                  statistics {
                    genes
                    sites
                    transcriptionFactors
                  }
                  citations {
                    ...CITATIONS
                  }
                }
            }
            pagination{
                totalResults
            }
        }
    }
    `
}

const GetTUallInfo = ({
    id_operon = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(query(id_operon))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            if (data.getOperonBy.pagination.totalResults === 1) {
                try {
                    resoultsData(data.getOperonBy.data[0])
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

export default GetTUallInfo;