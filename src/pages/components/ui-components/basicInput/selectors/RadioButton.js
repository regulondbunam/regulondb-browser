/**
# Component (user guide)

# Component name 
	
	[RadioButton]
	
## Description  
	
	[This component is a graphical control that allows the user to choose only one of a predefined set of mutually exclusive options. ]

## Category   
	
	[Visual]  

## Live demo 
	
	[code to iframe CodeSandbox]


## Installation 

	[---]

## Usage 
	
	[to use it is necessary to contain it in a RadioButtonGrup]

## Props 

  | Prop     | Type     | Default       | Description                                                  |
| -------- | -------- | ------------- | ------------------------------------------------------------ |
| active   | boolean  | true          | Enables or disables the radiobutton                               |
| checked  | boolean  | false         | check or uncheck radiobutton                                |
| label    | String   | "radioButton" | radiobutton label                                           |
| name     | String   | "default"     | defines radio button groups with the name property (radio buttons with the same name belong to the same group).The name attribute is used to identify form data after it has been submitted to the server, or to reference form data |
| onChange | function | noAction()    | receives a function to be executed when the radiobutton is checked |



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

	[React, PropTypes, Style]

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
**/
import React from 'react'
import PropTypes from 'prop-types';
import Styles from './Selectors.module.css'

export default class RadioButton extends React.Component {

    _onChange = (event) => {
        this.props.onChange(this.props.label)
    }

    render() {
       
        const {
            label,
            name,
            checked,
        } = this.props
        return (
            <label 
                className={Styles.checkLabel}
            >
            {label}
            <input
                type="radio"
                checked={checked}
                name={name}
                onChange={this._onChange}
            />
            <span className={Styles.rCheckmark}></span>
            </label>
        )
    }
}

RadioButton.propTypes = {
    active: PropTypes.bool,
    checked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

RadioButton.defaultProps = {
    active: true,
    checked: false,
    label: 'Radio Button',
    name: 'default',
    onChange: noAction
};


function noAction() {
    console.warn('The RadioButton has no onchange function defined')
}