import igv from "igv/dist/igv.esm";
import { useEffect, useRef } from "react";
import {ACTION} from "./static"
import { TRACK_genes } from "./tracks/regulonDB";

let conf = {
  id: "Ecoli",
  name: "Ecoli",
  fastaURL: "/media/raw/e_coli_k12.fna",
  indexURL: "/media/raw/e_coli_k12.fna.fai",
  order: 1000,
  tracks: [
    TRACK_genes
  ]
};

export default function IGVDraw({dispatch}) {
  const igvContainerRef = useRef(null);
  const igvRef = useRef(null);
  useEffect(() => {
    if (igvRef.current === null) {
      igvRef.current = igv.createBrowser(igvContainerRef.current,{genome: conf}).then(function (browser) {
        dispatch({type: ACTION.INIT, sessionObject: browser.toJSON, browser: browser})
      });
    }
  }, [dispatch]);
  return <div
      id="igv-div"
      ref={igvContainerRef}
    />;
}

