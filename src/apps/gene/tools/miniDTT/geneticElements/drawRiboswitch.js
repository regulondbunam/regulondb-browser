/** RiboSwitch 0.9.1
 *
 * Falta testear
 *
 */
export default function DrawRiboswitch({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  posLeft = 0,
  posRigth = 10,
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
  //scale
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
  let bodyY = dnaY - bodyHeigth - bodyFootH + 9;
  //atributos de Cabeza
  let headH = proportion;
  let headX = dnaX + x + sizeP / 2 - 34;
  let headY = dnaY - bodyHeigth - headH;
  let riboH = bodyHeigth + headH;
  let posX = x;
  let posY = headY;
  // dibujo de  BODY
  const body = canva.path(
    "M 0,0 v " +
      bodyHeigth +
      " h -" +
      (bodyFootW - 1) +
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
  var head = canva.path(
    "M 0,0 v 0 c 3.92467,-2.58104 6.63901,-6.13644 7.20008,-10.80012 l 9.14425,-4.37876 c 1.42935,0.40589 2.95449,0.31099 4.3225,-0.26895 3.31023,-1.40895 4.85186,-5.23431 3.44359,-8.54482 -1.40895,-3.31119 -5.23558,-4.85302 -8.54657,-3.44359 -1.56071,0.66486 -2.80056,1.91226 -3.45591,3.47699 l -7.00846,3.09906 c -2.82997,-4.98758 -8.11898,-8.07267 -13.85349,-8.08076 v 0 c -5.97645,0.006 -11.44813,3.35249 -14.17691,8.66963 l -6.84675,-3.04808 c -0.0709,-0.24923 -0.15661,-0.494 -0.25664,-0.73302 -1.40897,-3.31022 -5.23432,-4.85185 -8.54483,-3.44359 -3.31119,1.40895 -4.85303,5.23559 -3.44359,8.54658 1.25369,2.93501 4.44902,4.5297 7.54813,3.76703 l 9.27431,4.38228 c 0.61115,4.33052 3.63944,8.26071 7.20009,10.80012"
  );
  head.fill(color).move(headX, headY);
  head.stroke(stroke);
  head.opacity(opacity);

  // reverse effect
  if (strand === "reverse") {
    if (anchor) {
      posX = x + dnaX;
      posY = dnaY + separation;
    }
    var group = canva.group();
    group.add(body);
    group.add(head);
    group.transform({
      rotate: 180,
      translateY: bodyHeigth + headH
    });
  }
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: riboH,
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
