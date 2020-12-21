// Promoter 0.2.1
/**
 * Falta testear
 */
export default function DrawPromoter({
  id,
  canva,
  anchor,
  dna,
  separation = 20,
  posLeft = 10,
  posRigth = 50,
  name = "Name",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke = { color: "#000", width: 1, linecap: "round" }
}) {
  if (!canva || !dna || !id || posLeft > posRigth) {
    return null;
  }
  //anchor
  if (anchor) {
    posLeft = anchor.posLeft;
    posRigth = posLeft + 10;
  }
  // atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    size = posRigth - posLeft,
    widthActive = dna.widthActive,
    dnaSize = dna.Size,
    x = ((posLeft - dna.posLeft) * widthActive) / dnaSize;
  let sizeP = (size * widthActive) / dnaSize;
  //scale
  let heigthActive = dna.forwardActive;
  if (strand === "reverse") {
    heigthActive = dna.reverseActive;
  }
  const proportion = heigthActive * 0.1;
  //atributos de Cuerpo
  const bodyH = proportion;
  let bodyW = proportion + separation + 50;
  let px = x + dnaX;
  let py = dnaY - bodyW;

  //atributos de Cabeza
  let headH = proportion;
  let ax = x + dnaX + bodyH - 4;
  let ay = dnaY - bodyW - 5;

  let PromH = bodyH + headH;
  let posX = x;
  let posY = ay;
  // draw body
  const body = canva.path("M 0 0 V " + -bodyW + "H " + bodyH + "v");
  body.fill("none").move(px, py);
  body.stroke(stroke);
  // draw arrow
  var arrow = canva.path("m 0,0 5,5 -5,5 v 0");
  arrow.fill("none").move(ax, ay);
  arrow.stroke(stroke);
  //anchor effect
  if (anchor) {
    posX = anchor.posX;
    posY = anchor.posY - separation - anchor.heigth;
    if (anchor.strand === "reverse") {
      posX = anchor.posX;
      posY = anchor.posY + anchor.heigth + separation;
    }
  }
  // reverse effect
  if (strand === "reverse") {
    var group = canva.group();
    group.add(body);
    group.add(arrow);
    group.transform({
      rotate: 180,
      translateX: -bodyH,
      translateY: bodyW + 5
    });
  }
  return {
    id: id,
    canva: canva,
    sizeP: sizeP,
    draw: group,
    posX: posX,
    posY: posY,
    heigth: PromH,
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
