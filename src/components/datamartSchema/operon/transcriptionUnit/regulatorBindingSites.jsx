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
    id: "regulator",
    header: "Regulator",
    columns: [
      {
        id: "regulator_name",
        header: "name",
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
    ],
  },
  {
    id: "ri",
    header: "Regulatory Interactions",
    columns: [
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
        id: "citations",
        header: "citations",
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
    ],
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
        _sequence = "";

      rbs.regulatoryInteractions.forEach((regulatoryInteraction) => {
        let regulatorySite = regulatoryInteraction.regulatorySite;
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
          _citations: citationValues.join("; "),
          allCitations: allCitations,
          citations: regulatorySite.citations,
          regulonId: regulonId,
          function: rbs.function,
          // _confidenceLevel
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
