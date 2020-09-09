/**
# Component (user guide)

# Component name 
	
	[CheckBoxGrup]
	
## Description  
	
	[Component allows you to group checkbox components]

## Category   
	
	[Structural]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[---]

## Props 

| Prop          | Type     | Default  | Description |
| ------------- | -------- | -------- | ----------- |
| checkedOption | String   | ""       |             |
| dropdown      | boolean  | flase    |             |
| name          | string   | ""       |             |
| options       | array    | []       |             |
| style         | object   | {}       |             |
| title         | string   | ""       |             |
| onChange      | function | noAction |             |



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

	[React, PropTypes, ui-components CheckBox]

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

import React, {Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'


export default class CheckBoxGrup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkedLabel: this.props.checkedOptions,
            value: ""
        }
        this._onChange = this._onChange.bind(this);
    }

    _onChange = (label,checked) =>{
        let arr = this.state.checkedLabel
        if(checked){
            arr[this.state.checkedLabel.length] = label
            this.setState({checkedLabel: arr})
        }else{
            let indx = arr.indexOf(label)
            //console.log(indx)
            arr.splice(indx,1)
            this.setState({checkedLabel: arr})
        }
        
    }

    valueCheckedOptions(chekedState,option){
        let optionCheck = chekedState.find(o => o === option)
        if(optionCheck !== undefined){
            return true
        } else{
            return false
        }
    }

    render() {
        const {
            /*dropdown,*/
            name,
            options,
            /*style,*/
            title
        } = this.props
        return (
        <React.Fragment>
            {title}
            {options.map((op)=>
            
            <CheckBox key={op} value={this.state.value} name={name} label={op} checked={this.valueCheckedOptions(this.state.checkedLabel,op)} onChange={this._onChange} />
            )}
        </React.Fragment>)
    }

}

CheckBoxGrup.propTypes = {
    checkedOptions: PropTypes.array,
    dropdown: PropTypes.bool,
    GrupOf: PropTypes.elementType,
    name: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string
};

CheckBoxGrup.defaultProps = {
    checkedOptions: []
};