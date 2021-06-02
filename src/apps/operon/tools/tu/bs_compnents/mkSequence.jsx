import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export function MarkSequence(sequence) {


    useEffect(() => {
        const drawPlace = document.getElementById(`seq-${sequence}`)
        let canvas = document.getElementById(`cav-${sequence}`);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#seq-${sequence}`).size(width, 30).id(`cav-${sequence}`);
            let px = 0
            const seq = [].map.call(sequence, function (x) {
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 0)
                canvas.text(x)
                .font({ size: '16px', family: "'Courier New',Courier,monospace" }).move(px, 0)
                px += 10
            });
            /*
            let height = 30;
            let canva = d3.select(`#seq-${sequence}`)
                .append("svg")
                .attr("height", height)
                .attr("width", 200);
            canva.append("text")
                .style("font-size", "9px")
                .style("font-family", "'Courier New',Courier,monospace")
                .text("g");
                */
        }
    })

    return (
        <div
            id={`seq-${sequence}`}
            style={{
                height: "20px",
                width: "500px",
                left: "0"
            }}
        >
        </div>
    );
}


const sequenceColor = {
    A: "#2BF063", //green
    C: "#606CEB", //blue
    T: "#EBC53D", // yellow
    G: "#EB3131", // red
    a: "#8BF0A3",
    c: "#BEC4EB",
    t: "#EBD89B",
    g: "#EB8F97",

}