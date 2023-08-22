import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DataVerifier, FilterTable } from "../../components/ui-components";

const COLUMNS = [
  {
    id: "gu_name",
    header: "Name",
    accessorKey: "_name",
    filter: "fuzzyText",
    cell: (info) => (
      <Link to={"/gu/" + info.row.original.id}>{info.getValue()}</Link>
    ),
  },
  {
    header: "Groups",
    id: "gu_groups",
    accessorKey: "_groups",
    filter: "fuzzyText",
    cell: (info)=>{
        if (DataVerifier.isValidArray(info.row.original.groups)) {
            return(<>
            {info.row.original.groups.map((groupName)=><p>{groupName}</p>)}
            </>)
        }
        return ""
    }
  },
];

function formatData(gusData = []) {
  let data = [];
  if (DataVerifier.isValidArray(gusData)) {
    gusData.forEach((guData, index) => {
      const gu = guData.gensorUnit;
      let groups = "";
      if (DataVerifier.isValidArray(gu.groups)) {
        groups = gu.groups.join(";");
      }
      data.push({
        id: gu._id,
        _name: gu.name,
        groups: gu.groups,
        _groups: groups,
      });
    });
  }
  return data;
}

export default function Home({ gusData }) {
  const data = useMemo(() => {
    return formatData(gusData);
  }, [gusData]);
  return (
    <div>
        <div style={{margin: "0 10% 0 15%"}}>
            <FilterTable columns={COLUMNS} data={data} />
        </div>
      
    </div>  
  );
}
