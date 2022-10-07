import React, {useState} from "react";
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

function FileOptions({ formData, set_formData = () => {} }) {

  const [_open, set_open] = useState(false);

  function download() {
    let element = document.createElement('a');
    const text = `{
      "_details":"RegulonDB DrawingTracesTool FormFile",
      "_version":"0.0.1",
      "covered":"${formData.covered}",
      "leftEndPosition":"${formData.leftEndPosition}",
      "objectType":"${formData.objectType.toString()}",
      "rightEndPosition":"${formData.rightEndPosition}",
      "strand":"${formData.strand}"
    }`
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "dttFormData.dtt.json");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  function upload(event){
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const formFile = JSON.parse(e.target.result);
        const { covered, leftEndPosition, objectType, rightEndPosition, strand } = formFile;
        //console.log(formFile);
        set_formData({
          covered: covered.toLowerCase ==="true"?true:false,
          leftEndPosition: leftEndPosition,
          objectType: objectType.split(","),
          rightEndPosition: rightEndPosition,
          strand: strand
        })
        set_open(!_open);
      } catch (error) {
        console.log("invalid file");
      }
    };
  }

  return (
    <div>
      <Button onClick={download} sx={{ marginRight: "2px" }} variant="outlined" size="small">
        Save Form
      </Button>
      <Button onClick={() => {
          set_open(!_open);
        }} sx={{ marginRight: "2px" }} variant="outlined" size="small">
        Load Form
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
            <p className="p_accent">Select File</p>
            <input type="file" name="file" onChange={upload} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default FileOptions;
