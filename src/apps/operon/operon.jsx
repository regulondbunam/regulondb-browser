import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { ValidateId } from "./webServices/operon_ws_validate";
import Title from './components/operon_title'
import Home from "./operon_home"
import Info from "./operon_info"
import conf from './conf/operon.conf.json'

const Operon = () => {
    const [_data, set_data] = useState();
    const [_validId, set_validId] = useState();
    const [_state, set_state] = useState();
    const id = useParams().id;
    let title = conf?.pages?.operon_main.title;
    if(id){
        /*
        switch (_state) {
            case "loading":
                title = `Loading ${id} ID information, please wait`;
                break;
            case "error":
                title = "Sorry we have technical difficulties, please try again later";
                return showTitle(title, _state, _data)
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
                    return showTitle(title, _state, _data)
                }
            case "not found":
                title = `Sorry we couldn't find the identifier: ${id}`
                return showTitle(title, _state, _data)
            default:
                title = "error state: " + _state;
        }
        return (
            <div>
                {
                    showTitle(title, _state, _data)
                }
                <ValidateId id={id}
                    resoultsData={(data) => { set_data(data) }}
                    status={(state) => { set_state(state) }}
                    isValidate={(isGood) => { set_validId(isGood) }}
                />
            </div>
        )
        */
        return <Info id={id} />
    }else{
        return home_default(title)
    }
    
}

export default Operon

function home_default(title) {
    return (
        <div>
            <Title title={title} />
            <article>
                <Home conf={conf?.pages?.operon_main} />
            </article>
        </div>
    )
}