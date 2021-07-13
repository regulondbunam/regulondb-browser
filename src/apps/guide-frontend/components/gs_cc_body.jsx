import React from 'react';
import { Redirect } from 'react-router';
import GsViewMain from '../components/gs_view_main';
import GsCcRawME from './gs_cc_raw_me';
import GsUiComponent from './gs_ui_component';

const GsCcBody = ({ site, setState }) => {  

  if (site != "create-app" && site != "ui-components" && site != undefined){
    return <Redirect to="/"/>
  }
  
  return (
    
  <>

    {
      ( site == undefined )
        && <GsViewMain/>      
    }

    <div style={{display:'flex',width:'100%'}}>

      <div style={{width:'20%'}}>
        {
          ( site == "ui-components")
            && <GsCcRawME />
        }
      </div>

      <div style={{width:'80%'}}>
        {
          ( site == "ui-components")
            && <GsUiComponent setState={(state)=>{setState(state)}}/>
        }
        {
          (site == "create-app")
          && <GsUiComponent />
        }
      </div>

    </div>
  </>
    
  )
}

export default GsCcBody