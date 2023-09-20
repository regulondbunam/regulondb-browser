import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    width: 300,
    border: "1px solid #dadde9",
  },
}));

export default function IsPropertyPhrases({ property = "", propertiesPhrase }) {
  const label = property.charAt(0).toUpperCase() + property.slice(1);
  console.log(propertiesPhrase[property]);
  let phrases = propertiesPhrase[property];
  if (!phrases) {
    return <b>{label}:</b>;
  }
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <PhrasePanel phrases={phrases} />
        </React.Fragment>
      }
    >
      <Badge color="secondary" badgeContent=" " variant="dot">
        <Box>
          <b>{label}:</b>
        </Box>
      </Badge>
    </HtmlTooltip>
  );
}

function PhrasePanel({ phrases = [] }) {
  const [inx, setInx] = useState(0)
  const phrase = phrases[inx]
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "20px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d5e2ea",
        }}
      >
        <div>
          <p>
            <b>{phrases.length < 2 ? "Phrase" : "Phrases"}</b>
          </p>
        </div>
        <div>
          {phrases.length < 2 ? (
            <></>
          ) : (
            <ButtonGroup
              size="small"
              color="secondary"
              sx={{
                height: 20,
              }}
            >
              <Button onClick={() => {
                if (inx > 0) {
                  setInx(inx-1)
                }
              }}>
                <NavigateBeforeIcon />
              </Button>
              <Button onClick={() => {
                if (inx < phrases.length) {
                  setInx(inx+1)
                }
              }}>
                <NavigateNextIcon />
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
      <div>
        <p
        style={{
          fontFamily: "Times New Roman, Times, serif",
          fontStyle: "italic"
        }}
         dangerouslySetInnerHTML={{__html: phrase.phrase}} />
         <a href={"https://pubmed.ncbi.nlm.nih.gov/"+phrase.pmid} target="_blank" rel="noopener noreferrer">go to article</a>
      </div>
    </div>
  );
}
