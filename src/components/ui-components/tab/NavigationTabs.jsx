import React, { useState } from "react";
import Style from "./info.module.css";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const idNavTabs = "regulonNavTabs"
export { idNavTabs }

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#32617d",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    height: "30px",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(12),
    marginRight: theme.spacing(1),
    backgroundColor: "#fff",
    borderTop: "1px solid #666666",
    borderRight: "1px solid #666666",
    borderLeft: "1px solid #666666",
    color: "#373737",
    "&.Mui-selected": {
      color: "#3D779B",
      fontWeight: "bold",
      borderTop: "3px solid " + lineColor,
      borderRight: "2px solid " + lineColor,
      borderLeft: "2px solid " + lineColor,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#fff",
    },
  })
);

const backgroundColor = "#d5e2ead7";
const lineColor = "#32617D";

const headerStyle = {
  WebkitBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
  MozBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
  boxShadow: "inset -1px -10px 0px -6px " + lineColor,
  backgroundColor: backgroundColor,
};

function NavigationTabs({ tabSelect = "init", tabs = [] }) {
  const [value, setValue] = useState(tabSelect);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let section = document.getElementById(newValue);
    if (section) {
      let rect = section.getBoundingClientRect();
      let move = 106;
      if (window.pageYOffset < 120) {
        move = move + 100;
      }
      //console.log(rect.y,window.pageYOffset);
      window.scroll({
        top: rect.y + window.pageYOffset - move,
        behavior: "smooth",
      });

    }
  };

  return (
    <div>
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
      <article>
        {tabs.map((tab, index) => {
          if (!tab.position) {
            return (
              <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                <br />
                {tab.component}<br />
              </div>
            )
          }
          return null
        })}
      </article>
      <aside>

      </aside>
    </div>
  );
}

export default NavigationTabs;

/**
 *
 * {tab.type === "summary" && (
              <div>
                {tab.element}
                {
                  tab.tus.map((tu,tu_indx)=>{
                    return <TranscriptionUnit allCitations={allCitations} operon={tab.operon}  key={tu_indx+"_"+index} tu={tu} />
                  })
                }
              </div>
            )}
            {tab.type === "tu" && <TranscriptionUnit allCitations={allCitations} operon={tab.operon} tu={tab.tu} showInfo={true} />}
 */
