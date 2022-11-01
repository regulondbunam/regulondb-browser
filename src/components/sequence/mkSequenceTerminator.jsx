import React, { useEffect } from 'react'
import DrawTerminator from "./terminator"
import { SVG } from "@svgdotjs/svg.js";

export function MarkSequenceTerminator({ sequenceInfo, id }) {
    const sequence = sequenceInfo?.sequence, posL = `${sequenceInfo?.posL}`, posR = `${sequenceInfo?.posR}`
    useEffect(() => {
        const drawPlace = document.getElementById(`seq-${sequence}`)
        let canvas = document.getElementById(`cav-${sequence}`);
        if (drawPlace && canvas === null) {
            const width = drawPlace.clientWidth;
            canvas = SVG().addTo(`#seq-${sequence}`).size(width, 80).id(`cav-${sequence}`);
            let px = 0
            let textLevel = 32
            let isLine = false
            // eslint-disable-next-line
            let posX,
                posY = 16,
                bodyHeigth = 16,
                bodyFootH = 16,
                size = 0
            let group = canvas.group();
            // eslint-disable-next-line no-unused-vars
            const seq = [].map.call(sequence, function (x) {
                try {
                    canvas.line(px, 0, px, 80).stroke({ color: '#dbdbdb', width: 1, linecap: 'round' })
                    if (sequenceCase[x] && !isLine) {
                        // is upercase
                        isLine = true
                        posX = px
                        canvas.line(px, 16, px, 64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                        canvas.text(`${posL}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px - (10 * (posL.length / 2)), 64)
                    }
                    if (isLine) {
                        if (sequenceCase[x]) {
                            size += 10
                            //canvas.line(px, 16, px + 10, 16).stroke({ color: '#000', width: 1, linecap: 'round' })
                        } else {
                            isLine = false
                            canvas.line(px, 16, px, 64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                            canvas.text(`${posR}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px - (10 * (posL.length / 2)), 64)
                        }
                    }
                    canvas.rect(10, 16).fill(sequenceColor[x]).move(px, textLevel)
                    let text = canvas.text(x).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, textLevel)
                    group.add(text);
                    px += 10
                } catch (error) {
                    console.error("Error al dibujar secuencia", error)
                }
            });
            
            DrawTerminator({
                id: id,
                canva: canvas,
                posX: posX,
                posY: posY,
                bodyHeigth: bodyHeigth,
                bodyFootH: bodyFootH,
                bodyFootW: (size/2)-5,
                size: size,
                strand: "forward"
            })
            group.front()
            
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