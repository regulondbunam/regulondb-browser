/** 
 # Component (user guide)

# Motif
	
## Description  
The Motif component is a user interface component that allows users to select between two modes of motif visualization: "Highlight" and "Printable."

## Category   
Visual  

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description                                                                                                                                                       |
| --------- | ---- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|motifs	    |Array |[]	     |An array of motif objects to be displayed. Each motif should have specific properties like leftEndPosition, rightEndPosition, type, note, dataSource, and sequence.|
|sequence	  |string|	""	   |The sequence data related to the motifs. This sequence is used for reference and may be associated with the motifs displayed.                                      |

## Exception
--

## License
MIT License

## Author 
RegulonDB Team

# Component (technical guide)

## Component Type 
Visual


## Dependencies
useState: it is a React hook used to manage local state in functional components.
Box: is used to create containers and flexible design structures.
InputLabel: it  is used to label input elements, such as selection fields.
MenuItem: it  is used to represent items in a drop-down menu.
FormControl : it is used to create forms and control the layout of input elements.
Select: it  is used to create drop-down selection fields.
Highlight: it is used in the Motif component to represent the highlighted display of motifs.
Printable: it is used in the Motif component to represent the printable view of motifs.
motif.css: this CSS file is used to apply additional styling to the Motif component and its related elements.


## States
	
| Property | Value     | Description                                                                        |
| -------- | -----     | ---------------------------------------------------------------------------------- |
| _display |"Highlight"| This state tracks the display mode selected by the user within the Motif component.|

## Hooks
|  Name  | Description                                                   |  Syntax                                         | Additional Notes or References           | 
| ------ | ------------------------------------------------------------  | ----------------------------------------------- | -----------------------------------------|
|useState|React hook used to manage local state in functional components.|const [state, setState] = useState(initialState);|https://react.dev/reference/react/useState|


# Functions description

##handleChange

__Description:__  
This function is responsible for handling the change in the display mode selected by the user through the drop-down menu in the Motif component. When the user selects a different option, this function updates the _display state with the new selected value.

__Usage:__

```javascript
&handleChange(event);

```

__Scope: __

This function is specific to the Motif component and is used to control the change of display mode within the Motif component.

__Input Parameter:__  
event: An event that occurs when the user selects a different option in the drop-down menu.


__Return:__  
​__[Type]:__ 
There is no explicit return value, as the function updates the local _display state of the Motif component with the new value selected by the user.

 

*/

import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Highlight } from "./Highlight";
import { Printable } from "./Printable";
import "./motif.css";

/**
 * Description placeholder
 *
 * @param {array} motifs - A list of objects representing motifs.
 * @returns {array} - A new list of motifs cleaned of duplicates and sorted by left position.
 */
function cleanMotifs(motifs) {
  /**
   * Description placeholder
   *
   * @type {array}
   */
  let newMotifs = [];
  motifs.forEach(
    /**
     * @param {object} motif - The current motif being processed.
     * @returns {void} - This function returns no value.
     */
    (motif) => {
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
    }
  );
  newMotifs = newMotifs.sort((a, b) => {
    return a.leftEndPosition - b.leftEndPosition;
  });
  return newMotifs;
}

/**
 * Description placeholder
 *
 * @export
 * @param {{ motifs?: {}; sequence: any; }} { motifs = [], sequence }
 * @returns {React.JSX}
 */
export default function Motif({ motifs = [], sequence }) {
  const [_display, set_display] = useState("Highlight");

  if (motifs.length === 0) {
    return <></>;
  }

  /**
   * Description placeholder
   *
   * @param {HTMLEvent} event - The event that occurs when the user selects a different option.
   */
  const handleChange = (event) => {
    set_display(event.target.value);
  };

  /**
   * Description placeholder
   *
   *  @type {Array} - An array of objects representing motifs.
   */
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
        {_display === "Highlight" && (
          <Highlight motifs={motifs_n} sequence={sequence} />
        )}
        {_display === "Printable" && (
          <Printable motifs={motifs_n} sequence={sequence} />
        )}
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
