/**
# Component (user guide)

# DocumentationDatamarts
	
## Description  
	
DocumentationDatamarts is a React component used for displaying documentation related to various services. It renders documentation content based on the selected service.


## Category   
	
Visual

## Live demo 
	
Currently, there is no live demo available for this component.

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 
Visual


## Dependencies
React
Cover: it is used for rendering a cover or header section in the documentation.
useParams: it s a hook from the "react-router-dom" library. It is used for extracting route parameters from the URL. 
MenuAside: it is used for rendering a menu or navigation sidebar in the documentation.
ServDesc:It is used for rendering service descriptions in the documentation.
ServInfo: It is used for rendering detailed service information in the documentation.
DocCSS: It is used for styling the components and elements within this documentation component.
conf: It contains configuration settings or data used by the component to determine how to display documentation information.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

**/

import React from "react";
import { Cover } from "../../components/ui-components";
import { useParams } from "react-router-dom";

//Components
import MenuAside from "./components/MenuAside";
import ServDesc from "./components/ServDesc";
import ServInfo from "./components/ServInfo";

//Assets
import DocCSS from "./Doc_Main.module.css";
import conf from "./conf/view_main.conf.json";

const DocumentationDatamarts = () => {
  let { service } = useParams();

  return (
    <>
      <Cover>
        <h1>Documentation</h1>
      </Cover>
      <article>
        <div className={DocCSS.container} style={{}}>
          <div className={DocCSS.containerMenu}>
            <MenuAside></MenuAside>
          </div>
          <div className={DocCSS.containerServices}>
            {service ? (
              <ServInfo conf={conf.serv_info} service={service} />
            ) : (
              <ServDesc {...conf.serv_desc.title_main} />

            )}
          </div>
        </div>
      </article>

    </>
  );
};

export default DocumentationDatamarts;
