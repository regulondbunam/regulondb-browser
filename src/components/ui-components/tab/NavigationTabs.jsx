import React, { useState, useEffect } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { headerStyle, StyledTab, StyledTabs } from "./style"
const idNavTabs = "regulonDBNavTabs"
export { idNavTabs }

function scrollFunction() {

  if (
    document.body.scrollTop > 260 ||
    document.documentElement.scrollTop > 260
  ) {
    let headerNav = document.getElementById("headerNav")
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (headerNav) {
      headerNav.className = Style.headerNavShow
      headerNav.style.display = "flex"
    }
    if (headerNavTabs) {
      headerNavTabs.className = Style.headerSticky
    }

  } else {
    let headerNav = document.getElementById("headerNav")
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (headerNav) {
      headerNav.style.display = "none"
    }
  }
}

function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {
  const [value, setValue] = useState(tabSelect);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
    return function cleanup() {
      window.onscroll = function () { };
    };
  }, []);

  const handleChange = (event, newValue) => {
    let section = document.getElementById(newValue);
    if (section) {
      let rect = section.getBoundingClientRect();
      let move = 106;
      if (document.body.scrollTop < 120) {
        move = move + 100;
      }
      //console.log(rect.y,window.pageYOffset);
      window.scroll({
        top: rect.y + document.body.scrollTop - move,
        behavior: "smooth",
      });

    }
    setValue(newValue);
  };

  return (
    <div>
      <div id="headerNavTabs">
        <HeaderNav title={title} />
        <div id={idNavTabs} className={Style.tabHeader} style={headerStyle}>
          <Box>
            <StyledTabs
              variant="scrollable"
              scrollButtons
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              {tabs.map((tab, index) => {
                if (tab.noTab) {
                  return null
                }
                const TabElement = (
                  <div>
                    {tab.subtitle && (<div>{tab.subtitle}</div>)}
                    <div className={Style.tab_name}>{tab.name}</div>
                  </div>
                );
                return (
                  <StyledTab
                    value={tab.id}
                    key={`operon_tab${index}_${tab.id}`}
                    icon={TabElement}
                  />
                );
              })}
            </StyledTabs>
          </Box>
        </div>
      </div>
      <div>
        <div>
          <div>
            {tabs.map((tab, index) => {
              if (tab.position === "head") {
                return (
                  <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                    <br />
                    {tab.component}<br />
                  </div>
                )
              }
              return null
            })}
          </div>
          <div className={Style.container} >
            <div className={Style.article}>
              {tabs.map((tab, index) => {
                if (!tab.position) {
                  return (
                    <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                      {tab.component}<br />
                    </div>
                  )
                }
                return null
              })}
            </div>
            <div className={Style.aside} >
              Hola
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationTabs;
