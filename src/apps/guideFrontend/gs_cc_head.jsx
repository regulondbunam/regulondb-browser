import React from 'react'
import { Cover } from './ui-components/ui_components';
import { useParams } from 'react-router';


const GsCcHead = ({state = "done"}) => {
  const {site} = useParams();
  return (
    <div>
    {
      (site == undefined)
        && 
          <Cover state={state}>
            <h1>Getting Started Guide</h1>
          </Cover>
    }
    {
      (site == "ui-components")
        && 
          <Cover state={state}>
            <h1>User Interface Components</h1>
          </Cover>
    }
    {
      (site == "create-app")
        && 
          <Cover state={state}>
            <h1>Create Your RegulonDB APP</h1>
          </Cover>
    }
       
    </div>
  )
}

export default GsCcHead
