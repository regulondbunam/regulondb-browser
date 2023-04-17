/**

# Component (deployment use)

# Overviews
    
## Description  

[Component that shows the page of the overview's graph]

## Category   
    
Estructural

## Live demo 
[-]

## Installation 
[-]

## Usage 
'''
   if (overviewsId) {
        return (<Graph overviewsId={overviewsId} />)
    }
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| overviewsId    | object     |  Undefined      | identify the id of the overviews |
|           |      |         |             |


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
import { Cover } from '../../componets/ui-components'
import Paragraph from "./Paragraph"
import { query_GET_OVERVIEW } from '../../componets/webservices/overviews/gql'
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Graphic from "./Graphic"
import PropTypes from 'prop-types'

'''

## States
    
| Property | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |
|           |      |         |             |


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


import { Cover } from '../../../components/ui-components'
import Paragraph from "./Paragraph"
import { query_GET_OVERVIEW } from '../../../components/webservices/overviews/gql'
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Graphic from "./Graphic"
//import PropTypes from 'prop-types'
import Tablita from './Tablita';

/**
 * Component that shows the page of the overview´s graph
 * @param {object} overviewsId - identify the id of the overviews 
 * @returns {ReactElement} 
 */
export default function Graph() {

  const id = useParams().overviewsId;

  const  {data,loading, error } = useQuery(query_GET_OVERVIEW,{
    variables:{ id}
  });
  let state = "done"
  if (loading) state = "loading"
  if (error){ 
    state = "error";
    console.error(`Error! ${error.message}`)
  }
  //if ( data ) console.log(data);
 //console.log(data.getOverview)
  return (
    <div id="overviews_component">
      <Cover state={state}>
        <h1>
          {!data ? " Loading..." : data.getOverview.graph.title}
        </h1>
      </Cover>
      {data &&(
        <article>
        <Paragraph description={data.getOverview.graph.description} />
        <Graphic label={data.getOverview.graph.title} data={data.getOverview.data} />
        <Tablita labelX={data.getOverview.graph.labelX} labelY={data.getOverview.graph.labelY} data={data.getOverview.data}/>
      </article>
      )}
    </div>
  )
}
