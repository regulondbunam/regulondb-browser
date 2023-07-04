import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Highlight } from "./Highlight";
import { Printable } from "./Printable";
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
  newMotifs = newMotifs.sort((a, b) => {
    return a.leftEndPosition - b.leftEndPosition;
  });
  return newMotifs;
}

export default function Motif({ motifs = [], sequence }) {
  
  const [_display, set_display] = useState("Highlight");

  if(motifs.length === 0){
    return <></>
  }

  const handleChange = (event) => {
    set_display(event.target.value);
  };

  let motifs_n = cleanMotifs(motifs);

  return (
    <div>
      <div>
        <Box sx={{ minWidth: "120px" }}>
          <FormControl sx={{ minWidth: "120px" }} size="small">
            <InputLabel id="demo-simple-select-label">
              Select Display Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={_display}
              label="Select Display Type"
              onChange={handleChange}
            >
              <MenuItem value={"Highlight"}>Highlight</MenuItem>
              <MenuItem value={"Printable"}>Printable</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        {
          _display === "Highlight" && (<Highlight motifs={motifs_n} sequence={sequence} />)
        }
        {
          _display === "Printable" && (<Printable motifs={motifs_n} sequence={sequence} />)
        }
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
