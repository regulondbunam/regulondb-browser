import React, { useReducer, Suspense, lazy, useState, useRef } from "react";
import { Cover, Circular } from "../../components/ui-components";
import Menu from "./menu";
import {ACTION} from "./static"
import  "./style.css"

const IGVDraw = lazy(() => delayForIGV(import("./igv.jsx")));


function reducer(state, action) {
  switch (action.type) {
    case ACTION.INIT:
      return {sessionObject: action.browser.toJSON(), browser: action.browser}
    default:
      return state
  }
  
}

const initReducer = {}


//style={{width: "15%", maxWidth: "320px"}}
export default function IGVBrowser() {
  const [viewMenu, setViewMenu] = useState(true)
  const [state, dispatch] = useReducer(reducer,initReducer)

  console.log(state);

  return (
    <div>
      <Cover>
        <h2> IGV Genome Browser</h2>
      </Cover>
      <div className={viewMenu?"igv-menu-show":"igv-menu-hide"} >
        <div  >
          <Menu viewMenu={viewMenu} setViewMenu={setViewMenu} />
        </div>
        <div id="igv-divK" >
          <Suspense fallback={<Circular />}>
            <IGVDraw dispatch={dispatch} state={state} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function delayForIGV(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  }).then(() => promise);
}
