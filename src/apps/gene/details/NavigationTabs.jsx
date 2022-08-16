import React, { useEffect, useState } from "react";
import Style from "./info.module.css";

const backgroundColor = "#d5e2ead7";
const lineColor = "#32617D";

const headerStyle = {
  WebkitBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
  MozBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
  boxShadow: "inset -1px -10px 0px -6px " + lineColor,
  backgroundColor: backgroundColor,
};

const styleTabRest = {
  backgroundColor: "#ffffff",
  color: "#373737",
  borderTop: "1px solid #666666",
  borderRight: "1px solid #666666",
  borderBottom: "3px solid " + lineColor,
  borderLeft: "1px solid #666666",
};

const styleTabActive = {
  backgroundColor: "#ffffff",
  color: "#3D779B",
  fontWeight: "bold",
  borderTop: "3px solid " + lineColor,
  borderRight: "2px solid " + lineColor,
  borderLeft: "2px solid " + lineColor,
};

function NavigationTabs({ tabsInfo, tabSelect }) {
  const [_tab, set_tab] = useState(tabsInfo[tabSelect]);

  useEffect(() => {
    let tabs = document.getElementById("navTab_gene");
    if (tabs) {
      tabs.addEventListener(
        "updateGeneTabs",
        function (e) {
          //console.log(`state`, e.detail)
          if (e.detail.tab) {
            set_tab(tabsInfo[e.detail.tab]);
          }
        },
        false
      );
    }
  });

  return (
    <div id="navTab_gene">
      <nav className={Style.tabHeader} style={headerStyle}>
        {Object.keys(tabsInfo).map((key) => {
          const tab = tabsInfo[key];
          let styleTab = styleTabRest;
          if (tab.id === _tab.id) {
            styleTab = styleTabActive;
          }
          if (tab.disabled) {
            return null;
          }
          return (
            <div key={`tab_${tab.id}-${tab.name}`} className={Style.tabContent}>
              <button
                id={tab.id}
                style={styleTab}
                onClick={() => {
                  set_tab(tab);
                  let section = document.getElementById("gene_"+key);
                  if(section){
                    let rect = section.getBoundingClientRect();
                    let move = 106
                    if (window.pageYOffset < 120) {
                      move = move + 200
                    }
                    //console.log(rect.y,window.pageYOffset);
                    window.scroll({
                      top: rect.y+window.pageYOffset-move,
                      behavior: 'smooth'
                    });
                    /*section.scrollIntoView({
                      behavior: "smooth",
                    });*/
                  }
                  
                }}
              >
                {tab.name}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default NavigationTabs;
