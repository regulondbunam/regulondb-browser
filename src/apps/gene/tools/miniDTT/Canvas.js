import React, { useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js'
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';
//Genetic Elements
import DrawDNA from './geneticElements/drawDna'
import DrawGene from './geneticElements/drawGene'


const Canvas = ({
    idElement,
    idCanvas,
    dnaPosL = 0,
    dnaPosR = 100,
    geneticElements = [],
    //nombre de gen + context
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
            newCanvas = DrawCanva(idElement, idCanvas, drawPlace.clientWidth, 200)
            newCanvas.attr({
                'alt': diagramDescription,
                'assistentvalue':`DTT Object, ${diagramDescription}`
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
            Draw(canvas,geneticElements,idElement,dnaPosL,dnaPosR)
        }
        </>
    );
}

export default Canvas;

function Draw(canvas, geneticElements, idElement,dnaPosL,dnaPosR){
    if(canvas){
        const DNA = DrawDNA({
            id: idElement,
            canva: canvas,
            dnaPosLeft:  dnaPosL,
            dnaPosRight: dnaPosR
        })
        geneticElements.map((ele,indx)=>{
            // funciones para evitar sobrelape y asignar cordenadas x y 
            //console.log(ele)
            switch (ele.type) {
                case 'gene':
                    DrawGene({
                        id: ele.id,
                        canva: canvas,
                        dna: DNA,
                        posLeft: ele.leftEndPosition,
                        posRigth: ele.rightEndPosition,
                        strand: ele.strand
                    })
                    break;
                default:
                    return null
            }
        })
    }
    return null
}

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