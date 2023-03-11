/**

# Component (deployment use)

# Modal
    
## Description  

[Component that shows us a modal when the values in the table are greater than 10]

## Category   
    
Estructural

## Live demo 
[-]

## Installation 
[-]

## Usage 
'''
   linkObjects =[<Modal objectsRelated={objectsRelated} />];
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| objectsRelated  | array   | Empty Array   | array of the data (x,y)|


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
    
RegulonDB Team: 
[
  nombre    <>
  Elizabeth Ochoa Praxedis  <elizabethochoap23@gmail.com>
  Gabriel Alarcon Carranza  <galarcon@ccg.unam.mx>
]

# Component (development use)

## Component Type 

    Stateful Component
  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import { Modal as MuiModal } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GridTable from "./gridTable";
import { formatJsonTable } from "./utiles.js"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types'
'''

## States
    
| Property | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|  open         | boolean    |  false       | open or close the modal  |
|  _jtGenes     | object   | format jsonTable from  objectsRelated   |  object with format { columns: columns, data: data }  |


# Functions description

## [name]

__Description:__  


__Usage:__

__Scope: __

[Scope details]

__Input Parameter:__  
 __vale__ [Description]

__Return:__  
 __value__ [Description]

 * 
 */

import { Modal as MuiModal } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GridTable from "./gridTable";
import { formatJsonTable } from "./utiles.js"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "550px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleButton = {
  position:'relative',
  left: '85%',
}

const styleFilter = {
 display: "flex",
 flexDirection: "row",
 alignItems: "center",
}

/**
 * Shows us a modal with the data, as well as contains a filter for searches
 * @param {array} objectsRelated -Array of the Data 
 * @returns  {ReactElement} 
 */
export default function Modal({ objectsRelated = [] }) {
  const [open, setOpen] = React.useState(false);
  const [_jtGenes, set_jtGenes] = React.useState(formatJsonTable({ clientWidth: 400 }, objectsRelated));
  const idPanel = "modalPanel2"
  /**
  * change state open to true
  * @returns  {void} 
  */
  const handleOpen = () => setOpen(true);
  /**
  * change state open to false
  * @returns  {void} 
  */
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    let panel = document.getElementById(idPanel)
    if (panel) {
      set_jtGenes(formatJsonTable(panel, objectsRelated))
    }
  }, [objectsRelated, idPanel])

  const _handleUpdate = (event) => {
    //console.log(event.target.value)
    const keyword = event.target.value
    let str = new RegExp(keyword.toLowerCase());
    const filterSG = objectsRelated.filter(obj => (str.test(obj.name.toLowerCase())) || str.test(obj._id.toLowerCase()))
    let panel = document.getElementById(idPanel)
    if (panel) {
      set_jtGenes(formatJsonTable(panel, filterSG))
    }
  }

  //console.log(_jtGenes)
  return (
    <div>
      <button onClick={handleOpen}> See Data </button>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div id={idPanel}>
            <div style={styleFilter}>
              <FilterAltIcon/>            
              <TextField size="small" sx={{ width: "100%" }} id="sgFilter-basic" label="Filter" variant="standard"
                onChange={_handleUpdate}/>   
            </div>
            <GridTable columns={_jtGenes.columns} data={_jtGenes.data} />
            <button style={styleButton} onClick={handleClose} className="accent"> Close </button>
          </div>
        </Box>
      </MuiModal>
    </div>
  );
}

Modal.propTypes = {
  objectsRelated: PropTypes.array,
}

Modal.defaultProps = {
  objectsRelated: [],
}
