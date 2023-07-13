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
        _id,
        operon
    } = operonData
    let leftEndPosition = "",
        rightEndPosition = "",
        sGenes = "",
        sPromoters = "",
        sTU = "",
        row = ""

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
            sGenes = operon.statistics.gene
            sPromoters = operon.statistics.promoters
            sTU = operon.statistics.transcriptionUnits
        }
    }

    return(
        <div>
            <p>{`${leftEndPosition} ${row} ${rightEndPosition}`}</p>
                <div className="cover_statistics" >
                    <div className="stt_box stt_gene">
                        <p>Genes</p>
                        <p>{sGenes}</p>
                    </div>
                    <div className="stt_box stt_promoter">
                        <p>Promoters</p>
                        <p>{sPromoters}</p>
                    </div>
                    <div className="stt_box stt_tu">
                        <p>Transcription Unit</p>
                        <p>{sTU}</p>
                    </div>
                </div>
        </div>
    )
}