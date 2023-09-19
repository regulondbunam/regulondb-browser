/** # Component (user guide)

# Highlight
	
##Description

It is used to display motif and sequence information in a table and allows users to copy motif sequences to the clipboard. 
	
[Description Details]

## Category   
	
Visual 

## Live demo 
	
--

## Installation or Implementation

--

## Usage 
	
--

## Props 

| Attribute | Type | Default | Description                                                                                               |              
| --------- | ---- | ------- | ------------------------------------------------------------------------------------------------------    |
|motifs     |array |         |This field is an array containing a series of objects, each of which represents a motif.                   |
|sequence   |string|         |It is a long sequence of characters that represents biological information, such as an amino acid sequence.|

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
forwardRef: it  is a function provided by React that is used to pass a reference to a child component from a parent component.
SequenceSelection: custom component used to display the sequence selection in the user interface.
Stack: it is a component provided by Material-UI that is used to organize elements in a vertical or horizontal stack.
MuiAlert: it is a Material-UI component used to display alert messages in the user interface.
ContentCopyIcon: it is an icon provided by Material-UI that represents the copy action.
IconButton: it is a Material-UI component used to create buttons with icons.

## States
	
| Property        | Value | Description                                                                                                                                                     |
| --------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------|
|_leftEndPosition |  -1   |Stores the current left start position of a pattern. Initialized to -1 and is updated when the cursor is placed over a motif.                                    |
|_rightEndPosition|  -1   |Stores the current right start position of a pattern. Initialized at -1 and is updated when the cursor is placed over a motif.                                    |
|snackOpen	      | false |Controls whether the popup message (Snackbar) is displayed in the user interface. Initialized to false and updates to show and hide the copy to clipboard message.|

## Hooks
|  Name  | Description                                                   |  Syntax                                         | Additional Notes or References           | 
| ------ | ------------------------------------------------------------  | ----------------------------------------------- | -----------------------------------------|
|useState|React hook used to manage local state in functional components.|const [state, setState] = useState(initialState);|https://react.dev/reference/react/useState|


# Functions description

## handleOpenSnack

__Description:__  

This function is responsible for opening the pop-up message (Snackbar) in the user interface when a specific action is performed, such as copying a sequence to the clipboard. The popup message displays a success message or information related to the performed action.

__Usage:__

```javascript
&handleOpenSnack();
```
__Scope: __

defined within the Highlight component.

__Input Parameter:__  
This function does not take any input parameters.

__Return:__  
​__[Type]:__ [Name]
The function does not return any explicit value, since its main purpose is to open the popup message in the user interface. The popup message is controlled by the snackOpen state in the component and is displayed according to that state.



## handleCloseSnack

__Description:__  

This function is responsible for closing the pop-up message (Snackbar) in the user interface when the user performs a closing action, such as clicking out of the message or clicking on the close button of the message.

__Usage:__

```javascript
&handleCloseSnack(event, reason);
```
__Scope: __

defined within the Highlight component.

__Input Parameter:__  
event: This parameter represents the event that triggered the closing of the popup message. It can be useful for tracking information about the event, although it is not explicitly used in the provided handleCloseSnack function.
reason (Text string): Indicates the reason for closing the popup message. If the reason is 'clickaway', it means that it was closed by clicking on an area outside the message. Other reasons may indicate closing for other reasons.

__Return:__  
​__[Type]:__ 
The function does not return any explicit value, since its main purpose is to close the popup message in the user interface. The popup message is closed according to the reason provided as reason parameter.


*/

import { useState, forwardRef } from "react";
import { SequenceSelection } from "./sequence";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

/**
 * Description placeholder
 * @date 9/10/2023 - 2:15:51 PM
 *
 * @type {*}
 */
const Alert = forwardRef(
  /**
   * Description placeholder
   *
   * @param {*} props - The props passed by the parent component.
   * @param {*} ref - The ref attribute passed by the parent component
   * @returns {React.JSX}
   */
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

/**
 * Description placeholder
 *
 * @export
 * @param {{ motifs: any; sequence: any; }} { motifs, sequence }
 * @returns {React.JSX}
 */
export function Highlight({ motifs, sequence }) {
  const [_leftEndPosition, set_leftEndPosition] = useState(-1);
  const [_rightEndPosition, set_rightEndPosition] = useState(-1);
  const [snackOpen, setSnackOpen] = useState(false);

  /**
   * Description placeholder
   */
  const handleOpenSnack = () => {
    setSnackOpen(true);
  };

  /**
   * Description placeholder
   *
   * @param {HTMLEvent} event -  This parameter represents the event that triggered the closing of the popup message.
   * @param {string} reason -  Indicates the reason for closing the popup message.
   */
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <div style={{ overflow: "auto", maxHeight: "200px" }}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Positions</th>
              <th>Notes</th>
              <th>dataSource</th>
              <th>Sequence</th>
            </tr>
          </thead>
          <tbody>
            {motifs.map(
              /**
               * Description placeholder
               *
               * @param {object} motif - The object representing a motif.
               * @param {string} index - The index of the motif in the array.
               * @returns {React.JSX} - JSX component representing a motif in the table.
               */
              (motif, index) => {
                let positions = "---";
                if (motif.leftEndPosition) {
                  if (motif.rightEndPosition === motif.leftEndPosition) {
                    positions = motif.leftEndPosition;
                  } else {
                    positions =
                      motif.leftEndPosition + "-" + motif.rightEndPosition;
                  }
                }
                
                /**
                 * Description placeholder
                 *
                 * @type {string}
                 */
                let id = `motif_${motif.id}`;
                return (
                  <tr
                    className="tr_motif"
                    key={`${id}_${index}`}
                    onMouseEnter={
                      
                      /**
                       * Description placeholder
                       */
                      () => {
                      set_leftEndPosition(motif.leftEndPosition);
                      set_rightEndPosition(motif.rightEndPosition);
                    }}
                    onMouseLeave={
                      
                      /**
                       * Description placeholder
                       */
                      () => {
                      set_leftEndPosition(-1);
                      set_rightEndPosition(-1);
                    }}
                  >
                    {motif?.type ? <td>{motif.type}</td> : <td></td>}
                    <td>{positions}</td>
                    <td>{motif.note}</td>
                    {motif?.dataSource ? (
                      <td>{motif.dataSource}</td>
                    ) : (
                      <td></td>
                    )}
                    <td>
                      <IconButton
                        onClick={
                          
                          /**
                           * Description placeholder
                           *
                           * @param {Event} e
                           */
                          (e) => {
                          navigator.clipboard.writeText(motif.sequence);
                          handleOpenSnack();
                        }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                      <div style={{ display: "none" }}>
                        <p
                          id={`sequence_${index}_${id}`}
                          className="p_sequence"
                        >
                          {motif.sequence}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
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
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sequence copied to clipboard!
          </Alert>
        </Snackbar>
      </Stack>
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
