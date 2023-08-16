import React, { useEffect } from 'react'
import { SVG } from "@svgdotjs/svg.js";

export default function Promoter({ featureStyle = {}, id, height, width, label = "", showArrow = true }) {

  const drawId = "promoterDraw_" + id
  const canvaId = "promoterCanva_" + id
  useEffect(() => {
    const drawPlace = document.getElementById(drawId)
    let canvas = document.getElementById(canvaId);
    if (drawPlace && canvas === null) {
      canvas = SVG().addTo("#" + drawId).size(width, height).id(canvaId);
      canvas.text(label).move(10, 2)
      if (showArrow) {
        DrawPromoter({
          id: id,
          canva: canvas,
          height: height,
          posX: 1,
          posY: 20,
          arrowSize: 15,
          strand: "forward",
          showArrow: showArrow
        })
      }

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

function DrawPromoter({
  id,
  canva,
  height,
  arrowSize,
  posX,
  posY,
  strand = "forward",
  stroke = { color: "#000", "width": 2, "linecap": "round" },
}) {
  if (!canva) {
    return null;
  }
  // console.log(height)

  // draw body
  canva.line(posX, posY, posX, height).stroke(stroke)
  canva.line(posX, posY, posX + arrowSize + 2, posY).stroke(stroke)

  // draw arrow
  let ax = posX + arrowSize
  let ay = posY - 5
  const arrow = canva.path("m 0,0 5,5 -5,5 v 0");
  arrow.fill("none").move(ax, ay);
  arrow.stroke(stroke);


  return {
    id: id,
    canva: canva,
    posX: posX,
    posY: posY,
    objectType: "promoter",
  };
}