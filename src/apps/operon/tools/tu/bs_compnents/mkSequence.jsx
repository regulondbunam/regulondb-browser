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
            // eslint-disable-next-line
            const seq = [].map.call(sequence, function (x) {
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 0)
                canvas.text(x)
                .font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 0)
                px += 10
            });
        }
    })
    if(sequence !== null){
        const width = sequence.length * 10
    return (
        
        <div
            id={`seq-${sequence}`}
            style={{
                height: "20px",
                width: width,
                left: "0",
                overflowY: "hidden",
                overflowX: "auto"
            }}
        >
        </div>
    );
    }
    return(
        <div></div>
    )
    
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