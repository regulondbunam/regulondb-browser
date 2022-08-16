import React from 'react';
import { BodyDesktop } from './body/BodyDesktop';
import { BodyMovil } from './body/BodyMovil';

const Body = ({ MENU_CONF, id, SetMenuView= ()=>{} }) => {
  const submenuData = MENU_CONF.find((element) => element.id === id);
  if (submenuData) {
    return <BodyDesktop submenuData={submenuData} />;
  }
  switch (id) {
    case "leftMenu":
      return <BodyMovil MENU_CONF={MENU_CONF} SetMenuView={SetMenuView}  />;
    case "searchTool":
      return <div>SearchTool</div>;
    default:
      console.error(`Body id "${id}" not defined`);
      return <div></div>;
  }
};


export default Body;
