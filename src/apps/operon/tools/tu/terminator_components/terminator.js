export default function DrawTerminador({
    id,
    canva,
    posX,
    posY,
    bodyHeigth,
    bodyFootH,
    bodyFootW,
    size,
    strand
  }) {
    if (!canva) {
      return null;
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
        size +
        " v -" +
        bodyFootH +
        " h -" +
        bodyFootW +
        " v " +
        -bodyHeigth
    );
    body.move(posX, posY);
    body.attr({
      "fill-opacity": 0
    });
    body.stroke( { color: "#000", "width": 2, "linecap": "round" });

    // dibujo de HEAD
    var head = canva.path(
      "M 23.2 28 L 23.2 27.1 A 14.7 14.7 0 0 0 30 14.7 A 14.7 14.7 0 0 0 15.2 0 L 15.2 0 A 14.7 14.7 0 0 0 0.5 14.7 A 14.7 14.7 0 0 0 7.2 27.1 L 7.2 28"
    );
    let headX = posX + bodyFootW - 11;
    let headY = 0 - 5;
    head.move(headX + 1, headY + 1);
    head.transform({
      scale: (15 * 33) / 25 / 33
    });
    //head.fill(color);
    head.attr({
      "fill-opacity": 0
    });
    head.stroke({ color: "#000", "width": 3, "linecap": "round" });
    var group = canva.group();
    group.add(body);
    group.add(head);
    // reverse effect
    if (strand === "reverse") {
      group.move(posX, posY);
      group.transform({
        rotate: 180
      });
    }
  
    return {
      canva: canva,
      draw: group,
      posX: posX,
      posY: posY,
      strand: strand,
      objectType: "terminator",
    };
  }
  