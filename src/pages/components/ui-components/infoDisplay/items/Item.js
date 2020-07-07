/**
# Component (user guide)

# Component name 
	
	[Item]
	
## Description  
	
	[---]

## Category   
	
	[Visual]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[---]

## Props 

| Prop   | type    | default   | description |
| ------ | ------- | --------- | ----------- |
| align  | string  | "left"    |             |
| data   | string  | ""        |             |
| height | string  | "auto"    |             |
| style  | object  | {}        |             |
| model  | string  | "clear"   |             |
| width  | string  | "400px    |             |



## Exception
	__Category (Error, Warning or Message)__  
	Description of the exception (if necessary)

## License

	[MIT]

## Author 
	
	[CCG-UNAM-RegulonDB]

**/


/**
# Component (technical guide)

## Component Type 

	[pure]

## Dependencies

	[---]

## States
	
	| Property | Value | Desctiption |
	| -------- | ----- | ----------- |
	|          |       |             |
	

# Function description

	## [function name]

	__Description:__  
	[Description of the function]

	__Usage:__

		```javascript

		&function(Parameters, if any);

		```
	__Scope: __

	[Scope details]

	__Input Parameter:__  
		* __Param - __ __[Name]__
		Description

	__Return:__  
		* __Type - __ __[Name]__
		Description (if necessary)
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Item.module.css'

// ["clear", "accent", "accent_ligth", "dark"]
const models = {
	clear: "#f4f5f5",
	accent: "#72a7c7",
	accent_ligth: "#d5e2ea",
	dark:"#d5d5d7"
}

const aligns = {
	center: "center",
	left: "flex-start",
	right: "flex-end",
}

export default class Item extends Component {

	setModel(key){
		let color = models[key]
		if(color!==undefined){
			return color
		}
		return(models.clear)
	}

	setAlign(key){
		let aling = aligns[key]
		if(aling!==undefined){
			return aling
		}
		return(aligns.left)
	}

    render() {
        const {
            align,
			name,
			height,
			model,
    		style,
    		width,
		} = this.props;

		const masterStyle = Object.assign(
			{
				height: height,
				width: width,
				backgroundColor: this.setModel(model),
				justifyContent: this.setAlign(align)
			},
			style
			) 

        return (
            <div id={name} className={Styles.item} style={masterStyle}>
				{this.props.children}
			</div>
        )

    }
}

Item.propTypes = {
    align: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string,
	model: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.string,
};

Item.defaultProps = {
    align: "left",
	name: "",
	height: "30px",
	model: "clear",
    style: {},
    width: "400px",
};