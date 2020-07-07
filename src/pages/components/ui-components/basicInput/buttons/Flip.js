/**
# Component (user guide)

# Component name 
	
	[Flip]
	
## Description  
	
	[Description Details]

## Category   
	
	[Visual]  

## Live demo 
	
	[]


## Installation 

	[]

## Usage 
	
	[example: <Flip label={"Left"} orientation={'l'}/> ]

## Props 

| prop name   | Type     | Default    | Description                                                  |
| ----------- | -------- | ---------- | ------------------------------------------------------------ |
| active      | boolean  | true       | enables or disables the button                               |
| label       | String   | "button"   | Button label                                                 |
| orientation | String   | "r"        | Visual aspect of the Flip button you can use the terms: **r** to rigth direction button or **l** to left direction. |
| onClick     | function | noAction() | receives a function to be executed when the press flip button |



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

	[stateless]

## Dependencies

	[React, { Component },PropTypes, RegulonDB-uicomponents IconButton]

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
import IconButton from './IconButton';
import Styles from './Buttons.module.css'

const defOrientation = 'r'
const styleLeft = {
    float: "left",
    marginRight: "2px"
}

export default class Flip extends Component {

    handleOnClickLink = (event) => {
        if(this.props.active){
            this.props.onClick(event);
        }
    };

    render() {
        const {
            active,
            label,
            orientation,
        } = this.props;
        // eslint-disable-next-line no-unused-vars
        let orientationIcon;
        switch(orientation){
            case 'l':
                orientationIcon ='keyboard_arrow_left'
                return(
                    <React.Fragment>
                        <div className={Styles.flipComponent}>
                        <IconButton active={active} style={styleLeft} icon={orientationIcon} onClick={this.handleOnClickLink}/>
                        {label}
                        </div>
                    </React.Fragment>
                )
            case 'u':
                orientationIcon = 'keyboard_arrow_up'
                return(
                    <React.Fragment>
                        <div>
                        <IconButton active={active} style={styleLeft} icon={orientationIcon} onClick={this.handleOnClickLink}/>
                        {label}
                        </div>
                    </React.Fragment>
                )
            case 'd':
                orientationIcon = 'keyboard_arrow_down'
                return(
                    <React.Fragment>
                        <div>{label}</div><IconButton onClick={this.handleOnClickLink}/>
                    </React.Fragment>
                )
            case 'r':
                orientationIcon = 'keyboard_arrow_right'
                return(
                    <React.Fragment>
                        <div className={"flip"}>
                        {label}
                        <IconButton active={active} style={styleLeft} icon={orientationIcon} onClick={this.handleOnClickLink}/>
                        </div>
                    </React.Fragment>
                )
            default:
                console.warn("FipButton: no orientation selected")
                orientationIcon = 'keyboard_arrow_right'
                return(
                    <React.Fragment>
                        <div>{label}</div><IconButton/>
                    </React.Fragment>
                )
        }
        
    }
}

function noAction() {
    console.warn('Button has no activity')
}

Flip.propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    orientation: PropTypes.string,
    onClick: PropTypes.func
};

Flip.defaultProps = {
    active: true,
    label: "Next",
    orientation: defOrientation,
    onClick: noAction
};