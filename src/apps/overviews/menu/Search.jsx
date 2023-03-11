/*
# Component (user guide)

# [Search]
	
## Description  
input that filters the gus that are shown in the table
by names or groups and implements predictive search


## Category   
    [Functional]  
## Usage 
	
[example: <Search placeholder={} guData={} get_guDataFiltered={} /> ]

## Props 

| Attribute         | Type      | Default       | Description                                      |
| ------------------|-----------| --------------| ----------------------------------------------   |
|placeholder        | String    |     "Filterd"   |It is the placeholder that is shown in the input  |
|overviewsData           | object    |         []       |Object with the information of the gus            |
|get_overviewsDataFiltered | function  |         ()=>{}      |Object with the information of the filtered GUs   |

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
__{ Autocomplete, TextField } from @mui/material__
Dependency that allows us to use the Autocomplete components and
Material UI Library TextField

__Search.module.css__
Style sheet for this component

## States
	
|   State   | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |
	

# Functions description

##generateOptions

__Description:__  
[Filters the content of the overviewsData object and returns an array with the name and groups of the gus]


__Usage:__

```javascript
options={generateOptions()}
```

__Scope: __
[local]



__Return:__  
​__[array]:__ [Options]
​[array with the names and groups of the gus]



## [updateFilteredData]

__Description:__  

[checks if something was entered in the input and executes the filterData
function and updates the state of the mainTable component with the filtered
data]


__Usage:__

```javascript
 updateFilteredData(value)
```

__Scope: __

[local]

__Input Parameter:__  
​__[String]:__ [inputValue]


__Return:__  
​__[void]:__ 


## [filteredData]

__Description:__  

[filter overviewsData according to the text entered in the input]

__Usage:__

```javascript
 filteredData(value)
```

__Scope: __

[local]

__Input Parameter:__  
​__[string]:__ [keyword]
The value that is entered in the input


__Return:__  
​__[array]:__ [overviewsData]
​[Description (if necessary)]
*/
import React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import PropTypes from 'prop-types'

/**
 * input that filters the overviews that are shown 
 * @param {string} placeholder - placeholder that is shown in the input
 * @param {object} overviewsData - information of the overviews 
 * @param {function} get_overviewsDataFiltered - information filtered of the overviews 
 * @returns {ReactElement}
 */
  export default function Search({ placeholder, overviewsData = [], get_overviewsDataFiltered = ()=>{} }) {
   
    /**
     * Generates the list of options for the overviews
     * @returns {array} array with the names and groups of the overviews
     */
    function generateOptions() {
        let options = [];
        overviewsData.forEach(function (overview) {
            console.log(overview)
            if (!options.includes(overview.graph)) {
                options.push(overview.graph.title);
            }
        });
        return options.sort();
    }

    /**
     * Returns the filter data
     * @param {string} keyword - The value that is entered in the input
     * @param {string} overviewsData - information of the overviews
     * @returns {function} filter overviewsData according to the text entered in the input
     */
    function filteredData(keyword, overviewsData) {
      const regex = new RegExp(keyword.toLowerCase());
      return overviewsData.filter(overview => regex.test(overview.graph.toLowerCase()));
}
    /**
     * checks if something was entered in the input
     * and updates the state of the mainTable 
     * @param {string} inputValue 
     */
    function updateFilteredData(inputValue) {
       if(inputValue!=null){
        let overviewsDataFiltered = filteredData(inputValue);
        get_overviewsDataFiltered(overviewsDataFiltered);
       }
    }

    try{
        return (
            <div>
            <Autocomplete id="search"
                size="small"
                onChange={(event, inputValue) => { updateFilteredData(inputValue) }}
                options={generateOptions()}
                sx={{ width: 300  }}
                renderInput={(params) => <TextField {...params} label={placeholder} />}
            />
            </div>
        )
    }catch(error){
        console.error(error)
    }
    return <>El compoente Search a fallado</>
};

  // Define el tipo de dato para las props 
Search.propTypes = {
  placeholder: PropTypes.string,
  overviewsData: PropTypes.array,
  get_overviewsDataFiltered: PropTypes.func
}
// define los default values para las props
Search.defaultProps = {
  placeholder: "Filtered"
}
  