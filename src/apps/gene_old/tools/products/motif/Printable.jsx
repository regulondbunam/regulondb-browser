import React from "react";
import PrintIcon from '@mui/icons-material/Print';

export function Printable({ motifs, sequence = [] }) {
  function printMotifs() {
    let print_div = document.getElementById("motif_print");
    let print_area = window.open();
    print_area.document.write(print_div.innerHTML);
    print_area.document.close();
    print_area.focus();
    print_area.print();
    //print_area.close();
  }

  return (
    <div>
      <div>
        <button style={{margin: "2px"}} onClick={printMotifs}><PrintIcon size="small" /></button>
      </div>
      <div id="motif_print" style={{ overflow: "auto", maxHeight: "300px" }}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Position</th>
              <th>Sequence</th>
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
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{motif.type}</td>
                    <td>{positions}</td>
                    <td>
                      <p className="p_sequence" style={{ fontSize: "10px" }}>
                        {motif.sequence}
                      </p>
                    </td>
                  </tr>
                  {motif?.note && (
                    <tr style={{borderBottom: "1pt solid"}}>
                      <td colSpan={3}>
                        <p>{motif.note}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
  const motifSequences = useMemo(() => {
    let motifSequences = [];
    motifs.forEach((_motif) => {
      let motif = { ..._motif };
      let motifSequence = "";
      let i = 0;
      for (let index = 1; index < sequence.length; index++) {
        if (motif?.leftEndPosition && motif?.rightEndPosition) {
          if (motif.leftEndPosition - motif.rightEndPosition === 0) {
            if (index === motif.leftEndPosition - 1) {
              if (motif.sequence[i]) {
                motifSequence += motif.sequence[i];
                i++;
              }
            } else {
              motifSequence += "-";
            }
          } else {
            if (
              index >= motif.leftEndPosition &&
              index <= motif.rightEndPosition
            ) {
              if (motif.sequence[i]) {
                motifSequence += motif.sequence[i];
                i++;
              }
            } else {
              motifSequence += "-";
            }
          }
        } else {
          motifSequence = motif.sequence;
        }
      }
      motif.sequenceComplete = motifSequence;
      motifSequences.push(motif);
    });
    motifSequences = motifSequences.sort((a, b) => {
      return a.leftEndPosition - b.leftEndPosition;
    });
    return motifSequences;
  }, [motifs, sequence]);
*/
