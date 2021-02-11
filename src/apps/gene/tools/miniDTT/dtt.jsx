import React from "react";
import Finder from "./finder";
import Canvas from "./Canvas";
const DTT = ({ posLeft, posRight, id_drawPlace, idCanvas, gene_data }) => {
  const Elements = Finder(posLeft, posRight, gene_data);
  console.log(Elements);
  if (Elements) {
    return (
      <Canvas
        geneticElements={Elements}
        idCanvas={idCanvas}
        idElement={id_drawPlace}
        dnaPosL={posLeft}
        dnaPosR={posRight}
      />
    );
  }
  return null;
};

export default DTT;
