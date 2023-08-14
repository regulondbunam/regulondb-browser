import React, { useState } from "react";
import Style from "./info.module.css";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function NavigationTabs({ tabSelect = "init", tabs = [], allCitations }) {
  const [value, setValue] = useState(tabSelect);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div id="navTab_sigmulon" className={Style.tabHeader} style={headerStyle}>
        <Box>
          <StyledTabs
            variant="scrollable"
            scrollButtons
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            {tabs.map((tab, index) => {
              const TabElement = (
                <div>
                  {tab?.subtitle&&(<div className={Style.tab_type}>{tab.subtitle}</div>)}
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
      {tabs.map((tab, index) => {
        return (
          <TabPanel key={`${index}_${tab.id}`} value={value} index={tab.id}>
            <div>{tab.element}</div>
          </TabPanel>
        );
      })}
    </div>
  );
}

export default NavigationTabs;

/**
 *
 */
