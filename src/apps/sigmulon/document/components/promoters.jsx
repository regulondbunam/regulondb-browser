import { useMemo } from "react";
import {
  DataVerifier,
  FilterTable,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";
import SimpleTrack from "../../../../components/drawingTrack/_old";

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
    width: "50px",
  },
  {
    id: "promoter_relationGene",
    header: "Transcribed gene(s)",
    columns: [
      {
        id: "promoter_genes",
        header: "name",
        accessorKey: "_geneNames",
        filter: "fuzzyText",
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
        header: "Distance from TSS to first gene",
        accessorKey: "_geneTSS",
        filter: "fuzzyText",
      },
    ],
  },
  {
    id: "promoter_sequence",
    header: "Promoter Sequence",
    accessorKey: "_sequence",
    filter: "fuzzyText",
    cell: (info) => (
      <SequencePromoter
        _id={"sequence_" + info.row.original.id}
        name={"sequence-promoter-" + info.row.original.id}
        boxes={info.row.original.boxes}
        transcriptionStartSite={info.row.original.TSSPosition}
        sequence={info.getValue()}
      />)
  },
  /*
  {
    id: "promoter_citations",
    header: "Citations",
    accessorKey: "_citation",
    filter: "fuzzyText",
  },
  */
];
function formatData(promoters = []) {
  let data = [];
  if (DataVerifier.isValidArray(promoters)) {
    promoters.forEach((promoter, index) => {
      let { _id, boxes, citations, name, sequence, TSSPosition } = promoter;
      let transcribedGenes = [...promoter.transcribedGenes]
      let genes = "",
        genesTss = "";
      if (DataVerifier.isValidArray(transcribedGenes)) {
        transcribedGenes.sort((a, b) => a.distanceFromTSS - b.distanceFromTSS)
        genes = transcribedGenes.map((gene) => gene.name).join(";");
        genesTss = transcribedGenes[0].distanceFromTSS !== 0 ? transcribedGenes[0].distanceFromTSS : ""
      } else {
        transcribedGenes = [];
      }
      data.push({
        id: _id,
        transcribedGenes: transcribedGenes,
        boxes: boxes,
        TSSPosition: TSSPosition,
        _id: _id,
        _name: name,
        _tssPosition: TSSPosition,
        _geneNames: genes,
        _geneTSS: genesTss,
        _sequence: sequence,
        _citations: "---",
      });
    });
  }
  return data;
}

export default function TranscribedPromoters({ promoters, sigmulonId }) {
  const data = useMemo(() => {
    return formatData(promoters);
  }, [promoters]);
  //console.log(data);
  return <FilterTable columns={COLUMNS} data={data} fileName={sigmulonId + "_SigmulonPromoters"} />;
}

function SequencePromoter({
  _id,
  boxes,
  name,
  transcriptionStartSite,
  sequence,
  //strand,
}) {
  const drawPlaceId = "canva_sequence_" + _id;
  const width = sequence.length;
  const height = 50;
  const features = useMemo(() => {
    let promoterRelativePosition = sequence
      .split("")
      .findIndex((bp) => bp === bp.toUpperCase());
    let _features = [];
    _features.push({
      id: "sequence_" + _id,
      type: "sequence",
      sequence: sequence,
      posX: 0,
      posY: height - 30,
    });
    _features.push({
      id: _id + "_promoter_" + promoterRelativePosition + "_feature",
      label: "+1",
      posX: promoterRelativePosition,
      posY: height - 40,
      type: "promoter",
    });
    if (DataVerifier.isValidArray(boxes)) {
      boxes.forEach((box, index) => {
        const strand = (transcriptionStartSite-box.leftEndPosition)>0 ? "forward" : "reverse"
        let boxPosition =
          strand === "forward" ? box.leftEndPosition : box.rightEndPosition;
        const distancePromoter_BoxLeft = Math.abs(
          transcriptionStartSite - boxPosition
        );

        _features.push({
          id: _id + "_box_" + index + "_feature",
          label: box.type.replace("minus", "-"),
          posX: promoterRelativePosition - distancePromoter_BoxLeft,
          posY: height - 30,
          type: "box",
          sequence: box.sequence,
        });
      });
    }
    return _features;
  }, [_id, sequence, boxes, transcriptionStartSite]);
  return (
    <SimpleTrack
      drawPlaceId={drawPlaceId}
      width={width}
      height={height}
      features={features}
      controls={false}
    />
  );
}
