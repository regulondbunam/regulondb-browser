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
    if (sequence !== null) {
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
    return (
        <div></div>
    )

}

/**
 * sequenceInfo: {
                            sequence: rs?.sequence,
                            posL: rs?.leftEndPosition,
                            posR: rs?.rightEndPosition
                        },
 */

export function MarkSequenceWithPositions({sequenceInfo}) {
    const sequence = sequenceInfo?.sequence, posL = `${sequenceInfo?.posL}`, posR = `${sequenceInfo?.posR}`
    useEffect(() => {
        const drawPlace = document.getElementById(`seq-${sequence}`)
        let canvas = document.getElementById(`cav-${sequence}`);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#seq-${sequence}`).size(width, 80).id(`cav-${sequence}`);
            let px = 0
            let isLine = false
            // eslint-disable-next-line
            const seq = [].map.call(sequence, function (x) {
                try {
                    canvas.line(px,0,px,80).stroke({ color: '#dbdbdb', width: 1, linecap: 'round' })
                if(sequenceCase[x] && !isLine){
                    // is upercase
                    isLine = true
                    canvas.line(px,16,px,64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                    canvas.text(`${posL}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px-(10*(posL.length/2)), 64)
                }
                if(isLine){
                    if(sequenceCase[x]){
                        canvas.line(px,16,px+10,16).stroke({ color: '#000', width: 1, linecap: 'round' })
                    }else{
                        isLine = false
                        canvas.line(px,16,px,64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                        canvas.text(`${posR}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px-(10*(posL.length/2)), 64)
                    }
                }
                canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 32)
                canvas.text(x).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 32)
                px += 10
                } catch (error) {
                    console.error("Error al dibujar secuencia",error)
                }
            });
        }
    })
    if (sequence !== null) {
        return (

            <div
                id={`seq-${sequence}`}
                style={{
                    height: "80px",
                    width: "100%",
                    left: "0",
                    overflowY: "hidden",
                    overflowX: "auto"
                }}
            >
            </div>
        );
    }
    return (
        <div></div>
    )

}

const sequenceCase = {
    A: true,
    C: true,
    T: true,
    G: true,
    a: false,
    c: false,
    t: false,
    g: false,
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