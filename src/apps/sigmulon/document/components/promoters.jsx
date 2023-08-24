import { useMemo } from "react";
import {
  DataVerifier,
  FilterTable,
} from "../../../../components/ui-components";
import { Link } from "react-router-dom";
import { LinealSequence } from "../../../../components/sequence";

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
        TSSPosition={info.row.original.TSSPosition}
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

function SequencePromoter({ _id, boxes, name, TSSPosition, sequence, strand }) {

  const features = useMemo(() => {
    let promoterRelativePosition = sequence.split("").findIndex(bp => bp === bp.toUpperCase())
    let promoterFeatures = []

    promoterFeatures.push({
      id: _id + "_promoter_" + promoterRelativePosition + "_feature",
      label: "+1",
      showArrow: false,
      sequencePosition: promoterRelativePosition,
      type: "promoter",
    })
    if (DataVerifier.isValidArray(boxes)) {
      boxes.forEach((box, index) => {
        /*if (index===0) {
          console.log("strand?",((TSSPosition-box.leftEndPosition)>0) ? "forward" : "reverse");
          console.log(TSSPosition);
        }*/
        const strand = (TSSPosition-box.leftEndPosition)>0 ? "forward" : "reverse"
        let boxPosition = strand === "forward" ? box.leftEndPosition : box.rightEndPosition
        const distancePromoter_BoxLeft = Math.abs(TSSPosition - boxPosition)
        const boxWidth = box.sequence.length * 8
        promoterFeatures.push({
          id: _id + "_box_" + index + "_feature",
          label: box.type.replace('minus', '-'),
          sequencePosition: promoterRelativePosition - distancePromoter_BoxLeft,
          type: "box",
          boxWidth: boxWidth
        })
      })
    }
    /*
   
        
            let boxPosition = strand === "forward" ? box.leftEndPosition : box.rightEndPosition
            const distancePromoter_BoxLeft = Math.abs(transcriptionStartSite.leftEndPosition - boxPosition)
            const boxWidth = box.sequence.length * 8.41

            promoterFeatures.push({
                id: _id + "_box_" + index + "_feature",
                label: box.type.replace('minus', '-'),
                sequencePosition: promoterRelativePosition - distancePromoter_BoxLeft,
                type: "box",
                boxWidth: boxWidth
            })
        });
    }
    */
    return promoterFeatures
  }, [_id, sequence, boxes, TSSPosition])

  return <LinealSequence
    name={name}
    sequenceId={_id}
    height={50}
    controls={false}
    sequence={sequence}
    color={true}
    features={features}
    zoom={1}
  />

}