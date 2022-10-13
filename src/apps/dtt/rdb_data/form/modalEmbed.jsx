import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalEmbed({ formData }) {
  const [_open, set_open] = useState(false);
  const { covered, leftEndPosition, objectType, rightEndPosition, strand } =
    formData;
  const parameters = `covered=${covered}&leftEndPosition=${leftEndPosition}&rightEndPosition=${rightEndPosition}&objectType=[${objectType.toString()}]&strand=${strand}`;

  return (
    <div>
      <Button
        onClick={() => {
          set_open(!_open);
        }}
        sx={{ marginRight: "2px" }}
        variant="outlined"
        size="small"
      >
        Create Embed
      </Button>
      <Modal
        open={_open}
        onClose={() => {
          set_open(!_open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal_content">
            <p className="p_accent">Frame Embed</p>
            <div className="modal_code">
              {`<iframe src="${window.location.hostname}:${window.location.port}/embed/dtt/${parameters}" frameborder="0"></iframe>`}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalEmbed;
