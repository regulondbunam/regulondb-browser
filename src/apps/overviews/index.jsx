/**

# Component (deployment use)

# Overviews
	
## Description  

[Main component used to initialize the program]

## Category   
	
Estructural

## Live demo 
[-]

## Installation 
[-]

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

    Application
  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import React from 'react'
import Menu from "./menu"
import {Cover} from "../componets/ui-components"
import Paragraph from "./Paragraph"
import Consulta  from "./Consulta"
import Conf from "./Conf"
import { Routes, Route, useParams } from 'react-router-dom';
import Graph from './graph';
'''

## States
	
| Property | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|      overviewsData     |   Object   |    undefined     | Object that contains the information of Overviews coming from the web service   |
|      state     |   String   |    undefined     |     state of the query to the web service "loading" => it is loading, "error" => there is an error, "done" => the query is ready|


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
    let  { overviewsId } = useParams();
    const mainView = Conf.mainView

    /**
     * This function is used to update the state of the component "OverviesData"
     * @param {array} data 
     */
    
    const updateOverviesData = (data) => {
        console.log(data)
        setOverviewsData(data)
    }

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
    
 console.log(overviewsData)
    return (
        <div id="overviews_component" >
            <Cover state={state}>
                <h1>{mainView.title}</h1>
            </Cover>
            <Paragraph description={mainView.description} />
            <Consulta
                getOverviewsData={(data)=>{setOverviewsData(data)}}
                getState={updateOverviewsState}
            />  
            {overviewsData && (
                <Menu overviewsData={overviewsData} />
            )}
            
        </div>
    )
}