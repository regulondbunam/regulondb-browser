import { useEffect, useId, useMemo, useState } from "react";
import {
  DataVerifier,
  FilterTable,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";

function formatData(genes = [],columnsWidth=300) {
  let data = [];
  const COLUMNS = [
    {
      id: "gene",
      header: "Gene",
      columns: [
        {
          id: "gene_name",
          header: "Name",
          accessorKey: "_name",
          filter: "fuzzyText",
          cell: (info) => (
            <Link to={"/gene/" + info.row.original.id}>{info.getValue()}</Link>
          ),
        },
      ],
    },
    {
      id: "gene_ontologyTerms",
      header: "Ontology Terms",
      columns: [
        {
          id: "ontologyTerms_biologicalProcess",
          header: "Biological Process",
          size: columnsWidth,
          accessorKey: "_biologicalProcess",
          cell: (info) => {
            return (
              <div style={{ overflow: "auto" }}>
                {DataVerifier.isValidArray(
                  info.row.original.biologicalProcess
                ) && (
                  <>
                    {info.row.original.biologicalProcess.map((process, index) => (
                      <p
                        key={`A_${index}OT_${info.row.original.id}_${process._id}`}
                      >
                        {process.name}
                      </p>
                    ))}
                  </>
                )}
              </div>
            );
          },
        },
        {
          id: "ontologyTerms_cellularComponent",
          header: "Cellular Component",
          size: columnsWidth,
          accessorKey: "_cellularComponent",
          filter: "fuzzyText",
          cell: (info) => {
            return (
              <div style={{ overflow: "auto" }}>
                {DataVerifier.isValidArray(
                  info.row.original.cellularComponent
                ) && (
                  <>
                    {info.row.original.cellularComponent.map((process, index) => (
                      <p
                        key={`A_${index}OT_${info.row.original.id}_${process._id}`}
                      >
                        {process.name}
                      </p>
                    ))}
                  </>
                )}
              </div>
            );
          },
        },
        {
          id: "ontologyTerms_molecularFunction",
          header: "Molecular Function",
          size: columnsWidth,
          accessorKey: "_molecularFunction",
          filter: "fuzzyText",
          cell: (info) => {
            return (
              <div style={{ overflow: "auto" }}>
                {DataVerifier.isValidArray(
                  info.row.original.molecularFunction
                ) && (
                  <>
                    {info.row.original.molecularFunction.map((process, index) => (
                      <p
                        key={`A_${index}OT_${info.row.original.id}_${process._id}`}
                      >
                        {process.name}
                      </p>
                    ))}
                  </>
                )}
              </div>
            );
          },
        },
      ],
    },
  ];
  if (DataVerifier.isValidArray(genes)) {
    genes.forEach((gene, index) => {
      const { _id, name, geneOntologyTerms } = gene;
      let _biologicalProcess = "",
        _cellularComponent = "",
        _molecularFunction = "";
      if (DataVerifier.isValidArray(geneOntologyTerms.biologicalProcess)) {
        _biologicalProcess = geneOntologyTerms.biologicalProcess
          .map((process) => process.name)
          .join("; ");
      }
      if (DataVerifier.isValidArray(geneOntologyTerms.cellularComponent)) {
        _cellularComponent = geneOntologyTerms.cellularComponent
          .map((process) => process.name)
          .join("; ");
      }
      if (DataVerifier.isValidArray(geneOntologyTerms.molecularFunction)) {
        _molecularFunction = geneOntologyTerms.molecularFunction
          .map((process) => process.name)
          .join("; ");
      }
      data.push({
        id: _id,
        _id: _id,
        ///
        _cellularComponent: _cellularComponent,
        cellularComponent: geneOntologyTerms.cellularComponent,
        _biologicalProcess: _biologicalProcess,
        biologicalProcess: geneOntologyTerms.biologicalProcess,
        _molecularFunction: _molecularFunction,
        molecularFunction: geneOntologyTerms.molecularFunction,
        _name: name,
      });
    });
  }
  return {data,COLUMNS};
}

export default function Genes(props) {
  const [columnsWidth, setColumnsWidth] = useState();
  const id = useId();

  useEffect(() => {
    const container = document.getElementById(id);
    if (container && !columnsWidth) {
      setColumnsWidth((container.offsetWidth - 200) / 3);
    }
  }, [id, columnsWidth]);

  //console.log(data);
  return (
    <div>
      <div id={id} style={{ width: "100%", height: "1px" }}></div>
      {columnsWidth && <DisplayTable columnsWidth={columnsWidth} {...props} />}
    </div>
  );
  //
}

function DisplayTable({ genes, sigmulonId = "a", columnsWidth }) {
  const table = useMemo(() => {
    return formatData(genes,columnsWidth);
  }, [genes,columnsWidth]);
  return (
    <FilterTable
      columns={table.COLUMNS}
      data={table.data}
      fileName={sigmulonId + "_SigmulonGenes"}
    />
  );
}
