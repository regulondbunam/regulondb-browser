import React, { useEffect } from "react";
import DrawingTracesTool from "./drawingTracesTool/drawing_traces_tool";
import IconButton from "./drawingTracesTool/IconButton"
import { ReImg } from "reimg";

const DttTool = ({
    id = "version4",
    data_dtt
}) => {

    //const [_expand, set_expand] = useState(false)
    const getTransformParameters = (element) => {
        const transform = element.style.transform;
        let scale = 1,
            x = 0,
            y = 0;
        if (transform.includes("scale"))
            scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
        if (transform.includes("translateX"))
            x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
        if (transform.includes("translateY"))
            y = parseInt(transform.slice(transform.indexOf("translateY") + 11));
        return { scale, x, y };
    };

    const getTransformString = (scale, x, y) =>
        "scale(" + scale + ")  translateX(" + x + "%) translateY(" + y + "%)";


    const _onZoom = (direction) => {
        const svg = document.getElementById("dttv4_Canvaversion4");
        if (svg) {
            const { scale, x, y } = getTransformParameters(svg);
            let dScale = 0.1;
            if (direction === "out") dScale *= -1;
            if (scale === 0.1 && direction === "out") dScale = 0;
            svg.style.transform = getTransformString(scale + dScale, x, y);
        }
    };
    const pan = (direction) => {
        const svg = document.getElementById("dttv4_Canvaversion4");
        const { scale, x, y } = getTransformParameters(svg);
        let dx = 0,
            dy = 0;
        switch (direction) {
            case "left":
                dx = -3;
                break;
            case "right":
                dx = 3;
                break;
            default:
            ///
        }
        svg.style.transform = getTransformString(scale, x + dx, y + dy);
    };
    const _resetZoom = () => {
        const svg = document.getElementById("dttv4_Canvaversion4");
        svg.style.transform = getTransformString(1, 0, 0);
    }

    const _downloadPNG = () => {
        var svgElement = document.querySelector(`svg`);
        ReImg.fromSvg(svgElement).toCanvas(function (canvas) {
            var url = canvas.toDataURL("image/png");
            var link = document.createElement("a");
            link.download = "dttgraphic.png";
            link.href = url;
            link.click();
        });
    };

    const _downloadSVG = () => {
        const svg = document.getElementById(`divCanvas_dttv4Context${id}`)
            .innerHTML;
        const blob = new Blob([svg.toString()]);
        const element = document.createElement("a");
        element.download = "dttgraphic.svg";
        element.href = window.URL.createObjectURL(blob);
        element.click();
        element.remove();
    }

    useEffect(() => {
        let drawPlace = document.getElementById(`divCanvas_dttv4Context${id}`)
        if (drawPlace) {
            let dnaFeatures_data = data_dtt
            if (dnaFeatures_data) {
                DrawingTracesTool({
                    idDrawPlace: `divCanvas_dttv4Context${id}`,
                    idCanvas: `dttv4_Canva${id}`,
                    dnaFeatures_data: dnaFeatures_data,
                    auto_adjust: true,
                })
                drawPlace.scrollTo(0, 250)
            } else {
                console.error("dtt, no valid")
            }

        }
    }, [data_dtt, id])


    if (data_dtt) {
        return (
            <section>

                <IconButton
                    icon="add"
                    style={{
                        background: "#000",
                        float: "left",
                        marginRight: "1%"
                    }}
                    onClick={() => {
                        _onZoom("in");
                    }}
                />
                <IconButton
                    icon="remove"
                    style={{
                        background: "#000",
                        float: "left",
                        marginRight: "1%"
                    }}
                    onClick={() => {
                        _onZoom("out");
                    }}
                />
                <IconButton
                    icon="keyboard_arrow_left"
                    style={{
                        background: "#000",
                        float: "left",
                        marginRight: "1%"
                    }}
                    onClick={() => {
                        pan("right");
                    }}
                />
                <IconButton
                    icon="keyboard_arrow_right"
                    style={{
                        background: "#000",
                        float: "left",
                        marginRight: "1%"
                    }}
                    onClick={() => {
                        pan("left");
                    }}
                />
                <IconButton
                    icon="restart_alt"
                    style={{
                        background: "#000",
                        float: "left",
                        marginRight: "1%"
                    }}
                    onClick={() => {
                        _resetZoom();
                    }}
                />
                <div className="dropdown">
                    <button>Download</button>
                    <div className="dropdown-content">
                        <button
                            style={{ background: "#72a7c7" }}
                            onClick={() => {
                                _downloadPNG();
                            }}
                        >Download PNG</button>
                        <button
                            style={{ background: "#72a7c7" }}
                            onClick={() => {
                                _downloadSVG();
                            }}
                        >Download SVG</button>
                    </div>
                </div>
                <div style={{ overflow: "auto", height: "200px", resize: "vertical" }} id={`divCanvas_dttv4Context${id}`}></div>
            </section>
        )
    }

    return <></>

};

export default DttTool;

