import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GeneTitle from "./components/gene_title";
import Home from "./gene_home";
import { ValidateId } from "./webServices/gene_search";
import { Tabs } from "../../components/ui-components/ui_components";
//import AllCits from "../../components/cits/Cits";
import { CitationsProvider } from '../../components/citations/citations_provider'
import Description from "./tools/geneDescription/gene_description";
import Products from "./tools/geneProducts/gene_products";
import All from "./tools/geneAll/gene_all";
/*
import Title from "./components/titleGene";

*/

export default function Gene() {
  const id_gene = useParams().id;
  const site = useParams().site;
  //const section = useParams().section;
  return (
    <>
      <GeneTitle />
      {
        id_gene
          ? <ValidateGene id_gene={id_gene} site={site}/>
          : <Home />
      }
    </>
  )
}

function ValidateGene({ id_gene, site }) {
  const [_title, set_title] = useState("consulting Gene information")
  const [_data, set_data] = useState();
  const [_state, set_state] = useState();

  useEffect(() => {
    const COVER = document.getElementById(`cover_gene_context`)
    if (COVER) {
      switch (_state) {
        case 'error':
          set_title("Error :(")
          break;
        case 'not found':
          set_title(`not found gene with ID:${id_gene}`)
          break
        case 'loading':
          set_title(`Searching information by:${id_gene}`)
          break;
        case 'done':
          //console.log("hola")
          set_title("")
          break;
        default:
          set_title("... =]")
          break;
      }
      const COVER_REACTION = new CustomEvent('coverGene', {
        bubbles: true,
        detail: {
          state: _state,
          title: _title,
          data: _data
        }
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
  }, [_state, _data, _title, id_gene])

  if (_data && _state === "done") {
    const allCitations = _data.allCitations;
    const gwc = _data.growthConditions;
    const products = _data.products;
    return (
      <CitationsProvider allCitations={_data?.allCitations}>
      <Tabs
        tabsInfo={stateTabs(id_gene, products, gwc)}
        tabs={[
          <All
            id_gene={id_gene}
            id={`tab-all`}
            all_citations={allCitations}
          />,
          <Description
            id_gene={id_gene}
            id={`tab-description`}
            all_citations={allCitations}
          />,
          <Products
            id_gene={id_gene}
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
      </CitationsProvider>
    )
  }

  if (_state === "error" || _state === "not found") {
    return null
  }

  return (
    <ValidateId
      id={id_gene}
      resoultsData={(data) => {
        set_data(data[0]);
      }}
      status={(state) => {
        set_state(state);
      }}
    />
  )
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
        tab.disabled = n_products < 1
        break;
      default:
        break;
    }
    return null;
  });
  return tab_conf;
}