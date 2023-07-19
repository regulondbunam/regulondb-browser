import { Accordion, DataVerifier } from "../../../ui-components"
import { LinealSequence } from "../../../sequence";
import { ParagraphCitations, NoteCitations } from "../../citations";
import RegulatorBindingSites from "./regulatorBindingSites";
import { useMemo } from "react";

export default function Promoter({
    _id,
    promoter,
    strand,
    allCitations,
}) {

    return (
        <div >
            <h3>{`Promoter ${promoter.name}`}</h3>
            <div style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}>
                <div>
                    {DataVerifier.isValidArray(promoter.synonyms) && (
                        <p><b>Synonyms:</b>{" " + promoter.synonyms.join(", ")}</p>
                    )}
                    {DataVerifier.isValidString(promoter.confidenceLevel) && (
                        <p><b>Confidence Level:</b>{" " + promoter.confidenceLevel}</p>
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
                {DataVerifier.isValidString(promoter.sequence) && (
                    <div>
                        <Accordion title={"Sequence"} backgroundColor="#f4f5f5" >
                            <SequencePromoter
                                name={promoter.name + "_sequence"}
                                _id={"tu_sequence_" + _id + "_" + promoter._id}
                                boxes={promoter.boxes}
                                transcriptionStartSite={promoter.transcriptionStartSite}
                                strand={strand} sequence={promoter.sequence} />
                        </Accordion>
                    </div>
                )}
                {DataVerifier.isValidString(promoter.note) && (
                    <Accordion title={"Note"} backgroundColor="#f4f5f5" expand={false} >
                        <p dangerouslySetInnerHTML={{ __html: NoteCitations(allCitations, promoter.note) }} />
                    </Accordion>
                )}
                {DataVerifier.isValidArray(promoter.regulatorBindingSites) && (
                    <Accordion  title={"Regulator Binding Sites"} backgroundColor="#f4f5f5" >
                        <RegulatorBindingSites allCitations={allCitations} regulatorBindingSites={promoter.regulatorBindingSites} confidenceLevel={promoter.confidenceLevel} />
                    </Accordion>
                )}
                {DataVerifier.isValidArray(promoter.citations) && (
                    <p><b>Citations:</b><br /><ParagraphCitations citations={promoter.citations} allCitations={allCitations} /></p>
                )}
            </div>
        </div>
    )
}

function SequencePromoter({ _id, boxes, name, transcriptionStartSite, sequence, strand }) {

    const features = useMemo(()=>{
        let promoterRelativePosition = sequence.split("").findIndex(bp => bp === bp.toUpperCase())
        let promoterFeatures = []
        sequence.split("").forEach((x, index) => {
            let label = ""
            if (index - promoterRelativePosition >= 0) {
                label = `+ ${index - promoterRelativePosition + 1}`
            } else {
                label = index - promoterRelativePosition
            }
            promoterFeatures.push({
                id: _id + "_measure_" + index + "_index",
                label: label,
                sequencePosition: index,
                type: "measure"
            })
            if (index === promoterRelativePosition) {
                promoterFeatures.push({
                    id: _id + "_promoter_" + index + "_feature",
                    label: "+1",
                    sequencePosition: index,
                    type: "promoter",
                })
            }
        })
        if (DataVerifier.isValidArray(boxes)) {

            boxes.forEach((box, index) => {
                let boxPosition = strand === "forward" ? box.leftEndPosition : box.rightEndPosition
                const distancePromoter_BoxLeft = Math.abs(transcriptionStartSite.leftEndPosition - boxPosition)
                const boxWidth = box.sequence.length * 8.41
    
                promoterFeatures.push({
                    id: _id + "_box_" + index + "_feature",
                    label: box.type.replace('minus', '-'),
                    sequencePosition: promoterRelativePosition - distancePromoter_BoxLeft,
                    type: "box",
                    boxWidth: boxWidth
                })
            });
        }
        return promoterFeatures
    },[_id,sequence, boxes, transcriptionStartSite, strand])

   


    return <LinealSequence name={name} sequenceId={_id} height={100} sequence={sequence} color={true} features={features} />

}