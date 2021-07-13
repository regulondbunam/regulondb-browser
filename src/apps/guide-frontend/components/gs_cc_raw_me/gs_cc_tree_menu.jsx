import React, { useState } from "react";

import MenuCSS from "./gs_cc_tree_menu.module.css";

const GsCcTreeMenu = ({
  dataMenu,
  onSelect = () => {
    console.warn("falta la funcion onSelect");
  }
}) => {
  //console.log(dataMenu.menuElements);

  return dataMenu.menuElements.map((e) => {
    return (
      <RecursiveComponent
        {...e}
        key={e.id}
        onSelect={(value) => {
          onSelect(value);
        }}
      />
    );
  });
};

const RecursiveComponent = ({
  id,
  title,
  value,
  sons,
  display = true,
  onSelect
}) => {
  const [isOpened, setIsOpened] = useState(display);

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  const hasChildren = (children) => children && children.length;

  return (
    <ul className={MenuCSS.listElements}>
      <li key={id}>
        <button className={MenuCSS.elements} onClick={toggle}>
          {title}
        </button>
      </li>

      {hasChildren(sons) &&
        sons.map((item) => (
          <li key={item.id}>
            {hasChildren(item.sons) == null && isOpened && (
              <ol className={MenuCSS.listElements}>
                <button
                  className={MenuCSS.link}
                  onClick={() => {
                    onSelect(item.value);
                  }}
                >
                  {item.title}
                </button>
              </ol>
            )}

            {hasChildren(item.sons) && (
              <RecursiveComponent
                key={item.id}
                {...item}
                onSelect={(value) => {
                  onSelect(value);
                }}
              />
            )}
          </li>
        ))}
    </ul>
  );
};

export default GsCcTreeMenu;
