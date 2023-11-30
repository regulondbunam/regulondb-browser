import igv from "igv/dist/igv.esm";
import { useEffect, useRef, useState } from "react";
import {ACTION} from "./static"

let conf = {
  id: "Ecoli",
  name: "Ecoli",
  fastaURL: "/media/raw/e_coli_k12.fna",
  indexURL: "/media/raw/e_coli_k12.fna.fai",
  order: 1000,
};

export default function IGVDraw({dispatch}) {
  const [guid, setGuid] = useState();
  const b = useRef([])
  useEffect(() => {
    let igvDiv = document.getElementById("igv-divK");
    if (igvDiv && !guid) {
      igv.createBrowser(igvDiv,{genome: conf}).then(function (browser) {
        setGuid(browser.guid)
        b.current.push(browser)
        dispatch({type: ACTION.INIT, sessionObject: browser.toJSON, browser: browser})
      });
    }
  }, [guid,dispatch]);
  if (b.current.length > 1) {
    b.current.forEach(browser => {
      if(browser.guid !== guid ){
        try {
          igv.removeBrowser(browser)
        } catch (error) {
          console.error("IGVremove error:",error);
        }
        
      }
    });
  }
  return <></>;
}

