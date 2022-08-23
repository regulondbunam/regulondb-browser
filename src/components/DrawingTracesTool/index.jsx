import React, { useState, useEffect } from "react";
import Style from "./dtt.module.css";
import { useNavigate } from "react-router-dom";
import WebServices from "../webservices/WebServices";
import { Track } from "../GeneticElementsGraphicLibrary";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { ReImg } from "reimg";

const DrawingTracesTool = ({
  id,
  height = 200,
  context = "DNA",
  leftEndPosition,
  rightEndPosition,
  custom_geneticElements,
}) => {
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
    leftEndPosition: _posLeft,
    rightEndPosition: _posRight,
  };

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

        drawGenes.draw(A, _posLeft, _posRight);
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


  let aviso = "The Drawing Traces Tool is still under development so some elements may not be displayed properly, please if you detect any problem download the generated image and report it in the User Feedback section. "

  return (
    <div>
      <div style={{ position: "absolute" }}>
        <h2 style={{ fontSize: "10px", float: "left" }}>Drawing Traces Tool</h2>
        <Tooltip title={aviso}>
          <WarningAmberIcon fontSize="small" color="warning" />
        </Tooltip>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>
              <button
                className={Style.iconButton}
                onClick={() => {
                  set_geneticElements(undefined);
                  set_posLeft(_posLeft - move);
                  set_posRight(_posRight - move);
                }}
              >
                <ArrowLeftIcon sx={{ color: "white" }} />
              </button>
              <button
                className={Style.iconButton}
                onClick={() => {
                  set_geneticElements(undefined);
                  set_expand(true);
                  set_posLeft(_posLeft + zoom);
                  set_posRight(_posRight - zoom);
                }}
              >
                <ZoomInIcon sx={{ color: "white" }} />
              </button>
              <button
                className={Style.iconButton}
                onClick={() => {
                  set_geneticElements(undefined);
                  set_posLeft(_posLeft - zoom);
                  set_posRight(_posRight + zoom);
                }}
              >
                <ZoomOutIcon sx={{ color: "white" }} />
              </button>
              <button
                className={Style.iconButton}
                onClick={() => {
                  set_geneticElements(undefined);
                  set_posLeft(_posLeft + move);
                  set_posRight(_posRight + move);
                }}
              >
                <ArrowRightIcon sx={{ color: "white" }} />
              </button>
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
          <tr>
            <td style={{ textAlign: "center" }}>
              {context === "gene" ? (
                <button
                  className="iconButton"
                  onClick={() => {
                    set_geneticElements(undefined);
                    set_expand(!_expand);
                    if (!_expand) {
                      set_posLeft(leftEndPosition - 500);
                      set_posRight(rightEndPosition);
                    } else {
                      set_posLeft(leftEndPosition);
                      set_posRight(rightEndPosition);
                    }
                  }}
                >
                  {!_expand ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
                </button>
              ) : null}
              <button
                className="iconButton"
                onClick={() => {
                  set_geneticElements(undefined);
                  set_posLeft(leftEndPosition);
                  set_posRight(rightEndPosition);
                }}
              >
                <RestartAltIcon sx={{ color: "white" }} />
              </button>
              <DownloadOptions
                drawPlaceId={drawPlaceId}
                canvaId={canvaId}
                name={drawPlaceName}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DrawingTracesTool;

function DownloadOptions({ drawPlaceId, canvaId, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _downloadPNG = () => {
    let svg = document.getElementById(canvaId);
    ReImg.fromSvg(svg).toCanvas(function (canvas) {
      let url = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.download = name + ".png";
      link.href = url;
      link.click();
    });
  };

  const _downloadSVG = () => {
    const svg = document.getElementById(drawPlaceId).innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = name + ".svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  };

  return (
    <React.Fragment>
      <button className="iconButton" onClick={handleClick}>
        <FileDownloadIcon sx={{ color: "white" }} />
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={_downloadPNG}>
          <ImageIcon /> PNG file
        </MenuItem>
        <MenuItem onClick={_downloadSVG}>
          <LandscapeIcon /> SVG file
        </MenuItem>
        <Divider />
        <MenuItem onClick={_downloadSVG}>Data JSON</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

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
