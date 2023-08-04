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
    header: 'Regulon',
    columns: [
      {
        id: 'Regulon_Name',
        header: 'Name',
        accessorKey: '_name',
        filter: "fuzzyText",
      },
    ]
  },
  {
    header: 'Regulated',
    columns: [
      {
        id: 'regulated_genes',
        header: 'Genes',
        accessorKey: '_genes',
        filter: "fuzzyText",
      },
      {
        id: 'regulated_operon',
        header: 'Operons',
        accessorKey: '_operon',
        filter: "fuzzyText"
      },
      {
        id: 'regulated_tu',
        header: 'Transcription Unit',
        accessorKey: '_tu',
        filter: "fuzzyText"
      },
    ]
  },
  {
    header: 'Total of',
    columns: [
      {
        id: 'regulated_ri',
        header: 'Regulatory Interaction',
        accessorKey: '_ri',
        filter: "fuzzyText"
      },
      {
        id: 'regulated_bs',
        header: 'Binding Sites',
        accessorKey: '_bs',
        filter: "fuzzyText"
      }
    ]
  },

]


function formatData(regulons = []) {
  let data = []
  if (DataVerifier.isValidArray(regulons)) {
    regulons.forEach((regulon, index) => {
      const { summary, regulator, _id } = regulon
      data.push({
        id: regulator.name+"_"+index,
        //_name: <Link value={regulator.name} to={"/regulon/" + _id} >{regulator.name}</Link>,
        _name: regulator.name,
        _genes: summary.genes.total,
        _operon: summary.operons.total,
        _tu: summary.transcriptionUnits.total,
        _ri: summary.regulatoryInteractions.total,
        _bs: summary.bindingSites.total
      })
    })
  }

  return data
}

export default function Home() {

  const { data, loading, error } = useQuery(query_GET_ALL_REGULON)

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
  if (data) {
    state = "done"

  }

  return (
    <div>
      <Cover state={state} >
        <h1>{title}</h1>
      </Cover>
      <div style={{ margin: "0 3% 0 3%" }}>
        {data && (
          <Table regulons={data.getAllRegulon.data} />
        )}
      </div>
    </div>
  )
}

function Table({ regulons }) {
  const data = useMemo(() => {
    return formatData(regulons)
  }, [regulons])
  console.log(data);
  return <FilterTable columns={COLUMNS} data={data} />
}