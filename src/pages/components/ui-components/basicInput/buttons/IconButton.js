/**
# Component (user guide)

# Component name 
	
	[IconButton]
	
## Description  
	
	[-]

## Category   
	
	[Visual, Structural]  

## Live demo 
	
	[code to iframe CodeSandbox]


## Installation 

	[example: npm install --save react-awesome-button]

## Usage 
	
	[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

  | Prop    | type     | default                   | description                                                  |
| ------- | -------- | ------------------------- | ------------------------------------------------------------ |
| active  | boolean  | true                      | enables or disables the button                               |
| icon    | string   | "sentiment_satisfied_alt" | Shows an icon inside the button, you can get the name of the icon using the MATERIAL-ICONS library  https://material.io/resources/icons/?style=baseline |
| style   | object   | {}                        |                                                              |
| onClick | function |                           |                                                              |



## Exception
	__Category (Error, Warning or Message)__  
	Description of the exception (if necessary)

## License

	[-]

## Author 
	
	[CCG-UNAM-RegulonDB]

**/


/**
# Component (technical guide)

## Component Type 

	[pure]

## Dependencies

	[React, { Component },PropTypes]

## States
	
	| Property | Value | Desctiption |
	| -------- | ----- | ----------- |
	|          |       |             |
	

# Function description

	## [noAction]

	__Description:__  
	[this function sends the console a warning that the button does not have a designated action]

	__Usage:__

		```javascript

		noAction;

		```
	__Scope: __

	[Scope details]

	__Input Parameter:__  
		* __Param - __ __[Value]__
		Description

	__Return:__  
		* __Type - __ __[Name]__
        Description (if necessary)
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Buttons.module.css'

export default class IconButton extends Component {

    handleOnClickLink = (event) => {
        if(this.props.active){
            this.props.onClick(event);
        }
    };

    render() {
        const {
            active,
            icon,
            style,
            iconStyle
        } = this.props;
            return (
                <>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet" />
                <button style={style} className={selectStyle(active)} onClick={this.handleOnClickLink}>
                    <i className="material-icons" style={iconStyle}>{icon}</i>
                </button>
                </>
            )  

    }
}

function selectStyle (active) {
    let styleClass = Styles.iconButton+" "+Styles.default
    active
    ? styleClass += " "
    : styleClass += " "+Styles.disabled
    return styleClass
}

function noAction() {
    console.warn('Button has no activity')
}

IconButton.propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
};

IconButton.defaultProps = {
    active: true,
    icon: "sentiment_satisfied_alt",
    onClick: noAction,
    style: {}
};