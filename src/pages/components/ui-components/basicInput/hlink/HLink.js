/**
# Component (user guide)

# Component name 
	
	[Link]
	
## Description  
	
	[This component presents the functionality of a Link]

## Category   
	
	[Visual]  

## Live demo 
	
	[]


## Installation 

	[-]

## Usage 
	
	[]

## Props 

  


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

	[statles funcional component]

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

import React from 'react';
import PropTypes from 'prop-types';

const disabledStyle = {
    color: "#666666",
    fontFamily: "sans-serif",
}

const accentStyle = {
    color: "#cc9900",
    fontFamily: "sans-serif"
}

const simpleStyle = {
    color: "#ffffff",
    fontFamily: "sans-serif",
    textDecoration: "none"
}


const Link = ({
    disabled,
    href,
    style,
    target,
    children,
    regulonStyle
}) => {

    let prefStyle;

    switch (regulonStyle) {
        case "accent":
            prefStyle = Object.assign({},style, accentStyle)
            break;
        case "simple":
            prefStyle =  Object.assign({},style, simpleStyle)
            break;
        default:
            prefStyle = style
            break;
    }

    return (
        <>
            {
                disabled
                    ? <a href={href} style={disabledStyle} target={target}>
                        {children}
                    </a>
                    : <a href={href} style={prefStyle} target={target}>
                        {children}
                    </a>
            }
        </>
    );
}

export default Link;


Link.propTypes = {
    disabled: PropTypes.bool,
    href: PropTypes.string,
    style: PropTypes.object,
    regulonStyle: PropTypes.string,
    target: PropTypes.string,
    children: PropTypes.string,
};

Link.defaultProps = {
    disabled: false,
    href: "",
    style: {},
    regulonStyle: "",
    target: "_top",
    children: "link"
};

