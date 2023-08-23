import { Link } from "react-router-dom";
import { useGetGenes } from "./getGeneInfo";
import { useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { DataVerifier, FilterTable } from "../../../components/ui-components";

const COLUMNS = [
  {
    id: "gene_name",
    header: "Gene Name",
    accessorKey: "_geneName",
    cell: (info) => (
      <Link to={"/gene/" + info.row.original.geneId}>
        <p dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },
  {
    id: "gene_products",
    header: "Gene Products",
    accessorKey: "_products",
    cell: (info) => (<p dangerouslySetInnerHTML={{ __html: info.getValue() }} />),
  },
  {
    id: "operon",
    header: "Operon",
    accessorKey: "_operon",
    cell: (info) => (
      <Link to={"/operon/" + info.row.original.operonId}>
        {info.getValue()}
      </Link>
    ),
  },
  {
    id: "regulators",
    header: "Regulators",
    accessorKey: "_regulators",
    cell: (info) => {
      const regulators = info.row.original.regulators;
      return (
        <div>
          {regulators.map((regulator, index) => {
            return (
              <Link to={"/regulon/" + regulator._id}>{regulator.name}</Link>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "ontologyTerms",
    header: "Ontology Terms",
    accessorKey: "_terms",
  },
];

function formatData(geneData = []) {
  let data = [];
  if (DataVerifier.isValidArray(geneData)) {
    geneData.forEach((gene) => {
      let products = "";
      if (DataVerifier.isValidArray(gene.products)) {
        products = gene.products.map((p) => p.name).join("; ");
      }
      let operon = {};
      let regulators = [];
      if (DataVerifier.isValidObject(gene.regulation)) {
        if (DataVerifier.isValidObject(gene.regulation.operon)) {
          operon = gene.regulation.operon;
        }
        if (DataVerifier.isValidArray(gene.regulation.regulators)) {
          regulators = gene.regulation.regulators;
        }
      }

      data.push({
        id: gene._id,
        _geneName: gene.gene.name,
        _products: products,
        operonId: operon._id,
        _operon: operon?.name ? operon.name : "",
        regulators: regulators,
      });
    });
  }
  return data;
}

export default function Information({
  dispatch,
  selectedGenes,
  genesInformation,
}) {
  const data = useMemo(() => {
    return formatData(genesInformation);
  }, [genesInformation]);
  return (
    <div>
      {selectedGenes.length !== genesInformation.length && (
        <GetGeneInfo
          selectedGenes={selectedGenes}
          genesInformation={genesInformation}
          dispatch={dispatch}
        />
      )}
      {DataVerifier.isValidArray(data) && <FilterTable columns={COLUMNS} data={data} />}
    </div>
  );
}

function GetGeneInfo({ selectedGenes, genesInformation, dispatch }) {
  const { genesData } = useGetGenes(selectedGenes);
  if (
    DataVerifier.isValidArray(genesData) &&
    (!DataVerifier.isValidArray(genesInformation) ||
      selectedGenes.length !== genesInformation.length)
  ) {
    dispatch({ type: "updateGeneInfo", value: genesData });
  }
  //console.log(genesData);
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <CircularProgress />
    </div>
  );
}
