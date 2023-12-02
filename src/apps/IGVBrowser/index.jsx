import React, { useReducer, Suspense, lazy, useState } from "react";
import { Cover, Circular } from "../../components/ui-components";
import Menu from "./Menu";
import {ACTION} from "./static"
import  "./style.css"

const IGVDraw = lazy(() => delayForIGV(import("./igv.jsx")));


function reducer(state, action) {
  switch (action.type) {
    case ACTION.INIT:
      return {...state,sessionObject: action.browser.toJSON(), browser: action.browser}
    case ACTION.ADD_TRACK:
      if(state?.browser){
        state.browser.loadTrack(action.track)
        return {...state, tracks: [...state.tracks, action.track.id]}
      }else{
        console.error("browser Information no loaded");
      }
      return state
    default:
      return state
  }
  
}

const initReducer = {
  tracks: []
}


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
          <Menu state={state} dispatch={dispatch} viewMenu={viewMenu} setViewMenu={setViewMenu} />
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
