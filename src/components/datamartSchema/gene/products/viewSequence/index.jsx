/**
 # Component (user guide)

# ViewSecuence
	
## Description  
	
Displays a sequence of data in two different formats (FASTA and GenBank) in separate modes. The modes allow the user to toggle the display of the color in the sequence and to download the sequence in file format.

## Category   
Visual 

## Live demo 
	
--

## Installation or Implementation

--

## Usage 
	
--

## Props 
sequence, title
| Attribute | Type | Default | Description                                                 |
| --------- | ---- | ------- | ----------------------------------------------------------- |
|sequence   |string|         |Represents the sequence of data to be displayed in the modal.|
|title      |string|         |Represents the title or name associated with the data sequence.|

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
React: it is an open source JavaScript library widely used to build interactive user interfaces and reusable components.
Modal: it is a component provided by Material-UI, a UI component library for React.
Box: it is used to create flexible and customizable boxes or containers that can hold content and apply styles through props.
FormGroup: it is a Material-UI component used to group sets of form controls, such as checkboxes and radio buttons.
FormControlLabel: it is a Material-UI component used to associate a label with a form control, such as a checkbox or radio button.
Switch: it is a Material-UI component that provides a visual representation of an on/off switch or a toggled checkbox.
GenebankModal: it displays a specific modal with information in GenBank format.
FastaModal: it manages the display of the sequence in FASTA format and provides options to change the display and download the sequence.

## States
| Property            | Value | Description                                  |
| ------------------- | ----- | -------------------------------------------- |
|_viewFastaSequence   | false |Controls the visibility of the FASTA modal.   |
|_viewGenebankSequence| false |Controls the visibility of the GenBank modal. |
|_color               | false |Controls the color display in the sequence.   |



## Hooks
|  Name  | Description                                 |  Syntax                                         | Additional Notes or References | 
| ------ | -----------------------------------------   | ------------------------------------------------| ------------------------------ |
|useState|Manage local states in function components.  |const [state, setState] = useState(initialState);|                                |
|useRef  |Create and access references to DOM elements.|const myRef = useRef(initialValue);              |                                |

 * **/
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  FastaSequence,
  GenebankSequence,
} from "../../../../sequence";

/**
 * Description placeholder
 *
 * @export
 * @param {{ sequence: any; title: any; }} { sequence, title }
 * @returns {React.JSX}
 */
export default function ViewSequence({ sequence, title }) {
  const [_viewFastaSequence, set_viewFastaSequence] = React.useState(false);
  const [_viewGenebankSequence, set_viewGenebankSequence] =
    React.useState(false);

    
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const viewFastaSequence = () => set_viewFastaSequence(!_viewFastaSequence);

  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const viewGenebankSequence = () =>
    set_viewGenebankSequence(!_viewGenebankSequence);

  return (
    <div>
      <button className="aBase" onClick={viewFastaSequence}>
        FASTA
      </button>
      <button className="aBase" onClick={viewGenebankSequence}>
        GenBank
      </button>
      <Modal
        open={_viewFastaSequence}
        onClose={viewFastaSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FastaModal
          sequence={sequence}
          title={title}
          onView={viewFastaSequence}
        />
      </Modal>
      <Modal
        open={_viewGenebankSequence}
        onClose={viewGenebankSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GenebankModal
          sequence={sequence}
          title={title}
          onView={viewGenebankSequence}
        />
      </Modal>
    </div>
  );
}

const GenebankModal = React.forwardRef(
  
  /**
   * Description placeholder
   * @date 9/11/2023 - 9:10:03 PM
   *
   * @param {*} props - Component properties.
   * @param {object|function} ref - Reference to the component instance.
   * @returns {React.JSX}
   */
  (props, ref) => {
    const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const color = () => set_color(!_color);

  const download = 
   /**
   * Description placeholder
   *
   * @returns {void}
   */
  () => {
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {

      
      /**
       * Description placeholder
       *
       * @type {Blob}
       */
      const blob = new Blob([e.innerText]);

      /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  
  /**
   * Description placeholder
   *
   * @type {{ position: string; top: string; left: string; transform: string; bgcolor: string; border: string; boxShadow: number; p: number; }}
   */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref} >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Genebank FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={_color} onChange={color} />}
          label="View color in sequence"
        />
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <GenebankSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
    </Box>
  );
})

const FastaModal = React.forwardRef(
  /**
   * Description placeholder
   * @date 9/11/2023 - 9:10:03 PM
   *
   * @param {*} props - Component properties.
   * @param {object|function} ref - Reference to the component instance.
   * @returns {React.JSX}
   */
  (props, ref) => {

    
  const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  
  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const color = () => set_color(!_color);

  
  /**
   * Description placeholder
   */
  const download = () => {

    
    /**
     * Description placeholder
     *
     * @type {HTMLElement|null}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      
      /**
       * Description placeholder
       *
       * @type {Blob}
       */
      const blob = new Blob([e.innerText]);

      
      /**
       * Description placeholder
       *
       * @type {HTMLElement|null}
       */
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  
  /**
   * Description placeholder
   *
   * @type {{ position: string; top: string; left: string; transform: string; bgcolor: string; border: string; boxShadow: number; p: number; }}
   */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>FASTA FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={_color} onChange={color} />}
          label="View color in sequence"
        />
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <FastaSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
    </Box>
  );
});
