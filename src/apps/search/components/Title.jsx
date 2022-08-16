import React, { useState, useEffect } from "react";
import { Cover } from "../../../components/ui-components";

const IDTitle = "title_cover_searchTool"
const eventName = "cover_searchTool_event"

export function UpdateTitle( {state, title, message} ) {

  let detail = {}
  if (state) {detail.state = state}
  if (title) {detail.title = title}
  if (message) {detail.message = message}

  const COVER = document.getElementById(IDTitle);
    if (COVER) {
      const COVER_REACTION = new CustomEvent(eventName, {
        bubbles: true,
        detail: detail,
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
}

export const Title = ({title}) => {

  const [_state, set_state] = useState();
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
        },
        false
      );
    }
  }, []);
  return (
    <div id={IDTitle}>
      <Cover id={"component_"+IDTitle} state={_state} message={_message}>
          <h1 id={"h1_component_"+IDTitle}>
            {_title}
          </h1>
      </Cover>
    </div>
  );
};

export default Title;