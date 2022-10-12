import { Track } from "../../../components/GeneticElementsGraphicLibrary";

const idDiv ="embed_dtt_draw"
const canvaId = "embed_canva_dtt"

export function DrawingTE (height=200,width=800,_leftEndPosition, _rightEndPosition, geneticElements) {
    let drawPlace = document.getElementById(idDiv);
    if (drawPlace) {
      if (geneticElements) {
        const drawGenes = new Track({
          id: idDiv,
          canva_id: canvaId,
          width: width,
          height: height,
        });
        drawGenes.draw(
          geneticElements,
          _leftEndPosition,
          _rightEndPosition
        );
      }
    }
  }