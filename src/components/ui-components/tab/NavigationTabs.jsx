import React, { useState, useEffect } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { headerStyle, StyledTab, StyledTabs } from "./style"

const idNavTabs = "regulonDBNavTabs"
export { idNavTabs }

function scrollFunction(tabs = [], setValue) {

  if (
    document.body.scrollTop > 260 ||
    document.documentElement.scrollTop > 260
  ) {
    let headerNav = document.getElementById("headerNav")
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (headerNav) {
      headerNav.className = Style.headerNavShow
      headerNav.style.display = "flex"
      tabs.forEach((tab) => {
        const elementTab = document.getElementById(tab.id)
        if (elementTab && !tab.noTab) {
          const {y,height} = elementTab.getBoundingClientRect()
          const hNav = headerNav.getBoundingClientRect().height
          if(y<=hNav+75 && y+height >= y*-1 ){
            setValue(tab.id)
          }
        }
      })
    }
    if (headerNavTabs) {
      headerNavTabs.className = Style.headerSticky
    }
  } else {
    let headerNav = document.getElementById("headerNav")
    if (headerNav) {
      headerNav.style.display = "none"
    }
  }
}

function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {

  const [value, setValue] = useState(tabSelect);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction(tabs,setValue);
    };
    let navTabs = document.getElementById(idNavTabs);
    if (navTabs) {
      navTabs.addEventListener(
        "updateTabs",
        function (e) {
          if (e.detail.id) {
            setValue(e.detail.id)
          }
        },
        false
      );
    }
    return function cleanup() {
      window.onscroll = function () { };
    };
  }, [tabs]);

  const handleChange = (event, newValue) => {
    let section = document.getElementById(newValue);
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (section) {
      let rect = section.getBoundingClientRect();
      let headerRect = headerNavTabs.getBoundingClientRect()
      let move = document.documentElement.scrollTop
      if (rect.y > headerRect.height) {
        move = move - headerRect.height
      } else {
        move = move + headerRect.height - 215
      }
      window.scroll({
        top: rect.y + move,
      });
    }
    setValue(newValue);
  };

  return (
    <div id={idNavTabs}>
      <div id="headerNavTabs" className="noPrint">
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
                  <div >
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
            {tabs.map((tab, index) => {
              if (tab.position === "aside") {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationTabs;
