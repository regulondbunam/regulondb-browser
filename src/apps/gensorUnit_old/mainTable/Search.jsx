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
|guData             | object    |         []       |Object with the information of the gus            |
|get_guDataFiltered | function  |         ()=>{}      |Object with the information of the filtered GUs   |

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
[Filters the content of the guData object and returns an array with the name and groups of the gus]


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

[checks if something was entered in the input and executes the reactions
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

[filter guData according to the text entered in the input]

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
​__[array]:__ [guData]
​[Description (if necessary)]
*/

import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function Search({
  placeholder,
  guData = [],
  get_guDataFiltered = () => {},
}) {
  function generateOptions() {
    let /** array */ options = [];
    guData.forEach(function (gu) {
      if (!options.includes(gu.name)) {
        options.push(gu.name);
      }
      gu.groups.forEach(function (group) {
        if (!options.includes(group)) {
          options.push(group);
        }
      });
    });
    return options.sort();
  }

  function filteredData(keyword) {
    let str = new RegExp(keyword.toLowerCase());
    return guData.filter(
      (gu) =>
        str.test(gu.name.toLowerCase()) ||
        gu.groups.find((group) => str.test(group.toLowerCase()))
    );
  }

  function updateFilteredData(inputValue) {
    if (inputValue != null) {
      let guDataFiltered = filteredData(inputValue);
      get_guDataFiltered(guDataFiltered);
    } else {
      get_guDataFiltered(guData);
    }
  }
  // definir DidCatch para el renderizado*
  try {
    return (
      <div>
        <Autocomplete
          id="search"
          size="small"
          onChange={(event, inputValue) => {
            updateFilteredData(inputValue);
          }}
          options={generateOptions()}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label={placeholder} />
          )}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
  return <>El compoente Search a fallado</>;
}
// Define el tipo de dato para las props
Search.propTypes = {
  placeholder: PropTypes.string,
  guData: PropTypes.array,
  get_guDataFiltered: PropTypes.func,
};
// define los default values para las props
Search.defaultProps = {
  placeholder: "Filtered",
};
