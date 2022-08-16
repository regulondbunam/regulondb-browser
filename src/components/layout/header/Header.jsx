import React from "react";
import LogoRegulonDB from "../logos/regulonDB.png";
import InputSearch from "../../../apps/search/InputSearch";
import "./header.css";
//import conf from './conf/header.conf.json'

export default function Header({ isHome }) {
  return (
    <header className="layout_header_background">
      <div className="header_right">
        <img
          className="layout_header_LogoRDB"
          src={LogoRegulonDB}
          alt="Logo RegulonDB"
        />
      </div>
      <div className="header_left">
        {isHome ? (
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
