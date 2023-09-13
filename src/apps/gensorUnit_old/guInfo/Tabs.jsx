import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Description from "./description";
import Reactions from "./reactions";

//const backgroundColor = "#d5e2ead7";
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AntTabs = styled(Tabs)({
  WebkitBoxShadow: "inset -1px -10px 0px -6px #32617D",
  MozBoxShadow: "inset -1px -10px 0px -6px #32617D",
  boxShadow: "inset -1px -8px 0px -6px #32617D",
  "& .MuiTabs-indicator": {
    backgroundColor: "#FFFFFF",
    borderLeft: "3px solid #32617D",
    borderRight: "3px solid #32617D",
  },
  "& .MuiTabs-flexContainer": {
    height: "70%",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 150,
    [theme.breakpoints.up("sm")]: {
      minWidth: 150,
    },
    marginLeft: "5%",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    borderTop: "3px solid #3D779B",

    borderRight: "3px solid #3D779B",
    borderLeft: "3px solid #3D779B",
    fontStyle: "normal",
    fontSize: "14px",
    fontFamily: [
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#000000",
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabsPanel({ guInfoDescription, gensorUnit, data }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label={guInfoDescription.Tabs.titles[0]} {...a11yProps(0)} />
          <AntTab
            sx={{ marginLeft: "0.5px" }}
            label={guInfoDescription.Tabs.titles[1]}
            {...a11yProps(1)}
          />
        </AntTabs>
        <Box sx={{ p: 0 }} />
        <TabPanel value={value} index={0}>
          <Description
            gensorUnit={gensorUnit}
            guInfoDescription={guInfoDescription}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Reactions data={data} />
        </TabPanel>
      </Box>
    </Box>
  );
}
