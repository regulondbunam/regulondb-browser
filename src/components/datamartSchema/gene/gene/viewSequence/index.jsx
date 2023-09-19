/**
 # Component (user guide)

# ViewSecuence
	
## Description  
	
ViewSecuence allows the user to select and view data sequences in two different formats (FASTA and GenBank) through interactive modal windows. Each modal allows customization of sequence display and download.

## Category   
	
Visual  

## Live demo 
	
--

## Installation or Implementation

--

## Usage 
 <ViewSecuence secuence = "" _id={id} name = "" products = {products}/> ]

## Props 
Identifier or sequence name.
| Attribute | Type | Default | Description                                                  |
| --------- | ---- | ------- | -------------------------------------------------------------|
|secuence   |string|         |It represents the sequence of the gene that has been queried. |
|    _id    |string|         |Identifier or sequence name.                                  |
|    name   |string|         |Identifier or sequence name.                                  |
| products  |string|         |Identifier or sequence name.                                  |


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
React:Imports the main React library, which is used to create components and manage state.
Modal: The Modal component of Material-UI is used to create modal pop-up windows in web applications.
Box: The Box component is a versatile container that is used to wrap other elements and apply styles or layout to those elements. 
FormGroup: It is used to group related form elements, such as checkboxes and radio buttons.
FormControlLabel: It is a component used to create human-readable labels for form controls such as checkboxes and radio buttons.
Switch: It is used to create on/off switches in applications.

## States
	
| Property                | Value | Description                                                                   |
| --------                | ----- | ------------------------------------------------------------------------------|
|_viewFastaSequence	      | false |Controls the visibility of the FASTA format modal window. Initializes to false.|
|_viewGenebankSequence		| false |Controls the visibility of the GenBank format modal window. Initializes to false.|
|_color	                  | false |Controls the display of colors in the sequence within the modes. Initializes to false.|

## Hooks
|  Name  | Description                                                                                                                 |  Syntax                                               | Additional Notes or References | 
| ------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------ |
|useState|It is one of the fundamental hooks provided by React that allows functional components to maintain and manage internal state.|const [state, setState] = React.useState(initialState);|                                |



 *  **/
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
 * @param {{ sequence: any; _id: any; name: any; products: any; }} { sequence, _id, name, products }
 * @returns {React.JSX}
 */
export default function ViewSequence({ sequence, _id, name, products }) {
  // console.log(products);
  
  
  const [_viewFastaSequence, set_viewFastaSequence] = React.useState(false);
  const [_viewGenebankSequence, set_viewGenebankSequence] =
    React.useState(false);

    
  const viewFastaSequence = 
  /**
   * Description placeholder
   * 
   * @returns {boolean}
   */
  () => set_viewFastaSequence(!_viewFastaSequence);
  const viewGenebankSequence = 
  /**
   * Description placeholder
   * 
   * @returns {boolean}
   */
  () =>
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
          title={`RegulonDB|${_id}|gene: ${name}|product: ${products.map(product=>product.name).join(", ")}`}
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
          title={`gene: ${name}; product: ${products.map(product=>product.name).join(", ")}`}
          onView={viewGenebankSequence}
        />
      </Modal>
    </div>
  );
}


/**
 * Description placeholder
 *
 * @type {React.JSX}
 */
const GenebankModal = React.forwardRef((props, ref) => {
    const { sequence, title, onView = 
      
      /**
       * Description placeholder
       */
      () => {} } = props;
  const [_color, set_color] = React.useState(false);

  
  /**
   * Description placeholder
   * @returns {boolean}
   */
  const color = 
  
  /**
   * Description placeholder
   * @returns {boolean}
   */
  () => set_color(!_color);

  
  /**
   * Description placeholder
   */
  const download = 
  
  /**
   * Description placeholder
   */
  () => {

    
    /**
     * Description placeholder
     * @type {HTMLElement}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      
      /**
       * Description placeholder
       * 
       * @type {Object}
       */
      const blob = new Blob([e.innerText]);

      
      /**
       * Description placeholder
       * @type {HTMLElement}
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


/**
 * Description placeholder
 *
 * @type {React.JSX}
 */
const FastaModal = React.forwardRef((props, ref) => {
  const { sequence, title, onView = 
    
    /**
     * Description placeholder
     * 
     */
    () => {} } = props;
  const [_color, set_color] = React.useState(false);

  const color =
  
  /**
   * Description placeholder
   * 
   * @returns {void}
   */
  () => set_color(!_color);


  
  /**
   * Description placeholder
   * 
   */
  const download = 
  
  /**
   * Description placeholder
   * @returns {void}
   */
  () => {
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      
      /**
       * Description placeholder
       *
       * @type {object}
       */
      const blob = new Blob([e.innerText]);

      
      /**
       * Description placeholder
       *
       * @type {HTMLElement}
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
