import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';

export default class Gene extends Component {
    state = {}
  
    DrawGene(canvas){
      const {
          id,
        name,
        geneticData,
        canvasData,
      } = this.props
      //console.log(canvasData)
      DrawGene({canvas:canvas, id:id,strand: geneticData.strand, axisX:canvasData.ax, axisY:canvasData.ay, name:name})
    }
  
    componentDidMount(){
      const canvas = this.props.canvasData
      //console.log(canvas)
      if(canvas.canvas){
        this.DrawGene(canvas.canvas)
        ReactTooltip.rebuild()
      }
    }
  
    render() {
  
      const {
        id,
        name = 'gene',
      } = this.props
      return (
        <ReactTooltip place="top" type="dark" effect="float" id={id}>
          <table style={{color: "#FFFFFF"}} >
              <thead>
                  <tr>
                      <th colSpan="2" > Gene Info </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>Name:</td><td>{name}</td>
                  </tr>
              </tbody>
          </table>
        </ReactTooltip>
      );
    }
  }

Gene.proTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    tooltip: PropTypes.string,
    canvasData: PropTypes.object,
    geneticData: PropTypes.object,
    objectStyle: PropTypes.object,
    lineStyle: PropTypes.object,
    labelStyle: PropTypes.object
}

Gene.defaultProps = {
    id: 'noId',
    name: 'obj',
    tooltip: 'tooltip',
    canvasData: {},
    geneticData: {},
    objectStyle: {},
    lineStyle: {},
    labelStyle: {}
}

  export function DrawGene(
    {
      canvas,
      id,
      axisX = 0,
      axisY = 0,
      name = "undefined",
      strand = 0,
      height = 100,
      size = 500,
      color = '#32617D',
      borderData = borderDefault,
      namePos = titlePosDefult,
    }
  ) {
    const rowHead = (height / 2)
    const xRow = size - (rowHead)
    const yHeight = (height * 0.2)
    const yMiddle = (height / 2)
    const yLow = height - (yHeight)
  
    //let draw = SVG().addTo(idCanva).size(size,height)
    console.log(strand)
    let polygon = canvas.polygon(`0,${yHeight} ${xRow},${yHeight} ${xRow},0 ${size},${yMiddle} ${xRow},${height} ${xRow},${yLow} 0,${yLow}`)
    polygon.fill(color)
    polygon.x(axisX).y(axisY)
    polygon.attr({
      'data-for': id
    })
    polygon.attr({
      'data-tip': id
    })
  
    let text = canvas.text(name)
    text.fill("#FFFFFF")
    text.x(axisX + (size / 2)).y(axisY + (height / 2))
    /*text.attr({
      x:"50%",
      y:"50%",
      'alignment-baseline':"middle",
      'text-anchor':"middle"
    })*/

    switch (strand) {
        case 'reverse':
            polygon.rotate(180)
            break;
        default:
            break;
    }
  
    
  
  }

  // constantes Predeterminadas

const borderDefault = {
    borde: 1,
    color: '#000000',
    trokeDash: false
  }
  
  const titlePosDefult = 'center'