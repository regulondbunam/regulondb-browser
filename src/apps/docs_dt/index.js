import React from "react";
import { Cover } from "../../components/ui-components";
import { useParams } from "react-router-dom";

//Components
import MenuAside from "./components/MenuAside";
import ServDesc from "./components/ServDesc";
import ServInfo from "./components/ServInfo";

//Assets
import DocCSS from "./Doc_Main.module.css";
import conf from "./conf/view_main.conf.json";

const DocumentationDatamarts = () => {
  let { service } = useParams();

  return (
    <>
      <Cover>
        <h1>Documentation</h1>
      </Cover>
      <article>
        <div className={DocCSS.container} style={{}}>
          <div className={DocCSS.containerMenu}>
            <MenuAside></MenuAside>
          </div>
          <div className={DocCSS.containerServices}>
            {service ? (
              <ServInfo {...conf.serv_info} />
            ) : (
              <ServDesc {...conf.serv_desc.title_main} />

            )}
          </div>
        </div>
      </article>

    </>
  );
};

export default DocumentationDatamarts;
