import React, {
  useReducer,
  Suspense,
  lazy,
  useState,
  useRef,
  useEffect,
} from "react";
import { Cover, Circular } from "../../components/ui-components";
import Menu from "./Menu";
import { ACTION } from "./static";
import "./style.css";
import { TRACK_genes } from "./tracks/regulonDB.js";

const IGVDraw = lazy(() => delayForIGV(import("./igv.jsx")));

function reducer(state, action) {
  switch (action.type) {
    case ACTION.INIT:
      return {
        ...state,
        sessionObject: action.browser.toJSON(),
        browser: action.browser,
      };
    case ACTION.ADD_TRACK:
      if (state?.browser) {
        //state.browser.loadTrack(action.track)
        const tracks = { ...state.tracks };
        tracks[action.track.name] = action.track;
        return { ...state, tracks: { ...tracks }, loadTrack: action.track };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.ADD_HT_TRACK:
      if (state?.browser) {
        //state.browser.loadTrack(action.track)
        const htTracks = { ...state.htTracks };
        htTracks[action.track.name] = action.track;
        return { ...state, htTracks: { ...htTracks }, loadTrack: action.track };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.ADD_FILE_TRACK:
      if (state?.browser) {
        //state.browser.loadTrack(action.track)
        const fileTracks = { ...state.fileTracks };
        fileTracks[action.track.name] = action.track;
        return {
          ...state,
          fileTracks: { ...fileTracks },
          loadTrack: action.track,
        };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.DELETE_TRACK:
      if (state?.browser) {
        state.browser.removeTrackByName(action.trackName);
        const tracks = { ...state.tracks };
        delete tracks[action.trackName];
        return { ...state, tracks: { ...tracks } };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.DELETE_HT_TRACK:
      if (state?.browser) {
        state.browser.removeTrackByName(action.trackName);
        const htTracks = { ...state.htTracks };
        delete htTracks[action.trackName];
        return { ...state, htTracks: { ...htTracks } };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.DELETE_FILE_TRACK:
      if (state?.browser) {
        state.browser.removeTrackByName(action.trackName);
        const fileTracks = { ...state.fileTracks };
        delete fileTracks[action.trackName];
        return { ...state, fileTracks: { ...fileTracks } };
      } else {
        console.error("browser Information no loaded");
      }
      return state;
    case ACTION.CLEAN_LOAD_TRACK:
      if (state.loadTrack !== null) {
        return { ...state, loadTrack: null };
      }
      return state;
    default:
      return state;
  }
}

const initReducer = {
  tracks: {
    Genes: TRACK_genes
  },
  htTracks: {},
  fileTracks: {},
  loadTrack: null,
};

//style={{width: "15%", maxWidth: "320px"}}
export default function IGVBrowser() {
  const [viewMenu, setViewMenu] = useState(true);
  const [state, dispatch] = useReducer(reducer, initReducer);
  const igvFunction = useRef(null);

  //console.log(state);

  useEffect(() => {
    if (igvFunction.current === null && state.loadTrack !== null) {
      igvFunction.current = state.browser
        .loadTrack(state.loadTrack)
        .then((track) => {
          dispatch({ type: ACTION.CLEAN_LOAD_TRACK });
          igvFunction.current = null;
        });
    }
  }, [state]);

  return (
    <div>
      <Cover>
        <h2> IGV Genome Browser</h2>
      </Cover>
      <div className={viewMenu ? "igv-menu-show" : "igv-menu-hide"}>
        <div>
          <Menu
            state={state}
            dispatch={dispatch}
            viewMenu={viewMenu}
            setViewMenu={setViewMenu}
          />
        </div>
        <div id="igv-divK">
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
