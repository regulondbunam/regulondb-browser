import { createTheme } from '@mui/material/styles';
import { MuiAutocomplete } from './MuiAutocomplete';


const uiComponentesTheme = createTheme({
    components: {
      MuiAutocomplete: MuiAutocomplete
    },
  });
  

  export default uiComponentesTheme