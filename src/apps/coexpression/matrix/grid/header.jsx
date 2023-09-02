
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Header({
    columns = [],
    genesInformation,
    handleSetGene = ()=>{},
    widthCell,
    rankingGenes
  }) {
    console.log(rankingGenes);
    const selectedGene = rankingGenes[0].name
    return (
      <>
        <div style={{ height: "30px", width: `${widthCell}px` }}>{"----"}</div>
        {columns.map((gene, index) => {
          //console.log(gene.name);
          return (
            <div
              key={"header_" + index + "_" + gene.gene._id}
              style={{ height: "30px", width: `${widthCell}px` }}
            >
              {ButtonHeader(gene, selectedGene,  handleSetGene, widthCell)}
            </div>
          );
        })}
        {columns.length < genesInformation.length && <ButtonMore />}
      </>
    );
  }
  
  function ButtonMore(params) {
    return <Button>More</Button>;
  }
  
  function ButtonHeader(gene, selectedGene,  handleSetGene, widthCell) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Button
          onClick={handleClick}
          color="secondary"
          variant={gene.gene.name === selectedGene ? "contained" : "outlined"}
          sx={{
            textTransform: "none",
            minWidth: `${widthCell}px`,
            height: "30px",
            padding: 0,
          }}
        >
          <p
            style={{
              color: gene.gene.name === selectedGene ? "#ffffff" : "#000000",
            }}
            dangerouslySetInnerHTML={{ __html: gene.gene.name }}
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          dense
        >
          <MenuList dense>
            <MenuItem
              onClick={() => {
                handleClose();
                if (gene.gene.name !== selectedGene) {
                  handleSetGene(gene.gene.name);
                }
              }}
            >
              Show ranking of: {gene.gene.name}
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }