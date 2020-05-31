/**
# Component (user guide)

# Component name 
	
	[Split]
	
## Description  
	
	[-]

## Category   
	
	[Visual]  

## Live demo 
	
	[-]


## Installation 

	[-]

## Usage 
	
	[example: <Split options={options} onClick={action}></Split> ]

## Props 

  | prop name     | Type     | Default                                              | Description                                 |
| ------------- | -------- | ---------------------------------------------------- | ------------------------------------------- |
| active        | boolean  | true                                                 | enables or disables the button              |
| expand        | boolean  | false                                                | habilita el cuadro de seleccion de opciones |
| label         | string   | "button"                                             | Button label                                |
| options       | array    | []                                                   |                                             |
| onClick       | function | noAction                                             |                                             |
| styleButton   | object   | {float: "left", marginRight: "2px"}                  |                                             |
| styleDropDown | object   | {width: "auto", paddingLeft: "0", paddingRight: "0"} |                                             |



## Exception
	__Category (Error, Warning or Message)__  
	Description of the exception (if necessary)

## License

	[---]

## Author 
	
	[CCG-UNAM-RegulonDB]

**/


/**
# Component (technical guide)

## Component Type 

	[stateless]

## Dependencies

	[React { Component },PropTypes, RegulonDB-uicomponents {Button, DropDown}]

## States
	
	| State  | Value | Description |
    | ------ | ----- | ----------- |
    | label  | ""    |             |
    | expand | false |             |
	

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


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import DropDown from './DropDown'
//import Styles from './Buttons.module.css'


const styleDropDown = {
    width: "auto",
    paddingLeft: "0",
    paddingRight: "0"
    
}
const styleButton = {
    float: "left",
    marginRight: "2px"
}


export default class Split extends Component {

    constructor(props) {
        super(props)
        this.state = {
            label: this.props.label,
            expand: this.props.expand
        }
    }

    selected = (value) =>{
        this.setState({label: value})
    }

    onClickB = () => {
        if(this.props.active){
            this.props.onClick(this.state.label);
        }
    };


    render() {
        const {
            active,
            options,
            styleButton,
            styleDropDown
            
        } = this.props;
        const {
            label,
            expand
        } = this.state
            return (
                <React.Fragment>
                    <Button label={label} onClick={this.onClickB} style={styleButton} active={active}/>
                    <DropDown label={""} active={active} content={options} style={styleDropDown} expand={expand} labelUpdate={false} onSelect={this.selected}/>
                </React.Fragment>
            )
    }
}

function noAction() {
    console.warn('Button has no activity')
}

Split.propTypes = {
    active: PropTypes.bool,
    expand: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.array,
    onClick: PropTypes.func,
    styleButton: PropTypes.object,
    styleDropDown: PropTypes.object
};

Split.defaultProps = {
    active:  true,
    expand: false,
    label: "select option =>",
    options: [],
    onClick: noAction,
    styleButton: styleButton,
    styleDropDown: styleDropDown
};