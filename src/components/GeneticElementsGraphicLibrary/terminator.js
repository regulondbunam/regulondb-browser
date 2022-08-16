// Terminator 0.10.0
/**
 * Falta testear
 * head de la figura se sale de posicion
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import { terminator_dp } from "./features_default_properties";

export default function DrawTerminator({
  id,
  canva,
  anchor,
  dna,
  separation = 20,
  leftEndPosition = 10,
  rightEndPosition = 50,
  labelName = "Name",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke = {},
  font = {},
  tooltip = "",
  onClick
}) {
  if (!canva || !dna || !id || leftEndPosition > rightEndPosition) {
    return null;
  }
  stroke = stroke_validate(stroke, terminator_dp.stroke);
  font = font_validate(font, terminator_dp.font);
  color = color_validate(color, "#000000");
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 1;
    strand = anchor.strand;
  }
  // attributes
  const x = ((leftEndPosition - dna.leftEndPosition) * dna.widthActive) / dna.size;
  let terminator_width = ((rightEndPosition - leftEndPosition) * dna.widthActive) / dna.size;
  //scale
  const proportion = terminator_dp.height / 40;
  //body attributes
  let bodyHeight = proportion * 3 + separation;
  let bodyFootH = proportion / 4;
  let bodyFootW = 0;
  if (terminator_width >= proportion) {
    bodyFootW = terminator_width / 2 - proportion / 3;
  }

  let posX = x + dna.x;
  let posY = dna.y - bodyHeight - bodyFootH;
  //Head attributes
  let headH = proportion;
  let terminatorH = bodyHeight + headH;
  let headScale = () => {
    return (proportion * 33) / 25 / 33;
  };
  let headWidth = () => {
    return 35 - ((25 - proportion) * 8) / 10;
  };
  let headHeight = () => {
    return 35 - ((25 - proportion) * 8) / 10;
  };
  // draw BODY
  const body = canva.path(
    "M 0,0 v " +
      bodyHeight +
      " h -" +
      bodyFootW +
      " v " +
      bodyFootH +
      " h " +
      terminator_width +
      " v -" +
      bodyFootH +
      " h -" +
      bodyFootW +
      " v " +
      -bodyHeight
  );
  body.move(posX, posY);
  body.attr({
    "fill-opacity": 0
  });
  body.stroke(stroke);
  body.opacity(opacity);
  // draw HEAD
  var head = canva.path(
    "M 23.2 28 L 23.2 27.1 A 14.7 14.7 0 0 0 30 14.7 A 14.7 14.7 0 0 0 15.2 0 L 15.2 0 A 14.7 14.7 0 0 0 0.5 14.7 A 14.7 14.7 0 0 0 7.2 27.1 L 7.2 28"
  );
  let headX = dna.x + x + terminator_width / 2 - headWidth() / 2;
  let headY = dna.y - bodyHeight - headHeight();
  head.move(headX + 1, headY + 1);
  head.transform({
    scale: headScale()
  });
  //head.fill(color);
  head.attr({
    "fill-opacity": 0
  });
  head.stroke(stroke);
  head.opacity(opacity);
  var group = canva.group();
  group.add(body);
  group.add(head);
  //text
  const text = label({
    canvas: canva,
    x: headX,
    y: headY - font.size,
    text: labelName,
    font: font
  });
  // reverse effect
  if (strand === "reverse") {
    group.move(dna.x + x, dna.y);
    group.transform({
      rotate: 180
    });
    text.transform({
      translateY: (bodyHeight + bodyFootH + 30) * 2
    });
  }
  //Actions
  if (onClick) {
   group.attr({
      cursor: "pointer"
    })
   group.click(onClick);
  }
  //tooltip
  group.attr({
    "data-tip": "",
    "data-for": `"${canva.node?.id}-${id}"`
  });

  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    terminator_width: terminator_width,
    height: terminatorH,
    dna: dna,
    separation: separation,
    leftEndPosition: leftEndPosition,
    rightEndPosition: rightEndPosition,
    labelName: labelName,
    strand: strand,
    color: color,
    opacity: color,
    stroke: stroke,
    font: font,
    objectType: "terminator",
    tooltip: tooltip
  };
}
