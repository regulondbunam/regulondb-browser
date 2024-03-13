import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({options = [],autocompleteLabel="AutoComplete Label"}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 250 }}
      renderInput={(params) => <TextField {...params} label={autocompleteLabel} />}
    />
  );
}