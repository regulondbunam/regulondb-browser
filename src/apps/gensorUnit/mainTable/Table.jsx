/*
# Component (user guide)

# TableGu
	
## Description  

Generates a table with the name of the gus and the groups to which
belong

## Category   
	
[Visual]  

## Usage 
	
[example:  <TableGu table={} guDataFiltered={}/> ]

## Props 


| Attribute       | Type | Default | Description                                       |
| ----------------| ---- | ------- | --------------------------------------------------|
|  table          | Object |         | table configuration file, allows to set the text of the headers  |
| guDataFiltered  | Object |         | It is a JSOn type object with the information of the GUs that are going to be shown in the table |

## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
    Francisco Mendez Hernandez <jklmopkrst@gmail.com>

# Component (technical guide)

## Component Type 

[Stateful Component]

## Dependencies

__{TableContainer,Paper, TableHead, TableBody, TableRow,Table, TableCell, 
    TablePagination, TableFooter} from "@mui/material__
[Dependency that imports material UI components]

__styles__
Style sheet for this component

__react__
[Dependency that imports the UseState method and allows to create states]

## States
	
|   State      | Type     | Default | Description                                   |
| ------------ | ---------| ------- | --------------------------------------------- |
| Page         | function |    0    | Update the page number in the component       |
|              |          |         | TablePagination                               |
| RowsPerPage  | function |    3    | Update the row number in the component        |
|              |          |         | TablePagination                               |               

# Functions description

## [handleChangePage]
__Description:__  
This function updates the page number in the TablePagination component


__Usage:__

```javascript

onPageChange={handleChangePage}

```

__Scope: __

[Private]

__Input Parameter:__  
​__[event]:__ [The event that runs]
__[newPage]:__ [Page number]


__Return:__  
​__[void]:__

## [handleChangeRowsPerPage]

__Description:__  
[This function updates the row number in the TablePagination component]

__Usage:__

```javascript
    onRowsPerPageChange={handleChangeRowsPerPage}
```

__Scope: __

[Local]

__Input Parameter:__  
​__[event]:__ [The event that runs]


__Return:__  
​__[void]
*/
import { TableContainer,Paper, TableHead, TableBody, TableRow,Table, TableCell, TablePagination, TableFooter } from "@mui/material";
import styles from "./mainTable.module.css";
import * as React from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

export default function TableGu ({table,guDataFiltered}){
  const /** number */  [PAGE, SET_PAGE] = React.useState(0);
  const /** number */  [ROWS_PER_PAGE, SET_ROWS_PER_PAGE] = React.useState(3);
 
 
  const HANDLE_CHAGE_PAGE = (event, newPage) => {
    SET_PAGE(newPage);
  };

 let  generateRanges=()=>{
    /*la idea es generar un funcion que cree un arreglo con los rangos
    para colocarlos en el TablePagination
    [1, 2,{ label: 'All', value: guDataFiltered.length }]*/
    if(guDataFiltered.length==1){
        return [];
    }else{
        return [1,2];
    }
 }
 
  const HANDLE_CHAGE_ROWS_PER_PAGE = (event) => {
    SET_ROWS_PER_PAGE(+event.target.value);
    SET_PAGE(0);
  };
    
    return (
         <TableContainer component={Paper}>
            <Table arial-label='Table'>
                <TableHead> 
                    <TableRow className={styles.headTable} >
                    <td className={styles.td} >{table.head.guName}</td>
                    <td className={styles.td} >{table.head.guGroups}</td>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        guDataFiltered.slice(PAGE * ROWS_PER_PAGE, PAGE * ROWS_PER_PAGE + ROWS_PER_PAGE).map((gu,index)=>{
                            let groups;
                            if(Array.isArray(gu.groups)){
                                groups = gu.groups.join(", ")
                            }
                            return(
                                <TableRow  key ={index+"_"+gu.id}>
                                    <TableCell align="center" sx= {{color: '#666666',fontSize:17,
                                    fontWeight:700, width:"30%"}} >
                                            <Link to={`/gu/${gu.id}`} >{gu.name}</Link>
                                    </TableCell>
                                    <TableCell align="justify">{groups}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                <TablePagination
                    rowsPerPageOptions={[1, 2,{ label: 'All', value: guDataFiltered.length }]}
                    count={guDataFiltered.length}
                    rowsPerPage={ROWS_PER_PAGE}
                    page={PAGE}
                    onPageChange={HANDLE_CHAGE_PAGE}
                    onRowsPerPageChange={HANDLE_CHAGE_ROWS_PER_PAGE}
                />
                </TableFooter>
            </Table>
         </TableContainer>
     )
}

// Define el tipo de dato para las props 
TableGu.propTypes = {
    table: PropTypes.object,
    guDataFiltered: PropTypes.array,
}