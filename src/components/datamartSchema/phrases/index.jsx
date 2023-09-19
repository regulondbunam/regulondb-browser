import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import React from 'react';

export function IsPhrases({property,propertiesPhrase}) {
    return <>{property}</>
}



const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

function Phrase({children}) {
    console.log("adios");
    return(
        <HtmlTooltip
        title={
          <React.Fragment>
            <p><b>A Phrase</b></p>
          </React.Fragment>
        }
      >
        <Badge color="secondary" badgeContent=" ">
            <Box >
                {children}
            </Box>
      </Badge>
      </HtmlTooltip>
        
    )
}