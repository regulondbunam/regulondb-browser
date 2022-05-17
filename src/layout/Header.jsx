import React from 'react'
import LogoRegulonDB from './logos/regulonDB.png'
import SearchTool from '../apps/search/tools/search_box'
import './header.css'
//import conf from './conf/header.conf.json'

export default function Header({
    isHome
}) {
  return (
    <header className='layout_header_background' >
        <div className='header_right'>
        <img className='layout_header_LogoRDB' src={LogoRegulonDB} alt="Logo RegulonDB" />
        </div>
        <div className='header_left'>
        <div>
        {
                   !isHome
                   ? <SearchTool styleBox={{}} styleButton={{}} />
                   : <>
                       <a className="aAccent header_link" href="/TermsConditions"style={{ paddingLeft: "10px" }}>Terms and conditions</a>
                       <a className="aAccent header_link" href="/Contact" style={{ paddingLeft: "10px" }} >Contact US</a>
                       <a className="aAccent header_link" href="/Funding" style={{ paddingLeft: "10px" }} >Funding</a>
                   </>
                }
        </div>
        </div>
        
    </header>
  )
}
