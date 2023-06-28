import React, { useState } from "react";
import Cursor from "./resources/cursorIcon.png";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from '@mui/icons-material/Close';
import "./phrases.css";

let phrases = [
  "This is a test phrase 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar tincidunt neque vitae bibendum. Fusce molestie turpis nec nisl maximus faucibus. Aliquam erat volutpat. Maecenas nunc dolor, posuere eu felis eget, maximus suscipit mauris. Proin placerat sit amet arcu a tempus. Morbi venenatis sapien ut malesuada accumsan. Nulla et sapien arcu. Nulla aliquet sem eu lacinia aliquam. Suspendisse efficitur malesuada purus, vitae commodo sem ultricies id.",
  "This is a test phrase 2... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar tincidunt neque vitae bibendum. Fusce molestie turpis nec nisl maximus faucibus. Aliquam erat volutpat. ",
  "This is a test phrase 3... Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
];

let phraseData = [
  {
    phraseId: "001",
    phrase: phrases[0],
    pmid: "123456789",
  },
  {
    phraseId: "002",
    phrase: phrases[1],
    pmid: "123456789",
  },
  {
    phraseId: "003",
    phrase: phrases[2],
    pmid: "123456789",
  },
];

export default function Phrase({ data }) {
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
