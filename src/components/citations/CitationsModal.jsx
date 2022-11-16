import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function CitationModal({ title, references }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { evidence, publication } = references;

  let styleStrong = {};
  if(evidence){
    if (evidence.type === "Strong") {
      styleStrong = { fontWeight: "bold" };
    }
  }
  if (!open) {
    return <button className="aBase citation" onClick={handleOpen} dangerouslySetInnerHTML={{__html: title}} />;
  } else {
    return (
      <div>
        <button style={{backgroundColor: "#c93a1d"}} className="aBase citation" dangerouslySetInnerHTML={{__html: title}} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {evidence?.id && (
              <div>
                <h2>Evidence</h2>
                <h1 style={styleStrong} >
                  {evidence?.code ? `${evidence.code}:` : ""} {evidence?.name ? evidence.name : ""}
                  <br />{evidence?.type ? `(${evidence.type})` : ""}
                </h1>
              </div>
            )}
            {publication?.id && (
              <div>
                <h2>Reference:</h2>
                { publication?.url && <a href={publication.url} target="_blank" rel="noopener noreferrer" >Go to Reference</a>}
                <p>{publication?.pmid ? `pmid: ${publication.pmid}` : ""}</p>
                <p className="citation">{publication?.citation ? publication.citation : ""}</p>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    );
  }
}
