import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CodeIcon from '@mui/icons-material/Code';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

const DisplayOptions = () => {
    const [_viewOptions, set_viewOptions] = React.useState(false);

    const handleOpen = () => {
        set_viewOptions(!_viewOptions);
    }

    const list = () => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleOpen}
        >
          <List>
          <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PictureAsPdfIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"PDF"} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CodeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"JSON"} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FontDownloadIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Only Text"} />
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      );

      return (
        <div className='display_options_rdb' >
          <button className='display_options_button' onClick={handleOpen}>Display Options</button>
              <Drawer
                anchor={"right"}
                open={_viewOptions}
                onClose={handleOpen}
              >
                {list()}
              </Drawer>
        </div>
      );
};

export default DisplayOptions;