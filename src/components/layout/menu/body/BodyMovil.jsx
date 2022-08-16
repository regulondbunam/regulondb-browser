import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Icon from "@mui/material/Icon";

export function BodyMovil({ MENU_CONF, SetMenuView = () => {} }) {
  return (
    <div
      className="layout_menuBody_background"
      onClick={(e) => {
        if (e.target.className === "layout_menuBody_background") {
          SetMenuView(undefined);
        }
      }}
    >
      <List
        className="layout_menuBody"
        sx={{ width: "50%", bgcolor: "background.paper", float: "left" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className="layout_menuMovil_header">
              <h2 style={{ fontSize: "smaller" }}>RegulonDB Menu</h2>
              <button
                onClick={() => {
                  SetMenuView(undefined);
                }}
              >
                Close
              </button>
            </div>
          </ListSubheader>
        }
      >
        {MENU_CONF.map((menu) => {
          switch (menu.type) {
            case "HOME":
              return (
                <Link key={menu.id} to={menu.link} className={"item_home"}>
                  <ListItemButton
                    onClick={() => {
                      SetMenuView(undefined);
                    }}
                  >
                    <ListItemIcon>
                      <Icon>{menu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Link>
              );
            case "MENU":
              return (
                <SubMenu SetMenuView={SetMenuView} key={menu.id} menu={menu} />
              );
            default:
              console.error(`Menu type "${menu.type}" not defined`);
              return null;
          }
        })}
      </List>
    </div>
  );
}

function SubMenu({ menu, SetMenuView = () => {} }) {
  const [_expand, set_expand] = React.useState(false);
  let navigate = useNavigate();

  const handleClick = () => {
    if (menu?.options) {
      set_expand(!_expand);
    } else {
      SetMenuView(undefined);
      if (menu?.url) {
        window.open(menu.url, "_blank");
      }
      if (menu?.link) {
        navigate(menu.link, { replace: true });
      }
    }
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        {menu?.icon && (
          <ListItemIcon>
            <Icon>{menu.icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText primary={menu.title} />
        {menu?.options ? _expand ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {menu?.options && (
        <Collapse in={_expand} timeout="auto" unmountOnExit>
          {menu?.options &&
            menu.options.map((menu, index) => {
              return (
                <SubMenu
                  SetMenuView={SetMenuView}
                  key={`${index}_${menu.id}`}
                  menu={menu}
                />
              );
            })}
        </Collapse>
      )}
    </>
  );
}
