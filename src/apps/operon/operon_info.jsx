import React, { useState } from 'react'
import { Cover } from "../../components/ui-components/ui_components";
import { ValidateId } from "./webServices/operon_ws_validate";
import Title from './components/operon_title'
import Tabs from "./components/operon_tabs";

export const Info = ({ id }) => {
    const [_data, set_data] = useState();
    const [_validId, set_validId] = useState();
    const [_state, set_state] = useState();
    let title = "Operon Information";
    let nTUs = 0
    let showTabs = false
    if (id) {
        switch (_state) {
            case "loading":
                title = `Loading ${id} ID information, please wait`;
                break;
            case "error":
                title = "Sorry we have technical difficulties, please try again later";
                break;
            case "done":
                if (_validId && _data != null) {
                    //console.log(_data)
                    nTUs = _data[0]?.transcriptionUnits
                    title = _data[0]?.operon?.name;
                    showTabs = true
                    return (
                        <div>
                            <Title title={title} state={_state} data={_data} />
                            {
                                showTabs ? <Tabs idOperon={id} nTUs={nTUs.length} /> : <></>
                            }
                        </div>
                    )
                } else {
                    title = `Sorry we couldn't find the identifier: ${id}`
                }
                break;
            case "not found":
                title = `Sorry we couldn't find the identifier: ${id}`
                break;
            default:
                title = "error state: " + _state;
                break;
        }
        return (
            <div>
                <Title title={title} state={_state} data={_data} />
                <ValidateId id={id}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                    isValidate={(isGood) => { set_validId(isGood) }}
                />
            </div>
        )
    }
    return (
        <div>
            <Cover state="error">
                <h1>no id</h1>
            </Cover>
            <article>
                operon content
                </article>
        </div>
    )
}

export default Info
