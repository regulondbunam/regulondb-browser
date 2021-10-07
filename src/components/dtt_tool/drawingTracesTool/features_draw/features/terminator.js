// Terminador 0.10.0
/**
 * Falta testear
 * head de la figura se sale de posicion
 */
import {
    stroke_validate,
    font_validate,
    color_validate
} from "../../validation/v_draw";

export default function DrawTerminador({
    id,
    canvas,
    anchor,
    dna,
    separation = 20,
    leftEndPosition = 10,
    rightEndPosition = 50,
    labelName = "Name",
    strand = "forward",
    color = "aqua",
    opacity = 1,
    stroke,
    font,
    tooltip = "",
    conf
}) {
    if (!canvas || !dna || !id || !conf || (leftEndPosition > rightEndPosition)) {
        return null;
    }
    stroke = stroke_validate(stroke, conf.stroke);
    font = font_validate(font, conf.font);
    color = color_validate(color, "#000000");
    if (anchor) {
        leftEndPosition = anchor.leftEndPosition;
        rightEndPosition = leftEndPosition + 1;
        strand = anchor.strand;
    }
    // atributos
    const dnaX = dna.x,
        dnaY = dna.y,
        size = rightEndPosition - leftEndPosition,
        widthActive = dna.widthActive,
        dnaSize = dna.size,
        x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize;
    let sizeP = (size * widthActive) / dnaSize;
    //scale
    const proportion = conf.height / 40;
    let posX = x + dnaX;
    let posY = dnaY;
    //dibujo del Cuerpo
    let height_feet = -5 * proportion;//r
    let width_feet = ((sizeP / 2) - 3) * -1
    if (sizeP < 4) {
        width_feet = (sizeP / 3) * -1;
    }
    let height_body = ((1 * proportion) + separation) * -1//r
    let curve = "c 14 0 14 -20 -4 -20 c -14 0 -15 20 -1 20"
    if(strand === "reverse"){
        curve = "c 14 0 14 20 -4 20 c -15 0 -15 -20 -1 -20"
        height_feet = height_feet*-1
        height_body = height_body*-1
    }
    const feet_left = canvas.path(
        `m ${posX} ${posY} l 0 ${height_feet} l ${-1*width_feet} 0`
    ).opacity(opacity)
    const feet_right = canvas.path(
        `m ${posX+sizeP} ${posY} l 0 ${height_feet} l ${width_feet} 0`
    ).opacity(opacity)
    const body_left = canvas.line(posX+(-1*width_feet),posY+(height_feet),posX+(-1*width_feet),posY+(height_body)).opacity(opacity)
    const body_right = canvas.line(posX+sizeP-(-1*width_feet),posY+(height_feet),posX+sizeP-(-1*width_feet),posY+(height_body)).opacity(opacity)
    const head = canvas.path(
        `m ${posX+sizeP-(-1*width_feet)} ${posY+(height_body)} l 0 1 ${curve}`
    ).opacity(opacity)
    canvas.rect(30,25).fill("none").id(id+"/s").move(posX-10,posY+height_body+height_feet)
    const term = canvas.group()
    term.add(feet_left)
    term.add(feet_right)
    term.add(body_left)
    term.add(body_right)
    term.add(head)


    /*const terminator_canva = canvas.path(
        `m ${posX} ${posY} l ${sizeP} 0 l 0 ${height_feet} l ${width_feet} 0 l 0 ${height_body} ${curve} l 0 ${-1*height_body} L ${posX} ${posY+height_feet} z`
    )*/
    term.fill("none").stroke(stroke);
    head.id(id)

    //tooltip data
    term.attr({
        "data-tip": "",
        "data-for": `${canvas.node?.id}-${id}`
    });
    return {
        id: id,
        canva: canvas,
        draw: head,
        body_left: body_left,
        body_right: body_right,
        posX: posX,
        posY: posY,
        sizeP: sizeP,
        height: 10,
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
