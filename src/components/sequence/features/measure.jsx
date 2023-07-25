import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export default function Measure({ featureStyle = {}, id, height, width, label = "" }) {

    const drawId = "MeasureDraw_" + id
    const canvaId = "MeasureCanva_" + id
    useEffect(() => {
        const drawPlace = document.getElementById(drawId)
        let canvas = document.getElementById(canvaId);
        if (drawPlace && canvas === null) {
            canvas = SVG().addTo("#" + drawId).size(width, height).id(canvaId);
            canvas.text(label).move(0,0).fill("#999999").font({
                size: 8,
            }).transform({
                rotate: 90,
                origin: 'bottom left',
                position: [0, 0]
              })
            DrawMeasure({
                id: id,
                canva: canvas,
                height: height,
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

function DrawMeasure({
    id,
    canva,
    height,
    arrowSize,
    posX,
    posY,
    strand = "forward",
    stroke = { color: "#999999", "width": 1, "linecap": "round" }
}) {
    if (!canva) {
        return null;
    }
    // console.log(height)

    // draw body
    //const body = canva.path("M 0 0 V " + -height + " H " + arrowSize + " V");
    const lup = canva.line(posX, posY, posX, height).stroke(stroke)
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