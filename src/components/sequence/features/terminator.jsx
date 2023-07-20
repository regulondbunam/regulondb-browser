import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export default function Terminator({ featureStyle = {}, id, height, width, label = "" }) {

    const drawId = "TerminatorDraw_" + id
    const canvaId = "TerminatorCanva_" + id
    useEffect(() => {
        const drawPlace = document.getElementById(drawId)
        let canvas = document.getElementById(canvaId);
        if (drawPlace && canvas === null) {
            canvas = SVG().addTo("#" + drawId).size(width, height).id(canvaId);
            //canvas.text(label).move(10,2)
            DrawTerminator({
                id: id,
                canva: canvas,
                height: height,
                width: width,
                posX: 0,
                posY: 0,
            })
        }
        return () => {
            if (drawPlace) {
                drawPlace.innerHTML = ""
            }
        }
    })
    return (
        <div
            id={drawId}
            style={featureStyle}
        >
        </div>
    );

}

function DrawTerminator({
    id,
    canva,
    height,
    width,
    posX,
    posY,
    stroke = { color: "#000", "width": 2, "linecap": "round" }
}) {
    if (!canva) {
        return null;
    }

    //draw lines
    const line1 = canva.line(posX, height/2-10,  (posX+width/2)-5, height/2-10).stroke(stroke)
    const line2 = canva.line((posX+width/2)-5, height/2-10,(posX+width/2)-5, (height/4)+3).stroke(stroke)
    const line3 = canva.line((posX+width/2)+10, height/2-10,(posX+width/2)+10, (height/4)+3).stroke(stroke)
    const line4 = canva.line((posX+width/2)+10, height/2-10,posX+width, height/2-10).stroke(stroke)

    // console.log(height)
  
    // draw head
    let head = canva.path(
        "M 23.2 28 L 23.2 27.1 A 14.7 14.7 0 0 0 30 14.7 A 14.7 14.7 0 0 0 15.2 0 L 15.2 0 A 14.7 14.7 0 0 0 0.5 14.7 A 14.7 14.7 0 0 0 7.2 27.1 L 7.2 28"
    ).fill("none").stroke(stroke);
    let headX = (posX+width/2)-13
    let headY = 0
    head.move(headX + 1, headY + 1);
    

    //group


    // reverse effect


    // group.add(text);
    // Toltip

    return {
        id: id,
        canva: canva,
        posX: posX,
        posY: posY,
        objectType: "promoter",
    };
}