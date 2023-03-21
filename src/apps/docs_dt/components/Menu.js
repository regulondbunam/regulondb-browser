import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import MenuCSS from "./css/Menu.module.css";

const Menu = (dataMenu) => {
  return dataMenu.menuElements.map((e) => {
    return <RecursiveComponent {...e} key={e.id} />;
  });
};

const RecursiveComponent = ({ id, title, value, sons }) => {
  const [isOpened, setIsOpened] = useState(false);

  let navigate = useNavigate();

  function handleClick(value) {
    navigate(`/doc_datamarts/${value}`, { replace: true });
  }

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
                    handleClick(item.value);
                  }}
                >
                  {item.title}
                </button>
              </ol>
            )}

            {hasChildren(item.sons) && (
              <RecursiveComponent key={item.id} {...item} />
            )}
          </li>
        ))}
    </ul>
  );
};

export default Menu;
