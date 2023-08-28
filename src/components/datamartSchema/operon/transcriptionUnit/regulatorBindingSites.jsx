import { useMemo } from "react"
import { DataVerifier, FilterTable } from "../../../ui-components";
import { LinealSequence } from "../../../sequence";
import { ParagraphCitations } from "../../citations";
//import { labelCitation } from "../../citations/label";

const COLUMNS = [
    {
        id: "regulator",
        header: 'Regulator',
        columns: [
            {  
                id: "regulator_name",
                header: "name",
                accessorKey: '_regulator',
            }
        ],
    },
    {
        id: "ri",
        header: 'Regulatory Interactions',
        columns: [
            {
                id: "ri_central",
                header: 'Central Rel Pos',
                accessorKey: '_absolutePosition',
            },
            {
                id: "ri_posLeft",
                header: 'LeftEndPosition',
                accessorKey: '_leftEndPosition',
            },
            {
                id: "ri_posRight",
                header: 'RightEndPosition',
                accessorKey: '_rightEndPosition',
            },
            {
                id: "ri_sequence",
                header: 'Sequence',
                accessorKey: '_sequence',
                width: 400,
                filter: "fuzzyText"
            },
            {
                id: "ri_confidence",
                header: 'Confidence Level',
                accessorKey: '_Confidence Level',
            },
            {
                id: "citations",
                header: 'citations',
                accessorKey: '_citations',
            }
        ],
    },
]

function formatData(regulatorBindingSites = [], allCitations) {
    console.log(regulatorBindingSites);
    let data = []
    regulatorBindingSites.forEach(rbs => {
        let spanColor = "#000"
        let fun = ""
        switch (rbs.function) {
            case "repressor":
                fun = "-"
                spanColor = "#FF0000"
                break;
            case "activator":
                fun = "+"
                spanColor = "#14A054"
                break;
            case "dual":
                fun = "+-"
                spanColor = "#0000FF"
                break;
            default:
                fun = ""
                break;
        }
        let _regulator = <span value={`${rbs.regulator.name}${fun}`} style={{ color: spanColor }}>{`${rbs.regulator.name}${fun}`}</span>

        if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
            let _absolutePosition = "",
                _leftEndPosition = "", _rightEndPosition = "",
                _sequence = "", _citations = ""
            
            rbs.regulatoryInteractions.forEach(regulatoryInteraction => {
                let regulatorySite = regulatoryInteraction.regulatorySite
                _absolutePosition = regulatoryInteraction.relativeCenterPosition
                _leftEndPosition = regulatorySite.leftEndPosition 
                _rightEndPosition = regulatorySite.rightEndPosition
                _sequence = regulatorySite.sequence
                let citationValues = []
                if (DataVerifier.isValidArray(regulatorySite.citations)) {
                    regulatorySite.citations.forEach(citation => {
                        if (citation.evidence) {
                            citationValues.push(citation.evidence.code)
                            citationValues.push(citation.evidence.type)
                        }
                        if (citation.publication) {
                            citationValues.push(...citation.publication.authors)
                            citationValues.push(citation.publication.year)
                        }
                    });
                }
                _citations = <ParagraphCitations value={""} values={citationValues}
                    citations={regulatorySite.citations} allCitations={allCitations} />
                data.push({
                    id: regulatoryInteraction._id,
                    _regulator,
                    _absolutePosition,
                    _leftEndPosition,
                    _rightEndPosition,
                    _sequence,
                    _citations,
                    // _confidenceLevel
                })
            });

        }
    });
    return data
}

export default function RegulatorBindingSites({
    regulatorBindingSites = [],
    allCitations,
}) {

    const data = useMemo(() => {
        return formatData(regulatorBindingSites, allCitations)
    }, [regulatorBindingSites, allCitations])

    return <FilterTable columns={COLUMNS} data={data} />
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