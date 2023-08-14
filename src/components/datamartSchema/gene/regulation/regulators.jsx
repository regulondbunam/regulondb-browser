import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DataVerifier, FilterTable } from "../../../ui-components";
const COLUMNS = [
    {
        id: 'regulator_name',
        header: 'Name',
        accessorKey: '_name',
        filter: "fuzzyText",
        cell: info=><Link to={"/regulon/" + info.row.original.id} >{info.getValue()}</Link>,
      },
]

function formatData(regulators = []) {
    let data = []
    if (DataVerifier.isValidArray(regulators)) {
      regulators.forEach((regulator, index) => {
        const { _id, name } = regulator
        data.push({
          id: _id,
          //_name: <Link value={regulator.name} to={"/regulator/" + _id} >{regulator.name}</Link>,
          _id: _id,
          _name: name,
        })
      })
    }
    return data
  }

export default function Regulators({regulators = [], variant="minimal"}) {

    switch (variant) {
        case "filterTable":
            return <Table regulators={regulators} />
        default:
            return (
                <table className="tableAccent" >
                    <tbody>
                        {regulators.map((regulator,index)=>{
                            return <Regulator key={"regulatorData_"+index+"_"+regulator._id} {...regulator} />
                        })}
                    </tbody>
                </table>
            )
    }
}

function Regulator({
    _id,
    RegulatorFunction,
    name,
    type,
}) {
    return(
        <tr>
            <td>
                {name}</td>
            <td>{type}</td>
        </tr>
    )
}

function Table({regulators}){
    const data = useMemo(() => {
        return formatData(regulators)
      }, [regulators])
      return <FilterTable columns={COLUMNS} data={data} />
}