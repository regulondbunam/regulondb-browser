/**

# Component (deployment use)

# Form (regulonDB dtt)
	
## Description  

FormRegulondbData is a user interface where the user selects the options he prefers in the form to make the graph of genetic elements.

## Category   
	
[Estructural]

## Live demo 
[-]

## Installation 
[-]

## Usage 

'''
import { RegulonDBData } from './components/regulondbData/regulondbdata';
 //on implement ReactElement
<RegulonDBData />
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

  [HOC]

## Dependencies
'''
import React, { useState } from 'react'
import GetGeneticElements from '../../webServices/getGenticInterval';
import Form from './form';
import ITable from "../intelligentTable/table"
import DttTool from '../dtt_tool/dttTool';
'''

## States
	
| Property    |    Value   |          Description           |
| --------    | ---------- | -----------------------------  |
| _formData   |    object  | Form imput data.               |
| _data       |    object  | Data consulted in regulondb.   |


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

import React, { useState } from 'react'
import GetGeneticElements from '../../webServices/getGenticInterval';
import Form from './form';
import ITable from "../intelligentTable/table"
import DttTool from '../dtt_tool/dttTool';


export function RegulonDBData() {
    const [_formData, set_formData] = useState();
    const [_data, set_data] = useState();
    // ['"gene","promoter"']
    let objectType = "["
    if (_formData) {
        let el = _formData.geneticElement.map((element) => {
            return element
        })
        let list = el.map((s) => `"${s}"`).join(", ");
        objectType += list += "]"

    }
    let dataTable;
    if (_data) {
        console.log(_data)
        dataTable = formatData(_data)
        //console.log(dataTable)
    }

    return (
        <article>
            &nbsp;
            <Form
                onGo={(data) => { set_formData(data) }}
                onReset={(_formData, _data) => {
                    set_formData("")
                    set_data("")
                }} >
            </Form>
            &nbsp;
            {
                dataTable &&
                <div>
                    <ITable dataTable={dataTable}></ITable>
                    &nbsp;
                    <DttTool data_dtt={_data} />
                </div>
            }
            {
                _formData &&
                <GetGeneticElements
                    leftEndPosition={_formData.posL}
                    rightEndPosition={_formData.posR}
                    strand={_formData.strand}
                    covered={_formData.covered}
                    objectType={objectType}
                    resoultsData={(data) => { set_data(data) }}
                />
            }

        </article>
    )
}

function formatData(data) {
    let key = [];
    let formatTable = {
        columns: [],
        rows: []
    };
    for (const property in data[0]) {
        if (property !== "relatedGenes" && property !== "linkedObjectWhenNoPositions" && property !== "__typename" && property !== "tooltip") {
            formatTable.columns.push({
                name: property,
                value: property
            });
            key.push(property);
        }

    }

    data.map((ge, index) => {
        let row = [];
        for (const property in ge) {
            if (property !== "relatedGenes" && property !== "linkedObjectWhenNoPositions" && property !== "__typename" && property !== "tooltip") {

                if (property === "objectRGBColor") {
                    row.push({
                        data: divColor(ge[property]),
                        value: property
                    });
                } else {
                    row.push({
                        data: ge[property],
                        value: property
                    });
                }
            }

            //console.log(ge[property])
        }
        formatTable.rows.push(row);
        return null;
    });

    return formatTable;
}

const divColor = (rgbColor) => {
    return (
        <div style={{ height: "20px", backgroundColor: `rgb(${rgbColor})` }}></div>
    );
};