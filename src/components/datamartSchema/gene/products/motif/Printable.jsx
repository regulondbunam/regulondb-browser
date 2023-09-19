/** # Component (user guide)

# Printable
	
## Description  
	
it is used to display a printable version of the motifs and the associated sequence.


## Category   
	
Visual 

## Live demo 
	--

## Installation or Implementation
--

## Usage 
	--

## Props 

| Attribute | Type | Default | Description                                                                                                                                         |
| --------- | ---- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|  motifs   |Array |[]       |An array of objects representing the motifs to be displayed. Each object must contain details such as the type, position and sequence of the motif.  |
|sequence   |String| ""      |The sequence associated with the motifs.                                                                                                             |


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

React:  this import brings the main React module, which is used to create React components and work with JSX elements in the application.
PrintIcon: it is a Material-UI component that represents a graphical print icon and can be used to indicate the print option in the user interface or to activate the print function.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 */

import React from "react";
import PrintIcon from "@mui/icons-material/Print";

/**
 * Description placeholder
 *
 * @export
 * @param {{ motifs: any; sequence?: {}; }} { motifs, sequence = [] }
 * @returns {React.JSX}
 */
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
        <button style={{ margin: "2px" }} onClick={printMotifs}>
          <PrintIcon size="small" />
        </button>
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
            {motifs.map(
              /**
               * Description placeholder
               *
               * @param {object} motif - An object representing a motif.
               * @param {string} index - The index of the motif in the array.
               * @returns {React.JSX} - Returns a JSX element.
               */
              (motif, index) => {
                /**
                 * Description placeholder
                 *
                 * @type {string}
                 */
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
                      <tr style={{ borderBottom: "1pt solid" }}>
                        <td colSpan={3}>
                          <p>{motif.note}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }
            )}
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
