/**

# Component (deployment use)

# Overviews
	
## Description  
It is an important part of the user interface of a React application that is responsible for displaying an overview of data. It can interact with other components to fetch data and react to URL parameters, making it dynamic and versatile depending on the application requirements.

## Category   
	
Estructural

## Live demo 
--

## Installation 
--

## Usage 
'''
    <div>
      <Overviews />
    </div>
'''
## Props 

| Attribute | Type | Default | Description |
|            | | ------- | ----------- |
|           |      |         |             |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
[
  Elizabeth Ochoa Praxedis  <elizabethochoap23@gmail.com>
  Gabriel Alarcon Carranza  <galarcon@ccg.unam.mx>
]

# Component (development use)

## Component Type 
Visual

## Dependencies
React: The first import, import React, imports the core React library. React is the JavaScript library used to create component-based user interfaces and is fundamental to any React application.
useState: Imports the React useState hook. The useState hook allows you to add local state to functional React components. It is used to define and manage state variables within a component.
Menu: The Menu component is used to represent a navigation menu or a list of options in the user interface.
Cover: custom component used to wrap content and possibly provide styling or decorative elements around that content.
Paragraph:  This component is used to represent paragraphs of text in the user interface.
Query:  This component is used to perform queries or data requests within the application and possibly communicate with a server to obtain information.
Conf: It is used for the configuration or structure of the application.
useParams: Imports the hook useParams from the react-router-dom library. This hook is used to access the parameters passed in the application URL, which allows React components to react to changes in the URL and make decisions based on those parameters.
Graph: This component is probably used to represent and visualize data in the form of graphs or charts, and is used conditionally based on the URL parameters.

## States
	
| Property    | Type | Default | Description |
| ----------- | ---- | ------- | ----------- |
|overviewsData|Object|undefined| Object that contains the information of Overviews coming from the web service   |
|    state    |String|undefined|     state of the query to the web service "loading" => it is loading, "error" => there is an error, "done" => the query is ready|


# Functions description

 ## [updateOverviesData]

__Description:__  
This function is used to update the state of the component "OverviesData"

__Usage:__
    const updateOverviesData = (data) => {
        setOverviewsData(data)
    }
__Scope: __

[private]

__Input Parameter:__  
 data [Object, overviews information obtained from the web service]

__Return:__  
    [void]

## [updateOverviewsState]

__Description:__  
This function is used to update the state of the component "state"

__Usage:__
    const updateOverviewsState = (state) =>{
        setState(state)
    }
__Scope: __

[private]

__Input Parameter:__  
 state [String, state of the query to the web service "loading" => it is loading, "error" => there is an error, "done" => the query is ready]

__Return:__  
 __value__ [Description]
 * 
 */

import React, { useState } from 'react';
import Menu from "./menu"
import { Cover } from "../../components/ui-components"
import Paragraph from "./Paragraph"
import Consulta from "./Consulta"
import Conf from "./Conf"
import { useParams } from 'react-router-dom';
import Graph from './graph';


/**
     * Main component used to initialize the program
     * @return {ReactElement} overviews app
     */
export default function Overviews() {

    const [overviewsData, setOverviewsData] = useState()
    const [state, setState] = useState()
    let { overviewsId } = useParams();
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const mainView = Conf.mainView

    /**
     * This function is used to update the state of the component "OverviesData"
     * @param {array} data 
     */
    /*
    const updateOverviesData = (data) => {
        console.log(data)
        setOverviewsData(data)
    }
    */

    /**
     * This function is used to update the state of the component "state"
     * @param {string} state 
     */
    const updateOverviewsState = (state) => {
        setState(state)
    }

    if (overviewsId) {
        return (<Graph overviewsId={overviewsId} />)
    }

    //  console.log(overviewsData)
    return (
        <div id="overviews_component" >
            <Cover state={state}>
                <h1>{mainView.title}</h1>
            </Cover>
            <Paragraph description={mainView.description} />
            <Consulta
                getOverviewsData={(data) => { setOverviewsData(data) }}
                getState={updateOverviewsState}
            />
            {overviewsData && (
                <Menu overviewsData={overviewsData} />
            )}

        </div>
    )
}