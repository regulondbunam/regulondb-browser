import React ,{ useState } from "react";
import Search from "../webServices/search_ws_operon";
import Table from "../components/result_table";

const SearchOperon = ({
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
      <Search
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
        id={"table_Operon"}
        data={dataFormat(_data)}
        title={`Operons(${_n})`}
        href_base={"/operon/"}
      />
    </>
  );
};

export default SearchOperon;

function dataFormat(data) {
  //console.log(data)
  let rows = [];
  if (data) {
    data.map((doc) => {
      console.log(doc)
      const id = doc?._id;
      const tus = doc?.transcriptionUnits;
      const stadistics = doc?.operon?.statistics
      const d = {
        name: `${doc?.operon?.name} operon`,
        tus: `contains ${stadistics.genes} genes organized in ${tus.length} TUs`,
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
      label: "tus",
      field: "tus"
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
