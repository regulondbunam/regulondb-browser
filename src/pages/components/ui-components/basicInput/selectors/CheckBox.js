/**
# Component (user guide)

# Component name 
	
	[CheckBox]
	
## Description  
	
	[This component allows the user to make a binary choice, i.e. a choice between one of two possible mutually exclusive options]

## Category   
	
	[Visual]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[to make use of this component you can use a CheckBoxGrup or use it only with the label <CheckBox label={""} onChange={function}/>]

## Props 

  | Prop     | Type     | Default    | Description                                                  |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| active*  | boolean  | true       | Enables or disables the checkbox                             |
| cheked   | boolean  | false      | check or uncheck checkbox                                    |
| label    | String   | "checkBox" | CheckBox Label                                               |
| onChange | function | noAction() | eceives a function to be executed when the checkBox is checked |



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

	[stateful]

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

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.checked,
            checked: this.props.checked
        };
    
        this._handleOnChange = this._handleOnChange.bind(this);
      }

    _handleOnChange = (event) => {
        this.setState({value: event.target.value, checked: !this.state.checked});
        this.props.onChange(this.props.label,event.target.checked);
    }

    render() {
        const {
            label,
        } = this.props
        const {
            value,
            checked
        } = this.state
        return (
            <label className={Styles.checkLabel}>
                <div className={Styles.checkText}>{label}</div>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={this._handleOnChange}
                    value={value}
                />
                <span className={Styles.checkmark}></span>
            </label>
        )
    }
}

Checkbox.propTypes = {
    active: PropTypes.bool,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    active: true,
    checked: false,
    label: 'checkBox',
    onChange: noAction
};

function noAction(mod) {
    console.error('The CheckBox State is undefined')
}