/**
# Component (user guide)

# Component name 
	
	[Button]
	
## Description  
	
	[This component presents the functionality of a button]

## Category   
	
	[Visual]  

## Live demo 
	
	[https://codesandbox.io/s/relaxed-nash-ttm51?fontsize=14]


## Installation 

	[-]

## Usage 
	
	[]

## Props 

  | Attribute | Type | Default | Description |
  | --------- | ---- | ------- | ----------- |
  |accent|boolean|false|expose an accented button|
  |active|boolean|true|enables or disables the button|
  |label|string|''|button label|
  |onClick|function|noAction()|receives a function to be executed when the button is pressed|


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
		* __Param - __ __[Name]__
		Description

	__Return:__  
		* __Type - __ __[Name]__
        Description (if necessary)
    

    ## [selectStyle]

	__Description:__  
	[this function gives the style that the button has to show based on the parameters]

	__Usage:__

		```javascript

		selectStyle(accent,active)

		```
	__Scope: __

	[Scope details]

	__Input Parameter:__  
		* __Param - __ __[accent]__
        Description this is a button prop accent
        * __Param - __ __[active]__
		Description this is a button prop active

	__Return:__  
		* __Type - __ __[StyleClass]__
		Description the class name requiere of css
**/


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Buttons.module.css'

export default class Button extends Component {

    handleOnClickLink = (event) => {
        if(this.props.active){
            this.props.onClick(event);
        }
    };

    render() {
        const {
            accent,
            active,
            /*icon,*/
            id,
            label,
            style
            /*urlimg*/
        } = this.props;

            return (
                <button id={id} className={selectStyle(accent, active)} onClick={this.handleOnClickLink} style={style}>
                    {label}
                    {this.props.children}
                </button>
            )  

    }
}

function selectStyle (accent, active) {
    let styleClass = Styles.button
    accent
    ? styleClass += " "+Styles.accent
    : styleClass += " "+Styles.default
    active
    ? styleClass += " "
    : styleClass += " "+Styles.disabled

    return styleClass
}

function noAction() {
    console.warn('Button has no activity')
}


Button.propTypes = {
    accent: PropTypes.bool,
    active: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    urlimg: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    accent:  false,
    active: true,
    icon: "",
    label: "",
    urlimg: "",
    onClick: noAction
};

