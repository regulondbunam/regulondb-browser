import DrawingTracesTool from "../../../DrawingTracesTool"
import Genes from "./genes"
import Promoter from "./promotor";
import Divider from "@mui/material/Divider";
import Terminators from "./terminators";

import { Accordion, DataVerifier } from "../../../ui-components"
import RegulatorBindingSites from "./regulatorBindingSites";


export default function TranscriptionUnit({
    _id,
    allCitations,
    regulationPositions,
    strand,
    additiveEvidences = [],
    citations = [],
    confidenceLevel,
    firstGene,
    genes = [],
    name,
    note,
    promoter,
    regulatorBindingSites = [],
    statistics,
    synonyms = [],
    terminators = []
}) {
    let title = "Detailed TU " + name
    if (DataVerifier.isValidObject(promoter)) {
        title = title + " and promoter "+promoter.name
    }


    return (
        <div>
            <div>
                <DrawingTracesTool
                    labelTitle={`Transcription Unit ${name}`}
                    controls={false}
                    context="operon"
                    height={200}
                    id={_id}
                    leftEndPosition={regulationPositions.leftEndPosition}
                    rightEndPosition={regulationPositions.rightEndPosition}
                    strand={strand}
                />
            </div>
            <div>
                <Accordion title={title } backgroundColor="#ffffff" >
                    <div>
                        {DataVerifier.isValidObject(firstGene) && (
                            <Genes allCitations={allCitations} firstGene={firstGene} genes={genes} />
                        )}
                        <Divider />
                        {DataVerifier.isValidObject(promoter) && (
                            <Promoter _id={_id} promoter={promoter} allCitations={allCitations} strand={strand} />
                        )}
                        <Divider />
                        {DataVerifier.isValidArray(terminators) && (
                            <Terminators terminators={terminators} tuID={_id} allCitations={allCitations} />
                        )}
                        <Divider />
                        {DataVerifier.isValidArray(regulatorBindingSites) && (
                            <RegulatorBindingSites regulatorBindingSites={regulatorBindingSites} allCitations={allCitations} />
                        )}
                    </div>
                </Accordion>
            </div>
        </div>
    )
}

