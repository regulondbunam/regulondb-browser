import { Accordion, DataVerifier } from "../../../ui-components"
import { ParagraphCitations } from "../../citations";
import { LinealSequence } from "../../../sequence";
import { useMemo } from "react";

export default function Terminators({ terminators, tuID, allCitations }) {
    return (
        <div>
            <h2>Terminators</h2>
            <div style={{ marginLeft: "5px", display: "flex", flexDirection: "column" }}>
                {terminators.map((terminator, index) => (<Terminator key={`T${index}_tu_${tuID}_terminator${terminator._id}`} allCitations={allCitations} terminator={terminator} />))}
            </div>
        </div>
    )
}

function Terminator({ terminator, allCitations }) {
    let _confidenceLevel
    if (DataVerifier.isValidString(terminator.confidenceLevel)) {
        switch (terminator.confidenceLevel) {
            case "S":
                _confidenceLevel = <span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>
                break;
            case "C":
                _confidenceLevel = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
                break;
            case "w":
                _confidenceLevel = <span style={{ color: "#0C6A87" }} >Weak</span>
                break;
            default:
                _confidenceLevel = <span>.</span>
                break;
        }
    }

    return (
        <div>
            {DataVerifier.isValidString(terminator.class) && (
                <p><b>Class:</b>{" " + terminator.class}</p>
            )}
            {DataVerifier.isValidString(terminator.confidenceLevel) && (
                        <p><b>Confidence Level:</b>{" "}{_confidenceLevel}</p>
                    )}
            {DataVerifier.isValidObject(terminator.transcriptionTerminationSite) && (
                <p><b>Transcription Site:</b>{" " + terminator.transcriptionTerminationSite.leftEndPosition + " - " + terminator.transcriptionTerminationSite.rightEndPosition}</p>
            )}
            {DataVerifier.isValidString(terminator.sequence) && (
                <Accordion title={"sequence"} >
                    <SequenceTerminator _id={terminator._id} transcriptionTerminationSite={terminator.transcriptionTerminationSite} sequence={terminator.sequence} name={`Terminator_${terminator._id}`} />
                </Accordion>
            )}
            {DataVerifier.isValidArray(terminator.citations) && (
                <p><b>Citations:</b><br /><ParagraphCitations citations={terminator.citations} allCitations={allCitations} /></p>
            )}
            <br />
            <br />
        </div>
    )
}

function SequenceTerminator({ _id, sequence, name, transcriptionTerminationSite }) {

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