//DrawOperon v 0.9.0
/**
 *falta testear
 */

export default function DrawOperon({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  posLeft = 0,
  posRigth = 10,
  name = "operonName",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke = { color: "#000", width: 1, linecap: "round" }
}) {
  if (!canva || !dna || !id || posLeft > posRigth) {
    return null;
  }
  if (anchor) {
    posLeft = anchor.posLeft;
    posRigth = posLeft + 10;
  }
  //atributos
  const dnaX = dna.x,
    size = posRigth - posLeft,
    dnaY = dna.y,
    widthActive = dna.widthActive,
    dnaSize = dna.Size,
    x = ((posLeft - dna.posLeft) * widthActive) / dnaSize;
  let sizeP = (size * widthActive) / dnaSize;
  // scale
  let heigthActive = dna.forwardActive;
  if (strand === "reverse") {
    heigthActive = dna.reverseActive;
  }
  const proportion = heigthActive * 0.1;
  //atributos de cuerpo
  const operonH = proportion;
  const rowW = () => {
    if (heigthActive * 0.5 > sizeP) {
      return sizeP * 0.1;
    }
    return heigthActive * 0.1;
  };
  const lx1 = sizeP + dnaX + x;
  const ly1 = operonH;
  const lx2 = sizeP + dnaX - rowW() + x;
  let posX = x + dnaX;
  let posY = dnaY - separation - operonH;
  //Draw operon
  const operon = canva.path(
    " m " +
      (x + dnaX) +
      "," +
      operonH / 2 +
      " v " +
      operonH +
      " h " +
      (sizeP - rowW()) +
      " L " +
      lx1 +
      "," +
      ly1 +
      " " +
      lx2 +
      "," +
      operonH / 2 +
      " z"
  );
  operon.move(posX, posY);
  operon.id(id);
  operon.fill(color);
  operon.stroke(stroke);
  operon.opacity(opacity);
  // reverse effect
  if (strand === "reverse") {
    if (anchor) {
      posX = x + dnaX;
      posY = dnaY + separation;
    }
    operon.transform({
      rotate: 180,
      translateY: operonH
    });
    //posY = operonH * 2 + posY;
  }
  //return
  return {
    id: id,
    canva: canva,
    draw: operon,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: operonH,
    dna: dna,
    separation: separation,
    posLeft: posLeft,
    posRigth: posRigth,
    name: name,
    strand: strand,
    color: color,
    opacity: color,
    stroke: stroke
  };
}
