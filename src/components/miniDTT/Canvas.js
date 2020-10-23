import React, { useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js'
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
//Genetic Elements
import Gene from './geneticElements/Gene'


const Canvas = ({
    idElement,
    idCanvas,
    dnaPosL = 0,
    dnaPosR = 100,
    geneticElements = [],
    diagramDescription = 'a adn diagram',
    constenUrl,
    license = "regulonDB Browser",
    acquireLicensePage = "url del sitio de ayuda para citar el diagrama"
}) => {
    const [canvas, setCanvas] = useState();

    useEffect(() => {
        let drawPlace = document.getElementById(idElement)
        let newCanvas = document.getElementById(idCanvas)
        if (drawPlace && newCanvas === null) {
            newCanvas = DrawCanva(idElement, idCanvas, drawPlace.clientWidth, 150)
            newCanvas.attr({
                'alt': diagramDescription
              })
              //console.log(newCanvas)
            if (!canvas) {
                setCanvas(newCanvas)
            }
        }
    }, [idElement, idCanvas, diagramDescription, canvas]);

    // eslint-disable-next-line no-unused-vars
    function reDraw(){
        let canvas = document.getElementById(idCanvas)
        if(canvas){
            canvas.remove()
            setCanvas(undefined)
        }
    }

    return (
        <>
        <Helmet
            script={[
                helmetJsonLdProp({
                    "@context": "https://schema.org/",
                    "@type": "ImageObject",
                    "contentUrl": constenUrl,
                    "license": license,
                    "acquireLicensePage": acquireLicensePage
                }),
            ]}
        />
        {
            canvas
            ?geneticElements.map((ele,indx)=>{
                // funciones para evitar sobrelape y asignar cordenadas x y 
                const element = ele.gene
                //console.log(element)
                let ax1 = 0
                let ay1 = 0
                let ax2 = 1000
                let ay2 = 100
                return <Gene key={element.id}
                                id={element.id}
                                canvasData={{canvas: canvas, ax1:ax1, ay1:ay1, ax2:ax2, ay2:ay2}}
                                geneticData={{leftPos: element.leftPos, rightPos:element.rightPos, strand:element.strand}}
                                name={element.name} 
                                objectStyle={element.objectStyle}
                                lineStyle={element.lineStyle}
                                labelStyle={element.labelStyle}
                                tooltip={element.tooltip}
                                />
                
            })
            :null
        }
        {
            //Drawing Genes
            
        }
        </>
    );
}

export default Canvas;

export function DrawCanva(idElement, idCanvas, width = 100, height = 100) {
    return SVG().addTo(`#${idElement}`).size(width, height).id(idCanvas)
}

/**
                                geneticData={{leftPos: 0 rightPos:100 strand:1}}
                                canvasData={{canvas:canvas, ax1,ay1,ax2,ay2,area}}
                                objectStyle={{color: "#0235AD"}}
                                lineStyle={{type: '', color:'#000000'}}
                                labelStyle={{font: '' color:'#000000'}}
 */