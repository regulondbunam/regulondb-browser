import React ,{ useState } from "react";
import GeneSearch from "../webServices/search_ws_gene";
import Table from "../components/result_table";

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
      <Table
        keyword={keyword}
        fieldOrder="name"
        id={"table_Genes"}
        data={dataFormat(_data)}
        title={`Genes(${_n})`}
        href_base={"/gene/"}
      />
    </>
  );
};

export default SearchGenes;

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
        name: doc?.gene?.name,
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
