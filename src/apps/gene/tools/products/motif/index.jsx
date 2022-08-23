import React, { useMemo } from "react";
import { useEffect } from "react";
import "./motif.css";

function cleanMotifs(motifs) {
  let newMotifs = [];
  motifs.forEach((motif) => {
    if (
      !newMotifs.find(
        (d) =>
          d.leftEndPosition === motif.leftEndPosition &&
          d.rightEndPosition === motif.rightEndPosition &&
          d.type === motif.type
      )
    ) {
      newMotifs.push(motif);
    }
  });
  return newMotifs;
}

export default function Motif({ motifs, sequence }) {
  let motifs_n = cleanMotifs(motifs);

  useEffect(() => {
    motifs_n.forEach((motif) => {
      let id = `motif_${motif.leftEndPosition}_${motif.rightEndPosition}`;
      let span = document.getElementById(id);
      if (span) {
        span.addEventListener(
          `view_${id}`,
          function (e) {
            if (e.detail.over) {
              span.style.backgroundColor = "red";
            }else{
              span.style.backgroundColor = "initial";
            }
            
          },
          false
        );
      }
    });
  }, [motifs_n]);

  const formatSequence = useMemo(() => {
    let size = sequence.length;
    const spaceNumber = size.toString().length;
    let count = 0,
      innerCount = 0,
      line = "";
    let sequenceFormat = sequence
      .split("")
      .map((x, index) => {
        count += 1;
        innerCount += 1;
        line = "";

        let motifStart = motifs_n.filter(
          (motif) => motif.leftEndPosition === count
        );
        if (motifStart) {
          let spans = motifStart
            .map((motif) => {
              let id = `motif_${motif.leftEndPosition}_${motif.rightEndPosition}`;
              return `<span id="${id}">`;
            })
            .join("");
          x = `${spans}${x}`;
        }
        let motifEnd = motifs_n.filter(
          (motif) => motif.rightEndPosition === count
        );
        if (motifEnd) {
          let spans = motifEnd
            .map((motif) => {
              return `</span>`;
            })
            .join("");
          x = `${x}${spans}`;
        }
        //
        if (count === 1) {
          // console.log(spaceNumber)
          for (let i = 0; i < spaceNumber - index.toString().length; i++) {
            line += "&nbsp;";
          }
          return `\t${line}${index + 1} ${x}`;
        }
        if (count === 60) {
          count = 0;
          innerCount = 0;
          return `${x}<br>`;
        }
        if (innerCount === 10) {
          innerCount = 0;
          return `${x} `;
        }

        return x;
      })
      .join("");
    return sequenceFormat;
  }, [sequence, motifs_n]);

  return (
    <div>
      <div>
        <h4>Motif</h4>
      </div>
      <div>
        <div className="motif_sequence">
          <p className="p_accent">sequence product:</p>
          <p
            className="p_sequence"
            dangerouslySetInnerHTML={{ __html: formatSequence }}
          />
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
              let id = `motif_${motif.leftEndPosition}_${motif.rightEndPosition}`;
              return (
                <tr
                className="tr_motif"
                  key={`${id}_${index}`}
                  onMouseEnter={() => {
                    const SEQUENCE = document.getElementById(id);
                    if (SEQUENCE) {
                      const SEQUENCE_REACTION = new CustomEvent(`view_${id}`,{
                        bubbles: true,
                        detail: {over: true},
                      });
                      SEQUENCE.dispatchEvent(SEQUENCE_REACTION);
                    }
                  }}
                  onMouseLeave={()=>{
                    const SEQUENCE = document.getElementById(id);
                    if (SEQUENCE) {
                      const SEQUENCE_REACTION = new CustomEvent(`view_${id}`,{
                        bubbles: true,
                        detail: {over: false},
                      });
                      SEQUENCE.dispatchEvent(SEQUENCE_REACTION);
                    }
                  }}
                >
                  <td>{motif.type}</td>
                  <td>{positions}</td>
                  <td>{motif.note}</td>
                  <td>
                    <button className="aBase" style={{ fontSize: "10px" }}>
                      copy sequence
                    </button>
                    <div style={{ display: "none" }}>
                      <p id={`sequence_${id}`} className="p_sequence">
                        {motif.sequence}
                      </p>
                    </div>
                  </td>
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
