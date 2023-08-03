import React, { useMemo } from "react";
import { Cover, DataVerifier } from "../../components/ui-components";
import { gql, useQuery } from "@apollo/client";
import FilterTable from "../../components/filterTable";
import { Link } from "react-router-dom";


const query_GET_ALL_REGULON = gql`{
    getAllRegulon {
      data {
        _id
        regulator {
          name
        }
        summary {
          bindingSites {
            total
          }
          genes {
            total
          }
          operons {
            total
          }
          regulatoryInteractions {
            total
          }
          sigmaFactors {
            total
          }
          transcriptionFactors {
            total
          }
          transcriptionUnits {
            total
          }
        }
      }
    }
  }`

  const COLUMNS = [
    {
        Header: 'Name',
        accessor: '_name',
        filter: "fuzzyText",
        width: 100
    },
    {
        Header: 'Regulated Genes',
        accessor: '_genes',
        filter: "fuzzyText",
        width: 115
    },
    {
        Header: 'Regulated Operons',
        accessor: '_operons',
        filter: "fuzzyText"
    },
    {
        Header: 'Total of TF',
        accessor: '_tf',
        filter: "fuzzyText"
    },
    {
        Header: 'Total of Regulatory Interaction',
        accessor: '_ri',
        filter: "fuzzyText"
    }
]

function formatData(regulons = []) {
    let data = []
    if(DataVerifier.isValidArray(regulons)){
        regulons.forEach((regulon,index) => {
            const { summary, regulator, _id } = regulon
            data.push({
                _name: <Link value={regulator.name} to={"/regulon/"+_id} >{regulator.name}</Link>,
                _genes: summary.genes.total,
                _operon: summary.operons.total,
                _tf: summary.transcriptionFactors.total,
                _ri: summary.regulatoryInteractions.total
            })
        })
    }
    
    return data
}

export default function Home() {

   const {data, loading, error} = useQuery(query_GET_ALL_REGULON)

    let state = "done"
    let title = "Regulons"
    if (loading) {
        state = "loading"
        title = "loading Regulon list"
    }
    if (error) {
        state = "error"
        title = "... Sorry, we have an error, try again later 🥲"
    }
    if(data){
        state = "done"

    }

    return (
        <div>
            <Cover state={state} >
                <h1>{title}</h1>
            </Cover>
            <div style={{marginLeft: "3%"}}>
                {data && (
                    <Table regulons={data.getAllRegulon.data} />
                )}
            </div>
        </div>
    )
}

function Table({regulons}){
    const data = useMemo(()=>{
        return formatData(regulons)
    },[regulons])
    console.log(data);
    return <FilterTable columns={COLUMNS} data={data} />
}