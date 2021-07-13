import React from 'react'
import GsCcButtons from './gs_view_main/gs_cc_buttons';

import conf from './../conf/gs_view_main.conf.json'

const GsViewMain = () => {

  const description = conf.gs_cc_buttons.description;

  return (
    <>
      <div>
      <p
        style={{width:"80%", height:"auto",margin:"2vh auto", fontSize:"1em"}}
        dangerouslySetInnerHTML={
          {
            __html:description
          }
      }>        
      </p>
    </div>

      <GsCcButtons />
    </>

  )
}

export default GsViewMain
