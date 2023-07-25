import { useState } from "react";
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionStyled = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .MuiButtonBase-root-MuiAccordionSummary-root': {
        minHeight: 'initial'
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    padding: 0,
    minHeight: "10px",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Accordion({children, title, expand = true, backgroundColor = "#D5E2EA"}) {
    const [expanded, setExpanded] = useState(expand);
    return (
        <AccordionStyled expanded={expanded} onChange={() => { setExpanded(!expanded) }} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                <div >
                    {children}
                </div>
            </AccordionDetails>
        </AccordionStyled>
    )
}