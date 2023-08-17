import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../../components/ui-components";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    id: 'gene_name',
    header: 'Name',
    accessorKey: '_name',
    cell: info => <Link to={"/gene/" + info.row.original.id} >{info.getValue()}</Link>,
  },
  {
    id: 'gene_ontologyTerms',
    header: 'Ontology Terms',
    columns: [
      {
        id: 'ontologyTerms_biologicalProcess',
        header: 'Biological Process',
        accessorKey: '_biologicalProcess',
        cell: (info)=>{
          return(
            <div style={{ overflow: "auto" }} >
              {DataVerifier.isValidArray(info.row.original.biologicalProcess) && (
                <>{info.row.original.biologicalProcess.map((process,index)=>(
                  <p key={`A_${index}OT_${info.row.original.id}_${process._id}`} >
                    {process.name}
                  </p>
                ))}</>
              )}
            </div>
          )
        }
      },
      {
        id: 'ontologyTerms_cellularComponent',
        header: 'Cellular Component',
        accessorKey: '_cellularComponent',
        cell: (info)=>{
          return(
            <div style={{ overflow: "auto" }} >
              {DataVerifier.isValidArray(info.row.original.cellularComponent) && (
                <>{info.row.original.cellularComponent.map((process,index)=>(
                  <p key={`A_${index}OT_${info.row.original.id}_${process._id}`} >
                    {process.name}
                  </p>
                ))}</>
              )}
            </div>
          )
        }
      },
      {
        id: 'ontologyTerms_molecularFunction',
        header: 'Molecular Function',
        accessorKey: '_molecularFunction',
        cell: (info)=>{
          return(
            <div style={{ overflow: "auto" }} >
              {DataVerifier.isValidArray(info.row.original.molecularFunction) && (
                <>{info.row.original.molecularFunction.map((process,index)=>(
                  <p key={`A_${index}OT_${info.row.original.id}_${process._id}`} >
                    {process.name}
                  </p>
                ))}</>
              )}
            </div>
          )
        }
      }
    ]
  },
]
function formatData(genes = []) {
  let data = []
  if (DataVerifier.isValidArray(genes)) {
    genes.forEach((gene, index) => {
      const { _id, name, geneOntologyTerms } = gene
      let _geneOntologyTerms = "", _cellularComponent = "", _molecularFunction = ""
      if (DataVerifier.isValidArray(geneOntologyTerms.biologicalProcess)) {
        _geneOntologyTerms = geneOntologyTerms.biologicalProcess.map(process => process.name).join(";");
      }
      if (DataVerifier.isValidArray(geneOntologyTerms.cellularComponent)) {
        _geneOntologyTerms = geneOntologyTerms.cellularComponent.map(process => process.name).join(";");
      }
      if (DataVerifier.isValidArray(geneOntologyTerms.molecularFunction)) {
        _geneOntologyTerms = geneOntologyTerms.molecularFunction.map(process => process.name).join(";");
      }
      data.push({
        id: _id,
        _id: _id,
        ///
        _cellularComponent: _cellularComponent,
        cellularComponent: geneOntologyTerms.cellularComponent,
        _biologicalProcess: _geneOntologyTerms,
        biologicalProcess: geneOntologyTerms.biologicalProcess,
        _molecularFunction: _molecularFunction,
        molecularFunction: geneOntologyTerms.molecularFunction,
        _name: name,
      })
    })
  }
  return data
}

export default function Genes({ genes }) {
  const data = useMemo(() => {
    return formatData(genes)
  }, [genes])
  //console.log(data);
  return <FilterTable columns={COLUMNS} data={data} />
}
