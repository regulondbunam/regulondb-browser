import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";

function query(leftEndPosition, rightEndPosition, strand, objectType, covered) {
    return gql`
        {
            getGeneticElementsFromInterval(
                  leftEndPosition: ${leftEndPosition}
                  rightEndPosition: ${rightEndPosition}
                  strand: "${strand}"
                  objectType: ${objectType}
                covered: ${covered}
                ) {
              _id
              leftEndPosition
              rightEndPosition
              objectType
              strand
              objectRGBColor
              labelName
              tooltip
              linkedObjectWhenNoPositions {
                _id
                leftEndPosition
                rightEndPosition
                strand
              }
              relatedGenes {
                gene_id
              }
            }
          }
        `
}

const GetGeneticElements = ({
    leftEndPosition = 100,
    rightEndPosition = 20000,
    strand = "both",
    objectType = ["gene"],
    covered = true,
    status = () => { },
    resoultsData = () => { },
}) => {
    //states
    const { data, loading, error } = useQuery(query(leftEndPosition, rightEndPosition, strand, objectType, covered))

    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
                resoultsData(data.getGeneticElementsFromInterval)
                status('done')
            } catch (error) {
                status('error')
                console.error("try query: ", error)
            }

        }
        if (error) {
            status('error')
            console.error("useQuery: ", error)
        }

    }, [loading, error, status, data, resoultsData])

    return (<></>);
}

export default GetGeneticElements;
