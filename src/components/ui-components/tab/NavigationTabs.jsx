import React, { useState, useEffect } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { StyledTab, StyledTabs } from "./style"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const idNavTabs = "regulonDBNavTabs"
export { idNavTabs }

function scrollFunction(tabs = [], setValue, setSection, title = "") {
  let buttonHideMenu = document.getElementById("buttonHideMenu")
  if (
    document.body.scrollTop > 260 ||
    document.documentElement.scrollTop > 260
  ) {
    let headerNav = document.getElementById("headerNav")
    let headerNavTabs = document.getElementById("headerNavTabs")
    let navMenuTabs = document.getElementById("navMenuTabs")


    if (headerNav) {
      headerNav.className = Style.headerNavShow
      headerNav.style.display = "flex"
      tabs.forEach((tab) => {
        const elementTab = document.getElementById(tab.id)
        if (elementTab && !tab.noTab) {
          const { y, height } = elementTab.getBoundingClientRect()
          const hNav = headerNav.getBoundingClientRect().height
          if (y <= hNav + 75 && y + height >= y * -1) {
            setSection(`${title}, ${tab.subtitle ? tab.subtitle+":" : ""} ${tab.name}`)
            setValue(tab.id)
          }
        }
      })
    }
    if (headerNavTabs) {
      headerNavTabs.className = Style.headerSticky
    }
    if (navMenuTabs) {
      navMenuTabs.className = Style.menuSticky
    }
    if (buttonHideMenu) {
      buttonHideMenu.className = Style.hideMenuSticky
    }
  } else {
    let headerNav = document.getElementById("headerNav")
    if (headerNav) {
      headerNav.style.display = "none"
    }
    if (buttonHideMenu) {
      buttonHideMenu.className = Style.hideMenu
    }
  }
}

function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {

  const [value, setValue] = useState(tabSelect);
  const [section, setSection] = useState(title);
  const [viewMenu, setViewMenu] = useState(true);


  useEffect(() => {
    window.onscroll = function () {
      scrollFunction(tabs, setValue, setSection, title);
    };
    let buttonHideMenu = document.getElementById("buttonHideMenu")
    if (buttonHideMenu) {
      if (
        document.body.scrollTop > 260 ||
        document.documentElement.scrollTop > 260
      ) {
        buttonHideMenu.className = Style.hideMenuSticky
      } else {
        buttonHideMenu.className = Style.hideMenu
      }
    }
    let navMenuTabs = document.getElementById("navMenuTabs")
    if (navMenuTabs) {
      navMenuTabs.className = Style.menuSticky
    }
    return function cleanup() {
      window.onscroll = function () { };
    };
  }, [tabs, viewMenu, title]);


  const handleMenu = () => {
    let navBody = document.getElementById("navBody")
    if (navBody) {
      if (viewMenu) {
        navBody.className = Style.navBodyMenuHide
      } else {
        navBody.className = Style.navBody
      }
      setViewMenu(!viewMenu)
    }

  }
  const handleChange = (event, newValue) => {
    let tabSelect = tabs.find(tab=>tab.id === newValue)
    let sectionElement = document.getElementById(newValue);
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (sectionElement) {
      let rect = sectionElement.getBoundingClientRect();
      let headerRect = headerNavTabs.getBoundingClientRect()
      let move = document.documentElement.scrollTop
      if (rect.y > headerRect.height) {
        move = move - headerRect.height
      } else {
        move = move + headerRect.height - 175
      }
      window.scroll({
        top: rect.y + move,
        behavior: 'smooth'
      });
    }
    if (tabSelect) {
      setSection(`${title}, ${tabSelect.subtitle ? tabSelect.subtitle+":" : ""} ${tabSelect.name}`)
    }
    setValue(newValue);
  };
  return (
    <div id={idNavTabs}>
      <div id="headerNavTabs" className="noPrint" >
        <HeaderNav title={section} />
      </div>
      <div id="navBody" className={Style.navBody} >
        {viewMenu ? (
          <div className={Style.navMenu} >
            <div id="navMenuTabs" className={Style.tabHeader} >
              <Box>
                <StyledTabs
                  orientation="vertical"
                  scrollButtons
                  value={value}
                  onChange={handleChange}
                  aria-label="styled tabs example"
                >
                  <ButtonGroup
                    disableElevation
                    orientation="vertical"
                    size="small"
                    color="secondary"
                    sx={{
                      marginRight: "5%"
                    }}
                  >
                    <Button onClick={handleMenu} >Hide Menu</Button>
                    <Button
                      onClick={() => {
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        })
                      }}
                    >Back to top</Button>
                  </ButtonGroup>
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
        )
          : (<div  >
            <div id="buttonHideMenu" className={Style.hideMenu} >
              <Button size="small" color="secondary" onClick={handleMenu} >
                Show Menu
              </Button>
            </div>

          </div>)
        }
        <div className={Style.navContent} >
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
          </div>
        </div>
        <div className={Style.navAside} >
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
  )
}

export default NavigationTabs;
