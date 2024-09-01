import React from 'react'
import Accordion from '@mui/material/Accordion';
//import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Peaks from './Peaks';
import TFBS from './TFBS';
import TUS from './TUs';
import TSS from './TSS';


export default function ProcessData({
    peaks,
    TFBs,
    TSs,
    TTs,
    TUs,
}) {

  return (
    <div>
        {peaks && (
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h3>Peaks</h3>
            </AccordionSummary>
            <AccordionDetails>
              <Peaks peaks={peaks} />
            </AccordionDetails>
          </Accordion>
        )}
        {TFBs && (
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h3>Transcription Factor Bindings Sites</h3>
            </AccordionSummary>
            <AccordionDetails>
              <TFBS TFBs={TFBs} />
            </AccordionDetails>
          </Accordion>
        )}
        {TSs && (
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h3>Transcription Start Sites</h3>
            </AccordionSummary>
            <AccordionDetails>
              <TSS tss={TSs} />
            </AccordionDetails>
          </Accordion>
        )}
        {TTs && (
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h3>Transcription Termination Sites</h3>
            </AccordionSummary>
            <AccordionDetails>
              tts table
            </AccordionDetails>
          </Accordion>
        )}
        {TUs && (
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <h3>Transcription Units</h3>
            </AccordionSummary>
            <AccordionDetails>
              <TUS tus={TUs} />
            </AccordionDetails>
          </Accordion>
        )}
    </div>
  )
}
