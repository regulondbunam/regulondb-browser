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
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Summary from "./guSummary";

export default function GensorUnit() {
  /**
   * id of the Gu entered in the URL.
   * @tipo {String}
   */
  let { guId } = useParams();
  if (guId) {
    return <GoInfo guId={guId} />;
  }
  return <GoHome />;
}

const DISPLAY_TYPES = {
  graphic: "Graphic",
  summary: "Summary",
};

function GoInfo({ guId }) {
  const [display, setDisplay] = useState(DISPLAY_TYPES.graphic);
  const { guData, loading, error } = useGetGuById(guId);
  console.log(guData);
  if (loading) {
    return (
      <div>
        <Cover state="loading">
          <h1>{`Loading [${guId}] Gensor Unit `}</h1>
        </Cover>
      </div>
    );
  }
  if (error) {
    return <>error</>;
  }
  if (guData?._id) {
    let idSite = "site_" + guData._id;
    return (
      <div
        id={idSite}
        style={display === DISPLAY_TYPES.graphic ? { width: "100%", position: "absolute", top: "0", bottom: "0" } : {}}
      >
        <Cover
          coverId={idSite + "_cover"}
          coverStyle={display === DISPLAY_TYPES.graphic ? { position: "absolute", zIndex: "10" } : {}}
          coverBackgroundStile={{
            backgroundColor: "#f4f5f5e8",
            padding: "10px 0 10px 0",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>{SelectDisplay(display, setDisplay)}</div>
            <div>
              <h1>{`Gensor Unit ${guData.gensorUnit.name}`}</h1>
              {DataVerifier.isValidArray(guData.gensorUnit.groups) && (
                <p>
                  <b>{`Functional Group${
                    guData.gensorUnit.groups.length > 1 ? "s" : ""
                  }: `}</b>
                  {guData.gensorUnit.groups.join(", ")}
                </p>
              )}
              <br />
            </div>
          </div>
        </Cover>
        {display === DISPLAY_TYPES.graphic && (
          <GuInfo
            idSite={idSite}
            nReactions={guData.reactions.length}
            {...guData}
          />
        )}
        {display === DISPLAY_TYPES.summary && (
          <Summary idSite={idSite} {...guData} />
        )}
      </div>
    );
  }
  return <div>info</div>;
}

function SelectDisplay(display, setDisplay) {
  const handleChange = (event) => {
    setDisplay(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Display type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={display}
        label="Display_type"
        onChange={handleChange}
      >
        {Object.keys(DISPLAY_TYPES).map((key, i) => {
          return (
            <MenuItem key={"displayOption_"+key+"_"+i}  value={DISPLAY_TYPES[key]}>{DISPLAY_TYPES[key]}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
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
      {DataVerifier.isValidArray(gusData) && <Home gusData={gusData} />}
    </div>
  );
}
