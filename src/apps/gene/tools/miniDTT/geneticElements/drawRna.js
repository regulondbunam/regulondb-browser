//Draw RNA v 0.3.0
/**
 * revisar reverse (la separación la hace alrevés)
 */

export default function DrawRna({
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
  //atributos de rectangulo
  let rnaH = sizeP;
  let rnaW = sizeP / 3;
  let posX = x + dnaX;
  let posY = dnaY - separation - rnaW * 2;

  //atributos de lineas
  let l = x + dnaX + sizeP;
  let i = l - sizeP / 5;
  let n = i - sizeP / 5;
  let e = n - sizeP / 5;
  let s = e - sizeP / 5;
  let p = s - sizeP / 5;
  //let posY = dnaY - separation - rnaW;

  //Draw rect
  let rna = canva.rect(rnaH, rnaW);
  rna.move(posX, posY);
  rna.stroke(stroke);
  rna.fill(color);
  //Draw lines
  var line1 = canva
    .line(l, 0, l, rnaW)
    .stroke(stroke)
    .move(l, posY + rnaW);
  var line2 = canva
    .line(i, 0, i, rnaW)
    .stroke(stroke)
    .move(i, posY + rnaW);
  var line3 = canva
    .line(n, 0, n, rnaW)
    .stroke(stroke)
    .move(n, posY + rnaW);
  var line4 = canva
    .line(e, 0, e, rnaW)
    .stroke(stroke)
    .move(e, posY + rnaW);
  var line5 = canva
    .line(s, 0, s, rnaW)
    .stroke(stroke)
    .move(s, posY + rnaW);
  var line6 = canva
    .line(p, 0, p, rnaW)
    .stroke(stroke)
    .move(p, posY + rnaW);

  var group = canva.group();
  group.add(rna);
  group.add(line1);
  group.add(line2);
  group.add(line3);
  group.add(line4);
  group.add(line5);
  group.add(line6);
  if (strand === "reverse") {
    group.rotate(180);
    group.move(posX, posY - rnaW * 2);
  }
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: rnaH,
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
