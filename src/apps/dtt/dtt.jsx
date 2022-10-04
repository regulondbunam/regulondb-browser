/**

# Component (deployment use)

# dtt
	
## Description  

DrawingTracesTool is a user-friendly tool allowing generating images of elements related to DNA and involved in gene regulation (such as gene, operon, binding site, promoter, terminator, attenuator, riboswitch and small RNA).

## Category   
	
Visual

## Live demo 
[-]

## Installation 
[-]

## Usage 

'''

'''
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
[
  Lizeth Arizmendi Zagal    <liz.arizmendi13@gmail.com>
  Gabriel Alarcon Carranza  <galarcon@ccg.unam.mx>
]

# Component (development use)

## Component Type 

  [-]

## Dependencies

'''
import React from 'react'
import Title from './components/cover/title'
import { Tabs } from './components/tab/tabs';
import { UserData } from "./components/userData/userData"
import "./styleSheet_regulonDB.css"
import { RegulonDBData } from './components/regulondbData/regulondbdata';
'''

## States
	
| Property    |    Value   |          Description           |
| --------    | ---------- | -----------------------------  |
|     -       |      -     |                --              |


# Functions description

## [name]

__Description:__  


__Usage:__

__Scope: __

[Scope details]

__Input Parameter:__  
 __event:__ [Description]

__Return:__  
 __Void:__ []
 [Description (if necessary)]
 * 
 */

import React, { useState } from "react";
import Title from "./components/cover/title";
import { Tabs } from "./components/tab/tabs";
import { UserData } from "./components/userData/userData";
import { RegulonDBData } from "./components/regulondbData/regulondbdata";
import DrawingTracesTool from "../../components/DrawingTracesTool";

const tabsInfo = [
  { id: "01", name: "RegulonDB-Data", disabled: false },
  { id: "02", name: "User Data", disabled: false },
];

const tabs = [
  <div id="01">
    <RegulonDBData />
  </div>,
  <div id="02">
    <article>
      <br />
      <UserData></UserData>
    </article>
  </div>,
];

export default function DTT({params,embed}) {
  return (
    <div>
      <Title></Title>
      <Tabs tabSelect={"01"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
}

export function DTTtest() {
  const [left, set_left] = useState(1);
  const [right, set_right] = useState(1000);
  const [update, setUpdate] = useState();

  return (
    <div>
      leftEndPosition
      <input id="dttLeft" type="number" />
      rightEndPosition
      <input id="dttRight" type="number" />
      <button
        onClick={() => {
          let Left = document.getElementById("dttLeft");
          let Right = document.getElementById("dttRight");
          if (Left && Right) {
            set_left(Number(Left.value));
            set_right(Number(Right.value));
            setUpdate(undefined);
            setTimeout(() => {
              setUpdate(true);
            }, 500);
          }
        }}
      >
        Go
      </button>
      {update && (
        <DrawingTracesTool
          context="gene"
          id={"asdf123"}
          leftEndPosition={left}
          rightEndPosition={right}
        />
      )}
    </div>
  );
}
