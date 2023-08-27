import { SVG } from "@svgdotjs/svg.js";

export default class Track {
  font = {
    size: "14px",
    family: "'Courier New',Courier,monospace",
    weight: "700",
  };
  stroke = { color: "#000000", width: 1, linecap: "round" };
  constructor(id, drawPlaceId, width, height, bpWidth) {
    this.id = id;
    this.drawPlaceId = drawPlaceId;
    this.width = width * bpWidth;
    this.height = height;
    this.bpWidth = bpWidth;
  }

  draw() {
    const drawPlace = document.getElementById(this.drawPlaceId);
    if (!drawPlace) {
      console.error("drawPlace no found: " + this.drawPlaceId);
      return false;
    }
    this.canvas = SVG()
      .addTo(`#${this.drawPlaceId}`)
      .size(this.width, this.height)
      .id(this.id);

    this.canvas
      .line(0, this.height - 1, this.width, this.height - 1)
      .stroke({ color: "#00F", width: 1, linecap: "round" });
    return true;
  }

  setBox({
    color = true,
    posX = 0,
    posY = 16,
    label = "...",
    font = this.font,
    stroke = this.stroke,
    sequence,
  }) {
    const boxWidth = sequence.length * this.bpWidth;
    const rX = posX * this.bpWidth;
    this.canvas.rect(boxWidth, 15).move(rX, posY).fill("none").stroke(stroke);
    this.canvas
      .text(label)
      .font(font)
      .move(rX - 15 + boxWidth / 2, posY + 13);
  }

  setPromoter({
    color = true,
    posX = 0,
    posY = 16,
    label = "+1",
    font = this.font,
  }) {
    this.canvas
      .text(label)
      .font(font)
      .move(posX * this.bpWidth, posY);
  }

  setSequence({
    sequence,
    color = true,
    posX = 0,
    posY = 16,
    font = this.font,
  }) {
    const sequenceArray = sequence.split("")
    sequenceArray.forEach((bp,index) => {
      this.canvas.text(bp).font(font).move(posX+(index*this.bpWidth), posY);
    });
    
  }
}
