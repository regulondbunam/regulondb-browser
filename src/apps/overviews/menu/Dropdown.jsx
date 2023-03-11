/**

# Component (deployment use)

# Dropdown
	
## Description  

[component that shows us the overviews through a dropdown group by an objectType]

## Category   
	
Estructural

## Usage 
'''
    return(
     <Dropdown key={`DropdomnComponent_${index}`} groupName={key} overviewGroup={overviewGroup} />
     )
'''
## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|    overviewGroup       | Object     | Undefined        | overviews groups            |
|    groupName       |Object      | Undefined        | groups the overviews depending on the name            |



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

    Stateful Component

  [Simple Component,Stateful Component,An Application]

## Dependencies

'''
import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Style from "./dropdown.module.css"
import Style from "./color.module.css"
'''

## States
	
| Property | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|  open     | Object      | undefined       | Opens the list of overviews            |
|           |      |         |             |


# Functions description

## [handleClick]

__Description:__  
Function that makes the dropdown displayed

__Usage:__
const handleClick = () => {
        setOpen(!open);
    };
__Scope: __  

[private]

__Input Parameter:__  
 __vale__ [Description]

__Return:__  
 __value__ [List of the overviews]

 * 
 */

import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Style from "./dropdown.module.css"
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

const THEME = createTheme({
    palette: {
      primary: {
        main: '#32617D',
        text: '#ffffff',
      },
      secondary: {
        main: '#D5E2EA',
      },
    },
  });

  /**
   * overviews dropdown list
   * @param {object} overviewGroup - overview information
   * @param {object} groupName - names of the overview groups
   * @return {ReactElement} 
   */
export default function Dropdown({overviewGroup, groupName}) {
    const [open, setOpen] = React.useState(true);

    /**
     * Function that makes the dropdown displayed
     */
    const handleClick = () => {
      setOpen(!open);
    };

    /**
     * Allows navigation between pages
     * @const {object}
     */
    const navigate = useNavigate();

    
    return(     

        <React.Fragment>       
          <ThemeProvider theme={THEME}>
            <ListItemButton role="dropdownList" sx={{ bgcolor: 'primary.main',color:'primary.text'}} alignItems="center" className ={Style.dropdown+" "+Style.droptownTitle} onClick={handleClick}>
                <ListItemText  primary={groupName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List className ={Style.dropdown} component="div" disablePadding>
                    {
                        overviewGroup.map((overview, index) => {
                            return(                            
                                <ListItemButton onClick={() => navigate(overview._id)} sx={{ bgcolor: 'secondary.main'}} key={"overview_element_from_"+groupName+"_"+index}>                                                                                              
                                   <ListItemText primary={overview.graph.title} />
                                </ListItemButton>                       
                            )
                        })
                    }
                </List>
            </Collapse>
            </ThemeProvider>            
        </React.Fragment> 
    )
}

Dropdown.propTypes = {
  overviewGroup: PropTypes.object,
  groupName: PropTypes.object
}

Dropdown.defaultProps = {
  overviewGroup: '',
  groupName: ''
}