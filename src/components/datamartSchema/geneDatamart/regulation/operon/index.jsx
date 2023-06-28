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
                <div style={{marginLeft: "1%"}} >
                    {arrangement.map((arr, indx) => <Arrangement key={`arrOperon${_id}_${indx}`} {...arr} />)}
                </div>

            )}
        </div>
    )
}
export function Arrangement({
    promoters,
    regulators,
    transcriptionUnit,
}) {
    //console.log(transcriptionUnit);
    return (
        <table className="table_auto table_content">
            <tbody>
                {DataVerifier.isValidArray(promoters) && (
                    <tr>
                        <td style={{ fontWeight: "bold" }}>Promoters:</td>
                        <td>{promoters.map(pro => pro.name).join(", ")}</td>
                    </tr>
                )}
                {DataVerifier.isValidObject(transcriptionUnit) && (
                    <tr>
                        <td style={{ fontWeight: "bold" }}>Transcription Unit:</td>
                        <td>{transcriptionUnit.name}</td>
                    </tr>
                )}
                {DataVerifier.isValidArray(regulators) && (
                    <tr>
                        <td style={{ fontWeight: "bold" }}>Regulators:</td>
                        <td>{regulators.map(regulators => `${regulators.name} (${regulators.function})`).join(", ")}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}