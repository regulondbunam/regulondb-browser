import { useMemo } from "react";
import List from "@mui/material/List";
import DropDownList from "./DropDownList";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import { useState } from "react";

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
        id="custom-input-demo"
        options={options}
        onChange={(e, inputValue) => {
          if (inputValue) findElement(inputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="search component or reaction" />
        )}
      />
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

export default function Search({ reactions, elements, components, cy }) {
  const [menu, setMenu] = useState(true);
  const { subList, options } = useMemo(() => {
    return filterInfoList(reactions, components);
  }, [reactions, components]);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const findComponent = (e) => {
    let key = e.target.innerText;
    let elemento;
    if (key.includes(":")) {
      key = key.split(":")[0];
      elemento = cy.nodes().filter(function (ele) {
        return ele.data("associatedReaction").includes(key);
      });
      cy.center(elemento);

      elemento.select();
    } else {
      elemento = cy.$("#" + key);
      let x = elemento.position("x") + 80;
      let y = elemento.position("y") + 90;
      //map.fit(elemento);

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
    }
  };

  if(!menu){
    return(
      <div style={{position: "absolute", marginTop: "30px", zIndex: 30}} >
          <Tooltip title={"Hide Menu"}>
            <IconButton
              onClick={handleMenu}
              sx={{ borderRadius: 0 }}
              color="secondary"
            >
              <FormatIndentIncreaseIcon />
            </IconButton>
          </Tooltip>
        </div>
    )
  }

  return (
    <div className="searchGuElements">
      <div className="searchGuElement">
        <div>
          <InputSearch elements={elements} cy={cy} />
        </div>
        <div>
          <Tooltip title={"Hide Menu"}>
            <IconButton
              onClick={handleMenu}
              sx={{ borderRadius: 0 }}
              color="secondary"
            >
              <FormatIndentDecreaseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
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
    </div>
  );
}
