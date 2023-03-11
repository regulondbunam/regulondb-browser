/**

# Component (deployment use)

# Tablita
    
## Description  

[Component that shows the data of the overviews in a table]

## Category   
    
Visual

## Live demo 
[-]

## Installation 
[-]

## Usage 
'''
  <Tablita labelX={data.getOverview.graph.labelX} labelY={data.getOverview.graph.labelY} data={data.getOverview.data}/>
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| labelX    | String    | undefined       |The label for the dataset which appears in the legend |
| labelY    | String     |  undefined           |Data from the overviews to make the graph        |
| data     | object      |  undefined          |Data from the overviews to make the graph        |

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

    Simple Component
  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import React  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
'''

## States
    
| Property | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |
|           |      |         |             |


# Functions description

## [createData]

__Description:__  
Function that shows us the data if it´s less than 10, otherwise it will shows us a button

__Usage:__
function createData(id, xAxis, yAxis,objectsRelated) {
   
    let linkObjects = [];

    if(objectsRelated.length < 10){
      objectsRelated.forEach((objectRelated)=>{
        linkObjects.push(<ObjectLink id={objectRelated._id} type={objectRelated.type} name={objectRelated.name}></ObjectLink>);
      })
    } else 
       linkObjects =[<Modal objectsRelated={objectsRelated} />];

    return {id, xAxis, yAxis,linkObjects};
  }
__Scope: __

[return]

__Input Parameter:__  
 __vale__ [Description]

__Return:__  
 __value__ [Array of the data that will show in the table or a button]

## [ObjectLink]

__Description:__  
Function that let us navigate to another page

__Usage:__
function ObjectLink({id,type="unknowObject",name}){
  return <div> <Link to={`/${type}/${id}`} >{name}</Link> </div>
}
__Scope: __

[return]

__Input Parameter:__  
 __vale__ [Description]

__Return:__  
 __value__ []

 * 
 */
import React  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link} from "react-router-dom"
import Modal from '../modal';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import PropTypes from 'prop-types'

const THEME={
  backgroundColor: '#3D779B',
  color: '#FFFFFF',
}

/**
 * Component that shows the data of the overviews in a table and has the option 
 * of a modal if there are more of 10 datas
 * @param {Object} data - Data of the overviews
 * @param {String} labelX - Data on the x-axis of the graph
 * @param {String} labelY - Data on the y-axis of the graph
 * @returns {ReactElement} 
 */
export default function Tablita({data, labelX,labelY}) {

  /**
   * function that shows us the data if it is less than 10 otherwise
   * it shows us a button that says "See Data"
   * @param {String} id -identifier of the data
   * @param {int} xAxis - Data from the x-axis
   * @param {int} yAxis - Data from the y-axis
   * @param {Array} objectsRelated - Array of the Data 
   * @returns {object} - object with format  {id, xAxis, yAxis,linkObjects}
   */
  function createData(id, xAxis, yAxis,objectsRelated) {
   
    let linkObjects = [];

    if(objectsRelated.length < 10){
      objectsRelated.forEach((objectRelated)=>{
        linkObjects.push(<ObjectLink id={objectRelated._id} type={objectRelated.type} name={objectRelated.name}></ObjectLink>);
      })
    } else 
       linkObjects =[<Modal objectsRelated={objectsRelated} />];

    return {id, xAxis, yAxis,linkObjects};
  }


    const rows = data.map((row,index)=>{
    return createData(index,row.xAxis,row.yAxis,row.objectsRelated)
  })

  
    return(
         <div>
          <TableContainer component={Paper}>
          <Table sx={{ minwidth: 800 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell sx={THEME} align="center">{labelX}</TableCell>
               <TableCell sx={THEME} align="center">{labelY}</TableCell>
               <TableCell sx={THEME} align="center">objects</TableCell >
             </TableRow>
           </TableHead>
           <TableBody>
             {rows.map((row) => (
               <TableRow
               key={"overviewrow_"+row.id}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row" align="center">
                   {row.xAxis}
                 </TableCell>
                 <TableCell align="center">{row.yAxis}</TableCell>
                 <TableCell align="center">
                 {row.linkObjects.map((linkObject)=>{
                 return linkObject
                 })}
                 </TableCell>              
               </TableRow>
             ))}
           </TableBody>
         </Table>
         </TableContainer>
         </div>
    )
}

/**
 * Function that let us navigate to another page through a link
 * @param {int} id - identifier of the element
 * @param {string} type - indicates the type of the element
 * @param {string} name - element name  
 * @returns {ReactElement} 
 */
function ObjectLink({id,type="unknowObject",name}){
  return <div> <Link to={`/${type}/${id}`} >{name}</Link> </div>
}

Tablita.propTypes = {
  data: PropTypes.object,
  labelX: PropTypes.string,
  labelY: PropTypes.string
}

Tablita.defaultProps = {
  data: '',
  labelX: '',
  labelY: ''
}
