import React, { useEffect} from 'react';
//import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

export function getAllOperon(limit=50, page=0) {
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
    }
  }`
}

const AllOperon = ({
    limit = 50,
    page = 0,
    resoultsFound = () => { },
    resoultsData = () => { },
    status = () => { }
}) => {
    const { data, loading, error } = useQuery(getAllOperon(limit, page))
    useEffect(() => {
        if (loading) {
            status('loading')
        }else{
            if (data !== undefined) {
                //console.log(data.getAllOperon.data)
                //const nResults = data.getGenesBy.pagination.totalResults
                //resoultsFound(nResults)
                resoultsData(data.getAllOperon.data)
                status('done')
            }
        }
        if (error) {
            status('error')
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
        const searchData = data.getAllOperon.data
        const operon = searchData.map((item) => {
            return { 
                '@type': 'Operon', 
                'name': item?.operon?.name, 
                'id': item?._id }
        })
        //console.log(operon)
        return (
            <Helmet
                script={[
                    helmetJsonLdProp({
                        "@context": {
                            "scheme": "http://schema.org/",
                            "bs": "http://bioschema.org/"
                        },
                        "@type": "FindAction",
                        "agent": {
                            "@type": "Organization",
                            "name": "RegulonDB-SearchTool"
                        },
                        "object": operon
                    }),
                ]}
            />
        );
    } catch (error) {
        return <></>
    }

}

export default AllOperon