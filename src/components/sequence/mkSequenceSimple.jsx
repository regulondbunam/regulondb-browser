import React, { Component } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export class MarkSequenceSimple extends Component {

    id_drawPlace = `div_seq_${this.props.id}`;
    id_canvas = `canvas_seq_${this.props.id}`;
    sequence = this.props.data_sequence?.sequence;
    width = 0;


    componentDidMount() {
        const drawPlace = document.getElementById(this.id_drawPlace)
        let canvas = document.getElementById(this.id_canvas);
        if (drawPlace && !canvas) {
            if (this.props.positions) {
                canvas = SVG().addTo(`#${this.id_drawPlace}`).size(this.width, 80).id(this.id_canvas);
                let px = 0
                let isLine = false
                const posL = this.props.data_sequence?.posL;
                const posR = this.props.data_sequence?.posR;
                // eslint-disable-next-line
                const seq = [].map.call(this.sequence, function (x) {
                    try {
                        canvas.line(px, 0, px, 80).stroke({ color: '#dbdbdb', width: 1, linecap: 'round' })
                        if (sequenceCase[x] && !isLine) {
                            // is upercase
                            isLine = true
                            canvas.line(px, 16, px, 64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                            canvas.text(`${posL}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 64)
                        }
                        if (isLine) {
                            if (sequenceCase[x]) {
                                canvas.line(px, 16, px + 10, 16).stroke({ color: '#000', width: 1, linecap: 'round' })
                            } else {
                                isLine = false
                                canvas.line(px, 16, px, 64).stroke({ color: '#00F', width: 1, linecap: 'round' })
                                canvas.text(`${posR}`).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 64)
                            }
                        }
                        canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 32)
                        canvas.text(x).font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 32)
                        px += 10
                    } catch (error) {
                        console.error("Error al dibujar secuencia", error)
                    }
                });
            } else {
                canvas = SVG().addTo(`#${this.id_drawPlace}`).size(this.width, 30).id(this.id_canvas);
                let px=0
                // eslint-disable-next-line
                const seq = [].map.call(this.sequence, function (x) {
                    canvas.rect(10, 16).fill(sequenceColor[x]).move(px, 0)
                    canvas.text(x)
                        .font({ size: '16px', family: "'Courier New',Courier,monospace", weight: "700" }).move(px, 0)
                    px += 10
                });
            }

        }
    }




    render() {
        if (this.sequence) {
            this.width = this.sequence.length * 10
            let height = "20px"
            if(this.props.positions){
                height = "80px"
            }
            return (
                <div
                    id={this.id_drawPlace}
                    style={{
                        height: height,
                        width: this.width,
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