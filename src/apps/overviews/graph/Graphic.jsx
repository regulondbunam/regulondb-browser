/**

# Component (deployment use)

# Overviews
    
## Description  

[Component that make the graph of the overviews]

## Category   
    
Visual

## Live demo 
[-]

## Installation 
[-]

## Usage 
'''
  <Graphic label={data.getOverview.graph.title} data={data.getOverview.data} />
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| label    | string    |  ""     |The label for the dataset which appears in the legend |
| data     | object      |  []         |Data from the overviews to make the graph        |


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
import { useMemo, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
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

 * useState
 */
import { useMemo} from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import PropTypes from 'prop-types'

/**
 * Component that make the graph of the overviews
 * @param {String} label - label for the dataset
 * @param {object} data -  Data of the overviews
 * @returns {ReactElement} 
 */
export default function Graphic({ label = "", data = [] }) {

  //console.log(data)
    const axis = useMemo(() => {
      
      let axisX=[];
      let axisY=[];

      data.forEach(element=>{

        const { xAxis, yAxis } = element
        //console.log("x:"+xAxis+",y:"+yAxis)
        axisX.push(xAxis);
        axisY.push(yAxis);
      })   
     return { x: axisX, y: axisY }
   })

   const arrayOfObj = axis.x.map(function(d, i) {
    return {
      label: d,
      data: axis.y[i] || 0
    };
  });

  const sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
    return b.data-a.data;
  });

  const newArrayLabel = [];
  const newArrayData = [];
  sortedArrayOfObj.forEach(function(d){
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
});  

  /**
   * Dataset properties
   * @const {object}
   */
  const graphData = {
    labels: newArrayLabel,
    datasets: [{
      label: label,
      data: newArrayData,
      backgroundColor: 'rgba(61, 119, 155)',
      borderWidth: 2,
      borderColor: 'rgba(50, 97, 125)',
    }],
  };

  /**
   * Options of the graoh
   * @const {object}
   */
  const graphOptions = {
    responsive: true,
    scaleStartValue: 0,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: label,
        font: {
          size: 14,
        },
      },
    }
  };


  return (
    <div>
      <article>
        <Bar
          data={graphData}
          options={graphOptions}>
        </Bar>
      </article>
    </div>
  )
}

Graphic.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object
}

Graphic.defaultProps = {
  label: '""',
  data: '[]'
}