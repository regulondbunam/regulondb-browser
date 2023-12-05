import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Cloud from '@mui/icons-material/Cloud';

const SCHEMA_notebook = {
    name: "",
    description: "",
    rawURL: "",
    code: {}
}

export default function NotebooksMenu({setView, confNotebooks = [], handleUrl=()=>{}}) {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={()=>{setView(0)}} >
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Readme</ListItemText>
        </MenuItem>
        <Divider />
        {
            confNotebooks.map((notebook = SCHEMA_notebook,index)=>{
              //console.log();
                return(
                    <MenuItem onClick={()=>{handleUrl(notebook.rawUrl)}}  >
                        <ListItemIcon>
                            <Cloud fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{notebook.name}</ListItemText>
                    </MenuItem>
                )
            })
        }
        
      </MenuList>
    </Paper>
  );
}