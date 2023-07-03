import * as React from "react";
import List from "@mui/material/List";
import DropDownList from "./DropDownList";

export default function NavigationMenu({ options, map }) {
  let subList = Object.keys(options).sort((titleA, titleB) => {
    return titleB.length - titleA.length;
  });

  let findComponent = (e) => {
    let key = e.target.innerText;
    let elemento;
    if (key.includes(":")) {
      key = key.split(":")[0];
      elemento = map.nodes().filter(function (ele) {
        return ele.data("associatedReaction").includes(key);
      });
      map.center(elemento);

      elemento.select();
    } else {
      elemento = map.$("#" + key);
      let x = elemento.position("x") + 80;
      let y = elemento.position("y") + 90;
      //map.fit(elemento);

      map.center(elemento);
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
    <>
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
    </>
  );
}
