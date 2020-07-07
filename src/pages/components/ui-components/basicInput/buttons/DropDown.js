/**
# Component (user guide)

# Component name 
	
	[DropDown]
	
## Description  
	
	[The DropDown button allows the user an interactivity with several options in an agile way, this component when pressed displays a box with multiple options]

## Category   
	
	[Visual]  

## Live demo 
	
	[-]


## Installation 

	[-]

## Usage 
	
	[example: <DropDown content={options} onSelect={dropSelect}/> ]

## Props 

  | prop name   | Type     | Default                                                  | Description                                                  |
| ----------- | -------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| active      | boolean  | true                                                     | enables or disables the button                               |
| content     | array    | []                                                       | receives an array type variable containing the options to be displayed in the dropdown |
| label       | string   | "DropDown"                                               | "dropdown label"                                             |
| labelUpdate | boolean  | true                                                     | enables the update of the dropdown label when an option is selected |
| style       | object   | {width: "auto", paddingLeft: "5px", paddingRight: "5px"} | style of dropdown                                            |
| onSelect    | function | noAction(value)                                          | receives the function that will be executed when an option is selected, the function revives the 'value' parameter containing the selected array element |



## Exception
	__Category (Error, Warning or Message)__  
	Description of the exception (if necessary)

## License

	[License details]

## Author 
	
	[CCG-UNAM-RegulonDB]

**/


/**
# Component (technical guide)

## Component Type 

	[stateless]

## Dependencies

	[React, { Component },PropTypes, RegulonDB-uicomponents Button]

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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Styles from './Buttons.module.css'

const arrowDown = "keyboard_arrow_down"
const arrowUp = "keyboard_arrow_up"
const styleDropDown = {
    width: "auto",
    paddingLeft: "5px",
    paddingRight: "5px"
}

export default class DropDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expand: this.props.expand,
            label: this.props.label
        }
    }

    onSelect = (event) => {
        const value = event.target.id;
        this.props.labelUpdate ? this.setState({ label: value }) : this.setState({ label: this.state.label })
        this.setState({ expand: !this.state.expand })
        this.props.onSelect(value)

    }

    expandDrop = (event) => {
        if (this.props.active) {
            this.setState({ expand: !this.state.expand })
        }
    };

    noActionN = () => {

    }

    render() {
        const {
            active,
            content,
            style
        } = this.props;
        const {
            label,
            expand
        } = this.state;

        return (
            <React.Fragment>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet" />
                <Button onClick={this.expandDrop} active={active} style={style}>
                    {label}
                    <i className="material-icons">
                        {
                            expand
                                ? arrowUp
                                : arrowDown
                        }</i>
                </Button>
                {
                    expand
                        ? <div className={Styles.dropBox} onClick={this.onSelect}>
                            {
                                content.map((value) =>
                                    <Button id={value} key={value} style={{ marginBottom: "2px", width: "100%" }} onClick={this.noActionN}>
                                        {value}
                                    </Button>
                                )}
                        </div>
                        : <div />
                }
            </React.Fragment>

        )

    }
}

function noAction(value) {
    console.warn('Select item ' + value + ' has no activity')
}

DropDown.propTypes = {
    active: PropTypes.bool,
    content: PropTypes.array,
    expand: PropTypes.bool,
    label: PropTypes.string,
    labelUpdate: PropTypes.bool,
    onselect: PropTypes.func,
    style: PropTypes.object
};

DropDown.defaultProps = {
    active: true,
    content: [],
    expand: false,
    label: "DropDown",
    labelUpdate: true,
    onSelect: noAction,
    style: styleDropDown
};

