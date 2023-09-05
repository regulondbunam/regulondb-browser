import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DataVerifier, FilterTable } from "../../components/ui-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    cell: (info) => {
      if (DataVerifier.isValidArray(info.row.original.groups)) {
        return (
          <>
            {info.row.original.groups.map((groupName) => (
              <p>{groupName}</p>
            ))}
          </>
        );
      }
      return "";
    },
  },
];

const COLUMNS_GROUP = [
  {
    header: "Group",
    id: "gu_group",
    accessorKey: "_group",
    filter: "fuzzyText",
  },
  {
    id: "gu_gensorUnit",
    header: "gensorUnit",
    accessorKey: "_gensorUnit",
    filter: "fuzzyText",
    cell: (info) => {
      const gensorUnits = info.row.original.gensorUnits;
      const groupName = info.row.original.id;
      return (
        <div
          style={{
            overflow: "auto",
            display: "grid",
            gridTemplateColumns: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",
          }}
        >
          {gensorUnits.map((gu) => {
            return (
              <div>
                <Link
                  key={"gu" + gu._id + "In_" + groupName + "group"}
                  to={"/gu/" + gu._id}
                >
                  {gu.name}
                </Link>
              </div>
            );
          })}
        </div>
      );
      //
    },
  },
];

function formatDataByGensorUnit(gusData = []) {
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

function formatDataByGroup(gusData = []) {
  let data = [];
  if (DataVerifier.isValidArray(gusData)) {
    let groups = {};
    gusData.forEach((guData, index) => {
      const gu = guData.gensorUnit;
      if (DataVerifier.isValidArray(gu.groups)) {
        gu.groups.forEach((group) => {
          if (DataVerifier.isValidString(group)) {
            const idGroup = group.replace(/\s/g, "_");
            const row = groups[idGroup];
            if (row) {
              if (!row.gensorUnits.find((_gu) => _gu._id === gu._id)) {
                groups[idGroup] = {
                  id: idGroup,
                  _group: group,
                  gensorUnits: [...row.gensorUnits, gu],
                };
              }
            } else {
              groups[idGroup] = {
                id: idGroup,
                _group: group,
                gensorUnits: [gu],
              };
            }
          } else {
            const idGroup = "unknown";
            const row = groups[group];
            if (row) {
              groups[idGroup] = {
                id: idGroup,
                _group: group,
                gensorUnits: [...row.gensorUnits, gu],
              };
            } else {
              groups[idGroup] = {
                id: idGroup,
                _group: group,
                gensorUnits: [gu],
              };
            }
          }
        });
      }
    });
    console.log(groups);
    for (const [key, value] of Object.entries(groups)) {
      data.push({
        id: key,
        _group: value._group,
        gensorUnits: value.gensorUnits,
      });
    }
  }
  return data;
}

export default function Home({ gusData }) {
  const [format, setFormat] = useState("Gensor Unit");

  const handleChange = (event) => {
    setFormat(event.target.value);
  };
  const dataByGU = useMemo(() => {
    return formatDataByGensorUnit(gusData);
  }, [gusData]);

  const dataByGroup = useMemo(() => {
    return formatDataByGroup(gusData);
  }, [gusData]);

  let columns = [],
    data = [];
  switch (format) {
    case "Functionality":
      columns = COLUMNS_GROUP;
      data = dataByGroup;
      break;
    default:
      columns = COLUMNS;
      data = dataByGU;
      break;
  }

  return (
    <div>
      <div style={{ margin: "0 10% 0 5%" }}>
        <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Gensor Unit grouped by </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={format}
            label="groupBy"
            onChange={handleChange}
          >
            <MenuItem value={"Gensor Unit"}>Name</MenuItem>
            <MenuItem value={"Functionality"}>Functional Group</MenuItem>
          </Select>
        </FormControl>
        <FilterTable columns={columns} data={data} />
      </div>
    </div>
  );
}
