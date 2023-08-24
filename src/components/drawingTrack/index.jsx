//import React, { useReducer } from 'react';
/*
import StraightenIcon from '@mui/icons-material/Straighten';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Tooltip from "@mui/material/Tooltip";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import html2canvas from 'html2canvas';
import ContentCopy from '@mui/icons-material/ContentCopy';

*/

import { useEffect, useId, useState } from "react";
import Track from "./track";
import { DataVerifier } from "../ui-components";

function drawTrack({
  bpWidth,
  canva,
  drawPlaceId,
  features,
  height,
  idTrack,
  width,
}) {
  if (document.getElementById(drawPlaceId) && canva === null) {
    const track = new Track(idTrack, drawPlaceId, width, height, bpWidth);
    if (track.draw()) {
      if (DataVerifier.isValidArray(features)) {
        features.forEach((feature) => {
          switch (feature.type) {
            case "box":
                track.setBox({...feature})
                break
            case "sequence":
              track.setSequence({ ...feature });
              break;
            case "promoter":
              track.setPromoter({ ...feature });
              break;
            default:
              console.error("Unknown feature type:" + feature.type);
              break;
          }
        });
      }
    }
  }
}

export default function SimpleTrack({
  drawPlaceId,
  color = false,
  features = [],
  height = 30,
  width = 100,
  bpWidth = 8,
  measure = false,
  name = "track",
  controls = true,
  zoom = 1,
}) {
  // se podra hacer la altura dinamica con un use state de la altura modificado desde las features recibidas
  const idTrack = useId();
  useEffect(() => {
    const canva = document.getElementById(idTrack);
    drawTrack({
      canva: canva,
      idTrack: idTrack,
      drawPlaceId: drawPlaceId,
      width: width,
      height: height,
      bpWidth: bpWidth,
      features: features,
    });
  }, [idTrack, drawPlaceId, width, height, bpWidth, features]);

  return (
    <div>
      <div id={drawPlaceId} style={{ width: width, height: height }}></div>
      <button
        onClick={() => {
          const canva = document.getElementById(idTrack);
          if (canva) {
            canva.remove();

            drawTrack({
              canva: null,
              idTrack: idTrack,
              drawPlaceId: drawPlaceId,
              width: width,
              height: height,
              bpWidth: bpWidth,
              features: features,
            });
          }
        }}
      >
        redraw
      </button>
    </div>
  );
}
