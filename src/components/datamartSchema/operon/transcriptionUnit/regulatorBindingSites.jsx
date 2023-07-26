import { useMemo } from "react"
import { DataVerifier } from "../../../ui-components";
import { LinealSequence } from "../../../sequence";
import FilterTable, { validString } from "../../../filterTable";
import { ParagraphCitations } from "../../citations";
//import { labelCitation } from "../../citations/label";

const COLUMNS = [
    {
        Header: 'Regulator',
        accessor: '_regulator',
        filter: "fuzzyText",
        width: 80
    },
    {
        Header: 'Regulatory Interactions',
        columns: [
            {
                Header: 'Central Rel Pos',
                accessor: '_absolutePosition',
                filter: "fuzzyText",
                width: 80
            },
            {
                Header: 'LeftEndPosition',
                accessor: '_leftEndPosition',
                filter: "fuzzyText",
                width: 80
            },
            {
                Header: 'RightEndPosition',
                accessor: '_rightEndPosition',
                filter: "fuzzyText",
                width: 80
            },
            {
                Header: 'Sequence',
                accessor: '_sequence',
                width: 400,
                filter: "fuzzyText"
            },
            {
                Header: 'Confidence Level',
                accessor: '_Confidence Level',
                width: 80,
            },
            {
                Header: 'citations',
                accessor: '_citations',
                width: 400,
            }
        ],
    },
]

function formatData(regulatorBindingSites = [], allCitations) {
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
            rbs.regulatoryInteractions.forEach(regulatoryInteraction => {
                let regulatorySite = regulatoryInteraction.regulatorySite
                _absolutePosition = validString(regulatoryInteraction.relativeCenterPosition + "")
                _leftEndPosition = regulatorySite.leftEndPosition + ""
                _rightEndPosition = regulatorySite.rightEndPosition + ""
                _sequence = <LinealSequence
                    value={validString(regulatorySite.sequence)}
                    id={"sequence_bs_" + regulatorySite._id}
                    sequence={validString(regulatorySite.sequence)}
                    controls={false}
                    zoom={1}
                    color
                />
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
    confidenceLevel,
    allCitations,
}) {

    const data = useMemo(() => {
        return formatData(regulatorBindingSites, allCitations)
    }, [regulatorBindingSites, allCitations])

    return <FilterTable columns={COLUMNS} data={data} />
}