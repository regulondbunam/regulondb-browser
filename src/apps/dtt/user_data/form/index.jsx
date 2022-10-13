import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const geneticElementData = [
  { objectType: "", name: "gene" },
  { objectType: "", name: "promoter" },
  { objectType: "", name: "operon" },
  { objectType: "", name: "tf binding site" },
  { objectType: "", name: "rna" },
  { objectType: "", name: "riboswitch" },
  { objectType: "", name: "traslational attenuattor" },
  { objectType: "", name: "trascriptional attenuattor" },
  { objectType: "", name: "ppGpp" },
];

function Form({
  onGo = () => {},
  onReset = () => {},
  minbp = 1,
  maxbp = 100,
  geneticElements = []
}) {
  return (
    <div className="dtt_form">
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
    </div>
  );
}

export default Form;
