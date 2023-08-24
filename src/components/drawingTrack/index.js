import { SVG } from "@svgdotjs/svg.js";

export default class Track{

    constructor(id, drawPlaceId, width, height){
        this.id = id
        this.drawPlaceId = drawPlaceId;
        this.width = width;
        this.height = height;
    }

    draw(){
        const drawPlace = document.getElementById(this.drawPlaceId)
        if (!drawPlace) {
            console.error("drawPlace no found: "+this.drawPlaceId);
            return null
        }
        this.canvas = SVG().addTo(`#${this.drawPlaceId}`).size(this.width, 80).id(this.id);
        this.canvas.line(0,0, 50,50).stroke({ color: '#00F', width: 1, linecap: 'round' })
    }

}