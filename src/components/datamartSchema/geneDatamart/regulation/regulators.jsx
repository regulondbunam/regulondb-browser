
export default function Regulators({regulators = []}) {
    return (
        <table className="table_auto table_content" >
            <thead>
                <tr><th colSpan={3} > <p style={{ fontSize: "18px" }} ><b>Regulators</b></p></th></tr>
                <tr>
                    <th>Name</th>
                    <th>function</th>
                    <th>type</th>
                </tr>
            </thead>
            <tbody>
                {regulators.map((regulator,index)=>{
                    return <Regulator key={"regulatorData_"+index+"_"+regulator._id} {...regulator} />
                })}
            </tbody>
        </table>
    )
}

function Regulator({
    _id,
    RegulatorFunction,
    name,
    type,
}) {
    return(
        <tr>
            <td>{name}</td>
            <td>{RegulatorFunction}</td>
            <td>{type}</td>
        </tr>
    )
}