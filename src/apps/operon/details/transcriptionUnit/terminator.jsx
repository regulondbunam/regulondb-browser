import { MarkSequenceTerminator } from "../../../../components/sequence"

const stylePosItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}

function Terminators({ tuId, terminators = [], allCitations }) {
    return (
        <div>
            <div style={{ marginLeft: "5%", marginRight: "2%" }}>
                {
                    terminators.map((terminator, index) => {
                        return (
                            <div key={"tu_terminator_" + index} >
                                <p className="p_accent" >{terminator.transcriptionTerminationSite.type}</p>
                                <div style={{display: "flex"}} >
                                    <div style={stylePosItem}>
                                        <p style={{ fontWeight: "bold" }} >LeftEndPosition</p><p>{terminator?.transcriptionTerminationSite?.leftEndPosition}</p>
                                    </div>
                                    <div style={{width: "2%"}} />
                                    <div style={stylePosItem} >
                                        <p style={{ fontWeight: "bold" }} >RighEndtPosition</p><td>{terminator?.transcriptionTerminationSite?.rightEndPosition}</td>
                                    </div>
                                </div>
                                <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: "bold" }}>sequence</td>
                                                </tr>
                                                <tr>
                                                    <td >
                                                        <MarkSequenceTerminator
                                                            sequenceInfo={{
                                                                sequence: terminator?.sequence,
                                                                posL: terminator?.transcriptionTerminationSite?.leftEndPosition,
                                                                posR: terminator?.transcriptionTerminationSite?.rightEndPosition
                                                            }}
                                                            id={terminator._id}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Terminators;