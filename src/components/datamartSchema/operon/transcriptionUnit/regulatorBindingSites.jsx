import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../ui-components";
import {
  ParagraphCitations,
  PC_VARIANTS,
  CITATION_SIZE,
} from "../../citations";
//import { Link } from "react-router-dom";

const COLUMNS = [
  {
    id: "regulator_name",
    header: "Regulator name (function: - represor, + activator, +- dual)",
    accessorKey: "_regulatorName",
    filter: "fuzzyText",
    cell: (info) => {
      let spanColor = "#000";
      let fun = "";
      switch (info.row.original.function) {
        case "repressor":
          fun = "-";
          spanColor = "#FF0000";
          break;
        case "activator":
          fun = "+";
          spanColor = "#14A054";
          break;
        case "dual":
          fun = "+-";
          spanColor = "#0000FF";
          break;
        default:
          fun = "";
          break;
      }
      return (
        <span style={{ color: spanColor }}>
          {info.getValue()}
          {fun}
        </span>
      );
    },
  },
  {
    id: "ri_central",
    header: "Central Rel Pos",
    filter: "fuzzyText",
    accessorKey: "_absolutePosition",
  },
  {
    id: "ri_posLeft",
    header: "LeftEndPosition",
    filter: "fuzzyText",
    accessorKey: "_leftEndPosition",
  },
  {
    id: "ri_posRight",
    header: "RightEndPosition",
    filter: "fuzzyText",
    accessorKey: "_rightEndPosition",
  },
  {
    id: "ri_sequence",
    header: "Sequence",
    accessorKey: "_sequence",
    width: 400,
    filter: "fuzzyText",
  },
  {
    id: "confidenceLevel",
    header: <p>Confidence Level <b><i> C: Confirmed</i>, S: Strong</b>, W Weak</p>,
    accessorKey: "_confidenceLevel",
    filter: "fuzzyText",
    cell: (info) => {
      const confidenceLevel = info.row.original._confidenceLevel
      switch (confidenceLevel) {
        case "W":
          return {confidenceLevel}
        case "S":
          return <b>{confidenceLevel}</b>
        case "C":
          return <b><i>{confidenceLevel}</i></b>
        default:
          return ""
      }
    },
  },
  {
    id: "citations",
    header: "Evidence & Citations [publication | Evidences]",
    accessorKey: "_citations",
    filter: "fuzzyText",
    cell: (info) => {
      return (
        <ParagraphCitations
          variant={PC_VARIANTS.paragraph}
          citationSize={CITATION_SIZE.ONLY_INDEX}
          citations={info.row.original.citations}
          allCitations={info.row.original.allCitations}
        />
      );
    },
  },
];

function formatData(regulatorBindingSites = [], allCitations) {
  let data = [];
  regulatorBindingSites.forEach((rbs) => {
    const _regulatorName = DataVerifier.isValidString(
      rbs.regulator.abbreviatedName
    )
      ? rbs.regulator.abbreviatedName
      : rbs.regulator.name;
    const regulonId = rbs.regulator._id;
    if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
      let _absolutePosition = "",
        _leftEndPosition = "",
        _rightEndPosition = "",
        _sequence = "",
        _confidenceLevel = "";

      rbs.regulatoryInteractions.forEach((regulatoryInteraction) => {
        let regulatorySite = regulatoryInteraction.regulatorySite;
        _confidenceLevel = regulatoryInteraction.confidenceLevel
        _absolutePosition = regulatoryInteraction.relativeCenterPosition;
        _leftEndPosition = regulatorySite.leftEndPosition;
        _rightEndPosition = regulatorySite.rightEndPosition;
        _sequence = regulatorySite.sequence;
        let citationValues = [];
        if (DataVerifier.isValidArray(regulatorySite.citations)) {
          regulatorySite.citations.forEach((citation) => {
            if (citation.evidence) {
              citationValues.push(citation.evidence.code);
              citationValues.push(citation.evidence.type);
            }
            if (citation.publication) {
              citationValues.push(...citation.publication.authors);
              citationValues.push(citation.publication.year + " ");
            }
          });
        }
        data.push({
          id: regulatoryInteraction._id,
          _regulatorName,
          _absolutePosition,
          _leftEndPosition,
          _rightEndPosition,
          _sequence,
          _confidenceLevel,
          _citations: citationValues.join("; "),
          allCitations: allCitations,
          citations: regulatorySite.citations,
          regulonId: regulonId,
          function: rbs.function,
        });
      });
    }
  });
  return data;
}

export default function RegulatorBindingSites({
  regulatorBindingSites = [],
  allCitations,
}) {
  //console.log(regulatorBindingSites);
  const data = useMemo(() => {
    return formatData(regulatorBindingSites, allCitations);
  }, [regulatorBindingSites, allCitations]);

  return <FilterTable columns={COLUMNS} data={data} />;
}

// _confidenceLevel = confidenceLevel
/*switch (confidenceLevel) {
                case "S":
                    _confidenceLevel = <span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>
                    break;
                case "C":
                    _confidenceLevel = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
                    break;
                case "w":
                    _confidenceLevel = <span style={{ color: "#0C6A87" }} >Weak</span>
                    break;
                default:
                    _confidenceLevel = <span>.</span>
                    break;
            }*/
