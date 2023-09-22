import React from "react";
import { Cover, Circular } from "../../../components/ui-components";
import { useGetDataFile } from "../../../components/webservices/dataOfFile";
import Table from "./table";

export default function BrowserFilter({fileName, filePath, file}) {
  return (
    <div>
      <Cover>
        <h1>Browser & Filter {fileName}</h1>
      </Cover>
      {filePath.type === "graphQLservice" && (
        <ByWebServices {...file} />
      )}
    </div>
  );
}

function ByWebServices({ id, name, path, version, format, type }) {
    const {fileData, loading, error} = useGetDataFile(name)

    console.log(name);
    if(loading){
        return <Circular/>
    }

    if(error){
      return <>error loading dataFile</>
    }

    switch (type) {
        case "table":
            return <Table fileData={fileData}/>
        default:
            return <></>
    }

    
}