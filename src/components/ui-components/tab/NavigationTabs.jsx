import React, { useState } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { headerStyle, StyledTab, StyledTabs } from "./style"

const idNavTabs = "regulonDBNavTabs"
export { idNavTabs }

function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {

  const [value, setValue] = useState(tabSelect);

  const handleChange = (event, newValue) => {
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
                if (!tab.position && tab.id===value) {
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
