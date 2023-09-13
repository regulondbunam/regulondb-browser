/*
# Component (user guide)

# [MainTable]
	
## Description  

It is a structural component that generates a table with a bar
search and pagination

## Category   
	
[Structural]  

## Usage 
	
[example: <MainTable  table={} guData={}/> ]

## Props 

| Attribute | Type   | Default | Description                                                    |
| --------- | ----   | ------- | ---------------------------------------------------------------|
| table    | Object |         |table configuration file, allows to set the text of the headers |
| guData    | Object |         |It is a JSOn type object with the information of the GUs that are going to be shown in the table  |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
    Francisco Mendez Hernandez <jklmopkrst@gmail.com>
    Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>

# Component (technical guide)

## Component Type 
[Stateful Component]

## Dependencies
__mainTable.module.css__
[style sheet of this component]
__react__
[Dependency that imports the UseState method and allows to create states]
__Search__
Import the search component
__Table__
Import the Table component


## States
	
|   State           | Type  | Default | Description                                 |
| ------------------| ----  | ------- | --------------------------------------------|
|  guDataFiltered   |  const| guData  | State that updates the Gus that are shown in the table|                            |

*/
import styles from "./mainTable.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import TableGu from "./Table";
export default function MainTable({ table, guData }) {
  const [GU_DATA_FILTERED, SET_GU_DATA_FILTERED] = useState(guData);

  return (
    <div className={styles.table}>
      <div className={styles.tools}>
        <Search
          guData={guData}
          get_guDataFiltered={(data) => {
            SET_GU_DATA_FILTERED(data);
          }}
        />
      </div>
      <div>
        <TableGu table={table} guDataFiltered={GU_DATA_FILTERED} />
      </div>
    </div>
  );
}

// Define el tipo de dato para las props
Search.propTypes = {
  table: PropTypes.object,
  guData: PropTypes.array,
};
