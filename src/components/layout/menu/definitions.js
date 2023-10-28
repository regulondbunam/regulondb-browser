import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ConstructionIcon from '@mui/icons-material/Construction';
import BiotechIcon from '@mui/icons-material/Biotech';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ApiIcon from '@mui/icons-material/Api';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const MENU_ITEM = {
  id: "",
  icon: <></>,
  label: "",
  link: "",
  options: [],
  type: "",
  state: "",
};

const ICONS = {
  "home": <HomeIcon />,
  "search": <SearchIcon />,
  "construction": <ConstructionIcon />,
  "tools": <BiotechIcon />,
  "downloads": <ArrowCircleDownIcon/>,
  "api": <ApiIcon />,
  "help": <HelpCenterIcon/>,
}

export { MENU_ITEM, ICONS };

/**

{
            "id": "",
            "label": "",
            "link": "/",
            "options": [],
            "type": "",
            state: ""
        }

 */
