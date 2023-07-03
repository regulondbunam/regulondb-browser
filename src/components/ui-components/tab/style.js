import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const lineColor = "#32617D";

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <div className="MuiTabs-indicatorSpan" /> }}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        marginTop: 20,
        width: 7
    },
    "& .MuiTabs-indicatorSpan": {
        height: 8,
        width: 8,
        borderRadius: 50,
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
        border: "1px solid #666666",
        color: "#373737",
        "&.Mui-selected": {
            color: "#3D779B",
            fontWeight: "bold",
            border: "2px solid " + lineColor,
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#fff",
        },
    })
);

export {StyledTabs, StyledTab}