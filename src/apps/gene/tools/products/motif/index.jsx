import React, { useState } from "react";
import { SequenceSelection } from "./sequence";
import "./motif.css";

function cleanMotifs(motifs) {
  let newMotifs = [];
  motifs.forEach((motif) => {
    if (
      !newMotifs.find(
        (d) =>
          d.leftEndPosition === motif.leftEndPosition &&
          d.rightEndPosition === motif.rightEndPosition &&
          d.id === motif.id &&
          d.type === motif.type
      )
    ) {
      newMotifs.push(motif);
    }
  });
  return newMotifs;
}

export default function Motif({ motifs, sequence }) {
  const [_leftEndPosition, set_leftEndPosition] = useState(-1)
  const [_rightEndPosition, set_rightEndPosition] = useState(-1)
  let motifs_n = cleanMotifs(motifs);

  return (
    <div>
      <div>
        <h4>Motif</h4>
      </div>
      <div>
        <div className="motif_sequence">
          <p className="p_accent">sequence product:</p>
          <SequenceSelection sequence={sequence} leftEndPosition={_leftEndPosition} rightEndPosition={_rightEndPosition} />
        </div>
      </div>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Positions</th>
              <th>Notes</th>
              <th>Sequence</th>
              <th>dataSource</th>
            </tr>
          </thead>
          <tbody>
            {motifs_n.map((motif, index) => {
              let positions = "---";
              if (motif.leftEndPosition) {
                if (motif.rightEndPosition === motif.leftEndPosition) {
                  positions = motif.leftEndPosition;
                } else {
                  positions =
                    motif.leftEndPosition + "-" + motif.rightEndPosition;
                }
              }
              let id = `motif_${motif.id}`;
              return (
                <tr
                className="tr_motif"
                  key={`${id}_${index}`}
                  onMouseEnter={() => {
                    set_leftEndPosition(motif.leftEndPosition)
                    set_rightEndPosition(motif.rightEndPosition)
                  }}
                  onMouseLeave={()=>{
                    set_leftEndPosition(-1)
                    set_rightEndPosition(-1)
                  }}
                >
                  {
                    motif?.type ? (<td>{motif.type}</td>) : (<td></td>)
                  }
                  <td>{positions}</td>
                  <td>{motif.note}</td>
                  <td>
                    <button className="aBase" style={{ fontSize: "10px", color: "black" }}
                      onClick={(e)=>{
                        navigator.clipboard.writeText(motif.sequence);
                        alert(`the sequence ${motif.sequence} has been copied to the clipboard`)
                      }}
                    >
                      copy sequence
                    </button>
                    <div style={{ display: "none" }}>
                      <p id={`sequence_${index}_${id}`} className="p_sequence">
                        {motif.sequence}
                      </p>
                    </div>
                  </td>
                  {
                    motif?.dataSource ? (<td>{motif.dataSource}</td>) : (<td></td>)
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
/*

{motifSequences.map((motif, index) => {
          let positions = "---";

          if (motif.leftEndPosition) {
            if (motif.rightEndPosition === motif.leftEndPosition) {
              positions = motif.leftEndPosition;
            } else {
              positions = motif.leftEndPosition + "-" + motif.rightEndPosition;
            }
          }
          return (
            <div key={index} className="motif_row">
              <div className="motif_row_note">{motif.note}</div>
              <div className="motif_row_type">{positions}</div>
              <div className="motif_row_sequence">{motif.sequenceComplete}</div>
            </div>
          );
        })}

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
 */
