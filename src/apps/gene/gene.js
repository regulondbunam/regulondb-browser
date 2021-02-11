import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ValidateId } from "./webServices/gene_search";
import Home from "./gene_home";
import { Cover, Tabs } from "../../components/ui-components/ui_components";
import Title from "./components/titleGene";
import AllCits from "../../components/cits/Cits";
import Description from "./tools/geneDescription/gene_description";
import Products from "./tools/geneProducts/gene_products";
import All from "./tools/geneAll/gene_all";

const Gene = () => {
  const id = useParams().id;
  const site = useParams().site;
  //const section = useParams().section;
  let title = "Gene Information";
  const [_data, set_data] = useState();
  const [_validId, set_validId] = useState();
  const [_state, set_state] = useState();

  //console.log(id, "/", site, "/", section);
  if (id) {
    switch (_state) {
      case "loading":
        title = `Loading ${id} ID information, please wait`;
        break;
      case "error":
        title = "Sorry we have technical difficulties, please try again later";
        break;
      case "done":
        if (_validId && _data != null) {
          try {
            //console.log(_data);
            const allCitations = _data[0].allCitations;
            const gwc = _data[0].growthConditions;
            const geneName = _data[0].gene.name;
            const products = _data[0].products;
            return (
              <>
                {Title(geneName, id, products, _data[0])}
                <Tabs
                  tabsInfo={stateTabs(id, products, gwc)}
                  tabs={[
                    <All
                      id_gene={id}
                      id={`tab-all`}
                      all_citations={allCitations}
                    />,
                    <Description
                      id_gene={id}
                      id={`tab-description`}
                      all_citations={allCitations}
                    />,
                    <Products
                      id_gene={id}
                      id={`tab-products`}
                      all_citations={allCitations}
                    />
                  ]}
                  tabSelect={() => {
                    if (site) {
                      return `tab-${site}`;
                    }
                    return "tab-all";
                  }}
                />
                <article>{AllCits(allCitations, false, true, true)}</article>
              </>
            );
          } catch (error) {
            title =
              "Sorry we have technical difficulties, please try again later";
            return <>{Gcover(title, "error")}</>;
          }
        } else {
          title = `Sorry we couldn't find the identifier: ${id}`;
          return <>{Gcover(title, "error")}</>;
        }
      case "not found":
        title = `Sorry, we could not find the ${id} identifier on the Genes site`;
        return <>{Gcover(title, "error")}</>;
      default:
        break;
    }
    return (
      <>
        {Gcover(title, _state)}
        <ValidateId
          id={id}
          resoultsData={(data) => {
            set_data(data);
          }}
          status={(state) => {
            set_state(state);
          }}
          isValidate={(isValid) => {
            set_validId(isValid);
          }}
        />
      </>
    );
  }
  return (
    <>
      {Gcover(title)}
      <Home />
    </>
  );
};

function Gcover(title, state) {
  return (
    <Cover state={state}>
      <h1 className={"h1-cover"}>{title}</h1>
    </Cover>
  );
}

const tab_conf = [
  {
    id: "tab-all",
    name: "ALL",
    disabled: false
  },
  {
    id: "tab-description",
    name: "Description",
    disabled: false
  },
  {
    id: "tab-products",
    name: "Products",
    disabled: false
  },
  {
    id: "tab-gwc",
    name: "Growth Conditions",
    disabled: true
  }
];

function stateTabs(id, products, gwc) {
  let n_products = products.length;
  //let n_gwc = gwc.length
  tab_conf.map((tab) => {
    switch (tab.name) {
      case "Products":
        tab.name = `Products (${n_products})`;
        break;
      default:
        break;
    }
    return null;
  });
  return tab_conf;
}

export default Gene;
