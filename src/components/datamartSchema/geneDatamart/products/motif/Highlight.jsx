import { useState } from "react";
import { SequenceSelection } from "./sequence";

export function Highlight({ motifs, sequence }) {
  const [_leftEndPosition, set_leftEndPosition] = useState(-1);
  const [_rightEndPosition, set_rightEndPosition] = useState(-1);

  return (
    <div>
      <div style={{ overflow: "auto", maxHeight: "200px" }}>
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
            {motifs.map((motif, index) => {
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
                    set_leftEndPosition(motif.leftEndPosition);
                    set_rightEndPosition(motif.rightEndPosition);
                  }}
                  onMouseLeave={() => {
                    set_leftEndPosition(-1);
                    set_rightEndPosition(-1);
                  }}
                >
                  {motif?.type ? <td>{motif.type}</td> : <td></td>}
                  <td>{positions}</td>
                  <td>{motif.note}</td>
                  <td>
                    <button
                      className="aBase"
                      style={{ fontSize: "10px", color: "black" }}
                      onClick={(e) => {
                        navigator.clipboard.writeText(motif.sequence);
                        alert(
                          `the sequence ${motif.sequence} has been copied to the clipboard`
                        );
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
                  {motif?.dataSource ? <td>{motif.dataSource}</td> : <td></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="motif_sequence" id="div_sequence">
        <p className="p_accent">sequence product:</p>
        <SequenceSelection
          sequence={sequence}
          leftEndPosition={_leftEndPosition}
          rightEndPosition={_rightEndPosition}
        />
      </div>
    </div>
  );
}
/*
}
    return(

      
    </div>
        </div>
    )
}
*/
