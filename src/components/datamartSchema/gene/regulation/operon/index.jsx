import { Link } from "react-router-dom"
import { DataVerifier } from "../../../../ui-components";


export default function Operon({
    _id,
    arrangement,
    name,
}) {
    return (
        <div>
            <Link to={"/operon/" + _id} >
                <p style={{ fontSize: "18px" }} ><b>{`Operon ${name}`}</b></p>
            </Link>
            {DataVerifier.isValidArray(arrangement) && (
                <div style={{ marginLeft: "1%" }} >
                    <p style={{ fontSize: "14px" }} ><b>Arrangement: </b></p>
                    <table className="tableAccent">
                        <thead>
                            <th>Transcription Unit</th>
                            <th>Promoter</th>
                            <th>Regulators</th>
                        </thead>
                        <tbody>
                            {arrangement.map((arr, indx) => <tr key={`arrOperon${_id}_${indx}`} ><Arrangement  {...arr} /></tr>)}
                        </tbody>
                    </table>

                </div>

            )}
        </div>
    )
}
function Arrangement({
    promoters,
    regulators,
    transcriptionUnit,
}) {
    //console.log(transcriptionUnit);
    return (
        <>
            <td>{transcriptionUnit.name}</td>
            <td>{promoters.map(pro => pro.name).join(", ")}</td>
            <td>{regulators.map((regulator, index) => {
                let fun = ""
                switch (regulator.function) {
                    case "repressor":
                        fun = "-"
                        break;
                    case "activator":
                        fun = "+"
                        break;
                    case "dual":
                        fun = "+-"
                        break;
                    default:
                        fun = ""
                        break;
                }
                return <Link to={"/regulon/"+regulator._id} key={`${regulator.name}_${regulator._id}_${index}`}>{`${regulator.name}${fun}`}</Link>
            })}</td>
        </>
    )
}