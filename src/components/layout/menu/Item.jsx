import React from "react";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const BUTTON_HOME_STYLE = {
  border: "solid 4px #ffffff",
  color: "#ffffff",
  height: "60px",
  width: "60px",
  float: "left",
  marginRight: "3%",
};

const BUTTON_MENU_STYLE = {
  color: "#ffffff",
  fontSize: "1vmax",
  boxShadow: "none",
  backgroundColor: "#32617d",
  height: "60px",
  textTransform: "none"
};

const BUTTON_MENU_ACTIVE_STYLE = {
  color: "#ffffff",
  boxShadow: "none",
  backgroundColor: "#72a7c7",
  height: "60px",
  textTransform: "none"
};

function MenuItem({ item, menuBody, set_menuBody = () => {} }) {
  switch (item.type) {
    case "HOME":
      return (
        <Link to={item.link} className={"item_home"} >
          <IconButton style={BUTTON_HOME_STYLE}>
            <HomeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      );
    case "MENU":
      //console.log(item.title);
      return (
        <Button
          className={"item_menu"}
          variant="contained"
          size="large"
          onClick={() => {
            if (menuBody === item.id) {
              set_menuBody(undefined);
            } else {
              set_menuBody(item.id);
            }
          }}
          style={
            menuBody === item.id ? BUTTON_MENU_ACTIVE_STYLE : BUTTON_MENU_STYLE
          }
        >
          {item.title}
        </Button>
      );
    default:
      console.warn("MenuItem: type not found");
      return <div></div>;
  }
}

export default MenuItem;
