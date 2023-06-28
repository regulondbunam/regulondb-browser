import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const backgroundColor = "#f4f5f5";
const lineColor = "#32617D";

const headerStyle = {
    WebkitBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    MozBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    boxShadow: "inset -1px -10px 0px -6px " + lineColor,
    backgroundColor: backgroundColor,
};

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

export {StyledTabs, StyledTab, headerStyle}