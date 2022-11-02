import React, { useState, useEffect } from "react";
import { Cover } from "../../components/ui-components";

const IDTitle = "title_cover_sigmulonTool";
const eventName = "cover_sigmulonTool_event";

export function UpdateTitle({ state, title, message, sigmulonToken }) {
  let detail = {};
  if (state) {
    detail.state = state;
  }
  if (title) {
    detail.title = title;
  }
  if (message) {
    detail.message = message;
  }
  if (sigmulonToken) {
    detail.sigmulonToken = sigmulonToken;
  }

  const COVER = document.getElementById(IDTitle);
  if (COVER) {
    const COVER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    COVER.dispatchEvent(COVER_REACTION);
  }
}

export const Title = ({ title }) => {
  const [_state, set_state] = useState();
  const [sigmulonToken, set_sigmulonToken] = useState();
  const [_title, set_title] = useState(title);
  const [_message, set_message] = useState();

  useEffect(() => {
    const cover = document.getElementById(IDTitle);
    if (cover) {
      cover.addEventListener(
        eventName,
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.state) {
            set_state(e.detail.state);
          }
          if (e.detail.title) {
            set_title(e.detail.title);
          }
          if (e.detail.message) {
            set_message(e.detail.message);
          }
          if (e.detail.sigmulonToken) {
            set_sigmulonToken(e.detail.sigmulonToken);
          }
        },
        false
      );
    }
  }, []);
  //if (!sigmulonToken) {
    return (
      <div id={IDTitle} >
        <Cover state={_state} message={_message}>
          <h1>{_title}</h1>
        </Cover>
      </div>
    );
  //}
  /*
  const {
    id,
    name,
    regulationPositions,
    strand,
    statistics
  } = sigmulonToken;
  let row = "->";
  strand === "reverse" && (row = "<-");
  //console.log(sigmulonToken);
  return(
    <div id={IDTitle} >
      <Cover state={_state} message={_message}>
          sigmulon
          <p style={{fontSize: "10px"}} >{id}</p>
          <h1>{name}</h1>
          
          <p>{`${regulationPositions.leftEndPosition} ${row} ${regulationPositions.rightEndPosition}`}</p>
          <div className="cover_statistics" >
            <div className="stt_box stt_gene">
              <p>Genes</p>
              <p>{statistics?.genes}</p>
            </div>
            <div className="stt_box stt_promoter">
              <p>Promoters</p>
              <p>{statistics?.promoters}</p>
            </div>
            <div className="stt_box stt_tu">
              <p>Transcription Unit</p>
              <p>{statistics?.transcriptionUnits}</p>
            </div>
          </div>
        </Cover>
    </div>
  )
  */
};

export default Title;

