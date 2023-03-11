/**

# Component (deployment use)

# Menu
	
## Description  

[Componets that shows the overviewsData]

## Category   
	
Estructural


## Usage 
'''
      <Menu overviewsData={overviewsData} />
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| overviewsData          |  Object    |Undefined         | Returns the data of the overviews            |
|           |      |         |             |


## License

MIT License

## Author 
	
RegulonDB Team: 
[
  Elizabeth Ochoa Praxedis  <elizabethochoap23@gmail.com>
  Gabriel Alarcon Carranza  <galarcon@ccg.unam.mx>
]

# Component (development use)

## Component Type 

    Simple Component
  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import Search from "./Search"
import Dropdown from "./Dropdown"
import List from '@mui/material/List';
import PropTypes from 'prop-types'
'''


# Functions description

## [OverviewsGroups]

__Description:__  
This function groups the overviews using a objectType

__Usage:__
const OverviewsGroups = () => {
        let OverviewsGroup = {};
        overviewsData.forEach((overview) => {
            let objectType = overview.objectType;
            if(Array.isArray(OverviewsGroup[objectType])){
                OverviewsGroup[objectType].push(overview);
            }else{
                OverviewsGroup[objectType] = [];
                OverviewsGroup[objectType].push(overview);
            }
        });
        return OverviewsGroup
    }
__Scope: __

[private]

__Input Parameter:__  
 __vale__ [Description]

__Return:__  
 __value__ [Dropdown of the overviews group by an objectType]
        
 * 
 */

import Search from "./Search"
import Dropdown from "./Dropdown"
import List from '@mui/material/List';
import PropTypes from 'prop-types'

/**
 * This function shows the overviewsData
 * @param {object} overviewsData - Returns the data of the overviews
 * @returns {ReactElement} 
 */
export default function Menu({overviewsData}) {
    console.log(overviewsData)
    if(!overviewsData) return null;
    
    /**
     * Fucntion to group the data from overviewsData by objectType
     * @returns 
     */
    const OverviewsGroups = () => {
        let OverviewsGroup = {};
        overviewsData.forEach((overview) => {
            let objectType = overview.objectType;
            if(Array.isArray(OverviewsGroup[objectType])){
                OverviewsGroup[objectType].push(overview);
            }else{
                OverviewsGroup[objectType] = [];
                OverviewsGroup[objectType].push(overview);
            }
        });
        return OverviewsGroup
    }


    return(
        <div>
            <Search overviewsData = {overviewsData} get_overviewsDataFiltered={(overviewsData)} />
            <br />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader" >
                    {
                        Object.keys(OverviewsGroups()).map((key, index) => {
                            let overviewGroup = OverviewsGroups()[key];
                             return(                               
                                 <Dropdown key={`DropdomnComponent_${index}`} groupName={key} overviewGroup={overviewGroup} />                               
                             )
                        })
                    }
            </List>
        </div>        
    )
}

Menu.propTypes = {
    overviewsData: PropTypes.array
}

Menu.defaultProps = {
    overviewsData: undefined
}