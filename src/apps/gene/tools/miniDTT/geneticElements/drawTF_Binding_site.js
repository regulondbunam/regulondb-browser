//Draw Sites v 0.2.0
/**
 * Falta testear
 */
export default function DrawTFBindingSite({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  posLeft = 0,
  posRigth = 10,
  name = "Name",
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
  let tfH = proportion;
  let tfW = proportion / 2;
  let posX = x + dnaX;
  let posY = dnaY - separation - tfW;
  //Draw SITES
  let tf_binding = canva.rect(tfH, tfW);
  tf_binding.move(posX, posY).stroke(stroke).fill(color);
  //Text properties
  const textP = canva.text("tf_binding");
  textP
    .font({
      family: "Arial",
      size: proportion / 5,
      separation: "middle"
    })
    .move(posX + tfH / 10, posY + tfW / 4);
  //group
  const group = canva.group();
  group.add(tf_binding);
  group.add(textP);

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
    heigth: tfH,
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
