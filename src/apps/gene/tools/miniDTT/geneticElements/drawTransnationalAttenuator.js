// TransAtt 0.9.0
/**
 *
 *Falta testear
 */
export default function DrawTransnationalAttenuator({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  posLeft = 0,
  posRigth = 10,
  name = "geneName",
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
    posRigth = posLeft + 1;
    strand = anchor.strand;
  }
  // atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    size = posRigth - posLeft,
    widthActive = dna.widthActive,
    dnaSize = dna.Size,
    x = ((posLeft - dna.posLeft) * widthActive) / dnaSize;
  let sizeP = (size * widthActive) / dnaSize;
  //escala
  let heigthActive = dna.forwardActive;
  if (strand === "reverse") {
    heigthActive = dna.reverseActive;
  }
  const proportion = heigthActive * 0.1;
  //atributos de Cuerpo
  let bodyHeigth = proportion * 3 + separation;
  let bodyFootH = proportion / 4;
  let bodyFootW = 0;
  if (sizeP >= proportion) {
    bodyFootW = sizeP / 2 - proportion / 3;
  }
  let bodyX = x + dnaX;
  let bodyY = dnaY - bodyHeigth - bodyFootH;
  //atributos de Cabeza
  let headH = proportion;
  let headX = dnaX + x + sizeP / 2 - headH / 2;
  let headY = dnaY - bodyHeigth - headH;
  // atributos del rectangulo
  let rectWidth = proportion / 2;
  let rectHeigth = proportion * 2;
  let rectX = dnaX + x + sizeP - bodyFootW;
  let rectY = dnaY - bodyHeigth;
  let posX = x;
  let posY = headY;
  let traH = headH + bodyHeigth;
  // anchor effect
  if (anchor) {
  }
  // dibujo de  BODY
  const body = canva.path(
    "M 0,0 v " +
      bodyHeigth +
      " h -" +
      bodyFootW +
      " v " +
      bodyFootH +
      " h " +
      sizeP +
      " v -" +
      bodyFootH +
      " h -" +
      bodyFootW +
      " v " +
      -bodyHeigth
  );
  body.fill(color).move(bodyX, bodyY);
  body.stroke(stroke);
  body.opacity(opacity);
  // dibujo de HEAD
  const head = canva.circle(headH);
  head.fill(color).move(headX, headY);
  head.stroke(stroke);
  head.opacity(opacity);
  // dibujo de RECT
  const rect = canva.rect(rectWidth, rectHeigth);
  rect.fill(color).move(rectX, rectY);
  rect.stroke(stroke);
  // reverse effect
  let group = canva.group();
  group.add(body);
  group.add(head);
  group.add(rect);
  if (strand === "reverse") {
    group.transform({
      rotate: 180,
      translateY: bodyHeigth + headH,
      translateX: -sizeP / 2
    });
  }
  //returns :C
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: traH,
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
