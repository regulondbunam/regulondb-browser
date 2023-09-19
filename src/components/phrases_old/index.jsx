import { GetOf } from "./getOF";

export { GetOf }
/*
import React, { useState } from "react";
import Cursor from "./resources/cursorIcon.png";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from '@mui/icons-material/Close';
import "./phrases.css";



export default function PhraseOf({ objectId }) {
  const [show, set_show] = useState(false);
  const [index, set_index] = useState(0);

  let phrase = phraseData[index];

  if (!show) {
    return (
      <div
        className="phrase_base"
        style={{ cursor: `url(${Cursor}), auto` }}
        onClick={() => set_show(true)}
      />
    );
  }
  return (
    <div>
      <div className="phrases_back">
        <div className="phrasesTitle">
          <IconButton
            sx={{ width: "10px", height: "10px" }}
            aria-label="close"
            onClick={()=>{set_show(!show)}}
          >
            <CloseIcon />
          </IconButton>
          {`Phrase: ${phrase.phraseId}`}
        </div>
        <div style={{ marginLeft: "3%" }}>
          <p className="phrasesText">{phrase.phrase}</p>
          pmid:{" "}
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${phrase.pmid}`}
            className="p_accent"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "12px" }}
          >
            {phrase.pmid}
          </a>
        </div>
        {phraseData.length > 1 && (
          <Box sx={{ display: "flex", alignItems: "left", pl: 1, pb: 1 }}>
            <IconButton
              sx={{ width: "10px", height: "10px" }}
              aria-label="previous"
              onClick={() => {
                set_index(index - 1);
              }}
              disabled={index === 0}
            >
              <ArrowLeftIcon />
            </IconButton>
            <IconButton
              sx={{ width: "10px", height: "10px" }}
              aria-label="next"
              onClick={() => {
                set_index(index + 1);
              }}
              disabled={index === phraseData.length - 1}
            >
              <ArrowRightIcon />
            </IconButton>
          </Box>
        )}
      </div>
      <div className="phrases_int"></div>
    </div>
  );
}
*/