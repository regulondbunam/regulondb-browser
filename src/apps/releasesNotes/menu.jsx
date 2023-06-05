import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon  from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
const drawerWidth = 170;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function Menu({children, releasesVersion = [], regulonDBVersion }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const viewDrawer = () => {
    setOpen(!open);
  };
  //console.log(releasesVersion);
  return (
    <div style={{ display: "flex", flexDirection: "column"}} >
      <div>
        <Toolbar style={{padding: 0 }}>
          <div style={{ width: drawerWidth  }}>
            <DrawerHeader>
              <List>
                <ListItemButton disablePadding
                  color="inherit"
                  aria-label="open drawer"
                  onClick={viewDrawer}
                  edge="start"
                >
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary={"History Releases"} />
                </ListItemButton>
              </List>
            </DrawerHeader>
          </div>
          <h1>
            {`RegulonDB version ${regulonDBVersion} release note`}
          </h1>
        </Toolbar>
      </div>
      <div style={{display: "flex"}}>
        <Drawer
          sx={{
            width: drawerWidth,
            height: "100vh",
            flexShrink: 0,

            '& .MuiDrawer-paper': {
              position: "initial",
              width: drawerWidth,
              overflowX: "hidden",
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Divider />
          <List>
            {releasesVersion.map((release, index) => (<MenuItem key={"releaseItem" + release.releaseDate} regulonDBVersion={regulonDBVersion} release={release} />))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
        {children}
      </Main>
      </div>
      

    </div>

  );
}

function MenuItem({ release, regulonDBVersion }) {
  let style = { width: drawerWidth, }
  if (release.regulonDBVersion === regulonDBVersion) {
    style = {
      backgroundColor: "#72a7c7",
      color: "white",
      width: drawerWidth,
    }
  }
  return (
    <ListItem disablePadding   >
      <Link to={"./" + release.regulonDBVersion} >
        <ListItemButton style={style} >
          <ListItemText primary={release.regulonDBVersion}
            secondary={release.releaseDate} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}