import { useMemo } from "react";
import {
  DataVerifier,
  FilterTable,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    id: "promoter_name",
    header: "Name",
    accessorKey: "_name",
    filter: "fuzzyText",
  },
  {
    id: "promoter_tssPosition",
    header: "TSS Position",
    accessorKey: "_tssPosition",
    filter: "fuzzyText",
  },
  {
    id: "promoter_relationGene",
    header: "Transcribed gene(s)",
    columns: [
      {
        id: "promoter_genes",
        header: "name",
        accessorKey: "_geneNames",
        cell: (info) => (
          <>
            {info.row.original.transcribedGenes.map((gene, index) => {
              return (
                <p key={"promoterGene_name" + index + "_" + gene.id}>
                  <Link to={"/gene/" + gene._id}>{gene.name}</Link>
                </p>
              );
            })}
          </>
        ),
      },
      {
        id: "promoter_genesTSS",
        header: "Distance from TSS",
        accessorKey: "_geneTSS",
        cell: (info) => (
          <>
            {info.row.original.transcribedGenes.map((gene, index) => {
              return (
                <p key={"promoterGene_tssDistance_" + index + "_" + gene.id}>
                  {gene.distanceFromTSS}
                </p>
              );
            })}
          </>
        ),
      },
    ],
  },
  {
    id: "promoter_sequence",
    header: "Promoter Sequence",
    accessorKey: "_sequence",
    filter: "fuzzyText",
  },
  {
    id: "promoter_citations",
    header: "Citations",
    accessorKey: "_citation",
    filter: "fuzzyText",
  },
];
function formatData(promoters = []) {
  let data = [];
  if (DataVerifier.isValidArray(promoters)) {
    promoters.forEach((promoter, index) => {
      let { _id, boxes, citations, name, sequence, transcribedGenes } =
        promoter;
      let genes = "",
        genesTss = "";
      if (DataVerifier.isValidArray(transcribedGenes)) {
        genes = transcribedGenes.map((gene) => gene.name).join(", ");
        genesTss = transcribedGenes
          .map((gene) => gene.distanceFromTSS)
          .join(", ");
      } else {
        transcribedGenes = [];
      }
      data.push({
        id: _id,
        transcribedGenes: transcribedGenes,
        boxes: boxes,
        _id: _id,
        _name: name,
        _tssPosition: "---",
        _geneNames: genes,
        _geneTSS: genesTss,
        _sequence: sequence,
        _citations: "---",
      });
    });
  }
  return data;
}

export default function TranscribedPromoters({ promoters }) {
  const data = useMemo(() => {
    return formatData(promoters);
  }, [promoters]);
  //console.log(data);
  return <FilterTable columns={COLUMNS} data={data} />;
}
