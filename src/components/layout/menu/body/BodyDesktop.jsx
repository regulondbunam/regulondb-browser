import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const setStyleLink = (id, state) => {
  switch (state) {
    case "enabled":
      return {
        textDecoration: "none",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff",
      };
    case "disabled":
      return {
        textDecoration: "none",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#666666",
      };
    case "soon":
      return {
        textDecoration: "underline",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff",
      };
    default:
      console.warn(`link "${id}" status not defined`);
      return {
        textDecoration: "none",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff",
      };
  }
};

const styleSubmenu = {
  float: "left",
  paddingLeft: "5%",
  paddingTop: "3%",
};

const styleMenuBody = {
  display: "flex",
  backgroundColor: "#72a7c7",
  boxShadow: "inset 0px -5px 5px 0px rgba(0,0,0,.5)",
  padding: "1% 10% 2% 10%",
  height: "auto",
};

const styleSubTitle = {
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "12",
  fontFamily: "sans-serif",
  color: "#1F3D4E",
};

export function BodyDesktop({ submenuData }) {
  const content = submenuData.options;
  return (
    <div style={styleMenuBody}>
      {content.map((item) => {
        switch (item.type) {
          case "SUBMENU":
            return (
              <div key={item.id} style={styleSubmenu}>
                <Link to={item.link} style={styleSubTitle}>
                  {item.title}
                </Link>
                {item.options.map((itemm) => {
                  
                  if (itemm.type === "graphql") {
                    return (
                      <div
                        key={itemm.id}
                        style={{ paddingTop: "5%", paddingBottom: "1%" }}
                      >
                        <a style={{color: "white"}}  target="_tab" href={ process.env.REACT_APP_WEB_SERVICE_URL}>{itemm.title}</a>
                      </div>
                    );
                  }
                  if (itemm.type === "sandbox") {
                    const host = window.location.hostname
                    let url=host+"/graphql"
                    return (
                      <div
                        key={itemm.id}
                        style={{ paddingTop: "5%", paddingBottom: "1%" }}
                      >
                        <a style={{color: "white"}}  target="_tab" href={"https://studio.apollographql.com/sandbox/explorer?endpoint=https://"+ url }>{itemm.title}</a>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={itemm.id}
                      style={{ paddingTop: "5%", paddingBottom: "1%" }}
                    >
                      {itemm.state !== "disabled" ? (
                        <Link
                          to={itemm.link}
                          style={setStyleLink(itemm.id, itemm.state)}
                          target={itemm.target}
                        >
                          {itemm.title}
                        </Link>
                      ) : (
                        <p
                          style={setStyleLink(itemm.id, itemm.state)}
                          target={itemm.target}
                        >
                          {itemm.title}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          case "LINK":
            return (
              <div key={item.id} style={styleSubmenu}>
                {item.state !== "disabled" ? (
                  <Link
                    to={item.link}
                    style={setStyleLink(item.id, item.state)}
                    target={item.target}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    style={setStyleLink(item.id, item.state)}
                    target={item.target}
                    href={item.link}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            );
          case "CARD":
            return <div></div>;
          default:
            return <div></div>;
        }
      })}
      <br />
      <br />
    </div>
  );
}
