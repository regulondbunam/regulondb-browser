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

import { Cover, DataVerifier } from "../../components/ui-components";
import { useParams } from "react-router-dom";
import { useGetAllGus, useGetGuById } from "../../components/webservices";
import GuInfo from "./guInfo";
import Home from "./home";

export default function GensorUnit() {
  /**
   * id of the Gu entered in the URL.
   * @tipo {String}
   */
  let { guId } = useParams();
  if (guId) {
    return (
      <GoInfo guId={guId}/>
    );
  }
  return <GoHome />;
}

function GoInfo({guId}){
const {guData, loading, error} = useGetGuById(guId)
console.log(guData);
if(loading){
  return (
    <div>
      <Cover state="loading" >
        <h1>{`Loading .... Gensor Unit`}</h1>
      </Cover>
    </div>
  )
}
if(error){
  return <>error</>
}
if(guData?._id){
  return (
    <div>
      <Cover >
        <h1>{`Gensor Unit ${guData.gensorUnit.name}`}</h1>
      </Cover>
      <GuInfo nReactions={guData.reactions.length} {...guData} />
    </div>
  )
}
return(
  <div>info</div>
)

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
