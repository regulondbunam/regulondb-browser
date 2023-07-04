import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  FastaSequence,
  GenebankSequence,
} from "../../../../sequence";

export default function ViewSequence({ sequence, _id, name, products }) {
  console.log(products);
  const [_viewFastaSequence, set_viewFastaSequence] = React.useState(false);
  const [_viewGenebankSequence, set_viewGenebankSequence] =
    React.useState(false);

  const viewFastaSequence = () => set_viewFastaSequence(!_viewFastaSequence);
  const viewGenebankSequence = () =>
    set_viewGenebankSequence(!_viewGenebankSequence);

  return (
    <div>
      <button className="aBase" onClick={viewFastaSequence}>
        FASTA
      </button>
      <button className="aBase" onClick={viewGenebankSequence}>
        GenBank
      </button>
      <Modal
        open={_viewFastaSequence}
        onClose={viewFastaSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FastaModal
          sequence={sequence}
          title={`RegulonDB|${_id}|gene: ${name}|product: ${products.map(product=>product.name).join(", ")}`}
          onView={viewFastaSequence}
        />
      </Modal>
      <Modal
        open={_viewGenebankSequence}
        onClose={viewGenebankSequence}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GenebankModal
          sequence={sequence}
          title={`gene: ${name}; product: ${products.map(product=>product.name).join(", ")}`}
          onView={viewGenebankSequence}
        />
      </Modal>
    </div>
  );
}

const GenebankModal = React.forwardRef((props, ref) => {
    const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  const color = () => set_color(!_color);

  const download = () => {
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      const blob = new Blob([e.innerText]);
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref} >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Genebank FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={_color} onChange={color} />}
          label="View color in sequence"
        />
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <GenebankSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
    </Box>
  );
})

const FastaModal = React.forwardRef((props, ref) => {
  const { sequence, title, onView = () => {} } = props;
  const [_color, set_color] = React.useState(false);

  const color = () => set_color(!_color);

  const download = () => {
    let e = document.getElementById("rdb_p_sequence");
    if (e.innerText) {
      const blob = new Blob([e.innerText]);
      const element = document.createElement("a");
      element.href = window.URL.createObjectURL(blob);
      element.download = `${title}.txt`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style} ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>FASTA FORMAT</h3>
        </div>
        <div>
          <button onClick={onView} className="accent">
            CLOSE
          </button>
        </div>
      </div>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={_color} onChange={color} />}
          label="View color in sequence"
        />
      </FormGroup>
      <div style={{ overflow: "auto", maxHeight: "300px" }}>
        <FastaSequence sequence={sequence} color={_color} title={title} />
      </div>
      <br />
      <button onClick={download}>Download</button>
    </Box>
  );
});
