//DrawPpGpp v 0.9.0
/**
 * falta testear
 */

export default function DrawPpGpp({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  posLeft = 0,
  posRigth = 10,
  name = "DksA",
  strand = "forward",
  color = "#fff",
  opacity = 1,
  stroke = { color: "#000", width: 1, linecap: "round" }
}) {
  if (!canva || !dna || !id | (posLeft > posRigth)) {
    return null;
  }
  // anchor effect
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
  let ppGppH = proportion;
  let ppGppW = proportion / 2;

  let posX = x + dnaX;
  let posY = dnaY - separation - ppGppW;
  //Draw
  const ppGpp = canva.ellipse(ppGppH, ppGppW);
  ppGpp.move(posX, posY).stroke(stroke).fill(color);
  const group = canva.group();
  group.add(ppGpp);
  const textP = canva.text("ppGpp");
  textP
    .font({
      family: "Arial",
      size: proportion / 5,
      separation: "middle"
    })
    .move(posX + ppGppH / 6, posY + proportion / 7);
  group.add(textP);
  //DksA effect
  if (name === "DksA") {
    const dksA = canva.ellipse(ppGppH, ppGppW);
    dksA
      .move(posX + ppGppH / 1.3, posY)
      .stroke(stroke)
      .fill(color);
    const textD = canva.text("DksA");
    textD
      .font({
        family: "Arial",
        size: proportion / 4,
        separation: "middle"
      })
      .move(posX + ppGppH, posY + proportion / 7);
    group.add(dksA);
    group.add(textD);
  }
  //strand effect
  if (strand === "reverse") {
    posY = dnaY + separation;
    group.move(posX, posY);
  }
  return {
    id: id,
    canva: canva,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: ppGppH,
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
