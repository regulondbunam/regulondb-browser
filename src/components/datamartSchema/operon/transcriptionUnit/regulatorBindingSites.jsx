import { useMemo } from "react"
import { DataVerifier } from "../../../ui-components";
import { LinealSequence } from "../../../sequence";
import FilterTable, {validString} from "../../../filterTable";
import { ParagraphCitations } from "../../citations";
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
                Header: 'AbsolutePosition',
                accessor: '_absolutePosition',
                filter: "fuzzyText"
            },
            {
                Header: 'LeftEndPosition',
                accessor: '_leftEndPosition',
                filter: "fuzzyText"
            },
            {
                Header: 'RightEndPosition',
                accessor: '_rightEndPosition',
                filter: "fuzzyText"
            },
            {
                Header: 'Sequence',
                accessor: '_sequence',
                width: 400,
                filter: "fuzzyText"
            },
            {
                Header: 'citations',
                accessor: '_citations',
                filter: "fuzzyText"
            },
            {
                Header: 'Confidence Level',
                accessor: '_confidenceLevel',
                filter: "fuzzyText"
            }
        ],
    },
]

function  formatData(regulatorBindingSites = [], confidenceLevel, allCitations){
    let data = []
    regulatorBindingSites.forEach(rbs => {
        
        let fun = ""
        switch (rbs.function) {
            case "repressor":
                fun = "-"
                break;
            case "activator":
                fun = "+"
                break;
            case "dual":
                fun = "+-"
                break;
            default:
                fun = ""
                break;
        }
       let  _regulator = `${rbs.regulator.name}${fun}`

       if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
        let _absolutePosition = "",
        _leftEndPosition = "", _rightEndPosition = "",
        _sequence = "", _citations = "", _confidenceLevel = confidenceLevel
        rbs.regulatoryInteractions.forEach(regulatoryInteraction => {
            let regulatorySite = regulatoryInteraction.regulatorySite
            _absolutePosition = regulatorySite.absolutePosition
            _leftEndPosition = regulatorySite.leftEndPosition
            _rightEndPosition = regulatorySite.rightEndPosition
            _sequence = <LinealSequence 
                value={validString(regulatorySite.sequence)} 
                id={"sequence_bs_"+regulatorySite._id} 
                sequence={validString(regulatorySite.sequence)}
                controls={false}
                zoom={1} 
                color 
            />
            _citations= <ParagraphCitations 
                citations={regulatorySite.citations} allCitations={allCitations} />
        });
        data.push({
            _regulator,
            _absolutePosition,
            _leftEndPosition,
            _rightEndPosition,
            _sequence,
            _citations,
            _confidenceLevel
        })
       }
    });
    return data
}

export default function RegulatorBindingSites({
    regulatorBindingSites = [],
    confidenceLevel,
    allCitations,
}) {

    const data = useMemo(()=>{
        return formatData(regulatorBindingSites,confidenceLevel,allCitations)
    },[regulatorBindingSites,confidenceLevel,allCitations])

    return <FilterTable columns={COLUMNS} data={data} />
}