import React, { useState } from 'react'
import { DataTUdescription } from '../../webServices/operon_ws_TU'

export const TUdescription = ({ idOperon, idTU }) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    //let loading = false;
    //console.log(_data)
    switch (_state) {
        case "loading":
            //loading = true
            break;
        case "error":
            return <>error</>
        case "done":
            return <Description data={_data} idTU={idTU} />
        default:
            break
    }
    if (idOperon) {
        return (
            <div>
                loading...
                <DataTUdescription id={idOperon}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                />
            </div>
        )
    }
    return <>no id</>
}

function Description({ data, idTU }) {
    try {
        const tu = data.find(element => element.id === idTU);
        console.log(tu)
        return (
            <>
                <p dangerouslySetInnerHTML={{ __html: tu.note }} />
                <table>
                    <tbody>
                        {
                            notNull(tu.synonyms,
                            <tr>
                            <td>Synonyms</td>
                            <td>{
                                tu.synonyms.map((s)=>{
                                    return ` ${s}`
                                }).join(",")
                                }</td>
                            </tr>
                            )
                        }
                        {

                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    } catch (error) {
        console.error(error)
    }
    return (
        <>
            no tu data
        </>
    )
}

function notNull(data,element) {
    if (data === null || data.length < 1 || data === "" || data === undefined  ) {
        return null
    }
    return element
}
