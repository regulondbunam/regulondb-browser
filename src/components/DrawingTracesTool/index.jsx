import React, { useState, useEffect } from "react";
import Controls from "./controls";
//import Style from "./dtt.module.css";
import { useNavigate } from "react-router-dom";
import WebServices from "../webservices/WebServices";
import { Track } from "../GeneticElementsGraphicLibrary";




const DrawingTracesTool = ({
  id,
  height = 200,
  context = "DNA",
  leftEndPosition,
  rightEndPosition,
  fragments,
  custom_geneticElements,
}) => {
  console.log("fragments",fragments);
  const [_expand, set_expand] = useState(false);
  const [_geneticElements, set_geneticElements] = useState();
  //const [_state, set_state] = useState();
  const [_posLeft, set_posLeft] = useState(leftEndPosition);
  const [_posRight, set_posRight] = useState(rightEndPosition);
  let navigate = useNavigate();

  let drawPlaceId = `divCanvas_${context}Context${id}`;
  let drawPlaceName = `${context}_${id}`;
  let canvaId = `canvaGE_${id}`;
  let move = parseInt(`${(_posRight - _posLeft) * 0.15}`, 10);
  let zoom = parseInt(`${(_posRight - _posLeft) * 0.25}`, 10);
  let variables = {
    leftEndPosition: !_expand ? (_posLeft-1000) : _posLeft,
    rightEndPosition: !_expand ? (_posRight+1000) : _posRight,
  };
  //console.log(_expand,variables.leftEndPosition+","+variables.rightEndPosition);
  useEffect(() => {
    let drawPlace = document.getElementById(`divCanvas_${context}Context${id}`);
    if (drawPlace) {
      if (_geneticElements) {
        let width = drawPlace.clientWidth;
        let height = 200;
        const drawGenes = new Track({
          id: drawPlaceId,
          canva_id: canvaId,
          width: width,
          height: height,
        });
        //console.log(_geneticElements);
        let A = [];
        if (context === "gene") {
          _geneticElements.forEach((element) => {
            let a = { ...element };
            if (element.objectType === "gene") {
              a.onClick = () => {
                navigate("/gene/" + element._id, { replace: false });
              };
            }
            A.push(a);
          });
        } else {
          A = _geneticElements;
        }

        drawGenes.draw(A, variables.leftEndPosition, variables.rightEndPosition);
        /*setTimeout(function () {
          set_geneticElements(undefined);
          set_posLeft(_posLeft - move);
          set_posRight(_posRight - move);
        }, 100);*/
      }
    }
  }, [
    context,
    canvaId,
    id,
    move,
    navigate,
    _geneticElements,
    drawPlaceId,
    _posLeft,
    _posRight,
  ]);


  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <Controls 
                setGeneticElements={(ge)=>{set_geneticElements(ge)}}
                move={move}
                posLeft={_posLeft}
                setPosLeft={(left)=>{set_posLeft(left)}}
                setPosRight={(right)=>{set_posRight(right)}}
                posRight={_posRight}
                setExpand={(isEx)=>{set_expand(isEx)}}
                zoom={zoom}
                expand={_expand}
                context={context}
                leftEndPosition={leftEndPosition}
                rightEndPosition={rightEndPosition}
                drawPlaceId={drawPlaceId}
                canvaId={canvaId}
                drawPlaceName={drawPlaceName}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {!_geneticElements && (
                <WebServices
                  datamart_name="getGeneticElementsFromInterval"
                  variables={variables}
                  getData={(data) => {
                    set_geneticElements(data.GE);
                  }}
                />
              )}
              <div
                style={{ height: `${height}px`, width: "100%" }}
                id={drawPlaceId}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DrawingTracesTool;



/**


              
              
              
 * 
 * <div
            style={{
                position: "absolute",
                top: "329px",
                left: "1200px"
            }}
            >
                <img src="https://i.imgur.com/XJQeaix.gif" 
                alt="caminar" height="100px" width="100px" 
                className="camino"
                />
            </div>
 */
