/**
# Component (user guide)

# Component name 
	
	[Table]
	
## Description  
	
	[---]

## Category   
	
	[Visual/Structural]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[---]

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
import Item from '../items/Item'
import Modal from '../Modal/Modal'

import Styles from './Table.module.css';

const deployments = {
	default: 'd',
	vertical: 'v',
	horizontal: 'h',
	verticalR: 'vr'
}

export default class Table extends Component {

	setup_deployment(dataType, deployment_type) {
		let displayType = deployments[deployment_type]
		if (displayType !== undefined) {
			if (dataType) {
				switch (displayType) {
					case 'd':
					case 'h':
						return 'h'
					case 'v':
					case 'vr':
						return 'vr'
					default:
						return 'h'
				}
			} else {
				switch (displayType) {
					case 'd':
					case 'vr':
					case 'v':
						return 'v'
					case 'h':
						return 'h'
					default:
						return 'v'
				}
			}
		} else {
			console.error("prop deployment_type: " + deployment_type + " invalid")
		}
		return 'v'
	}

	getKeys = function () {
		return Object.keys(this.props.data[0]);
	}

	getHeader = function () {
		var keys = this.getKeys();
		return keys.map((key, index) => {
			return <th key={key}>{key.toUpperCase()}</th>
		})
	}

	getRowsData = function () {
		var items = this.props.data;
		var keys = this.getKeys();
		return items.map((row, index) => {
			return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
		})
	}


	render() {
		const {
			data,
			deployment_type,
			name
		} = this.props
		const displayType = this.setup_deployment(Array.isArray(data), deployment_type)
		let display
		switch (displayType) {
			case 'v':
				display = displayVertical(name, data)
				break
			case 'h':
				display = displayHorizontal(name,this.getHeader(), this.getRowsData())
				break
			default:
				console.error("NO TABLE SUPORT")
		}
		return (
			<React.Fragment>
				{display}
			</React.Fragment>
		)

	}
}

const RenderRow = (props) => {
	return props.keys.map((key, index) => {
		return <td key={index}>
			{props.data[key]}
		</td>
	})
}

function RenderRowVertial(row) {
	return row.map((info, index) => {
		if (info.length > 30) {
			info = ShowInfo(row[0], info)
		}
		return <td key={index} style={{ paddingLeft: "20px" }}>{
			info
		}</td>
	})
}

function ShowInfo(key, info) {
	return (
		<Modal title={"view: " + key} info={info}></Modal>
	)
}

function displayVertical(name, data) {
	return (
		<div>
			<table className={Styles.tableComponent}>
				<thead>
					<tr>
						<th colSpan="2"><Item width="100%" model="clear" style={thStyle}>{name}</Item></th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(data).map((key, index) => {
						const row = RenderRowVertial([key, data[key]])
						return <tr key={index}>{row}</tr>
					})}
				</tbody>
			</table>
		</div>
	)
}
function displayHorizontal(name,getHeader, getRowsData) {
	return (
		<div>
			<table className={Styles.tableComponent}>
				<thead>
					<tr>
						<th colSpan={getHeader.length}><Item width="100%" model="clear" style={thStyle}>{name}</Item></th>
					</tr>
					<tr>{getHeader}</tr>
				</thead>
				<tbody>
					{getRowsData}
				</tbody>
			</table>
		</div>
	)
}
/* esta funcion es parte de una caracteristica a implementar a futuro
function displayVerticalR(data) { }
*/
const thStyle = {
	fontSize: "30px",
	fontFamily: "arial",
	paddingLeft: "20px",
	paddingTop: "5px",
	paddingBottom: "5px"
}


Table.propTypes = {
	columnStyle: PropTypes.object,
	data: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	]),
	deployment_type: PropTypes.string,
	headStyle: PropTypes.object,
	name: PropTypes.string,
	rowStyle: PropTypes.object,
	type: PropTypes.string
}

Table.defaultProps = {
	columnStyle: {},
	data: {},
	deployment_type: "default",
	headStyle: {},
	name: "",
	rowStyle: {},
	type: "default"
}

/**
 * getRowsData = function () {
		var items = this.props.data;
		console.log(items)
		var keys = this.getKeys();
		if(Array.isArray(items)){
			return items.map((row, index) => {
				return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
			})
		}else{
			return Object.keys(items).map((row, index) => {
				row = items[row]
				console.log(index+" i "+row)
				return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
			})
		}

	}
 */