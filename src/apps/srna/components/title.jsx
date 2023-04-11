import React, { useState, useEffect } from "react";
import { Cover } from "../../../components/ui-components";
import "./title.css"

export const IDTitle = "title_cover_srnaTool";
const eventName = "cover_srnaTool_event";

export function UpdateTitle({ state, title, message, srnaToken }) {
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
  if (srnaToken) {
    detail.srnaToken = srnaToken;
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
  const [srnaToken, set_srnaToken] = useState();
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
          if (e.detail.srnaToken) {
            set_srnaToken(e.detail.srnaToken);
          }
        },
        false
      );
    }
  }, []);

  if (!srnaToken) {
    return (
      <div id={IDTitle} >
        <Cover state={_state} message={_message}>
          <h1 style={{margin: "0px", padding: "10px 0px 10px 0px"}} >{_title}</h1>
        </Cover>
      </div>
    );
  }
/*
  const {
    _id,
    sigmaFactor,
    statistics
  } = srnaToken;
  //console.log(srnaToken);
  return (
    <div id={IDTitle} >
      <Cover state={_state} message={_message}>
        srna
        <p style={{ fontSize: "10px" }} >{_id}</p>
        <h1>{sigmaFactor.name}</h1>
        <div className="cover_statistics" >
          {
            Object.keys(statistics).map((key) => {
              if(key !== "__typename"){
                return (
                  <div key={"statistic_"+key} className="stt_box stt_gene">
                    <p>{key}</p>
                    <p>{statistics[key]}</p>
                  </div>
                )
              }
              return null
            })
          }
        </div>
      </Cover>
    </div>
  )*/
  return <></>
};

export default Title;

