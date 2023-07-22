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
    relatedIds,
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
            <div
                style={{
                    position: "sticky",
                    top: "58px", zIndex: "80",
                    boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.43)",
                    WebkitBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
                    MozBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
                }}>
                <DrawingTracesTool
                    relatedIds={relatedIds}
                    controls={false}
                    context="tu"
                    height={200}
                    id={_id}
                    leftEndPosition={regulationPositions.leftEndPosition}
                    rightEndPosition={regulationPositions.rightEndPosition}
                    strand={strand}

                />
            </div>
            <div>
                <Accordion title={<h2 style={{ margin: 0 }} >{`Transcription Unit ${name}`}</h2>} >
                    {DataVerifier.isValidObject(firstGene) && (
                        <Genes tuId={_id} allCitations={allCitations}
                            synonyms={synonyms}
                            firstGene={firstGene}
                            genes={genes}
                            strand={strand}
                            confidenceLevel={confidenceLevel}
                            note={note}
                            citations={citations}
                        />
                    )}
                </Accordion>
                <Divider />
                {DataVerifier.isValidObject(promoter) && (
                    <Promoter _id={_id} promoter={promoter} allCitations={allCitations} strand={strand} />
                )}
                <Divider />
                <Accordion title={<h2 style={{ margin: 0 }} >{`Regulatory Interactions`}</h2>} >
                    {DataVerifier.isValidObject(promoter) && (
                        <>
                            {DataVerifier.isValidArray(promoter.regulatorBindingSites) && (
                                <>
                                    <RegulatorBindingSites regulatorBindingSites={promoter.regulatorBindingSites} allCitations={allCitations} />
                                    {DataVerifier.isValidArray(genes) && (
                                        <div>

                                            {genes.map(gene => {
                                                return (
                                                    <div>
                                                        {DataVerifier.isValidArray(gene.regulatorBindingSites) && (
                                                            <>
                                                                <h4>Regulation identified only at gene level</h4>
                                                                <RegulatorBindingSites regulatorBindingSites={gene.regulatorBindingSites} allCitations={allCitations} />
                                                            </>
                                                        )}
                                                    </div>
                                                )
                                            })}

                                        </div>

                                    )}
                                </>
                            )}
                        </>
                    )}
                </Accordion>
                <div>



                    <Divider />
                    {DataVerifier.isValidArray(terminators) && (
                        <Terminators terminators={terminators} tuID={_id} allCitations={allCitations} />
                    )}
                    <Divider />
                    {DataVerifier.isValidArray(regulatorBindingSites) && (
                        <RegulatorBindingSites regulatorBindingSites={regulatorBindingSites} allCitations={allCitations} />
                    )}
                </div>

            </div>
        </div>
    )
}

