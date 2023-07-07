import { useState, forwardRef } from "react";
import { SequenceSelection } from "./sequence";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Highlight({ motifs, sequence }) {
  const [_leftEndPosition, set_leftEndPosition] = useState(-1);
  const [_rightEndPosition, set_rightEndPosition] = useState(-1);
  const [snackOpen, setSnackOpen] = useState(false);

    const handleOpenSnack = () => {
        setSnackOpen(true);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

  return (
    <div>
      <div style={{ overflow: "auto", maxHeight: "200px" }}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Positions</th>
              <th>Notes</th>
              <th>dataSource</th>
              <th>Sequence</th>
            </tr>
          </thead>
          <tbody>
            {motifs.map((motif, index) => {
              let positions = "---";
              if (motif.leftEndPosition) {
                if (motif.rightEndPosition === motif.leftEndPosition) {
                  positions = motif.leftEndPosition;
                } else {
                  positions =
                    motif.leftEndPosition + "-" + motif.rightEndPosition;
                }
              }
              let id = `motif_${motif.id}`;
              return (
                <tr
                  className="tr_motif"
                  key={`${id}_${index}`}
                  onMouseEnter={() => {
                    set_leftEndPosition(motif.leftEndPosition);
                    set_rightEndPosition(motif.rightEndPosition);
                  }}
                  onMouseLeave={() => {
                    set_leftEndPosition(-1);
                    set_rightEndPosition(-1);
                  }}
                >
                  {motif?.type ? <td>{motif.type}</td> : <td></td>}
                  <td>{positions}</td>
                  <td>{motif.note}</td>
                  {motif?.dataSource ? <td>{motif.dataSource}</td> : <td></td>}
                  <td>
                    <IconButton
                      onClick={(e) => {
                        navigator.clipboard.writeText(motif.sequence);
                        handleOpenSnack();
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                    <div style={{ display: "none" }}>
                      <p id={`sequence_${index}_${id}`} className="p_sequence">
                        {motif.sequence}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="motif_sequence" id="div_sequence">
        <p className="p_accent">sequence product:</p>
        <SequenceSelection
          sequence={sequence}
          leftEndPosition={_leftEndPosition}
          rightEndPosition={_rightEndPosition}
        />
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackOpen} autoHideDuration={1000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
            Sequence copied to clipboard!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
/*
}
    return(

      
    </div>
        </div>
    )
}
*/
