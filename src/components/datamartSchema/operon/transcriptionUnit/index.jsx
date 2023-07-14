import DrawingTracesTool from "../../../DrawingTracesTool"
import { Accordion, DataVerifier } from "../../../ui-components"
import Genes from "./genes"

import { ParagraphCitations, NoteCitations } from "../../citations";

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
                <Accordion title={"Show detailed TU information"} expand={false} >
                    <div>
                        {DataVerifier.isValidObject(firstGene) && (
                            <Genes firstGene={firstGene} genes={genes} />
                        )}
                        {DataVerifier.isValidObject(promoter) && (
                            <div >
                                <h3>{`Promoter ${promoter.name}`}</h3>
                                <div style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}>
                                    <div>
                                        {DataVerifier.isValidArray(promoter.synonyms) && (
                                            <p><b>Synonyms:</b>{" " + promoter.synonyms.join(", ")}</p>
                                        )}
                                        {DataVerifier.isValidObject(promoter.transcriptionStartSite) && (
                                            <>{DataVerifier.isValidNumber(promoter.transcriptionStartSite.leftEndPosition) && (
                                                <p><b>Transcription start site:</b>{" " + promoter.transcriptionStartSite.leftEndPosition}</p>
                                            )}</>

                                        )}
                                        {DataVerifier.isValidObject(promoter.bindsSigmaFactor) && (
                                            <>
                                                <p><b>Binds Sigma Factor:</b>{" " + promoter.bindsSigmaFactor.name}</p>
                                                <p style={{ marginLeft: "3px" }} ><ParagraphCitations citations={promoter.bindsSigmaFactor.citations} allCitations={allCitations} /></p>
                                            </>
                                        )}
                                    </div>
                                        {DataVerifier.isValidArray(promoter.additiveEvidences) && (
                                           <div>
                                             <table className="tableAccent" >
                                                <thead>
                                                    <tr>
                                                        <th colSpan={3} >Additive Evidences</th>
                                                    </tr>
                                                    <tr>
                                                        <th>category</th>
                                                        <th>code</th>
                                                        <th>type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {promoter.additiveEvidences.map((additiveEvidence, index) => {
                                                        return <tr key={"AdditiveEvidence_" + promoter._id + "_" + index} >
                                                            <td>{additiveEvidence.category}</td>
                                                            <td>{additiveEvidence.code}</td>
                                                            <td>{additiveEvidence.type}</td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                           </div>
                                        )}
                                    {DataVerifier.isValidString(promoter.note) && (
                                        <Accordion title={"Note"} backgroundColor="#f4f5f5" expand={false} >
                                            <p dangerouslySetInnerHTML={{__html: NoteCitations(allCitations,promoter.note)}} />
                                        </Accordion>
                                    )}
                                    {DataVerifier.isValidArray(promoter.citations) && (
                                        <p><b>Citations:</b><br /><ParagraphCitations citations={promoter.citations} allCitations={allCitations} /></p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Accordion>
            </div>
        </div>
    )
}