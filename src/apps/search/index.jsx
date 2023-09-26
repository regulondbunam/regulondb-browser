/**
# Component (user guide)

# Search
	
## Description  	
The Search component is responsible for handling search functionality in the application. It extracts the search keyword from the URL using React Router's useParams hook and conditionally renders different components based on whether a keyword is present or not. It ensures that the internal _keyword state variable stays in sync with the keyword parameter from the URL.

## Category   
Functional

## Live demo 
--

## Installation or Implementation
--

## Usage 
example: <Search/> 

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 
Visual

## Dependencies
React: The React import is the core React library used to create components and manage the user interface.

useEffect: useEffect is a React hook that is used to perform side effects on functional components. In the provided code, it is used to perform an action when certain dependencies, _keyword and keyword, change.

useState: useState is another React hook that is used to add state to functional components. It allows the component to store and update its internal state. In this case, it is used to manage the state of _keyword, which is an internal state used to track the value of the URL's keyword parameter.

useParams: useParams is a React Router hook that allows accessing parameters defined in routes. In this case, it is used to extract the value of the URL's keyword parameter, which is used to determine what content to display in the Search component.

Main:  it shows the main search tool.

Results: it is responsible for coordinating the search and displaying results in different sections (by result type) based on the search keyword provided.


## States
	
| Property | Value | Description                                                                   |
| -------- | ----- | ----------------------------------------------------------------------------- |
|_keyword  |       |This state variable is used to track the search keyword extracted from the URL.|

## Hooks
|  Name   | Description                                                         |  Syntax                                         | Additional Notes or References | 
| ------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
|useEffect|Used to synchronize _keyword with the keyword parameter from the URL.|useEffect(setup, dependencies?)                  |                                |
|useState | Used to create the _keyword state variable.                         |const [state, setState] = useState(initialState);|                                |



**/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from './main/Main';
import Results from './results';


/**
 * Description placeholder
 *
 * @returns {HTMLElement}
 */
function Search() {
    const [_keyword, set_keyword] = useState();
    let { keyword } = useParams()
    
    useEffect(() => {
        if (keyword !== _keyword) {
          if (!_keyword) {
            set_keyword(keyword);
          } else {
            set_keyword(undefined);
          }
        }
      }, [_keyword, keyword]);
    return(
        <div>
            {
                !_keyword && (<Main />)
            }
            {
                _keyword && (<Results keyword={keyword} />)
            }
        </div>
    )
}

export default Search;