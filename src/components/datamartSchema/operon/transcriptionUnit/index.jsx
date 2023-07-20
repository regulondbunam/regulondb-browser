import DrawingTracesTool from "../../../DrawingTracesTool"
import Genes from "./genes"
import Promoter from "./promotor";
import Divider from "@mui/material/Divider";

import { Accordion, DataVerifier } from "../../../ui-components"
import { LinealSequence } from "../../../sequence";
import { useMemo } from "react";


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
                        <Divider/>
                        {DataVerifier.isValidArray(terminators) && (
                            <Terminators terminators={terminators} tuID={_id} allCitations={allCitations} />
                        )}
                    </div>
                </Accordion>
            </div>
        </div>
    )
}

function Terminators({terminators, tuID, allCitations}) {
    return(
        <div>
            <h2>Terminators</h2>
            <div style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}>
                {terminators.map((terminator,index)=>(<Terminator key={`T${index}_tu_${tuID}_terminator${terminator._id}`} allCitations={allCitations} terminator={terminator} />))}
            </div>
        </div>
    )
}

function Terminator({terminator, allCitations}) {
    return(
        <div>
            <SequenceTerminator _id={terminator._id} transcriptionTerminationSite={terminator.transcriptionTerminationSite} sequence={terminator.sequence} name={`Terminator_${terminator._id}`} />
        </div>
    )
}

function SequenceTerminator({ _id, sequence, name, transcriptionTerminationSite  }) {

    const features = useMemo(() => {
        let _features = []
        const terminatorLength = Math.abs(transcriptionTerminationSite.rightEndPosition - transcriptionTerminationSite.leftEndPosition)
        const terminatorInit = sequence.split("").findIndex(bp => bp === bp.toUpperCase())
        _features.push({
            id: _id + "_terminator__feature",
            sequencePosition: terminatorInit,
            length: terminatorLength,
            type: "terminator",
        })
        return _features
    }, [_id, sequence, transcriptionTerminationSite])




    return <LinealSequence name={name} sequenceId={_id} height={100} sequence={sequence} color={true} features={features} />

}

//gtggattatgTTCAGCGCGAGCTGGCAGACGGTAGCCGTACCGTTGTCGAAACCGAACACTGGTTAGCCGTCGTGCCTTACTGGGCTGCCTGGCCGTTCGAAACGCTACTGCTGCCCAAAGCCCacgttttacg