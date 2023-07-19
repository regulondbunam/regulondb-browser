import DrawingTracesTool from "../../../DrawingTracesTool"
import Genes from "./genes"
import Promoter from "./promotor";
import Divider from "@mui/material/Divider";

import { Accordion, DataVerifier } from "../../../ui-components"


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
                <Accordion title={"Detailed TU " + name + " with promoter " + promoter.name + " information"} backgroundColor="#ffffff" >
                    <div>
                        {DataVerifier.isValidObject(firstGene) && (
                            <Genes firstGene={firstGene} genes={genes} />
                        )}
                        <Divider/>
                        {DataVerifier.isValidObject(promoter) && (
                            <Promoter _id={_id} promoter={promoter} allCitations={allCitations} strand={strand} />
                        )}
                    </div>
                </Accordion>
            </div>
        </div>
    )
}


