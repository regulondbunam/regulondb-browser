import React, { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ListIcon from "@mui/icons-material/List";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
//import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
//import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
//import { styled, lighten, darken } from '@mui/system';

function InputSearch({ elements, cy }) {
  const options = useMemo(() => {
    return elements.map((element) => {
      return element.data.id;
    });
  }, [elements]);

  //

  const findElement = (inputValue) => {
    let elemento = cy.$("#" + inputValue);
    let x = elemento.position("x") + 80;
    let y = elemento.position("y") + 90;
    //map.fit(elemento);
    cy.zoom(1.5);
    cy.center(elemento);
    elemento.animate({
      position: { x, y },
      duration: 500,
    });
    x -= 80;
    y -= 90;
    elemento.animate({
      position: { x, y },
      duration: 500,
    });
    elemento.select();
  };

  return (
    <div id="autoCompleat">
      <Autocomplete
        size="small"
        sx={{ width: 200 }}
        options={options}
        onChange={(e, inputValue) => {
          if (inputValue) findElement(inputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="search component" />
        )}
      />
    </div>
  );
}

export default function Search(props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputSearch {...props} />
      <GuElementsMenu {...props} />
    </div>
  );
}

const filterInfoList = (reactions, components) => {
  let nameReactions = [];

  reactions.forEach((info) => {
    nameReactions.push("R" + info.number + ": " + info.pathwayComponents);
  });
  let options = { Reactions: nameReactions };
  let keys = [];
  components.forEach((element) => {
    if (!keys.includes(element.type)) {
      keys.push(element.type);
      let aux = [];
      components.forEach((component) => {
        if (component.type === element.type) {
          aux.push(component["name"]);
        }
      });
      options = Object.assign(options, {
        [element.type]: aux,
      });
    }
  });
  const subList = Object.keys(options).sort((titleA, titleB) => {
    return titleB.length - titleA.length;
  });
  return { subList, options };
};

function GuElementsMenu({ cy, reactions, components }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { subList, options } = useMemo(() => {
    return filterInfoList(reactions, components);
  }, [reactions, components]);

  const findComponent = (element) => {
    let elemento;
    if (element.includes(":")) {
      element = element.split(":")[0];
      elemento = cy.nodes().filter(function (ele) {
        return ele.data("associatedReaction").includes(element);
      });
      cy.zoom(1.5);
      cy.center(elemento);

      elemento.select();
    } else {
      elemento = cy.$("#" + element);
      let x = elemento.position("x") + 80;
      let y = elemento.position("y") + 90;
      //map.fit(elemento);
      cy.zoom(1.5);
      cy.center(elemento);
      //console.log("el",elemento);
      elemento.animate({
        position: { x, y },
        duration: 500,
      });
      x -= 80;
      y -= 90;
      elemento.animate({
        position: { x, y },
        duration: 500,
      });
      elemento.select();
    }
  };
  return (
    <div>
      <Tooltip
        title={anchorEl !== null ? "Hide Menu" : "Show GU elements menu"}
      >
        <Button
          onClick={(e) => {
            if (anchorEl === null) {
              handleClick(e);
            } else {
              handleClose();
            }
          }}
          color="secondary"
          variant="contained"
          sx={{ minWidth: 15 }}
        >
          <ListIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: 200 }}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "20ch",
          },
        }}
      >
        <MenuList dense>
          {subList.map((title, i) => {
            return (
              <MenuElement
                key={"guMenu" + title + "_" + i}
                title={title}
                elements={options[title]}
                findComponent={findComponent}
              />
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

function MenuElement({ title, elements, findComponent }) {
  const [showElements, setSowElements] = useState(false);
  return (
    <React.Fragment>
      <MenuItem
        sx={{ backgroundColor: "#cadce7" }}
        onClick={() => {
          setSowElements(!showElements);
        }}
      >
        <p>
          <b>
            {title.toLowerCase().replace("_", " ") +
              " (" +
              elements.length +
              ")"}
          </b>
        </p>
      </MenuItem>
      {showElements && (
        <>
          {elements.map((element, i) => {
            return (
              <MenuItem
                onClick={() => {
                  findComponent(element);
                }}
                sx={{ backgroundColor: "#d5d5d7" }}
                key={"guMenuElement" + element + "_" + i}
              >
                <p>
                  <b>{element.toLowerCase()}</b>
                </p>
              </MenuItem>
            );
          })}
        </>
      )}
    </React.Fragment>
  );
}

/**
 <List
          sx={{
            "padding-top": 0,
            "padding-bottom": 0,
            "& .MuiListSubheader-root": {
              height: "40px",
              color: "white",
              fontFamily: "Arial",
              fontWeight: 700,
              fontSize: " 18px",
              textAlign: "center",
            },
          }}
        >
          <div style={{ backgroundColor: "#3D779B", height: "30px" }}>
            <h1
              style={{
                color: "white",
                fontFamily: "Arial",
                fontWeight: 700,
                fontSize: " 18px",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              GU Elements
            </h1>
          </div>
          {subList.map((title) => {
            return (
              <DropDownList
                title={title}
                elements={options[title]}
                onClick={findComponent}
              />
            );
          })}
        </List>
 */
