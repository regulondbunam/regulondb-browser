import React, { useMemo } from "react";
import "./motif.css";

export default function Motif({ motifs }) {
  const motifSequences = useMemo(() => {
    let bigSequence = 0;
    motifs.forEach((motif) => {
      if (motif.rightEndPosition > bigSequence) {
        bigSequence = motif.rightEndPosition;
      }
    });
    let motifSequences = [];
    motifs.forEach((_motif) => {
      let motif = { ..._motif };
      let sequence = "";
      let i = 0;
      for (let index = 1; index < bigSequence; index++) {
        if (motif?.leftEndPosition && motif?.rightEndPosition) {
            if(motif.leftEndPosition - motif.rightEndPosition === 0){
                if(index === motif.leftEndPosition - 1){
                    if (motif.sequence[i]) {
                        sequence += motif.sequence[i];
                        i++;
                      }
                }else{
                    sequence += "-";
                }
            }else{
                if (
                    index >= motif.leftEndPosition &&
                    index <= motif.rightEndPosition
                  ) {
                    if (motif.sequence[i]) {
                      sequence += motif.sequence[i];
                      i++;
                    }
                  } else {
                    sequence += "-";
                  }
            }
        } else {
          sequence = motif.sequence;
        }
      }
      motif.sequenceComplete = sequence;
      motifSequences.push(motif);
    });
    motifSequences = motifSequences.sort((a, b) => {
        return a.leftEndPosition - b.leftEndPosition;
    })
    return motifSequences;
  }, [motifs]);

  return (
    <div>
      <div>
        <h4>Motif</h4>
      </div>
      <div style={{overflow: "auto"}} >
        <div className="motif_head">
          <div className="motif_head_note">Note</div>
          <div className="motif_head_type">type</div>
          <div className="motif_head_sequence">sequence</div>
        </div>
        {motifSequences.map((motif, index) => {
          return (
            <div key={index} className="motif_row">
              <div className="motif_row_note">{motif.note}</div>
              <div className="motif_row_type">{motif.type}</div>
              <div className="motif_row_sequence">{motif.sequenceComplete}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
