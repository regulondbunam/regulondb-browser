// FetchApi

import React, {useState, useEffect} from 'react'
import GsCcTreeMenu from './gs_cc_raw_me/gs_cc_tree_menu';

const GsCcRawME = () => {

  const [ data, setData ] = useState("");

  useEffect(()=>{
    if(data===""){
      try{
        fetch('https://raw.githubusercontent.com/regulondbunam/component-repository/master/ui-components/menu.conf.json?token=GHSAT0AAAAAAB5IDW4M2TUNZKLU3MF743DMZAY2TQA')
      .then(response => response.json())
      .then(json => setData(json))
      }catch(e){
        console.error(e)
      }
    }else{
    }
  }, [data]);

  function getEnlace(value) {
    const body = document.getElementById("gs_cc_raw_012")
    if(body){
      const event = new CustomEvent('updateBody', { detail: {url: value} });
      body.dispatchEvent(event);
    }
    

    //alert(value)
  }

  return (
    <div>
    <h1></h1>
      {
        data==="" ? '' :
          <GsCcTreeMenu 
            dataMenu={data}
            onSelect={(value) => {
              getEnlace(value);
            }}
          />
      }
    </div>
  )
}

export default GsCcRawME