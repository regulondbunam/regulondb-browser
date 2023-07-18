import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export default function Box({ featureStyle = {}, id, height, width, label = "" }) {

    const drawId = "BoxDraw_" + id
    const canvaId = "BoxCanva_" + id
    useEffect(() => {
        const drawPlace = document.getElementById(drawId)
        let canvas = document.getElementById(canvaId);
        if (drawPlace && canvas === null) {
            canvas = SVG().addTo("#" + drawId).size(width, height).id(canvaId);
            canvas.text(label).move(0,(height/2)-30).font({
                size: 10,
            })
            DrawBox({
                id: id,
                canva: canvas,
                height: height,
                width: width,
                posX: 0,
                posY: (height/2)-15,
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

function DrawBox({
    id,
    canva,
    height,
    width,
    posX,
    posY,
    strand = "forward",
    stroke = { color: "#000000", "width": 2, "linecap": "round" }
}) {
    if (!canva) {
        return null;
    }
    // console.log(height)

    // draw body
    //const body = canva.path("M 0 0 V " + -height + " H " + arrowSize + " V");
    const lup = canva.rect(width,30).stroke(stroke).move(posX,posY).fill("none")
    //const lDown = canva.line(posX, posY+15, posX, 15+2*height).stroke(stroke)
    //group
    var group = canva.group();
    group.add(lup);

    // group.add(text);
    // Toltip
    group.attr({
        "data-tip": "",
        "data-for": `${canva.node?.id}-${id}`
    });
    return {
        id: id,
        canva: canva,
        draw: group,
        posX: posX,
        posY: posY,
        objectType: "promoter",
    };
}