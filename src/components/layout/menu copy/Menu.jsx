import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoRegulonDB from "../logos/regulonDB.png";
import MenuData from "../conf/menu/menu.conf";
import MenuItem from "./Item";
import Body from "./Body";
import "./menu.css";

const BUTTON_HOME_STYLE = {
  border: "solid 4px #ffffff",
  backgroundColor: "#32617d",
  color: "#ffffff",
  height: "60px",
  width: "60px",
  float: "left",
};

const MENU_CONF = MenuData.menu;
export const idMenu = "rdbMenu"
function Menu() {
  const [_menuView, set_menuView] = useState();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  let MenuComponent = isMobile ? MenuMovil : MenuDesktop;

  return (
    <div id={idMenu} className="noPrint" >
      <MenuComponent
        menuView={_menuView}
        SetMenuView={(menuView) => {
          set_menuView(menuView);
        }}
      />

      {_menuView && (
        <div
          className="layout_menu_body"
          onMouseLeave={() => {
            set_menuView(undefined);
          }}
        >
          <Body
            MENU_CONF={MENU_CONF}
            id={_menuView}
            SetMenuView={(menuView) => {
              set_menuView(menuView);
            }}
          />
        </div>
      )}
    </div>
  );
}

function MenuMovil({ menuView, SetMenuView }) {
  return (
    <div className="layout_menuMovil_grid">
      <div className="layout_menuMovil_menu">
        <IconButton
          onClick={() => {
            SetMenuView("leftMenu");
          }}
          style={BUTTON_HOME_STYLE}
        >
          <MenuIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </div>
      <div className="layout_menuMovil_logo">
        <img
          className="layout_menu_LogoRDB"
          src={LogoRegulonDB}
          alt="Logo RegulonDB"
        />
      </div>
      <div className="layout_menuMovil_search">
        <IconButton
          onClick={() => {
            SetMenuView("searchTool");
          }}
          style={BUTTON_HOME_STYLE}
        >
          <SearchIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </div>
    </div>
  );
}

function MenuDesktop({ menuView, SetMenuView }) {
  return (
    <div>
      <div className="layout_menu_background">
        <div className="menuItem_conteiner">
          {MENU_CONF?.map((item, index) => {
            return (
              <div key={"menu_item_" + index}>
                <MenuItem
                  item={item}
                  menuBody={menuView}
                  set_menuBody={(menuBody) => {
                    SetMenuView(menuBody);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Menu;

/**.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 4 / 2 / 5; }
.div5 { grid-area: 1 / 5 / 2 / 6; } */
