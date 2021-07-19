import React ,{ useState } from "react";
import GeneSearch from "../webServices/search_ws_gene";
import Table from "../components/result_table";
import { SpinnerCircle } from "../../../components/ui-components/ui_components";

const SearchGenes = ({
  keyword = "",
  geneFounds = () => {
    return 0;
  },
  geneData = () => {
    return {};
  },
  geneStatus = () => {
    return "sleep";
  },
  display = "table"
}) => {
  const [_data, set_data] = useState();
  const [_n, set_n] = useState(0);
  const [_state, set_state] = useState('sleep')
  return (
    <>
      <GeneSearch
        search={keyword}
        limit={100}
        status={(status) => {
          if (status === "loading") {
            set_data();
            set_n(0);
            geneFounds(0);
          }
          set_state(status)
          geneStatus(status);
        }}
        resoultsFound={(n) => {
          set_n(n);
          geneFounds(n);
        }}
        resoultsData={(data) => {
          set_data(data);
          geneData(data);
        }}
      />
      {
        displayState(_state,keyword,_data,_n)
      }
    </>
  );
};

export default SearchGenes;

function displayState(state,keyword,data,n){

  switch (state) {
    case "error":
      return <>oops... an error has occurred</>
    case "loading":
      return <div>
        Loading Genes
        <SpinnerCircle />
      </div>
    default:
      return <Table
      keyword={keyword}
      fieldOrder="name"
      id={"table_Genes"}
      data={dataFormat(data)}
      title={`Genes(${n})`}
      href_base={"/gene/"}
    />
  }

}


function dataFormat(data) {
  //console.log(data)
  let rows = [];
  if (data) {
    data.map((doc) => {
      const id = doc?.gene?.id;
      const syns = doc?.gene?.synonyms;
      const prod = doc?.products;
      const pro = prod
        .map((p) => {
          return p.name;
        })
        .join(",");
      const d = {
        name: `${doc?.gene?.name} gene`,
        syn: syns.join(", "),
        prod: pro,
        id: id
      };
      rows.push(d);
      return null;
    });
  }
  const columns = [
    {
      label: "name",
      field: "name"
    },
    {
      label: "synonyms",
      field: "syn"
    },
    {
      label: "products",
      field: "prod"
    },
    {
      label: "id",
      field: "id"
    }
  ];
  return {
    columns: columns,
    rows: rows
  };
}
