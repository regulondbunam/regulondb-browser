/**
 # Component (user guide)

# AboutUs
	
## Description  
	
It's a component that displays information about the website itself and its different sections related to the description of what it offers. Each section is represented by a React component and organized in a page that allows users to easily navigate between these sections to get detailed information about the website and its functionality.

## Category   
	
Visual  

## Live demo 
	
--

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
Cover: it is used to display a large "About us" title at the top of the page.

AnchorNav: this navigation bar allows users to quickly move to different sections of the page by clicking on links that point to specific anchors.

Funding: this component is used on the "About us" page to inform users about the funding and support behind the RegulonDB project.

WRegulonDB: provides detailed information about RegulonDB, including its function, graphical representation of objects and related links to get more details or access external resources. This component is part of the "About us" page and is intended to inform users about RegulonDB and how information is presented in the database.

TermsConditions:provides detailed information about RegulonDB's terms and conditions of use.

useParams: it  is a hook provided by the react-router-dom library. It is used to access the parameters passed in the URL.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                                   |  Syntax  | Additional Notes or References | 
| ------  | ------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------ |
|useParams| it  is a hook provided by the react-router-dom library. It is used to access the parameters passed in the URL.|          |                                |


 
**/

import { Cover, AnchorNav } from "../../components/ui-components";
import { Funding } from "./funding";
import { WRegulonDB } from "./whatIsRegulonDB";
import { TermsConditions } from "./termsConditions";
import { useParams } from "react-router-dom";


/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX}
 */
export default function AboutUs() {
    
  let { section } = useParams();

  
  /**
   * Description placeholder
   *
   * @type {array}
   */
  const sections = [
    {
      id: "whatIsRegulonDB",
      label: "what is RegulonDB?",
      title: "What is RegulonDB?",
      component: (
        <div style={{ margin: "0% 1% 1% 2%" }}>
          <WRegulonDB />
        </div>
      ),
    },
    {
      id: "funding",
      label: "Funding",
      title: "Funding",
      component: (
        <div style={{ margin: "0% 1% 1% 2%" }}>
          <Funding />
        </div>
      ),
    },
    {
      id: "terms_and_conditions",
      label: "Terms & Conditions",
      title:
        "End User License Agreement for Academic/Noncommercial Use of RegulonDB.",
      component: (
        <div style={{ margin: "0% 1% 1% 2%" }}>
          <TermsConditions />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Cover>
        <h1 style={{ fontSize: "xxx-large" }}>About us</h1>
      </Cover>
      <AnchorNav
        title="About us"
        sections={sections}
        idSelectSection={section}
      />
    </div>
  );
}

export { Funding, WRegulonDB, TermsConditions };
