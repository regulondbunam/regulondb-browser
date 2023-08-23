/*
# Component (user guide)

# GensorUnit
	
## Description  

It is a structural component on which all components are mounted
from the main view

## Category   
	
[Structural]  

## Usage 
	
[example: <GensorUnit /> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
    Francisco Mendez Hernandez <jklmopkrst@gmail.com>
    Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>

# Component (technical guide)

## Component Type 

[An Application]

## Dependencies

__{MainTable} from "./mainTable/index"__
Dependency that allows to use the MainTable component

__{Paragraph} from "./Paragraph"__
Using this dependency we can display the Paragraph component

__{cover} from "../../components/ui-components" __
With this dependency we can use the cover component of the 
ui-components library 

__{conf}  from "./conf.json"__
It allows us to access the GensorUnit configuration file

## States
	
|   State   | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |
	

*/
//import MainTable from "./mainTable/index";
//import Paragraph from "./Paragraph";
import { Cover, DataVerifier } from "../../components/ui-components";
//import MainQuery from "./mainQuery";
import setting from "./conf.json";
import { useParams } from "react-router-dom";
import GuInfo from "./guInfo/index";
import { useGetAllGus } from "../../components/webservices";
import Home from "./home";

export default function GensorUnit() {
  /**
   * id of the Gu entered in the URL.
   * @tipo {String}
   */
  let { guId } = useParams();
  if (guId) {
    return (
      <GuInfo guInfoDescription={setting.GuInfo_Description} guId={guId} />
    );
  }
  return <GoHome />;
}

function GoHome() {
  const { gusData, error, loading } = useGetAllGus();

  let state = "done";
  let title = "Gensor Units";
  if (loading) {
    state = "loading";
    title = "loading Gensor Unit list";
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }
  return (
    <div>
      <Cover state={state}>
        <h1>{title}</h1>
      </Cover>
      {DataVerifier.isValidArray(gusData) && (
        <Home gusData={gusData} />
      )}
    </div>
  );
}
