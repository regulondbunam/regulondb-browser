import DrawingTracesTool from "../../../DrawingTracesTool"
import { Accordion, DataVerifier } from "../../../ui-components"
import Genes from "./genes"

import { LinealSequence } from "../../../sequence";
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
                <Accordion title={"Detailed TU " + name + " with promoter " + promoter.name + " information"} backgroundColor="#ffffff" >
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
                                    {DataVerifier.isValidString(promoter.sequence) && (
                                        <div>
                                            <Accordion title={"Sequence"} backgroundColor="#f4f5f5" >
                                                <SequencePromoter
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


function SequencePromoter({ _id, boxes, transcriptionStartSite, sequence, strand }) {

    let promoterFeatures = []
    let promoterRelativePosition = sequence.split("").findIndex(bp => bp === bp.toUpperCase())

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


    return <LinealSequence sequenceId={_id} height={100} sequence={sequence} color={true} features={promoterFeatures} />

}