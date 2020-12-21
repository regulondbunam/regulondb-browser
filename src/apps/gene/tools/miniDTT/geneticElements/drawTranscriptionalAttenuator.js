// TranscripAtt 0.1.0
/**
 * Falta testear
 */
export default function DrawTransncriptionalAttenuator({
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
  // scale
  let heigthActive = dna.forwardActive;
  if (strand === "reverse") {
    heigthActive = dna.reverseActive;
  }
  const proportion = heigthActive * 0.1;
  // atributos de Cuerpo
  let bodyHeigth = proportion * 2 + separation;
  let bodyFootH = proportion / 4;
  let bodyFootW = 0;
  if (sizeP >= proportion) {
    bodyFootW = sizeP / 2 - 6 - proportion / 3;
  }
  let bodyX = x + dnaX;
  let bodyY = dnaY - bodyHeigth - bodyFootH;
  // atributos de Cabezas
  let headH = proportion;
  let headX = dnaX + x + sizeP / 2 - headH / 2 - 8;
  let headY = dnaY - separation - 100;
  // atributos de la linea
  let lineX = x + dnaX + sizeP / 2;
  let lineY = dnaY - bodyHeigth + 5;

  let posX = x;
  let posY = headY;
  let transcriH = headH + bodyHeigth;
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
  // dibujo de HEAD's
  var head1 = canva.path(
    "m 25 55 c -11.9 -9.5 -5 -23 1.6 -25. l 0.0 -1.7 C 30 24.6 33.4 20 33.4 15 C 33.4 6.8 26.8 0.2 18.6 0.2 v 0 C 10.5 0.250109 3.90831 6.8556 3.9082 15.0039 C 3.91361 20.0093 5.7943 24.6707 10 27.3848 v 0.865234 v 26.75"
  );
  var head2 = canva.path(
    "m 60 110 v 0 c 3.5 -2.4 5.7 -6.6 5.7 -11.1 c -0.09 -7.3 -5.6 -13.2 -12.5 -13.2 v 0 c -6.91559 0.0001 -12.5218 5.94519 -12.5219 13.2788 c 0.0046 4.50501 2.1627 8.70032 5.73214 11.1431 v 0.0122"
  );
  let head = canva.group();
  head.add(head1);
  head.add(head2);
  head.fill(color).stroke(stroke);
  head.move(headX, headY);

  // dibujo de LINE
  var line = canva.path("m 0 5 V" + bodyHeigth + "");
  line.stroke(stroke).move(lineX, lineY);

  // reverse effect
  if (strand === "reverse") {
    var group = canva.group();
    group.add(body);
    group.add(head);
    group.add(line);
    group.transform({
      rotate: 180,
      translateY: bodyHeigth + headH * 2
    });
  }
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: transcriH,
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
