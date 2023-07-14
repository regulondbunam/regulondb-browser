import { Link } from "react-router-dom"
import DrawingTracesTool from "../../../DrawingTracesTool"
import { Accordion, DataVerifier } from "../../../ui-components"

export default function TranscriptionUnit({
    _id,
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
                    {DataVerifier.isValidObject(firstGene) &&(
                        <div>
                            <h2>Related Genes</h2>
                            <div style={{marginLeft: "5px"}}>
                                <p><b>First gene:</b>{" "}<Link to={"/gene/"+firstGene._id} ><b>{firstGene.name}</b></Link></p>
                                {DataVerifier.isValidNumber(firstGene.distanceToPromoter) && (
                                    <p><b>Distance to promoter:</b>{" "+firstGene.distanceToPromoter+" bp"}</p>
                                )}
                                {DataVerifier.isValidArray(genes) && (
                                    <p><b>Rest genes:</b>{" "}
                                    {genes.map(gene=><Link style={{marginRight: "5px"}} to={"/gene/"+gene._id} ><b>{gene.name}</b></Link>)}
                                    </p>
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