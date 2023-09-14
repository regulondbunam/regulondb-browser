import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../components/ui-components";

const COLUMNS = [
  {
    id: "reaction",
    header: "Reaction",
    columns: [
      {
        id: "Reaction_Number",
        header: "#",
        accessorKey: "_number",
      },
      {
        id: "Reaction_Name",
        header: "Name",
        accessorKey: "_name",
      },
      {
        id: "Reaction_Type",
        header: "Type",
        accessorKey: "_type",
      },
      {
        id: "Reaction_pathwayComponents",
        header: "pathwayComponents",
        accessorKey: "_pathwayComponents",
      },
    ],
  },
  {
    id: "components_reaction",
    header: "Components",
    columns: [
      {
        id: "component_name",
        header: "Name",
        accessorKey: "_compName",
      },
      {
        id: "component_Function",
        header: "Function",
        accessorKey: "_compFunction",
      },
      {
        id: "component_Type",
        header: "Type",
        accessorKey: "_compType",
      },
    ],
  }
];

function formatData(reactions = []) {
  let _data = [];
  if (DataVerifier.isValidArray(reactions)) {
    reactions.forEach((reaction) => {
      const components = reaction.components;
      let _compName = "",
        _compFunction = "",
        _compType = "";
        if (DataVerifier.isValidArray(components)) {
            components.forEach(component => {
                _compName += " "+component.name
                _compFunction += " "+component.function
                _compType += " "+component.type
            });
        }
      _data.push({
        _number: reaction.number,
        _name: reaction.name,
        _type: reaction.type,
        _pathwayComponents: reaction.pathwayComponents,
        _compName: _compName,
        _compFunction: _compFunction,
        _compType: _compType,
      });
    });
  }
  return _data
}

export default function Table({ reactions }) {
    const data = useMemo(()=>{
        return formatData(reactions)
    },[reactions])
  return <FilterTable data={data} columns={COLUMNS} />;
}
