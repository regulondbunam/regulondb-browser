import React from "react";
import Style from "./cover.module.css";

export function Cover({ children, state, id_spinner = "coverxD", menssage }) {
  const styleCover = {
    width: "100%"
  };

  switch (state) {
    case "loading":
      if (!menssage) {
        menssage = "loading ...";
      }
      return (
        <div style={styleCover}>
          <div className={Style.cover + " " + Style.anm}>
            {children}
          </div>
        </div>
      );
    case "not found":
    case "error":
      if (!menssage) {
        menssage = "oops... an error has occurred";
      }
      return (
        <div style={styleCover}>
          <div className={Style.cover + " " + Style.error}>
            {menssage}
            {children}
          </div>
        </div>
      );
    default:
      return (
        <div style={styleCover}>
          <div className={Style.cover}>
            {children}
          </div>
        </div>
      );
  }
}
