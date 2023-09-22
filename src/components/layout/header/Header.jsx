import React, { useEffect,  useState } from "react";
import LogoRegulonDB from "../logos/regulonDB.png";
import InputSearch from "../../../apps/search/InputSearch";
import "./header.css";
//import conf from './conf/header.conf.json'
let eventName = "HEADER_UPDATE"
export const idHeader = "layout_header";

export function UpdateHeader(isHome) {
  let detail = {isHome: isHome};

  const HEADER = document.getElementById(idHeader);
  if (HEADER) {
    const HEADER_REACTION = new CustomEvent(eventName, {
      bubbles: true,
      detail: detail,
    });
    HEADER.dispatchEvent(HEADER_REACTION);
  }
}

export default function Header({ isHome }) {

  const [_isHome,set_isHome] = useState(isHome)

    useEffect(()=>{
      const HEADER = document.getElementById(idHeader)
      if(HEADER){
        HEADER.addEventListener(
          eventName,
          function (e) {
            //console.log(`state`, e.detail)
            set_isHome(e.detail.isHome);
          },
          false
        );
      }
    })
  

  return (
    <header  id={idHeader} className="layout_header_background">
      <div className="header_right">
        <img
          className="layout_header_LogoRDB"
          src={LogoRegulonDB}
          alt="Logo RegulonDB"
        />
      </div>
      <div className="header_left">
        {_isHome ? (
          <div>
            <>
              <a
                className="aAccent header_link"
                href="/TermsConditions"
                style={{ paddingLeft: "10px" }}
              >
                Terms and conditions
              </a>
              <a
                className="aAccent header_link"
                href="/Contact"
                style={{ paddingLeft: "10px" }}
              >
                Contact US
              </a>
              <a
                className="aAccent header_link"
                href="/Funding"
                style={{ paddingLeft: "10px" }}
              >
                Funding
              </a>
            </>
          </div>
        ) : (
          <InputSearch />
        )}
      </div>
    </header>
  );
}

/**
 * {
                   !isHome
                   ? <SearchTool styleBox={{}} styleButton={{}} />
                   : <>
                       <a className="aAccent header_link" href="/TermsConditions"style={{ paddingLeft: "10px" }}>Terms and conditions</a>
                       <a className="aAccent header_link" href="/Contact" style={{ paddingLeft: "10px" }} >Contact US</a>
                       <a className="aAccent header_link" href="/Funding" style={{ paddingLeft: "10px" }} >Funding</a>
                   </>
                }
 */
