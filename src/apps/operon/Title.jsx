import { DataVerifier, Cover } from "../../components/ui-components";

export default function Title({ state, title, operonData }) {


    return (
        <div>
            <Cover state={state} >
                operon
                <h1>{title}</h1>
                {DataVerifier.isValidObject(operonData) && Info(operonData)}
            </Cover>
        </div>
    )
}

function Info(operonData) {

    const {
        operon
    } = operonData
    let leftEndPosition = undefined,
        rightEndPosition = undefined,
        sGenes = undefined,
        sPromoters = undefined,
        sTU = undefined,
        row = undefined

    if (DataVerifier.isValidObject(operon)) {
        if (DataVerifier.isValidString(operon.strand)) {
            row = "->";
            operon.strand === "reverse" && (row = "<-");
        }
        if (DataVerifier.isValidObject(operon.regulationPositions)) {
            leftEndPosition = operon.regulationPositions.leftEndPosition
            rightEndPosition = operon.regulationPositions.rightEndPosition
        }
        if (DataVerifier.isValidObject(operon.statistics)) {
            sGenes = operon.statistics.genes
            sPromoters = operon.statistics.promoters
            sTU = operon.statistics.transcriptionUnits
        }
    }
    return (
        <div style={{display: "flex"}}>
            <div style={{marginRight: "25px"}} >
                <p><b>Operon Region</b></p>
                <p>{`${leftEndPosition} ${row} ${rightEndPosition}`}</p>
            </div>

            <div>
                {sGenes && (<p><b>Genes:</b>{sGenes}</p>)}
                {sPromoters && (<p><b>Promoters:</b>{sPromoters}</p>)}
                {sTU && (<p><b>Transcription Units:</b>{sTU}</p>)}
            </div>
            <br />
        </div>
    )
}