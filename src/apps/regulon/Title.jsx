import React, { useState, useEffect } from "react";
import { Cover } from "../../components/ui-components";

const IDTitle = "title_cover_regulonTool";
export {IDTitle}
const eventName = "cover_regulonTool_event";

export function UpdateTitle({ state, title, message, /*regulonToken*/ }) {
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
  /*
  if (regulonToken) {
    detail.regulonToken = regulonToken;
  }
*/
  const COVER = document.getElementById(IDTitle);
  if (COVER) {
    const COVER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    COVER.dispatchEvent(COVER_REACTION);
  }
}

export function Title({ state, title, operonData, message }){
  

  return (
    <div id={IDTitle} style={{zIndex: "9999"}} >
      <Cover state={state} message={message}>
        <h1 style={{margin: "0px", padding: "10px 0px 10px 0px"}} >{title}</h1>
      </Cover>
    </div>
  );
};

export default Title;

