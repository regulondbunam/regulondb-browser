import React, { useMemo } from "react";
import {
  Cover,
  DataVerifier,
  FilterTable,
} from "../../components/ui-components";
import { useGetObjectList } from "../../components/webservices";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    id: "geneName",
    header: "Name",
    accessorKey: "_name",
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/gene/" + info.row.original.id}>
        <span dangerouslySetInnerHTML={{ __html: info.getValue() }} />
      </Link>
    ),
  },
  {
    id: "geneSynonyms",
    header: "Synonyms",
    accessorKey: "_synonyms",
    filter: "fuzzyText",
  },
  {
    id: "geneProduct",
    header: "Product(s)",
    accessorKey: "_product",
    filter: "fuzzyText",
    cell: (info) => (
      <span dangerouslySetInnerHTML={{ __html: info.getValue() }} />
    ),
  },
];

function formatData(objectsList = []) {
  let data = [];
  if (DataVerifier.isValidArray(objectsList)) {
    objectsList.forEach(({ _id, name, productsName, synonyms }) => {
      data.push({
        id: _id,
        _name: name,
        _synonyms: DataVerifier.isValidArray(synonyms)
          ? synonyms.join(", ")
          : "",
        _product: DataVerifier.isValidArray(productsName)
          ? productsName.join(", ")
          : "",
      });
    });
  }
  return data;
}

export default function Home() {
  const { objectsList, loading, error } = useGetObjectList({
    datamartType: "gene",
  });
  let state = "done";
  let title = "Genes";
  if (loading) {
    state = "loading";
    title = "loading gene list";
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }

  return (
    <div>
      <Cover state={state}>
        <h1>{title}</h1>
      </Cover>
      {objectsList && <LoadTable objectsList={objectsList} />}
    </div>
  );
}

function LoadTable({ objectsList }) {
  const data = useMemo(() => {
    return formatData(objectsList);
  }, [objectsList]);
  return (
    <div style={{ margin: "10px 3% 10px 3%" }}>
      <FilterTable
        data={data}
        columns={COLUMNS}
        fileName="GeneSummaryData"
      />
    </div>
  );
}
