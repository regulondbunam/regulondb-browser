import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React from "react";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function IsPropertyPhrases({ property = "", propertiesPhrase }) {
  const label = property.charAt(0).toUpperCase() + property.slice(1);
  console.log(propertiesPhrase[property]);
  let phrase = propertiesPhrase[property];
  if (!phrase) {
    return <b>{label}:</b>;
  }
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <p>
            <b>A Phrase</b>
          </p>
        </React.Fragment>
      }
    >
      <Badge color="secondary" badgeContent=" " variant="dot">
        <Box>
          <b>{label}:</b>
        </Box>
      </Badge>
    </HtmlTooltip>
  );
}
